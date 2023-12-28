'use client'

// Importa las bibliotecas y componentes necesarios
import dynamic from "next/dynamic";
// import { useState, useEffect } from "react";
import React, { useEffect, useState } from "react";
import { Clientes } from "@prisma/client";
import presets from "../../utils/globalPresets"
import environment from "../../utils/environment"
import fetchedHeaders from "../../models/encabezadoModel"
import useLoading from "../../hooks/useLoading"
import useHasMounted from '../../hooks/useHasMounted'
import useI18n from '../../hooks/useI18n'
// import BtnAppBar from "../../components/appBar"
import Loading from "../../components/Loading"
// import DataTable from "vComponents/dist/DataTable"
import BtnAppBar from '../../components/appBar';

import { useClientes } from "../../context/ClientesContext";
import { clientesColumns } from "../../models/clientesModel";
import { transformClientesToRows } from "../../models/clientesModel";
import clientesProps from "../../models/clientesProps";
import tabContent from "../../models/clientesProps"


// Importa el componente DataTable de forma dinámica
const DataTable = dynamic(() => import("vComponents/dist/DataTable"), { ssr: false });
const Stepper = dynamic(() => import("vComponents/dist/Stepper"), { ssr: false });
const YesNoQuestion = dynamic(() => { return import("vComponents/dist/YesNoQuestion") }, { ssr: false })

const DataForm = dynamic(() => { return import("vComponents/dist/DataForm") }, { ssr: false })
const VDialog = dynamic(() => { return import("vComponents/dist/VDialog") }, { ssr: false })
// const VistaConsulta = dynamic(() => { return import("vComponents/dist/VistaConsulta") }, { ssr: false })

// const columns = (Object.keys(clientesColumns) as (keyof Clientes)[]).map(
//   (key) => ({ key, label: clientesColumns[key] })
// );

const columns = Object.keys(clientesColumns).map((key) => ({
  key,
  label: clientesColumns[key]
}));


