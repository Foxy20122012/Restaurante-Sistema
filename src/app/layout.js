// Importa tus estilos y otros módulos necesarios
'use client'
import '../styles/globals.css';
import dynamic from "next/dynamic";
import presets from "../utils/globalPresets";
import React, { useState } from 'react';
import Sidebar from "../components/Sidebar";
const Footer = dynamic(() => import('vComponents/dist/Footer'), { ssr: false });
const Navbar = dynamic(() => import('vComponents/dist/Navbar'), { ssr: false });

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const userObj = {
    compania: 'Mi Empresa',
    nombre_usuario: 'John Doe',
    email: 'john.doe@example.com',
  };

  const menuData = [
    {
      id_menu: 1,
      title: 'Dashboard',
      path: '/dashboard',
      icon: 'FcHome',
    },
    {
      id_menu: 2,
      title: 'Products',
      path: '/products',
      icon: 'MdShoppingCart',
      children: [
        {
          id_menu: 21,
          title: 'All Products',
          path: '/products/all',
        },
        {
          id_menu: 22,
          title: 'Add Product',
          path: '/products/add',
        },
      ],
    },
    // ... otras opciones de menú ...
  ];

  const setTitle = (title) => {
    // Lógica para establecer el título (si es necesario)
  };

  const onClickLogout = () => {
    // Lógica para cerrar sesión
  };

  return (
    <html lang="en">
      <body>
        <div>
          <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            {userObj && userObj.nombre_usuario && (
              <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                menu={menuData}
                // Otras props necesarias
              />
            )}

            {/* Content area */}
            <div className={`${sidebarOpen ? 'relative' : 'absolute'} flex flex-col flex-1 overflow-y-auto overflow-x-hidden w-full`}>
              {/* Site header */}
              {userObj && userObj.nombre_usuario && (
                <Navbar
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  userObj={userObj}
                  presets={presets}
                  setTitle={setTitle}
                  onClickLogout={onClickLogout}
                  // ... Otras props necesarias
                />
              )}

              <main>
                <div className={userObj && userObj.nombre_usuario ? 'px-4 sm:px-6 lg:px-8 py-2 w-full max-w-9xl mx-auto bg-gray-100 mb-10' : ''}>
                  {children}
                </div>
              </main>
            </div>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
