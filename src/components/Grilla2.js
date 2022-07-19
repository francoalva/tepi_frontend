import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

import * as API from "../services/Connection";

export const Grilla2 = (props) => {
  const [dispositivos, setDispositivos] = useState([]);

  const columns = [
    { field: 'id', headerName: 'ID', type : 'number' },
    { field: 'DIS_nombre', headerName: 'Nombre', width: 300 },
    { field: 'MOD_nombre', headerName: 'Modelo', width: 200 },
    { field: 'MAR_nombre', headerName: 'Marca', width: 130 },
    { field: 'nombre', headerName: 'Bodega', width: 200 },
  
  ];

  useEffect(() => {
    API.getDispositivos(props.bodega, props.marca, props.modelo).then(
      setDispositivos
    );
  }, [props.bodega, props.marca, props.modelo]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={dispositivos}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};
