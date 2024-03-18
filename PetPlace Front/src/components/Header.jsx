import React from "react";
import { RiSearchLine } from "react-icons/ri";
import GatoComida from "../images/Header.svg"; // Importa la imagen directamente

const Header = () => {
  return (
    <header className="relative">
      {/* Imagen de fondo */}
      <img src={GatoComida} alt="" className="h-full w-full z-0" />

      {/* Contenedor de la barra de búsqueda */}
      <div className="absolute top-0 right-0 mr-4 mt-4">
        <form className="relative flex items-center">
          <RiSearchLine className="text-purple-400 ml-2" />
          <input
            type="text"
            className="bg-purple-100 py-1 pl-8 pr-4 rounded-lg text-black text-sm outline-none"
            placeholder="Buscar producto"
          />
        </form>
      </div>

      {/* Texto "Productos"
      <div className="text-purple-400 font-Lilita_One text-3xl mb-4 mt-2">
        Productos
      </div> */}
    </header>
  );
};

export default Header;
