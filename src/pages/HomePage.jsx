import { useState, useEffect } from "react";
import Sidebar from '../components/Sidebar';
import Car from "../components/Car";
import Card from "../components/Card";
import Header from "../components/Header";
import { Fotter } from "../components/Fotter";
import { Skeleton } from "../components/Skeleton";
import supabase from "../../Backend/supabaseConfig";

// Imágenes

import DefaultImage from '../images/default.jpg';
import Perro_Comida from '../images/Perro_Comida.png';
import Gato_Comida from '../images/Gato_Comida.jpg';
import Juguete_Perro from '../images/Juguete_Perro.jpg';
import Juguete_Gato from '../images/Juguete_Gato.jpg';
import Collar_Perro from '../images/CollarPerro.jpeg';
import Collar_Gato from '../images/CollarGato.jpeg';
import Correa_Perro from '../images/CorreaPerro.jpeg';
import Rascador_Gato from '../images/RascadorGato.jpeg';
import Cama_Perro from '../images/CamaPerro.jpeg';
import Cama_Gato from '../images/CamaGato.jpg';




const HomePage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [cart, setCart] = useState([]);
  const [productos, setProductos] = useState([]);

  // Define el objeto de mapeo para las imágenes utilizando la ID del producto
  const imageMapping = {

    29: DefaultImage, // No hay imagen específica, usa la predeterminada
    1: Perro_Comida,
    2: Gato_Comida,
    3: Juguete_Perro,
    4: Juguete_Gato,
    5: Collar_Perro,
    6: Collar_Gato,
    7: Correa_Perro,
    8: Rascador_Gato,
    9: Cama_Perro,
    10: Cama_Gato,

  };

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const { data, error } = await supabase.from('productos').select('*');
        if (error) {
          throw error;
        }
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener la lista de productos", error);
      }
    };

    fetchProductos();
  }, []);

  const menu = () => {
    setShowMenu(!showMenu);
    setShowOrder(false);
  };

  const orders = () => {
    setShowOrder(!showOrder);
    setShowMenu(false);
  };

  const calculateTotal = () => {
    const validCart = cart.filter(product => !isNaN(product.price) && !isNaN(product.quantity));
    const total = validCart.reduce((acc, product) => acc + product.price * product.quantity, 0);
    return isNaN(total) ? 0 : total;
  };

  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex((p) => p.id === product.id);

    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // Asegúrate de convertir price y quantity a números
      const newProduct = { ...product, quantity: 1, price: Number(product.price) };
      setCart([...cart, newProduct]);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
  };

  const getImageForProduct = (productId) => {
    // Verifica si hay una imagen asociada a la ID del producto
    const productImage = imageMapping[productId];

    // Si hay una imagen, devuelve la ruta, de lo contrario, devuelve la imagen predeterminada
    return productImage ? productImage : DefaultImage;
  };

  return (
    <div className=' w-full min-h-screen bg-gradient-to-b from-[#FFEDDA] to-[#FFD580]' >
      <Sidebar showMenu={showMenu} />
      <Car
        showOrder={showOrder}
        setShowOrder={setShowOrder}
        cart={cart}
        removeFromCart={removeFromCart}
        total={calculateTotal()}
      />


      {/* Main */}
      <main className="lg:pl-32 lg:pr-96 pb-20">
        <Header />
        <div className="md:p-8 p-4">
          <div className="flex item-center justify-between mb-4">
            <h2 className="text-4xl font-Lilita_One uppercase text-blue-400">Productos</h2>
            

          </div>

          {/* Contenido del backend PRODUCTOS */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {/* Mapear sobre la lista de productos desde la base de datos */}
            {(productos.length > 0 ? productos : Array.from({ length: 9 })).map((producto, index) => (
              <div key={index} className="w-full">
                {producto ? (
                  <Card
                    img={getImageForProduct(producto.id_producto)}
                    description={producto.nombre}
                    price={producto.precio}
                    id={producto.id_producto}
                    addToCart={addToCart}
                  />
                ) : (
                  <Skeleton />
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      {/* Pie de página */}
      <Fotter />
    </div>
  );
}

export default HomePage;
