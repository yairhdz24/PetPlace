import React, { useState, useEffect } from "react";
import Sidebar from '../components/Sidebar';
import { RiCloseLine, RiFileList3Fill, RiMenu3Fill } from 'react-icons/ri';
import supabase from "../../Backend/supabaseConfig";

const HistorialPedidos = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [ventas, setVentas] = useState([]);
  const [totalVentas, setTotalVentas] = useState(0);

  const handleGenerarCorte = async () => {
    try {
      // Aquí puedes implementar la lógica para generar el corte de caja
      console.log("Generando corte de caja...");
    } catch (error) {
      console.error("Error al generar el corte de caja:", error);
    }
  };

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

  return (
    <div className="bg-alitas_obs_beige w-full min-h-screen">
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

      <main className="lg:pl-32 lg:pr-96 pb-20 ">
        <div className="md:p-8 p-4">
          <section className="container px-4 mx-auto">
            <div className="flex flex-col">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden md:rounded-lg">
                    <h1 className="lg:text-3xl text-2xl text-alitas_red font-Lilita_One uppercase"> Corte De Caja </h1>
                    <div className="flex flex-col gap-4 p-4 lg:gap-8 lg:p-6 bg-gradient-to-b from-[#FFD580] to-[#FFEDDA]">
                      <div className="grid gap-2">
                        <h1 className="font-semibold text-2xl">Corte de caja</h1>
                        <p className="text-gray-500 dark:text-gray-400">
                          Tienda de mascotas "Amigos peludos"
                        </p>
                      </div>
                      <div className="grid gap-4">
                        <div className="grid gap-1">
                          <div>Vendedor:</div>
                          <div className="font-semibold">Juan Pérez</div>
                        </div>
                        <div className="grid gap-1">
                          <div>Fecha:</div>
                          <div className="font-semibold">{new Date().toLocaleDateString()}</div>
                        </div>
                      </div>
                      <div className="bg-white rounded-md shadow-md p-4">
                        <div className="text-xl font-semibold">Ventas del día</div>
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th>ID Venta</th>
                              <th>Fecha y Hora</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {ventas.map((venta) => (
                              <tr key={venta.id_venta}>
                                <td>{venta.id_venta}</td>
                                <td>{new Date(venta.fechahora).toLocaleString()}</td>
                                <td>${venta.totalventa.toFixed(2)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="bg-white rounded-md shadow-md p-4">
                        <div className="text-xl font-semibold">Resumen de ventas</div>
                        <div className="flex items-center gap-4">
                          <div className="grid gap-1">
                            <div>Ventas del día</div>
                            <div className="text-3xl font-bold">${totalVentas.toFixed(2)}</div>
                          </div>
                          {/* Otros elementos del resumen */}
                        </div>
                      </div>
                      {/* Agregar sección de gastos si es necesario */}
                      <div className="flex gap-4">
                        <button
                          onClick={handleGenerarCorte}
                          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-md"
                        >
                          Generar corte de caja
                        </button>
                      </div>
                    </div>
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

export default HistorialPedidos;
