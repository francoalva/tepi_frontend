import "./App.css";
import { Filtro } from "./components/Filtros";

import Avatar from "@mui/material/Avatar";
import franco from "./static/images/franco_avatar.jpg";
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';

function App() {
  return (
    <div>
      <Avatar alt="Franco Alvarez" src={franco} />
      <Typography gutterBottom align='center' variant="h2" component="div"> Test de Evaluación programador inicial</Typography>
      <Typography gutterBottom align='center' variant="h4" component="div"> Franco Álvarez Alvarado</Typography>
      <Divider /> <br></br>
      <Typography gutterBottom align='left' variant="h6" component="div"> Filtros de Dispositivos</Typography>
      <Filtro> </Filtro>
    </div>
  );
}

export default App;
