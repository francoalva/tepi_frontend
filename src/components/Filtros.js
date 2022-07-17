import React, {useState, useEffect} from "react";
import Form from 'react-bootstrap/Form';
import * as API from '../services/Connection';
import {Grilla} from './Grilla';

export const Filtro = () =>{
        
    const [bodegas, setBodegas] = useState([]);
    const [bodega_actual, setBodega] = useState(0);

    const [marcas, setMarcas] = useState([]);
    const [marca_actual, setMarca] = useState(0);

    const [modelos, setModelos] = useState([]);
    const [modelo_actual, setModelo] = useState(0);

    useEffect (()=>{
        API.getAll(0).then(setBodegas);
        API.getAll(1).then(setMarcas);
        API.getAll(2).then(setModelos);
    },[]);

    const cambiarBodega = (e) =>{
        setBodega(e.target.value);

    }
    const cambiarMarca = (e) =>{
        if (e.target.value > 0) {
            API.getModelosByMarca(e.target.value).then(setModelos);
        }else{
            API.getAll(2).then(setModelos);
        }
        setMarca(e.target.value);
        setModelo(0);
        document.getElementById('modelos').selectedIndex = 0;
    }
    const cambiarModelo = (e) =>{
        setModelo(e.target.value);
    }

    return (
        <div>  
            <Form.Select aria-label="bodegas_select"  onChange={(e) => cambiarBodega(e)}>
                <option value={0} >Seleccione una Bodega</option>
                {bodegas.map( (x,y) => 
                    <option key= {y} value={x.id}>{x.nombre}</option>)}
            </Form.Select>

            <Form.Select aria-label="marcas_select"  onChange={(e) => cambiarMarca(e)}>
                <option value={0} >Seleccione una Marca</option>
                {marcas.map( (x,y) => 
                    <option key= {y} value={x.id}>{x.MAR_nombre}</option>)}
            </Form.Select>

            <Form.Select id='modelos' aria-label="modelos_select"  onChange={(e) => cambiarModelo(e)}>
                <option value={0} >Seleccione un Modelo</option>
                {modelos.map( (x,y) => 
                    <option key= {y} value={x.id}>{x.MOD_nombre}</option>)}
            </Form.Select>

            <Grilla id='grilla' bodega={bodega_actual} marca= {marca_actual} modelo = {modelo_actual}> </Grilla>
        </div>
    )
}

/* 
<select id='bodegas' onChange={(e) => cambiarBodega(e)}>{bodegas.map( (x,y) => 
                <option key={y}>{x.nombre}</option>)}
            </select>
*/