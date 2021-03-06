const API_URL = 'http://127.0.0.1:8000';

export async function getAll(index){
    /*index could be:
        0 = bodegas
        1 = marcas
        2 = modelos
    */
    const menu = ['/bodegas','/marcas','/modelos'];
    
    try{
        const URL = API_URL+menu[index];
        const response = await fetch (URL);
        const data = await response.json();
        return data;
    }catch(error){
        console.log(error);
    }
}

export async function getModelosByMarca(marca){
    try{
        const URL = API_URL+'/modelos/marca/'+marca;
        const response = await fetch (URL);
        const data = await response.json();
        return data;
    }catch(error){
        console.log(error);
    }
}

export async function getDispositivos(bodega,marca,modelo){
    try{
        const URL = API_URL+'/dispositivos/'+bodega+'/'+marca+'/'+modelo;
        const response = await fetch (URL);
        const data = await response.json();
        return data;
    }catch(error){
        console.log(error);
    }
}

export async function SubmitDispositivo(bodega,modelo,dispositivo){

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ BOD_id : bodega, MOD_id:modelo, DIS_nombre:dispositivo  })
    };

    try{
        const URL = API_URL+'/api/dispositivo';
        const response = await fetch (URL, requestOptions);
        const data = await response.json();
        return data;
    }catch(error){
        console.log(error);
    }
}

// '${API_URL}/marcas/${variable}'

