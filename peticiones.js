const cargarTipos = async() =>{
    try{
        const url="https://secret-ocean-49799.herokuapp.com/http://201.140.116.237/services/tipo.php"
        await axios
        .get(url)
        .then((res)=>{
            llenarCombos(res.data);
        })
    
        .catch((err) =>{
        console.log("Surgio un error en la peticion");
        return false;
        });

    }catch(error){
        console.log("Surgio un error");
        return false;
    }

    return true;
}

function llenarCombos(data){
    for(let item of data){
        document.getElementById("tipo").innerHTML += `<option value="${item.tipo}">${item.descripcion}</option>`
    }
}

const cargarTablaVentas =  async()=>{
    const urlVentas = "https://secret-ocean-49799.herokuapp.com/http://201.140.116.237/services/ventas.php"

    try{
        await axios
        .get(urlVentas)
        .then((res) =>{
            dibujarTabla(res.data)
        })
        .catch((err)=>{ console.log("Surgio un error en la peticion");
        return false;
        });

    }catch(err){
        console.log("Surgio un error");
        return false;
    }
    return true;
}

function dibujarTabla(data){
    //Limpiar la tabla
    document.getElementById("ventas").innerHTML=``;
    //Sacar el tipo del combox
    let tipo= document.getElementById("tipo").value;

    for(let item of data){
        if(item.tipo == tipo){        
        document.getElementById("ventas").innerHTML+=
        `
        <tr id="fila">

            <td>${item.folio}</td>
            <td>${item.tipo}</td>
            <td>${item.precio}</td>
            <td>${item.descuento}</td>
            <td>${item.total}</td>
            <td>${item.fechapago}</td>
            <td>${item.giro}</td>
        </tr>
        `
        }
    }
}

    //Borrar
    document.getElementById("clean").addEventListener("click", async () => {
    alert("Datos eliminados")
    document.getElementById("ventas").innerHTML=" ";
    });


const inicia = async()=>{
    if (await cargarTipos() == true){
        cargarTablaVentas();
        
    }else{
        console.log("Surgio un error");
    }
}
inicia();