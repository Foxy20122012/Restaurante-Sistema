'use client'

// Importa las bibliotecas y componentes necesarios
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import presets from "../../utils/globalPresets"
import environment from "../../utils/environment"
import fetchedHeaders from "../../models/encabezadoModel"
import useLoading from "../../hooks/useLoading"
import useHasMounted from '../../hooks/useHasMounted'
import useI18n from '../../hooks/useI18n'
import BtnAppBar from "../../components/appBar"
import Loading from "../../components/loading"
// import DataTable from "vComponents/dist/DataTable"
// import BtnAppBar from '../../components/appBar';


// Importa el componente DataTable de forma dinámica
const DataTable = dynamic(() => import("vComponents/dist/DataTable"), { ssr: false });
const Stepper = dynamic(() => import("vComponents/dist/Stepper"), { ssr: false });
const YesNoQuestion = dynamic(() => { return import("vComponents/dist/YesNoQuestion") }, { ssr: false })

const DataForm = dynamic(() => { return import("vComponents/dist/DataForm") }, { ssr: false })
const VDialog = dynamic(() => { return import("vComponents/dist/VDialog") }, { ssr: false })
// const VistaConsulta = dynamic(() => { return import("vComponents/dist/VistaConsulta") }, { ssr: false })

// Define el componente principal
const HomePage = () => {
  // Define los estados para las cabeceras y los elementos
  const [headers, setHeaders] = useState([]); // Define tus cabeceras aquí
  const [items, setItems] = useState([]); // Define tus elementos aquí
  const i18n = useI18n()
  const loading = useLoading()
  const hasMounted = useHasMounted()

  // Lógica para obtener y configurar las cabeceras y elementos, por ejemplo, useEffect o llamadas a API...
  useEffect(() => {

    // Actualiza los estados con los datos obtenidos
    setHeaders(fetchedHeaders);
    setItems(fetchedItems);
  }, []); // Dependencias vacías para que se ejecute una vez al montar el componente

  
  if (!hasMounted) {
    return <Loading/>; //<Loadig />
  }

  return (
    <>
    <BtnAppBar/>
    <div className="mt-20 ml-12">
      
      {/* Pasa las cabeceras y elementos al componente DataTable */}
      <DataTable headers={headers} items={items}  presets={presets} i18n={i18n}
      onNewItem={handleNewClick}
      onEditItem={handleEditCliente} 
      onDeleteItem={handleDelete}
      className= "flex justify-center text-center "
       
      />
      <Stepper steps={["Paso 1", "Paso 2", "Paso 3", "paso 4"]} />
      {/* <VistaConsulta data={items} headers={headers} /> */}
      
    

      {/* Resto del código */}
      </div>
    </>
   
  );
};

// Exporta el componente principal
export default HomePage;
