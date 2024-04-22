import React, { useState, useEffect } from "react";
import Sidebar from '../components/Sidebar';
import Car from "../components/Car";
import Card from "../components/Card";
import Header from "../components/Header";
import { Fotter } from "../components/Fotter";
import { Skeleton } from "../components/Skeleton";
import supabase from "../../Backend/supabaseConfig";
import { RiCloseLine, RiFileList3Fill, RiMenu3Fill } from 'react-icons/ri';

// Imágenes

import Perro_Comida from '../images/Perro_Comida.png';
import Gato_Comida from '../images/Gato_Comida.jpg';
import Juguete_Perro from '../images/Juguete_Perro.jpg';
import Juguete_Gato from '../images/Juguete_Gato.jpg';
import Collar_Perro from '../images/CollarPerro.jpeg';
import Collar_Gato from '../images/CollarGato.jpeg';
import Correa_Perro from '../images/CorreaPerro.jpeg';
import Rascador_Gato from '../images/RascadorGato.jpeg';//Hola2
import Cama_Perro from '../images/CamaPerro.jpeg'; //Hola
import Cama_Gato from '../images/CamaGato.jpg';
import DefaultImage from '../images/CamaGato.jpg';


export const HomePage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [cart, setCart] = useState([]);
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Define el objeto de mapeo para las imágenes utilizando la ID del producto
  const imageMapping = {
    0: DefaultImage,
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
    11: Cama_Gato,
    12: Cama_Gato,
  };

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const { data, error } = await supabase.from('productos').select('*');
        if (error) {
          throw error;
        }
        setProductos(data);
        setFilteredProductos(data); // Inicialmente, muestra todos los productos
      } catch (error) {
        console.error("Error al obtener la lista de productos", error);
      }
    };

    fetchProductos();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = productos.filter(producto =>
      producto.nombre.toLowerCase().includes(term)
    );
    setFilteredProductos(filtered);
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

  const calculateTotal = () => {
    const validCart = cart.filter(product => !isNaN(product.price) && !isNaN(product.quantity));
    const total = validCart.reduce((acc, product) => acc + product.price * product.quantity, 0);
    return isNaN(total) ? 0 : total;
  };

  const getImageForProduct = (productId) => {
    // Verifica si hay una imagen asociada a la ID del producto
    const productImage = imageMapping[productId];

    // Si hay una imagen, devuelve la ruta, de lo contrario, devuelve la imagen predeterminada
    return productImage ? productImage : DefaultImage;
  };

  const menu = () => {
    setShowMenu(!showMenu);
  };

  return (

    <div className='w-full min-h-screen bg-gradient-to-b from-[#FFEDDA] to-[#FFD580]'>
      <Sidebar showMenu={showMenu} />
      <nav className="bg-alitas_beige lg:hidden fixed w-full bottom-0 z-50 left-0 text-3xl text-alitas_obs_red p-4 flex items-center justify-between rounded-tl-xl rounded-tr-xl">
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

      <Car
        showOrder={showOrder}
        setShowOrder={setShowOrder}
        cart={cart}
        removeFromCart={removeFromCart}
        total={calculateTotal()}
      />


      {/* Main */}
      <main className="lg:pl-32 lg:pr-96 pb-20">
        <Header searchTerm={searchTerm} handleSearch={handleSearch} />
        <div className="md:p-8 p-4">
          <div className="flex item-center justify-between mb-4">
            <h2 className="text-4xl font-Lilita_One uppercase text-yellow-400">Productos</h2>
          </div>

          {/* Contenido del backend PRODUCTOS */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {/* Mapear sobre la lista de productos filtrados */}
            {filteredProductos.length > 0 ? (
              filteredProductos.map((producto, index) => (
                <div key={index} className="w-full">
                  <Card
                    img={getImageForProduct(producto.id_producto)}
                    description={producto.nombre}
                    price={producto.precio}
                    id={producto.id_producto}
                    addToCart={addToCart}
                  />
                </div>
              ))
            ) : (
              <Skeleton />
            )}
          </div>
        </div>
      </main>
      {/* Pie de página */}
      <Fotter />
    </div>
  );
}