// Define el componente principal
const HomePage = () => {
  const {
    clientes,
    createCliente,
    loadClientes,
    deleteCliente,
    selectedCliente,
    setSelectedCliente,
    updateCliente,
  } = useClientes();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const rowsClientes = transformClientesToRows(clientes); // Asegúrate de tener definida la función transformClientesToRows y la variable clientes.


  useEffect(() => {
    loadClientes();
  }, []);

  // Define los estados para las cabeceras y los elementos
  const [headers, setHeaders] = useState([]); // Define tus cabeceras aquí
  const [items, setItems] = useState([]); // Define tus elementos aquí
  const i18n = useI18n()
  const loading = useLoading()
  const hasMounted = useHasMounted()


  const openDeleteModal = (client) => {
    setClientToDelete(client);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setClientToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleEditCliente = (client) => {
    setSelectedCliente(client);
    setIsFormVisible(true);
  };

  const handleDelete = (cliente) => {
    openDeleteModal(cliente);
  };

  const handleNewClick = () => {
    setSelectedCliente(null);
    setIsFormVisible(true);
  };

  const handleCreateOrUpdateCliente = async (formData) => {
    try {
      if (selectedCliente) {
        // Estás editando un cliente existente
        await updateCliente(selectedCliente.id, formData);
      } else {
        // Estás creando un nuevo cliente
        await createCliente(formData);
      }
      setIsFormVisible(false);
      setSelectedCliente(null);
      loadClientes();
    } catch (error) {
      console.error("Error al crear o actualizar el cliente:", error);
    }
  };

  const handleUpdateClick = async (formData) => {
    try {
      if (selectedCliente) {
        // Estás editando un cliente existente
        await updateCliente(selectedCliente.id, formData); // Envía los datos actualizados al servidor
      }
      setIsFormVisible(false);
      setSelectedCliente(null);
      loadClientes();
    } catch (error) {
      console.error("Error al actualizar el cliente:", error);
    }
  };
  

  // Lógica para obtener y configurar las cabeceras y elementos, por ejemplo, useEffect o llamadas a API...
  useEffect(() => {
    const fetchedItems = [
      {  nombre: "Hamburguesa Clásica", precio: "$10.99", descripcion: "Jugosa hamburguesa de carne angus con queso cheddar, lechuga y tomate.", categoria: "Carnes", disponibilidad: "Disponible" },
      {  nombre: "Ensalada César", precio: "$8.49", descripcion: "Ensalada fresca con pollo a la parrilla, crutones, queso parmesano y aderezo césar.", categoria: "Ensaladas", disponibilidad: "No disponible" },
      {  nombre: "Tortilla de Harina con Queso", precio: "$6.99", descripcion: "Tortilla de harina rellena de queso fundido y acompañada de salsa fresca.", categoria: "Aperitivos", disponibilidad: "Disponible" },
      {  nombre: "Churrasco Argentino", precio: "$18.99", descripcion: "Jugoso churrasco de carne de res a la parrilla con chimichurri y papas fritas.", categoria: "Carnes", disponibilidad: "Disponible" },
      {  nombre: "Papas con Queso y Tocino", precio: "$7.99", descripcion: "Papas fritas crujientes cubiertas con queso derretido y trozos de tocino crujiente.", categoria: "Aperitivos", disponibilidad: "No disponible" },
      {  nombre: "Crepa de Nutella y Frutas", precio: "$9.49", descripcion: "Crepa rellena de Nutella, fresas, plátano y almendras tostadas.", categoria: "Postres", disponibilidad: "Disponible" },
      {  nombre: "Taco de Carnitas", precio: "$3.99", descripcion: "Taco tradicional mexicano con carnitas, cebolla, cilantro y salsa verde.", categoria: "Aperitivos", disponibilidad: "Disponible" },
      {  nombre: "Pizza Margarita", precio: "$12.99", descripcion: "Pizza clásica con tomate, mozzarella fresca, albahaca y aceite de oliva.", categoria: "Pizzas", disponibilidad: "No disponible" },
      {  nombre: "Quesadillas de Pollo", precio: "$8.99", descripcion: "Quesadillas rellenas de pollo, queso, pimientos y cebollas.", categoria: "Aperitivos", disponibilidad: "Disponible" },
      {  nombre: "Churrasco ", precio: "$18.99", descripcion: "Jugoso churrasco de carne de res a la parrilla con chimichurri y papas fritas.", categoria: "Carnes", disponibilidad: "Disponible" },
      {  nombre: "Quesadillas de de papa", precio: "$90.99", descripcion: "Quesadillas rellenas de pollo, queso, pimientos y cebollas.", categoria: "plato principal", disponibilidad: "No disponible" },
    { nombre: "Nuevo Platillo 1", precio: "$15.99", descripcion: "Descripción del nuevo platillo 1.", categoria: "Categoría 1", disponibilidad: "Disponible" },
    { nombre: "Nuevo Platillo 2", precio: "$12.49", descripcion: "Descripción del nuevo platillo 2.", categoria: "Categoría 2", disponibilidad: "No disponible" },
    { nombre: "Nuevo Platillo 3", precio: "$9.99", descripcion: "Descripción del nuevo platillo 3.", categoria: "Categoría 3", disponibilidad: "Disponible" },
    { nombre: "Nuevo Platillo 20", precio: "$11.99", descripcion: "Descripción del nuevo platillo 20.", categoria: "Categoría 4", disponibilidad: "No disponible" },
  
    ];
    
    
    // Actualiza los estados con los datos obtenidos
    setHeaders(fetchedHeaders);
    setItems(fetchedItems);
  }, []); // Dependencias vacías para que se ejecute una vez al montar el componente

  
  if (!hasMounted) {
    return <Loading/>; //<Loadig />
  }
//
  return (
    <>
    <BtnAppBar/>
    <div className="mt-20 ml-12">
      
      {/* Pasa las cabeceras y elementos al componente DataTable */}
      <DataTable headers={headers} items={rowsClientes}  presets={presets} i18n={i18n}
       onNewItem={handleNewClick}
       onEditItem={handleEditCliente} 
       onDeleteItem={handleDelete}
       
      />
         {isOpen && isOpen === true && 
      <VDialog
      isOpen={isOpen}
      size='sm'
      className='-translate-x-1/2 bg-black bg-opacity-25'
      >
        <DataForm
        headers={headers}
        model={model}
        // i18n={i18n}
        presets={presets}
        // name={formName}
        isEdit={handleEditCliente}
        onSave={(newModel, saveNew) => saveItem(newModel, saveNew) } 
        onCancel={() => setIsOpen(false)} 
        />
      </VDialog>
      }
      <Stepper steps={["Paso 1", "Paso 2", "Paso 3", "paso 4"]} />
      {/* <VistaConsulta data={items} headers={headers} /> */}
      
    

      {/* Resto del código */}
      </div>
    </>
   
  );
};

// Exporta el componente principal
export default HomePage;
