let titleForm = document.getElementById('titleForm')
let form = document.getElementById('form')
let btnSubmit = document.getElementById('btnSubmit')
let tbody = document.getElementById('tbody')
const URL_API = 'https://server-usuarios-qsdd.onrender.com/usuario'

// fetch() es una API de js, es una promesa que puede ser exitosa o puede ser rechazda
// fetch(url, {method: 'POST' || 'PUT' || 'DELETE' || 'GET/ID' }) 
// fetch(URL_API).then(RES).then(JSON).catch(ERROR)

fetch(URL_API)
    .then(res => {
        if(res.ok) {
            console.log(res);
            return res.json()
        } else throw new Error("❌❌ERROR AL HACER GET ");   
    })
        .then( json =>{
            console.log(json);
            // json =[{}, {}]
           titleForm.textContent =  json[0].nombre
        })
            .catch(err => console.log(err))


            
//otra forma con async / await
async function getUsers(url, bandera){
    try{
        if(bandera){
              let res = await fetch(url/{id})
        let  json = await res.json()
        //pintaUsuarios(json)
        console.log(json);
        }
      
        
    }catch(err){
        console.log('Algo salio mal, ⚠️', err);
    }
} 

fetchUsers(URL_API)
fetchUsers(URL_API, false)
