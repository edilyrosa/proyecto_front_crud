let titleForm = document.getElementById('titleForm')
let form = document.getElementById('form')
let btnSubmit = document.getElementById('btnSubmit')
let tbody = document.getElementById('tbody')
const URL_API = 'https://server-usuarios-qsdd.onrender.com/usuarios'

function fetchUsers(){
fetch(URL_API)
    .then(res => {
        if(res.ok) return res.json()
        //  else throw new Error("❌❌ERROR AL HACER GET ");   
         else throw new Error(`❌❌ERROR AL HACER GET: Status ${res.status}, ${res.statusText}`);   
    })
        .then( json =>{
            console.log(json);
            renderizaTabla(json)
        })
            .catch(err => {
                let tr = document.createElement('tr')
                 tr.innerHTML = `
                 <td class='text-red-500 text-center font-bold' colspan='7'> ❌❌ERROR AL HACER GET: Status ${err.message}</td>
                 `
                tbody.innerHTML = ''
                tbody.appendChild(tr)
                console.log(err)
            })
}

function renderizaTabla(usuarios){
    tbody.innerHTML = ''
    if(usuarios.length === 0){
        let tr = document.createElement('tr')
        tr.innerHTML = `
            <td class='text-blue-500 text-center font-bold' colspan='7'>No hay usuarios en la BBDD </td>
            `
            tbody.appendChild(tr)
    }

    usuarios.map( user => { 
        // var          = cond           ? true      : falso
        let colorGenero = user.genero  ? 'text-pink-500' : 'text-blue-500'
        let colorBarra  = user.genero  ? 'bg-pink-500' : 'bg-blue-500'
         let tr = document.createElement('tr')
          tr.innerHTML = `
            <td> <img class='w-[80px] h-[80px] rounded-full' src='${user.foto}' alt='${user.nombre}' /> </td>
            <td class='px-4 py-2' > ${user.nombre} </td>
            <td class='px-4 py-2' > ${user.edad} </td>
            <td class='px-4 py-2 ${colorGenero} font-bold text-center'> ${user.genero ? 'Mujer': 'Hombre'} </td>
            <td class='px-4 py-2' > ${user.email} </td>
            <td class='px-4 py-2'> 
                <div class='flex items-center'> 
                    <span class='mr-2 text-xs font-semibold' > ${user.aceptacion}%</span>
                    <div class='w-full bg-gray-200 h-2 rounded-sm'> 
                        <div class='w-[${user.aceptacion}%] ${colorBarra} h-2 rounded-sm'> </div>
                    </div>
                </div>
            </td>

            <td class='px-4 py-2'>
            <button class='w-[100%] my-1 bg-blue-500 text-white rounded mr-2 edit-btn' data-id='${user.id}' > Editar</button>
            <button class='w-[100%] my-1 bg-pink-500 text-white rounded mr-2 delete-btn' data-nombre='${user.nombre}' data-id='${user.id}' > Eliminar</button>
            </td>
          `
        //TODO:  falta el cierre de la comilla '' en data-nombre, en btn "Eliminar"
          tbody.appendChild(tr)
    })

    //*FUNCION QUE MANEJA EL EVENTO "CLICK" SOBRE EL BTN "Editar"
    document.querySelectorAll('.edit-btn').forEach(btn =>{
        btn.addEventListener('click', () => editUser(btn.dataset.id))
    })

      //*FUNCION QUE MANEJA EL EVENTO "CLICK" SOBRE EL BTN "Eliminar"
    document.querySelectorAll('.delete-btn').forEach(btn =>{
        btn.addEventListener('click', () =>  {
            if(confirm(`Estas seguro que quires eliminar el usuario ${btn.dataset.nombre} con ID = ${btn.dataset.id}`))
                deleteUser(btn.dataset.id)
        })
    })
}


//*FUNCION QUE DESARROLLA EL MANEJA EL EVENTO "CLICK" SOBRE EL BTN "Editar"
function editUser(id){
    titleForm.textContent = "LLENA LOS CAMPOS Y EDITA UN USUARIO."
    btnSubmit.value="Actualizar ➤" 

    fetch(`${URL_API}/${id}`)
    .then(res => {
        if(res.ok) return res.json() 
         else throw new Error(`❌❌ERROR AL HACER GET DEL USUARIO A ACTUALIZAR: Status ${res.status}, ${res.statusText}`);   
    })
        .then( json =>{
            console.log(json);
            Object.entries(json).map(([campo, value]) =>{
                const $input = document.querySelector(`[name="${campo}"]`)
                if($input){
                    if($input.type === 'radio' && campo === 'genero'){
                        document.querySelector(`[name="genero"][value="${value.toString()}"]`).checked = true
                    }
                   else $input.value = value
                }
            })
        })
            .catch(err => {
                console.log(`❌Error al editar el usuario con ID = ${id}❌`)
                alert(`❌Error al editar el usuario con ID = ${id}❌`)
            })
}




//*FUNCION QUE DESARROLLA EL MANEJA EL EVENTO "CLICK" SOBRE EL BTN "Eliminar"
function deleteUser(id){
    //  fetch(`${URL_API}/${id}`, {headers, body, method})
     fetch(`${URL_API}/${id}`, {method:'DELETE'})
        .then(res =>{
            if(res.ok) limpiaFormularioYActualiza()
            else throw new Error(`❌❌ERROR AL HACER DELETE DEL USUARIO: Status ${res.status}, ${res.statusText}`);   
        })
            .catch(err =>{
                 console.log(`❌Error al ELIMINAR el usuario con ID = ${id}❌`)
                alert(`❌Error al ELIMINAR el usuario con ID = ${id}❌`)
            })
}

function limpiaFormularioYActualiza(){
    fetchUsers()//Actualizo la tabla llamando a la API en su ultima version, sin el ele eliminado
    form.reset()
    titleForm.textContent = "LLENA LOS CAMPOS Y CREAR UN USUARIO."
    btnSubmit.value="Enviar ➤" 
}



//*FUNCION QUE DESARROLLA EL MANEJA EL EVENTO "SUBMIT" SOBRE EL BTN "Enviar"/"Editar"
form.addEventListener('submit', (e) =>{
    e.preventDefault()
})

fetchUsers() //TODO: PROBAR LO REALIZADO ULTMA CLASE




