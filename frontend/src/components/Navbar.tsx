
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

interface NavbarProps {
    onLogout: () => void;

}

export default function Navbar({ onLogout }: NavbarProps) {
    
    const baseStyle = "px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";
    const activeStyle = "bg-blue-600 text-white";
    const inactiveStyle = "text-gray-700 hover:bg-blue-100 hover:text-blue-700";
    
    
    return (
        <nav className="bg-white shadow-md mb-4">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="text-xl font-bold text-blue-600">
                        Análisador Jurídico IA
                    </Link>

                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <NavLink
                            to="/upload"
                            className={({ isActive}) => `${baseStyle} ${isActive ? activeStyle: inactiveStyle}`}
                        >
                           + Novo Processo
                        </NavLink>

                        <NavLink
                            to="/processes"
                            className={({ isActive}) => `${baseStyle} ${isActive ? activeStyle: inactiveStyle}`}
                        >
                            Meus Processos
                        </NavLink>
                        <button
                            onClick={onLogout}
                            className={`${baseStyle} bg-red-600 text-white hover:bg-red-700 focus:ring-red-500`}
                        >
                            Sair
                        </button> 
                    </div>
                </div>
            </div>
        </nav>
    );

}
