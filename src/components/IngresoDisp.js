import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import * as API from "../services/Connection";
import { Filtro } from "./Filtros";

export const Ingreso = () => {

  const [handleChange, setHandleChange] = useState(0);

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

  const submit = () => {
    if (document.getElementById("nomb_disp").value === "") {
      return;
    }

    if ((bodega_actual === 0, modelo_actual === 0)) {
      return;
    }

    API.SubmitDispositivo(
      bodega_actual,
      modelo_actual,
      document.getElementById("nomb_disp").value
    );

    setBodega(0);
    setMarca(0);
    setModelo(0);
    document.getElementById("nomb_disp").value = "";
    setHandleChange( Math.random());
  };
  return (
    <div>

      <Stack direction="row" spacing={2}>
        <TextField
          required
          fullWidth
          id="nomb_disp"
          label="Nombre Dispositivo"
          defaultValue=""
        />
        <FormControl fullWidth>
          <InputLabel id="Bodegas">Bodega</InputLabel>
          <Select
            labelId="label_bodega"
            id="bodega"
            label="Bodega"
            value={bodega_actual}
            onChange={cambiarBodega}
          >
            <MenuItem value={0}>Seleccione una bodega</MenuItem>
            {bodegas.map((x, y) => (
              <MenuItem key={y} value={x.id}>
                {x.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="Marcas">Marca</InputLabel>
          <Select
            labelId="label_marca"
            id="marca"
            label="Marca"
            value={marca_actual}
            onChange={cambiarMarca}
          >
            <MenuItem value={0}>Seleccione una marca</MenuItem>
            {marcas.map((x, y) => (
              <MenuItem key={y} value={x.id}>
                {x.MAR_nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="Modelos">Modelo</InputLabel>
          <Select
            labelId="label_modelo"
            id="modelo"
            label="Modelo"
            value={modelo_actual}
            onChange={cambiarModelo}
          >
            <MenuItem value={0}>Seleccione un modelo</MenuItem>
            {modelos.map((x, y) => (
              <MenuItem key={y} value={x.id}>
                {x.MOD_nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          onClick={submit}
          type="submit"
          variant="contained"
          endIcon={<SendIcon />}
        ></Button>
      </Stack>

      <Filtro handleChange={handleChange} > </Filtro>
    </div>
  );
};
