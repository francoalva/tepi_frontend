import React, { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";

import * as API from "../services/Connection";

export const Grilla = (props) => {
  const [dispositivos, setDispositivos] = useState([]);

  const [open, setOpen] = React.useState(false);

  /*const [bodega, setBodega] = useState(0);
    const [marca, setMarca] = useState(0);
    const [modelo, setModelo] = useState(0);*/

  useEffect(() => {
    API.getDispositivos(props.bodega, props.marca, props.modelo).then(
        response => {
            setDispositivos(response);
            if (response.length===0){
                setOpen(true);
            }else{
                setOpen(false);
            }
        }
    );
  }, [props.bodega, props.marca, props.modelo]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <div key={"grilla"}>
      <br></br>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {dispositivos.map((x, y) => (
          <Grid alignItems="center" item xs={2} sm={4} md={4} key={y}>
            <Item  key={y} value={x.id}>
              <Box
              
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                <Box sx={{ my: 3, mx: 2 }}>
                  <Grid container alignItems="center">
                    <Grid alignItems="center" item xs>
                      <Typography gutterBottom variant="h4" component="div">
                        {x.DIS_nombre}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Divider variant="middle" />
                <Box sx={{ m: 2 }}>
                  <Typography gutterBottom variant="body1">
                    Detalles
                  </Typography>
                  <Stack direction="column" spacing={0.5}>
                    <Chip color="primary" label={"Marca:" + x.MAR_nombre} />
                    <Chip color="secondary" label={"Modelo: " + x.MOD_nombre} />
                    <Chip color="warning" label={"Bodega: " + x.nombre} />
                  </Stack>
                </Box>
              </Box>
            </Item>
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        message="No existen registros"
      />
    </div>
  );
};
