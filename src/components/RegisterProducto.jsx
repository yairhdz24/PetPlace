import React, { useState } from 'react';
import { toast } from 'react-toastify';
import supabase from '../../Backend/supabaseConfig';


export const RegisterProducto = ({ isOpen, closeModal }) => {
  const [nombreProducto, setNombreProducto] = useState('');
  const [descripcionProducto, setDescripcionProducto] = useState('');
  const [precioProducto, setPrecioProducto] = useState('');
  const [cantidadProducto, setCantidadProducto] = useState('');
  const [error, setError] = useState('');

  const handleNombreChange = (e) => {
    setNombreProducto(e.target.value);
  };

  const handleDescripcionChange = (e) => {
    setDescripcionProducto(e.target.value);
  };

  const handlePrecioChange = (e) => {
    setPrecioProducto(e.target.value);
  };

  const handleCantidadChange = (e) => {
    setCantidadProducto(e.target.value);
  };

  const handleRegistrarProducto = async () => {
    // Validar que todos los campos estén llenos
    if (!nombreProducto || !descripcionProducto || !precioProducto || !cantidadProducto) {
      setError('Rellenar todos los campos');
      return;
    }

    try {
      const { data, error } = await supabase.from('productos').insert([
        {
          nombre: nombreProducto,
          descripcion: descripcionProducto,
          precio: precioProducto,
          cantidad: cantidadProducto
        }
      ]);
      if (error) {
        toast.error('Error al registrar el producto');
      }
      else {
        closeModal();
        toast.success('Producto registrado exitosamente.');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      toast.error('Error de red al registrar nuevo producto', error);
    }
  };

  const handleClickRegistrar = () => {
    setError('');
    handleRegistrarProducto();
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-end min-h-screen px-4 pt-4 pb-520 text-center sm:block sm:p-0 " style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
              &#8203;
            </span>

            <div className="relative inline-block w-full max-w-sm p-6 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:p-6 sm:align-middle border-gray-300 border-2 sm:right-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900 capitalize" id="modal-title">
                Registrar Producto
              </h3>

              <form className="mt-4" action="#">
                <label htmlFor="nombreProducto" className="text-sm text-gray-900">
                  Nombre:
                </label>
                <input
                  type="text"
                  name="nombreProducto"
                  id="nombreProducto"
                  placeholder="Nombre del producto"
                  value={nombreProducto}
                  onChange={handleNombreChange}
                  className={`block w-full px-4 py-3 text-sm text-gray-700 bg-white border ${nombreProducto === '' ? 'border-gray-200' : 'border-red-500'} rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40`}
                />

                <label htmlFor="descripcionProducto" className="mt-3 text-sm text-gray-900">
                  Descripción:
                </label>
                <textarea
                  name="descripcionProducto"
                  id="descripcionProducto"
                  placeholder="Descripción del producto"
                  value={descripcionProducto}
                  onChange={handleDescripcionChange}
                  className={`block w-full px-4 py-3 text-sm text-gray-700 bg-white border ${descripcionProducto === '' ? 'border-gray-200' : 'border-red-500'} rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40`}
                />

                <label htmlFor="precioProducto" className="mt-3 text-sm text-gray-900">
                  Precio:
                </label>
                <input
                  type="number"
                  name="precioProducto"
                  id="precioProducto"
                  placeholder="Precio del producto"
                  value={precioProducto}
                  onChange={handlePrecioChange}
                  className={`block w-full px-4 py-3 text-sm text-gray-700 bg-white border ${precioProducto === '' ? 'border-gray-200' : 'border-red-500'} rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40`}
                />

                <label htmlFor="cantidadProducto" className="mt-3 text-sm text-gray-900">
                  Cantidad:
                </label>
                <input
                  type="number"
                  name="cantidadProducto"
                  id="cantidadProducto"
                  placeholder="Cantidad del producto"
                  value={cantidadProducto}
                  onChange={handleCantidadChange}
                  className={`block w-full px-4 py-3 text-sm text-gray-700 bg-white border ${cantidadProducto === '' ? 'border-gray-200' : 'border-red-500'} rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40`}
                />

                {error && (
                  <div className="text-red-500 mt-2">
                    <span className="mr-1">⚠️</span>
                    {error}
                  </div>
                )}

                <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleClickRegistrar}
                    className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  >
                    Registrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
