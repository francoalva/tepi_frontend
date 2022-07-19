import React, { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import * as API from "../services/Connection";
import { Grilla } from "./Grilla";
import { Grilla2 } from "./Grilla2";

export const Filtro = (props) => {


  const [bodegas, setBodegas] = useState([]);
  const [bodega_actual, setBodega] = useState(0);

  const [marcas, setMarcas] = useState([]);
  const [marca_actual, setMarca] = useState(0);

  const [modelos, setModelos] = useState([]);
  const [modelo_actual, setModelo] = useState(0);

  useEffect(() => {
    API.getAll(0).then(setBodegas);
    API.getAll(1).then(setMarcas);
    API.getAll(2).then(setModelos);

  }, []);

  useEffect(() => {
    setBodega(0);setModelo(0);setMarca(0);
  }, [props.handleChange]);

  const cambiarBodega = (e) => {
    setBodega(e.target.value);
  };
  const cambiarMarca = (e) => {
    if (e.target.value > 0) {
      API.getModelosByMarca(e.target.value).then(setModelos);
    } else {
      API.getAll(2).then(setModelos);
    }
    setMarca(e.target.value);
    setModelo(0);
  };
  const cambiarModelo = (e) => {
    setModelo(e.target.value);
  };

  return (
    <div>

      <br></br> <Divider />
      <Typography gutterBottom align='left' variant="h6" component="div"> Filtros de Dispositivos</Typography>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="input_bodega">Bodega</InputLabel>
          <Select
            labelId="select_bodega_id"
            id="select_bodega"
            value={bodega_actual}
            onChange={cambiarBodega}
            autoWidth
            label="Bodega"
          >
            <MenuItem value={0}>Seleccione una bodega</MenuItem>
            {bodegas.map((x, y) => (
              <MenuItem key={y} value={x.id}>
                {x.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="input_marca">Marca</InputLabel>
          <Select
            labelId="select_marca_id"
            id="select_marca"
            value={marca_actual}
            onChange={cambiarMarca}
            autoWidth
            label="Marca"
          >
            <MenuItem value={0}>Seleccione una marca</MenuItem>
            {marcas.map((x, y) => (
              <MenuItem key={y} value={x.id}>
                {x.MAR_nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="input_modelo">Modelo</InputLabel>
          <Select
            labelId="select_modelo_id"
            id="select_modelo"
            value={modelo_actual}
            onChange={cambiarModelo}
            autoWidth
            label="Modelo"
          >
            <MenuItem value={0}>Seleccione un modelo</MenuItem>
            {modelos.map((x, y) => (
              <MenuItem key={y} value={x.id}>
                {x.MOD_nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <br></br> <Divider />
      <Typography gutterBottom align="left" variant="h6" component="div">
        {" "}
        Dispositivos
      </Typography>
      <Grilla2
        bodega={bodega_actual}
        marca={marca_actual}
        modelo={modelo_actual}
      >
        {" "}
      </Grilla2>
      <br></br> <Divider />
      <Typography gutterBottom align="left" variant="h6" component="div">
        {" "}
        Dispositivos (vista opcional)
      </Typography>
      <Grilla
        id="grillas"
        bodega={bodega_actual}
        marca={marca_actual}
        modelo={modelo_actual}
        onChangeBodega={(e) => {
          cambiarBodega(e);
        }}
      >
        {" "}
      </Grilla>
    </div>
  );
};

/* 
<Form.Select
        aria-label="bodegas_select"
        onChange={(e) => cambiarBodega(e)}
      >
        <option value={0}>Seleccione una Bodega</option>
        {bodegas.map((x, y) => (
          <option key={y} value={x.id}>
            {x.nombre}
          </option>
        ))}
      </Form.Select>

      <Form.Select aria-label="marcas_select" onChange={(e) => cambiarMarca(e)}>
        <option value={0}>Seleccione una Marca</option>
        {marcas.map((x, y) => (
          <option key={y} value={x.id}>
            {x.MAR_nombre}
          </option>
        ))}
      </Form.Select>

      <Form.Select
        id="modelos"
        aria-label="modelos_select"
        onChange={(e) => cambiarModelo(e)}
      >
        <option value={0}>Seleccione un Modelo</option>
        {modelos.map((x, y) => (
          <option key={y} value={x.id}>
            {x.MOD_nombre}
          </option>
        ))}
      </Form.Select>
*/

/* 
<select id='bodegas' onChange={(e) => cambiarBodega(e)}>{bodegas.map( (x,y) => 
                <option key={y}>{x.nombre}</option>)}
            </select>
*/
