let template = document.getElementById("template").content;
let fragment = document.createDocumentFragment();
let container = document.getElementById("data-mascota");

let btnGatos = document.getElementById("btnGatos");
let btnPerros = document.getElementById("btnPerros");

const getData = async (url) => {
  try {
    const resp = await axios(url);
    mostrarMascota(resp.data);
  } catch (error) {
    console.log(error);
  }
};

const mostrarMascota = (data) => {
  data.forEach((mascota) => {
    const { id, nombre, imagen, raza } = mascota;
    container.innerHTML = "";

    template.querySelector(".card-img").setAttribute("id", id);
    template.querySelector("img").setAttribute("src", imagen);
    template.querySelector("h3").textContent = nombre;
    template.querySelector("h4").textContent = raza;

    const clone = template.cloneNode(true);

    fragment.appendChild(clone);
  });

  container.appendChild(fragment);
};

btnGatos.addEventListener("click", () => {
  btnGatos = "gatos";
  localStorage.setItem("categoriaM", JSON.stringify(btnGatos));
  getData("http://localhost:4000/gatos");
});

btnPerros.addEventListener("click", () => {
  btnPerros = "perros";
  localStorage.setItem("categoriaM", JSON.stringify(btnPerros));
  getData("http://localhost:3000/perros");
});

container.addEventListener("click", (e) => {
  btnId = e.target.classList.contains(".card-img");
  let idClick = e.target.id;

  localStorage.setItem("idMascota", idClick);
});
