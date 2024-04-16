import React from "react";
import { RiSearchLine } from "react-icons/ri";
import GatoComida from "../images/Header.svg"; // Importa la imagen directamente

const Header = ({ searchTerm, handleSearch }) => {
  return (
    <header className="relative">
      {/* Imagen de fondo */}
      <img src={GatoComida} alt="" className="h-full w-full z-0" />

      {/* Contenedor de la barra de búsqueda */}
      <div className="absolute top-0 right-0 mr-4 mt-4">
        <form className="relative flex items-center">
          <RiSearchLine className="text-orange-400 text-xl -mr-7 z-10" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            className="bg-yellow-100 py-3 pl-8 pr-8 border-2 border-orange-400 rounded-lg text-black text-sm outline-none"
            placeholder="Buscar producto"
          />
        </form>
      </div>
    </header>
  );
};

export default Header;
