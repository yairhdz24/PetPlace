import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RiRestaurantFill, RiFileList3Fill, RiContactsBook2Fill, RiHistoryFill } from "react-icons/ri";
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
                    <li className={`bg-gray-100 p-4 mb-2 rounded-tl-xl rounded-bl-xl group transition-colors ${activeTab === '/' ? 'bg-purple-400' : ''}`}>
                        <Link to='/' className={`group-hover:bg-purple-400 p-4 flex justify-center rounded-xl group-hover:text-white transition-colors ${activeTab === '/' ? 'text-white' : 'text-purple-400'}`} onClick={() => handleSetActiveTab('/')}>
                            <RiRestaurantFill className='text-2xl' />
                        </Link>
                    </li>
                    <li className={`bg-gray-100 p-4 mb-2 rounded-tl-xl rounded-bl-xl group transition-colors ${activeTab === '/pedidos' ? 'bg-purple-400' : ''}`}>
                        <Link to='/pedidos' className={`group-hover:bg-purple-400 p-4 flex justify-center rounded-xl group-hover:text-white transition-colors ${activeTab === '/pedidos' ? 'text-white' : 'text-purple-400'}`} onClick={() => handleSetActiveTab('/pedidos')}>
                            <RiFileList3Fill className='text-2xl' />
                        </Link>
                    </li>
                    <li className={`bg-gray-100 p-4 mb-2 rounded-tl-xl rounded-bl-xl group transition-colors ${activeTab === '/clientes' ? 'bg-purple-400' : ''}`}>
                        <Link to='/clientes' className={`group-hover:bg-purple-400 p-4 flex justify-center rounded-xl group-hover:text-white transition-colors ${activeTab === '/clientes' ? 'text-white' : 'text-purple-400'}`} onClick={() => handleSetActiveTab('/clientes')}>
                            <RiContactsBook2Fill className='text-2xl' />
                        </Link>
                    </li>
                    <li className={`bg-gray-100 p-4 mb-2 rounded-tl-xl rounded-bl-xl group transition-colors ${activeTab === '/historialpedidos' ? 'bg-purple-400' : ''}`}>
                        <Link to='/historialpedidos' className={`group-hover:bg-purple-400 p-4 flex justify-center rounded-xl group-hover:text-white transition-colors ${activeTab === '/historialpedidos' ? 'text-white' : 'text-purple-400'}`} onClick={() => handleSetActiveTab('/historialpedidos')}>
                            <RiHistoryFill className='text-2xl' />
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
