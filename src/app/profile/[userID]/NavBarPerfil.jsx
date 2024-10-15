import React from 'react';
import { User, Settings, InfoIcon } from "lucide-react";

const navItems = [
  { id: "personal", icon: User, label: "Información Personal" },
  { id: "account", icon: InfoIcon, label: "Información de la Cuenta" },
  { id: "config", icon: Settings, label: "Configuración de la Cuenta" },
];

const NavItem = ({ item, isActive, onClick }) => (
  <li>
    <button
      type="button"
      onClick={() => onClick(item.id)}
      className={`
        w-full text-left px-4 py-2 rounded-md flex items-center
        max-md:text-base md:text-sm lg:text-base
        ${isActive
          ? "bg-gradient-to-r from-cyan-400 to-pink-500 text-white"
          : "text-gray-300 hover:bg-white/10"
        }
      `}
    >
      <item.icon className="mr-2 h-5 w-5 overflow-hidden" />
      {item.label}
    </button>
  </li>
);

function NavBarPerfil({ activeTab, setActiveTab }) {
  return (
	// Para cambiar  a este fondo alternativo en etiqueta <nav> bg-white/10 backdrop-blur-md
    <nav className="md:w-1/4 rounded-xl p-6 md:px-2 lg:p-6">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-pink-500 text-transparent bg-clip-text">
        Mi Perfil
      </h2>
      <ul className="space-y-2">
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            isActive={activeTab === item.id}
            onClick={setActiveTab}
          />
        ))}
      </ul>
    </nav>
  );
}

export default NavBarPerfil;