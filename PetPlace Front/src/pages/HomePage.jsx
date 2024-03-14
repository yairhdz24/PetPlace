import { useState, useEffect } from "react";
import axios from "axios";
import { RiMenu3Fill, RiAddFill, RiFileList3Fill, RiCloseLine } from "react-icons/ri";
import Sidebar from '../components/shared/Sidebar';
import Car from "../components/shared/Car";
import Card from "../components/shared/Card";
import Header from "../components/shared/Header";
import { Fotter } from "../components/Fotter";

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
        const response = await axios.get("http://localhost:3001/productos");
        setProductos(response.data);
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
    <div className='bg-alitas_obs_beige w-full min-h-screen'>
      <Sidebar showMenu={showMenu} />
      <Car
        showOrder={showOrder}
        setShowOrder={setShowOrder}
        cart={cart}
        removeFromCart={removeFromCart}
        total={calculateTotal()}
      />
      {/* NAV de móvil */}
      <nav className="bg-alitas_beige lg:hidden fixed w-full bottom-0 left-0 text-3xl text-alitas_obs_red p-4 flex items-center justify-between rounded-tl-xl rounded-tr-xl">
        <button className="p-2">
          <RiCloseLine />
        </button>
        <button className="p-2">
          <RiAddFill />
        </button>
        <button onClick={orders} className="p-2">
          <RiFileList3Fill />
        </button>
        <button onClick={menu} className="p-2">
          {showMenu ? <RiCloseLine /> : <RiMenu3Fill />}
        </button>
      </nav>

      {/* Main */}
      <main className="lg:pl-32 lg:pr-96 pb-20">
        <div className="md:p-8 p-4">

          <Header />

          <div className="flex item-center justify-between mb-16">
            <h2 className="text-3xl font-Lilita_One text-alitas_obs_red">Inserte alimentos a la orden</h2>
          </div>

          {/* Contenido del backend PRODUCTOS */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {/* Mapear sobre la lista de productos desde la base de datos */}
            {productos.length > 0 ? (
              productos.map((producto) => (
                <Card
                  key={producto.id_producto}
                  img={getImageForProduct(producto.id_producto)}
                  description={producto.nombre}
                  price={producto.precio}
                  id={producto.id_producto}
                  addToCart={addToCart}
                />
              ))
            ) : (
              <h2 className="text-3xl font-Lilita_One text-alitas_obs_red">
                Error al cargar productos. Por favor, inténtalo de nuevo más tarde.
              </h2>
            )}
          </div>
        </div>
      </main>
      {/* Pie de página */}
      <Fotter/>
    </div>
  );
}

export default HomePage;
