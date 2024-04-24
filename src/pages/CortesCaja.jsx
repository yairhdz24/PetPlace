import React, { useState, useEffect } from "react";
import Sidebar from '../components/Sidebar';
import { RiCloseLine, RiFileList3Fill, RiMenu3Fill } from 'react-icons/ri';
import supabase from "../../Backend/supabaseConfig";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const CortesCaja = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [ventas, setVentas] = useState([]);
  const [totalVentas, setTotalVentas] = useState(0);

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const { data, error } = await supabase
          .from("ventas")
          .select("*")
          .gte("fechahora", new Date().toISOString().slice(0, 10)); // Obtener ventas del día
        if (error) {
          console.error("Error al obtener las ventas del día:", error.message);
          return;
        }
        setVentas(data);

        // Calcular el total de ventas del día
        const total = data.reduce((acc, venta) => acc + venta.totalventa, 0);
        setTotalVentas(total);
      } catch (error) {
        console.error("Error al conectar con el servidor:", error);
      }
    };

    fetchVentas();
  }, []);

  const menu = () => {
    setShowMenu(!showMenu);
  };

  const handleGenerarCorte = () => {
    // Crear un nuevo objeto PDF
    const doc = new jsPDF();

    // Agregar imagen como logo
    const logoImg = new Image();
    logoImg.src = './src/icons/logo.png';
    doc.addImage(logoImg, 'JPEG', 10, 10, 40, 30);

    // Establecer el título del corte de caja
    const fechaActual = new Date();
    const titulo = `Corte de Caja Pet Place - ${fechaActual.toLocaleDateString()}`;
    doc.setFontSize(24); // Tamaño de fuente más grande
    // doc.setFont("bold"); // Establecer la fuente en negrita
    doc.setTextColor(0, 0, 0); // Color rojo intenso (RGB)
    doc.text(titulo, 60, 30); // Ajusta las coordenadas según sea necesario

    // Agregar tabla de ventas
    doc.autoTable({
      startY: 50, // Ajusta la posición vertical de la tabla
      head: [['ID Venta', 'Fecha y Hora', 'Total']],
      body: ventas.map(venta => [venta.id_venta, new Date(venta.fechahora).toLocaleString(), `$${venta.totalventa.toFixed(2)}`])
    });

    // Agregar resumen de ventas
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 10,
      head: [['Descripción', 'Valor']],
      body: [
        ['Cantidad de ventas', ventas.length],
        ['Monto promedio por venta', `$${ventas.length > 0 ? (totalVentas / ventas.length).toFixed(2) : "0.00"}`],
        ['Total', `$${totalVentas.toFixed(2)}`]
      ]
    });

    // Agregar pie de página
    const piePagina = `
      By: Yair Hernandez, Yezael Gomez, Judith Villalvazo, Abraham Mendoza
    `;
    doc.setFontSize(10); // Tamaño de fuente más pequeño para el pie de página
    doc.text(piePagina, 10, doc.internal.pageSize.height - 10);

    // Descargar el PDF con el nombre personalizado
    const nombreArchivo = `Corte Caja ${fechaActual.toLocaleDateString()}.pdf`;
    doc.save(nombreArchivo);
};

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#FFEDDA] to-[#FFD580]">
      <Sidebar showMenu={showMenu} />
      <nav className="bg-alitas_beige lg:hidden fixed w-full bottom-0 left-0 text-3xl text-alitas_obs_red p-4 flex items-center justify-between rounded-tl-xl rounded-tr-xl">
        <button className="p-2">
          <RiCloseLine />
        </button>
        <button onClick={menu} className="p-2">
          <RiFileList3Fill />
        </button>
        <button onClick={menu} className="p-2">
          {showMenu ? <RiCloseLine /> : <RiMenu3Fill />}
        </button>
      </nav>

      <main className="lg:pl-32 lg:pr-96 pb-20 font-Poppins ">
        <div className="md:p-8 p-4 " >
          <section className="container px-4 mx-auto ">
            <div className="flex flex-col ">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <h1 className="lg:text-3xl text-2xl text-alitas_red font-Lilita_One uppercase pb-5"> Corte De Caja </h1>
                  <div className="overflow-hidden rounded-lg">
                    <div className="flex flex-col gap-4 p-4 lg:gap-8 lg:p-6 bg-white">

                      <div className="grid gap-2">
                        <div className="grid gap-1">
                          <div>Vendedor:</div>
                          <div className="font-semibold">Admninistrador</div>
                        </div>
                        <div className="grid gap-1">
                          <div>Fecha:</div>
                          <div className="font-semibold">{new Date().toLocaleDateString()}</div>
                        </div>
                      </div>
                      <div className="text-xl font-semibold">Ventas del día</div>
                      <div className="bg-white rounded-md shadow-md">
                        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md overflow-hidden">
                          <thead className="bg-alitas_beige">
                            <tr>
                              <th className="py-2 px-4 border-b text-left text-alitas_obs_red uppercase">ID Venta</th>
                              <th className="py-2 px-4 border-b text-left text-alitas_obs_red uppercase">Fecha y Hora</th>
                              <th className="py-2 px-4 border-b text-left text-alitas_obs_red uppercase">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {ventas.map((venta) => (
                              <tr key={venta.id_venta} className="border-b">
                                <td className="px-10 py-4 whitespace-nowrap">#{venta.id_venta}</td>
                                <td className="px-4 py-4 whitespace-nowrap">{new Date(venta.fechahora).toLocaleString()}</td>
                                <td className="px-4 py-4 whitespace-nowrap">${venta.totalventa.toFixed(2)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>


                      <div className="text-xl font-semibold">Resumen de ventas</div>
                      <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md overflow-hidden">
                        <thead className="bg-alitas_beige">
                          <tr>
                            <th className="py-2 px-4 border-b text-left text-alitas_obs_red uppercase">Descripción</th>
                            <th className="py-2 px-4 border-b text-left text-alitas_obs_red uppercase">Valor</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="px-4 py-4 whitespace-nowrap text-xl">Cantidad de ventas</td>
                            <td className="px-4 py-4 whitespace-nowrap font-bold text-xl">{ventas.length}</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-4 whitespace-nowrap text-xl">Monto promedio por venta</td>
                            <td className="px-4 py-4 whitespace-nowrap font-bold text-xl">
                              ${ventas.length > 0 ? (totalVentas / ventas.length).toFixed(2) : "0.00"}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-4 whitespace-nowrap font-bold text-2xl">Total</td>
                            <td className="px-4 py-4 whitespace-nowrap font-bold text-xl">${totalVentas.toFixed(2)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="flex gap-4 pt-5">
                    <button
                      onClick={handleGenerarCorte}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-md"
                    >
                      Generar reporte
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
