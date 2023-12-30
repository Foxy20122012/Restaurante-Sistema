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
import DynamicForm from "../../components/DynamicForm";
import { useClientes } from "../../context/ClientesContext";
import { clientesColumns } from "../../models/clientesMls";
import { transformClientesToRows } from "../../models/clientesMls";
import clienteModel from "../../models/clientes/clienteModel";
import clientesProps from "../../models/clientesPs";
// import tabContent from "../../models/clientesPs"


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
  const [model, setModel] = useState(clienteModel()) 

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

    
    
    // Actualiza los estados con los datos obtenidos
    setHeaders(fetchedHeaders);
    // setItems(fetchedItems);
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
         {isFormVisible && isFormVisible === true && 
      <VDialog
      isOpen={isFormVisible}
      size='sm'
      className='-translate-x-1/2 bg-black bg-opacity-25'
      >
           <DynamicForm
            formProps={clientesProps}
            onSubmit={handleCreateOrUpdateCliente}
            showCreateButton={!selectedCliente}
            showUpdateButton={!!selectedCliente}
            initialFormData={selectedCliente}
            // @ts-ignore
            onUpdateClick={handleUpdateClick} // Pasa la función handleUpdateClick al DynamicForm
            columns={2}
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
