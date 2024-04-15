import React, { useState, useEffect } from "react";
import { RiCloseLine, RiDeleteBin6Fill } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterCliente from './RegisterCliente';
import supabase from "../../Backend/supabaseConfig";

const Car = (props) => {
  const { showOrder, setShowOrder, cart, removeFromCart, total: externalTotal } = props;
  const [clientes, setClientes] = useState([]);
  const [selectedClienteId, setSelectedClienteId] = useState("");
  const [pedidoCreado, setPedidoCreado] = useState(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [numeroOrden, setNumeroOrden] = useState(2);
  const [internalTotal, setInternalTotal] = useState(0);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const {data, error} = await supabase.from('clientes').select('*');
        if (error) {
          throw error;
        }
        setClientes(data);
      } catch (error) {
        console.error("Error al obtener la lista de clientes", error);
      }
    };

    fetchClientes();
  }, []);

  useEffect(() => {
    setInternalTotal(externalTotal);
  }, [externalTotal]);

  const handleRealizarPedido = async () => {
    if (!selectedClienteId) {
      toast.error("Seleccione un cliente antes de realizar un pedido.");
      return;
    }
  
    if (cart.length === 0) {
      toast.error("Añada al menos un producto al carrito antes de realizar un pedido.");
      return;
    }
  
    try {
      // Calcular el total de la venta
      const totalVenta = Number(internalTotal.toFixed(2));
  
      const { data: nuevaVenta, error } = await supabase.from('ventas').insert([
        {
          id_cliente: selectedClienteId,
          fechahora: new Date().toISOString(), // nmms una hora para que el error estuviera en esta mmmda
          totalventa: totalVenta,
        }
      ]);
  
      if (error) {
        toast.error("Error al crear la venta. Inténtelo de nuevo.");
        console.error("Error al realizar la venta", error);
        return;
      }
  
      // Actualizar el número de orden
      setNumeroOrden((prevNumeroOrden) => prevNumeroOrden + 1);
      toast.success("Pedido creado exitosamente. ¡Gracias por su compra!");
      // console.log("Pedido realizado exitosamente");
    } catch (error) {
      toast.error("Error al realizar el pedido. Verifique su conexión.");
      // console.error("Error al realizar el pedido", error);
    }
  };

  return (
    <>
      <div
        className={`lg:col-span-2 bg-orange-100 fixed top-0 w-full h-full lg:right-0 lg:w-96 transition-all z-50 ${showOrder ? "right-0" : "-right-full"
          }`}
      >
        <div className="relative h-full pt-16 p-8 lg:pt-8 text-orange-500">
          <RiCloseLine
            onClick={() => setShowOrder(false)}
            className="lg:hidden absolute left-4 top-4 p-3 box-content text-orange-400 bg-yellow-400 rounded-full text-2xl"
          />
          <h1 className="text-2xl font-Poppins font-bold mt-4 text-orange-400">Orden #{numeroOrden}</h1>
          <form className="flex items-center gap-2 flex-wrap mt-4 mb-8">
            <h1 className="text-xl font-Poppins font-semibold text-orange-400">Cliente:</h1>
            <select
              className="bg-yellow-200 w-full py-2 px-4 rounded-xl outline-none font-Poppins border-2 border-orange-300"
              value={selectedClienteId || ""}
              onChange={(e) => setSelectedClienteId(e.target.value)}
            >
              <option value="" disabled>
                Seleccione un cliente
              </option>
              {clientes.map((cliente) => (
                <option key={cliente.id_cliente} value={cliente.id_cliente}>
                  {cliente.nombre}
                </option>
              ))}
            </select>

            <button
              className="bg-orange-700 text-white text-base px-4 py-2 rounded-lg font-Poppins"
              onClick={(e) => {
                e.preventDefault();
                setShowRegisterModal(true);
              }}
            >
              Registrar Cliente
            </button>

            {showRegisterModal && (
              <RegisterCliente
                isOpen={showRegisterModal}
                closeModal={() => setShowRegisterModal(false)}
                onRegisterCliente={() => {
                  fetchClientes();
                  setShowRegisterModal(false);
                }}
              />
            )}

          </form>
          <div>
          <div>
            <div className="grid grid-cols-5 mb-4 p-4 font-Poppins">
              <h5 className="col-span-3 text-lg text-orange-400">Producto</h5>
              <h5 className=" text-lg text-orange-400">Cant</h5>
              <h5 className=" text-lg text-orange-400">Precio</h5>
              
            </div>
          </div>

            <div className="h-[400px] md:h-[800px] lg:h-[540px] overflow-y-scroll ">
              {cart.map((product) => (
                <div key={product.id} className="bg-yellow-100 p-4 rounded-xl mb-4 text-orange-400">
                  <div className="grid grid-cols-6 mb-4">
                    <div className="col-span-4 flex items-center gap-2">
                      <img src={product.img} className="w-10 h-10 object-cover rounded-full" alt={product.description} />
                      <div>
                        <h5 className="text-sm font-bold font-Poppins">{product.description}</h5>
                        <p className="text-xs text-opacity-10 font-Poppins">${product.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="text-center ">
                      <span>{product.quantity}</span>
                    </div>
                    <div className="font-Poppins font-bold">
                      <span>${(product.price * product.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-6 items-center gap-2">
                    <div className="col-span-5"></div>
                    <div>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="border border-orange-400 p-2 rounded-lg hover:bg-orange-400 hover:text-white transition-all"
                      >
                        <RiDeleteBin6Fill className="text-orange-400 hover:text-white text-lg"/>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={`bg-yellow-200 absolute w-full bottom-0 border-t-4 border-orange-400 left-0 p-4 ${pedidoCreado ? 'mt-2' : ''}`}>
            <div className="flex items-center justify-between">
              <span className="text-orange-400 font-semibold text-lg font-Poppins">Total</span>
              <span className="text-orange-400 font-bold text-xl font-Poppins">${internalTotal.toFixed(2)}</span>
            </div>
            <button className="bg-orange-700 text-white text-lg w-full py-3 pl-8 pr-4 mt-4 rounded-xl font-Poppins" onClick={handleRealizarPedido}>
              Realizar pedido
            </button>
            {pedidoCreado && (
              <div className={pedidoCreado.startsWith("Error") ? "text-red-500" : "text-green-500"} mt-2>
                {pedidoCreado}
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Car;
