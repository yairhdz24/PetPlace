import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { RiPencilFill, RiDeleteBin6Fill } from 'react-icons/ri';
import supabase from '../../Backend/supabaseConfig';
import {RegisterProducto} from '../components/RegisterProducto'; // Importa el componente de registro de producto

export const Inventario = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productos, setProductos] = useState([]);
  const [selectedProductoId, setSelectedProductoId] = useState(null);
  const [editCantidad, setEditCantidad] = useState('');
  const [editNombre, setEditNombre] = useState('');
  const [editProducto, setEditProducto] = useState(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false); // Estado para controlar la visibilidad del modal de registro

  const handleGuardarCambios = async () => {
    try {
      const { data, error } = await supabase
        .from('productos')
        .update({ cantidad: editCantidad })
        .match({ id_producto: selectedProductoId });
      if (error) {
        console.error('Error al actualizar el producto:', error.message);
        return;
      }
  
      // Actualizar la lista de productos localmente
      const nuevosProductos = productos.map((producto) =>
        producto.id_producto === selectedProductoId ? { ...producto, cantidad: editCantidad } : producto
      );
      setProductos(nuevosProductos);
  
      // Forzar la actualización de la página
      setSelectedProductoId(null);
      window.location.reload();
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
    }
  };
    
  const handleCancelarEdicion = () => {
    setEditProducto(null);
    setEditCantidad('');
    setSelectedProductoId(null);
  };
  
  const handleEditarProducto = async (id) => {
    try {
      const { data, error } = await supabase.from('productos').select().match({ id_producto: id });
      if (error) {
        console.error('Error al obtener el producto:', error.message);
        return;
      }
      const producto = data[0];
      setEditProducto(producto);
      setEditCantidad(producto.cantidad);
      setEditNombre(producto.nombre);
      setSelectedProductoId(id);
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
    }
  };

  const handleEliminarProducto = async (id) => {
    try {
      const { data, error } = await supabase.from('productos').delete().match({ id_producto: id }); // Eliminar producto desde el backend
      if (error) {
        console.error('Error al eliminar el producto:', error.message);
        return;
      }

      // Actualizar la lista de productos localmente
      const nuevosProductos = productos.filter((producto) => producto.id_producto !== id);
      setProductos(nuevosProductos);
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
    }

    // Cerrar el modal de confirmación
    setShowDeleteModal(false);
  };

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const { data, error } = await supabase.from('productos').select('*'); // Obtener datos de productos desde la base de datos
        if (error) {
          console.error('Error al obtener los productos:', error.message);
          return;
        }
        setProductos(data);
      } catch (error) {
        console.error('Error al conectar con el servidor:', error);
      }
    };

    fetchProductos();
  }, []);

  const handleOpenRegisterModal = () => {
    setShowRegisterModal(true); // Muestra el modal de registro al hacer clic en el botón
  };

  return (
    <div className="bg-alitas_obs_beige w-full min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <main className="lg:pl-32 lg:pr-96 pb-20">
        <div className="md:p-8 p-4">
          {/* Tabla de inventario */}
          <section className="container px-4 mx-auto">
            <div className="flex flex-col">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden md:rounded-lg">
                    <h1 className="lg:text-3xl text-2xl text-alitas_red font-Lilita_One uppercase"> Inventario </h1>
                    <div className="flex justify-end mb-4"> {/* Botón para abrir el modal de registro */}
                      <button
                        onClick={handleOpenRegisterModal}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
                      >
                        Registrar Producto
                      </button>
                    </div>
                    <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md overflow-hidden">
                      <thead className="bg-alitas_beige">
                        <tr>
                          <th className="py-2 px-4 border-b text-left text-alitas_obs_red uppercase">ID Producto</th>
                          <th className="py-2 px-4 border-b text-left text-alitas_obs_red uppercase">Nombre</th>
                          <th className="py-2 px-4 border-b text-left text-alitas_obs_red uppercase">Cantidad</th>
                          <th className="py-2 px-4 border-b text-left text-alitas_obs_red uppercase">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {productos.map((producto) => (
                          <tr key={producto.id_producto}>
                            <td className="px-4 py-4 whitespace-nowrap">#{producto.id_producto}</td>
                            <td className="px-4 py-4 whitespace-nowrap">{producto.nombre}</td>
                            <td className="px-4 py-4 whitespace-nowrap">{producto.cantidad}</td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <button
                                  onClick={() => handleEditarProducto(producto.id_producto)}
                                  className="bg-blue-500 text-white px-2 py-2 rounded-full hover:bg-blue-700"
                                >
                                  <RiPencilFill />
                                </button>
                                <button
                                  onClick={() => {
                                    setShowDeleteModal(true);
                                    setSelectedProductoId(producto.id_producto); // Aquí seleccionamos el producto antes de mostrar el modal
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


{/* Modal de confirmación para eliminar producto */}
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
              <p className="text-sm text-gray-500">¿Estás seguro de que quieres eliminar este producto?</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            onClick={() => handleEliminarProducto(selectedProductoId)}
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

{/* Modal para editar producto */}
{editProducto && (
  <div className="fixed inset-0 z-10 overflow-y-auto" style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }} aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 sm:items-center sm:justify-center">
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-gray-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Editar Producto
                </h3>
                <div className="mt-2">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2 sm:col-span-1">
                      <label htmlFor="cantidad" className="block text-sm font-medium text-gray-700">
                        Cantidad
                      </label>
                      <input
                        type="text"
                        name="cantidad"
                        id="cantidad"
                        value={editCantidad}
                        onChange={(e) => setEditCantidad(e.target.value)}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2 sm:col-span-1">
                      <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                        Nombre
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        id="nombre"
                        value={editNombre}
                        onChange={(i) => setEditNombre(i.target.value)}
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


      {/* Modal para registrar producto */}
      {showRegisterModal && (
        <RegisterProducto
          isOpen={showRegisterModal} // Pasar el estado isOpen al modal de registro
          closeModal={() => setShowRegisterModal(false)} // Pasar la función para cerrar el modal al modal de registro
        />
      )}
    </div>
  );
};

