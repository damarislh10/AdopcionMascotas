let template = document.getElementById("template").content;
let fragment = document.createDocumentFragment();
let container = document.getElementById("data-mascota");
let categoriaId = [];

let favorite = JSON.parse(localStorage.getItem("Favoritos"));
favorite = favorite !== null ? favorite : [];

const mostrarFavoritos = () => {
  favorite.forEach((f) => {
    const { id, nombre, imagen, raza, categoria } = f;

    template.querySelector(".card-img").setAttribute("id", categoriaId.length);
    template.querySelector("img").setAttribute("src", imagen);
    template.querySelector("h3").textContent = nombre;
    template.querySelector("h4").textContent = raza;

    categoriaId.push({
      id,
      categoria,
    });
    const clone = template.cloneNode(true);
    fragment.appendChild(clone);
  });
  container.appendChild(fragment);
};

container.addEventListener("click", (e) => {
  btnId = e.target.classList.contains(".card-img");
  let idClick = e.target.id;
  localStorage.setItem("idMascota", Number(categoriaId[idClick].id));

  localStorage.setItem(
    "categoriaM",
    JSON.stringify(categoriaId[idClick].categoria)
  );
});

document.addEventListener("DOMContentLoaded", mostrarFavoritos);


