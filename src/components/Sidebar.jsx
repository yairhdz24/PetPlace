import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RiShoppingBag3Fill, RiFileList3Fill, RiUserFill, RiStore2Fill, RiCurrencyFill } from "react-icons/ri";
import Logo from "../images/Logo.png";

const Sidebar = (props) => {
    const { showMenu } = props;
    const location = useLocation();

    // Estado local para la pestaña activa
    const [activeTab, setActiveTab] = useState('/');

    // Actualiza la pestaña activa cuando cambia la ubicación
    useEffect(() => {
        setActiveTab(location.pathname);
    }, [location.pathname]);

    const handleSetActiveTab = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div
            style={{ backgroundColor: "#F6B781" }}
            className={` fixed lg:left-0 top-0 w-28 h-full flex flex-col justify-between py-4 rounded-tr-xl rounded-br-xl
                                                                        z-50 transition-all ${showMenu ? "left-0" : "-left-full"}`}
        >
            <div>
                <ul className='pl-4'>
                    <li>
                        <img
                            src={Logo}
                            alt="logo"
                            className="h-full w-full "
                        />
                        {/* <h1 className='text-xl font-Lilita_One text-blue-400 uppercase text-center'>{"PEt"} <br /> {"Place"}</h1> */}
                    </li>
                    <li className={`bg-gray-100 p-4 mb-2 rounded-tl-xl rounded-bl-xl group transition-colors ${activeTab === '/' ? 'bg-orange-400' : ''}`}>
                        <Link to='/' className={`group-hover:bg-yellow-400 p-4 flex justify-center rounded-xl group-hover:text-white transition-colors ${activeTab === '/' ? 'text-white' : 'text-orange-300'}`} onClick={() => handleSetActiveTab('/')}>
                            <RiShoppingBag3Fill className='text-2xl' />
                        </Link>
                    </li>
                    <li className={`bg-gray-100 p-4 mb-2 rounded-tl-xl rounded-bl-xl group transition-colors ${activeTab === '/ventas' ? 'bg-orange-400' : ''}`}>
                        <Link to='/ventas' className={`group-hover:bg-yellow-400 p-4 flex justify-center rounded-xl group-hover:text-white transition-colors ${activeTab === '/ventas' ? 'text-white' : 'text-orange-300'}`} onClick={() => handleSetActiveTab('/ventas')}>
                            <RiCurrencyFill className='text-2xl' />
                        </Link>
                    </li>
                    <li className={`bg-gray-100 p-4 mb-2 rounded-tl-xl rounded-bl-xl group transition-colors ${activeTab === '/clientes' ? 'bg-orange-400' : ''}`}>
                        <Link to='/clientes' className={`group-hover:bg-yellow-400 p-4 flex justify-center rounded-xl group-hover:text-white transition-colors ${activeTab === '/clientes' ? 'text-white' : 'text-orange-300'}`} onClick={() => handleSetActiveTab('/clientes')}>
                            <RiUserFill className='text-2xl' />
                        </Link>
                    </li>
                    <li className={`bg-gray-100 p-4 mb-2 rounded-tl-xl rounded-bl-xl group transition-colors ${activeTab === '/Inventario' ? 'bg-orange-400' : ''}`}>
                        <Link to='/Inventario' className={`group-hover:bg-yellow-400 p-4 flex justify-center rounded-xl group-hover:text-white transition-colors ${activeTab === '/Inventario' ? 'text-white' : 'text-orange-300'}`} onClick={() => handleSetActiveTab('/Inventario')}>
                            <RiStore2Fill className='text-2xl' />
                        </Link>
                    </li>
                    <li className={`bg-gray-100 p-4 mb-2 rounded-tl-xl rounded-bl-xl group transition-colors ${activeTab === '/Corte-Caja' ? 'bg-orange-400' : ''}`}>
                        <Link to='/Corte-Caja' className={`group-hover:bg-yellow-400 p-4 flex justify-center rounded-xl group-hover:text-white transition-colors ${activeTab === '/Corte-Caja' ? 'text-white' : 'text-orange-300'}`} onClick={() => handleSetActiveTab('/Corte-Caja')}>
                            <RiFileList3Fill className='text-2xl' />
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
    
};

export default Sidebar;
