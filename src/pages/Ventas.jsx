import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { RiPencilFill, RiDeleteBin6Fill } from 'react-icons/ri';
import supabase from '../../Backend/supabaseConfig';

export const Ventas = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [ventas, setVentas] = useState([]);
  const [selectedVentaId, setSelectedVentaId] = useState(null);
  const [editTotal, setEditTotal] = useState('');
  const [editVenta, setEditVenta] = useState(null);
  const handleGuardarCambios = async () => {
    try {
      const { data, error } = await supabase
        .from('ventas')
        .update({ totalventa: editTotal })
        .match({ id_venta: selectedVentaId });
      if (error) {
        console.error('Error al actualizar la venta:', error.message);
        return;
      }
  
      // Actualizar la lista de ventas localmente
      const nuevasVentas = ventas.map((venta) =>
        venta.id_venta === selectedVentaId ? { ...venta, totalventa: editTotal } : venta
      );
      setVentas(nuevasVentas);
  
      // Forzar la actualización de la página
      setSelectedVentaId(null);

      window.location.reload();
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
    }
  };
    
  const handleCancelarEdicion = () => {
    setEditVenta(null);
    setEditTotal('');
    setSelectedVentaId(null);
  };
  
  const handleEditarVenta = async (id) => {
    try {
      const { data, error } = await supabase.from('ventas').select().match({ id_venta: id });
      if (error) {
        console.error('Error al obtener la venta:', error.message);
        return;
      }
      const venta = data[0];
      setEditVenta(venta);
      setEditTotal(venta.totalventa);
      setSelectedVentaId(id);
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
    }
  };

  const handleEliminarVenta = async (id) => {
    try {
      const { data, error } = await supabase.from('ventas').delete().match({ id_venta: id }); // Eliminar venta desde el backend
      if (error) {
        console.error('Error al eliminar venta:', error.message);
        return;
      }

      // Actualizar la lista de ventas localmente
      const nuevasVentas = ventas.filter((venta) => venta.id_venta !== id);
      setVentas(nuevasVentas);
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
    }

    // Cerrar el modal de confirmación
    setShowDeleteModal(false);
  };

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const { data, error } = await supabase.from('ventas').select('*'); // Obtener datos de ventas desde la base de datos
        if (error) {
          console.error('Error al obtener las ventas:', error.message);
          return;
        }
        setVentas(data);
      } catch (error) {
        console.error('Error al conectar con el servidor:', error);
      }
    };

    fetchVentas();
  }, []);

  return (
    <div className="bg-alitas_obs_beige w-full min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <main className="lg:pl-32 lg:pr-96 pb-20">
        <div className="md:p-8 p-4">
          {/* Tabla de ventas */}
          <section className="container px-4 mx-auto">
            <div className="flex flex-col">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden md:rounded-lg">
                    <h1 className="lg:text-3xl text-2xl text-alitas_red font-Lilita_One uppercase"> VENTAS </h1>
                    <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md overflow-hidden">
                      <thead className="bg-alitas_beige">
                        <tr>
                          <th className="py-2 px-4 border-b text-left text-alitas_obs_red uppercase">ID Venta</th>
                          <th className="py-2 px-4 border-b text-left text-alitas_obs_red uppercase">Fecha y Hora</th>
                          <th className="py-2 px-4 border-b text-left text-alitas_obs_red uppercase">Total</th>
                          <th className="py-2 px-4 border-b text-left text-alitas_obs_red uppercase">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {ventas.map((venta) => (
                          <tr key={venta.id_venta}>
                            <td className="px-4 py-4 whitespace-nowrap">#{venta.id_venta}</td>
                            <td className="px-4 py-4 whitespace-nowrap">{new Date(venta.fechahora).toLocaleString('es-MX')}</td>
                            <td className="px-4 py-4 whitespace-nowrap">${venta.totalventa.toFixed(2)}</td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <button
                                  onClick={() => handleEditarVenta(venta.id_venta)}
                                  className="bg-blue-500 text-white px-2 py-2 rounded-full hover:bg-blue-700"
                                >
                                  <RiPencilFill />
                                </button>
                                <button
                                onClick={() => {
                                  setShowDeleteModal(true);
                                  setSelectedVentaId(venta.id_venta); // Aquí seleccionamos la venta antes de mostrar el modal
                                }}
                                className="bg-red-500 text-white px-2 py-2 rounded-full hover:bg-red-700 ml-4"
                              >
                                <RiDeleteBin6Fill />
                              </button>

                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Modal de confirmación para eliminar venta */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto" style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }} aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-end min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
              &#8203;
            </span>
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <div className="bg-gray-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Confirmar Eliminación
                    </h3>
                    <p className="text-sm text-gray-500">¿Estás seguro de que quieres eliminar esta venta?</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={() => handleEliminarVenta(selectedVentaId)}
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-alitas_obs_red text-base font-medium text-white hover:bg-alitas_red focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Confirmar
              </button>


                <button
                  onClick={() => setShowDeleteModal(false)}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para editar venta */}
      {editVenta && (
        <div className="fixed inset-0 z-10 overflow-y-auto" style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }} aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 sm:items-center sm:justify-center">
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-gray-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Editar Venta
                      </h3>
                      <div className="mt-2">
                        <div className="grid grid-cols-2 gap-6">
                          <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="totalventa" className="block text-sm font-medium text-gray-700">
                              Total Venta
                            </label>
                            <input
                              type="text"
                              name="totalventa"
                              id="totalventa"
                              value={editTotal}
                              onChange={(e) => setEditTotal(e.target.value)}
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={handleGuardarCambios}
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-alitas_obs_red text-base font-medium text-white hover:bg-alitas_red focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Guardar Cambios
                  </button>
                  <button
                    onClick={handleCancelarEdicion}
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancelar
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};