let formulario = document.getElementById("form");

document.addEventListener("DOMContentLoaded", async () =>{
    document.getElementById("id").style.display = 'none';
    document.getElementById("label-edit").style.display = 'none';

})

const mostrarDatos = async(url) =>{
    try {
        const resp = await axios(url);

        const data = resp.data;

        data.forEach(user => {
            const {id,nombre,apellido,correo} = user;

            let username= document.getElementById('nombreUser');
            username.innerHTML = '';
            username.innerHTML = `${nombre} ${apellido}`
            username.style.textTransform = "capitalize";

            document.getElementById("name").value = nombre;
            document.getElementById("lastName").value = apellido;
            document.getElementById("correo").value = correo;
            document.getElementById("id").value = id;
        });

  
        } catch (error) {
            console.log(error);
        }
}

formulario.addEventListener("submit",async(e) =>{
    e.preventDefault();

    let idModificar = document.getElementById("id").value;
    let nameModificar = document.getElementById("name").value;
    let lastNameModificar = document.getElementById("lastName").value;
    let emailModificar = document.getElementById("correo").value;

    let resp = await fetch(`http://localhost:3001/usuario/${idModificar}`,{
    
        method: "PUT",
        body:JSON.stringify({
            id: idModificar,
            nombre: nameModificar,
            apellido: lastNameModificar,
            correo: emailModificar,
        }),

        headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
    });
     await resp.json();

})


mostrarDatos('http://localhost:3001/usuario')