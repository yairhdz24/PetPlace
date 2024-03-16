import React from "react";
import { RiSearchLine } from "react-icons/ri";

const Header = () => {
  return (
    <header>
    {/* "Alitas le bro" and search */}
    <div className="flex flex-col md:flex-row md:justify-between md:items_center gap-4 mb-6">
      <div>
        <h1 className="lg:text-3xl text-2xl text-purple-400 font-Lilita_One uppercase"> Pet Place</h1>
        <p className="lg:text-xl text-sm text-blue-400 uppercase">Las mejor tienda de mascotas</p>
      </div>
      <form>
        <div className="w-full relative">
          <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400"/>
          <input
          type="text"
          className="bg-purple-100 w-full py-2 pl-8 pr-4 rounded-lg text-black outline-none"
          placeholder="Buscar producto"
          />
        </div>
      </form>
    </div>
    {/* Tabs */}
    <nav className="text-purple-400 flex items-center justify-between md:justify-start md:gap-12 mb-6">
      <a href="#" 
        className="relative text-xl py-2 before:w-1/2 before:h-[2px] before:absolute before:bg-purple-400 before:left-0
        before:rounded-full before:-bottom-[1px] text-purple-400"
      >
      Productos
      </a>
      {/* <a href="#" className="py-2">
      Moscotas
      </a> */}
      {/* lo deje comentado, por si decidimos agregar mas cosas */}
      
    </nav>
  </header>
  );
};

export default Header;
