import React , {useState,useEffect} from "react";

import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import * as API from '../services/Connection';

export const Grilla = (props) =>{

    const [dispositivos, setDispositivos] = useState([]);
    /*const [bodega, setBodega] = useState(0);
    const [marca, setMarca] = useState(0);
    const [modelo, setModelo] = useState(0);*/

    useEffect (()=>{
        API.getDispositivos(props.bodega,props.marca,props.modelo).then(setDispositivos);
        
    },[]);



    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <div key={'grilla'} >  
            <h3>Hola</h3>    
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {dispositivos.map( (x,y) => 
                        <Item key= {y} value={x.id}>{x.DIS_nombre}</Item>)}
          </Grid>
        </div>
       
        
    
    )
        
}