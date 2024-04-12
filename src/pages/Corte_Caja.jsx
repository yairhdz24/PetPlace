import React from "react";

export const Corte_Caja = () => {
    return (
      <div className="flex flex-col gap-4 p-4 lg:gap-8 lg:p-6 bg-gradient-to-b from-[#FFD580] to-[#FFEDDA]">
        <div className="grid gap-2">
          <h1 className="font-semibold text-2xl">Corte de caja</h1>
          <p className="text-gray-500 dark:text-gray-400">Tienda de mascotas "Amigos peludos"</p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <div className="flex items-center gap-2">
              <div>Vendedor:</div>
              <div className="font-semibold">Juan Pérez</div>
            </div>
            <div className="flex items-center gap-2">
              <div>Fecha:</div>
              <div className="font-semibold">Junio 23, 2023</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-md shadow-md p-4">
          <div className="text-xl font-semibold">Resumen de ventas</div>
          <div className="flex items-center gap-4">
            <div className="grid gap-1">
              <div>Ventas</div>
              <div className="text-3xl font-bold">$1,200.00</div>
            </div>
            <div className="border-l border-gray-300 h-8"></div>
            <div className="grid gap-1">
              <div>Devoluciones</div>
              <div className="text-3xl font-bold">$0.00</div>
            </div>
            <div className="border-l border-gray-300 h-8"></div>
            <div className="grid gap-1">
              <div>Descuentos</div>
              <div className="text-3xl font-bold">$0.00</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-md shadow-md p-4">
          <div className="text-xl font-semibold">Gastos</div>
          <div className="flex items-center gap-4">
            <div className="grid gap-1">
              <div>Compras</div>
              <div className="text-3xl font-bold">$500.00</div>
            </div>
            <div className="border-l border-gray-300 h-8"></div>
            <div className="grid gap-1">
              <div>Salarios</div>
              <div className="text-3xl font-bold">$200.00</div>
            </div>
            <div className="border-l border-gray-300 h-8"></div>
            <div className="grid gap-1">
              <div>Alquiler</div>
              <div className="text-3xl font-bold">$300.00</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-md shadow-md p-4">
          <div className="text-xl font-semibold">Total de efectivo en caja</div>
          <div className="text-center text-5xl font-bold">$400.00</div>
        </div>
        <button className="self-end bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-md">
          Generar reporte
        </button>
      </div>
    );
  };
  