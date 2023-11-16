'use client'

// Importa las bibliotecas y componentes necesarios
import '../styles/globals.css'
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import presets from "../utils/globalPresets"
import environment from "../utils/environment"
import fetchedHeaders from "../models/encabezadoModel"
// import DataTable from "vComponents/dist/DataTable"


// Importa el componente DataTable de forma dinámica
const DataTable = dynamic(() => import("vComponents/dist/DataTable"), { ssr: false });



const DataForm = dynamic(() => { return import("vComponents/dist/DataForm") }, { ssr: false })
const VDialog = dynamic(() => { return import("vComponents/dist/VDialog") }, { ssr: false })
const YesNoQuestion = dynamic(() => { return import("vComponents/dist/YesNoQuestion") }, { ssr: false })

// Define el componente principal
const HomePage = () => {
  // Define los estados para las cabeceras y los elementos
  const [headers, setHeaders] = useState([]); // Define tus cabeceras aquí
  const [items, setItems] = useState([]); // Define tus elementos aquí

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
      // ...
    ];
    
    
    // Actualiza los estados con los datos obtenidos
    setHeaders(fetchedHeaders);
    setItems(fetchedItems);
  }, []); // Dependencias vacías para que se ejecute una vez al montar el componente

  return (
    <>
      {/* Pasa las cabeceras y elementos al componente DataTable */}
      <DataTable headers={headers} items={items}  presets={presets}
       
      />
      
    

      {/* Resto del código */}

    </>
   
  );
};

// Exporta el componente principal
export default HomePage;
