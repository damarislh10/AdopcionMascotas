let arregFavorites = [];

let datoId = JSON.parse(localStorage.getItem("idMascota"));
datoId = datoId !== null ? datoId : "";

let categoriaMascota = JSON.parse(localStorage.getItem("categoriaM"));
categoriaMascota = categoriaMascota !== null ? categoriaMascota : "";

let container = document.getElementById("contenedor-detalle");

const getDataMascota = async () => {
  if (categoriaMascota === "gato") {
    categoriaMascota = "gatos";
  } else if (categoriaMascota === "perro") {
    categoriaMascota = "perros";
  }
  try {
    if (categoriaMascota === "gatos") {
      const id = await axios(
        `http://localhost:4000/${categoriaMascota}/${datoId}/`
      );
      mostrarDetalleMascota(id.data);
      favorite(id.data);
    } else {
      id = await axios(`http://localhost:3000/${categoriaMascota}/${datoId}/`);
      mostrarDetalleMascota(id.data);
      favorite(id.data);
    }
  } catch (error) {
    console.log(error);
  }
};

const mostrarDetalleMascota = (data) => {
  const {
    id,
    nombre,
    genero,
    imagen,
    categoria,
    raza,
    edad,
    direccion,
    personalidad,
    historia,
    usuario,
    imgusuario,
  } = data;
  container.innerHTML = "";

  container.innerHTML = `
  <div class="col col-img">
  <img
    class="w-50 img-detail"
    src="${imagen}"
    alt=""
  />
  <div class="col col-text">
    <div class="nameIcon">
      <h2 class="me-2 fs-3">${nombre}</h2>
      <img
        class="img-genero"
        src="${genero}"
      />
      <button id="${id}" class="Favorito">
        <img
          class="imgFavor"
          src="https://res.cloudinary.com/df90q7vvj/image/upload/v1643326502/AdopcionMascotas/Union_j2oesj.png"
        />
      </button>
    </div>
    <div class="razaEdad mt-3">
      <img
        class="img-raza"
        src="https://res.cloudinary.com/df90q7vvj/image/upload/v1643329731/AdopcionMascotas/imgraza_wvz1ij.png"
        alt=""
      />
      <h6 class="ms-2 mt-2">${raza}</h6>
      <img
        class="imgEdad mb-1"
        src="https://res.cloudinary.com/df90q7vvj/image/upload/v1643331450/AdopcionMascotas/ImgEdad_r6t6t6.png"
        alt=""
      />
      <h6 class="ms-2 mt-1">${edad}</h6>
    </div>
    <div class="divDirection mt-4">
      <img
        class="ms-4 imgMap"
        src="https://res.cloudinary.com/df90q7vvj/image/upload/v1643332364/AdopcionMascotas/Imgmap_cnmgid.png"
        alt=""
      />
      <p class="ms-4">
       ${direccion}
      </p>
    </div>

    <div class="container-person px-2 mt-4">
      <h2 class="fs-4">Personalidad</h2>
      <ul class="ul-person mt-4">
        <div class="container-li-person">
          <img
            src="https://res.cloudinary.com/df90q7vvj/image/upload/v1643335213/AdopcionMascotas/personHearth_vbcpta.png"
            alt=""
            srcset=""
          />
          <li class="li-person mt-2 mb-1">${personalidad[0]}</li>
        </div>
        <div class="container-li-person">
          <img
            src="https://res.cloudinary.com/df90q7vvj/image/upload/v1643335663/AdopcionMascotas/personHouse_vbzztw.png"
          />
          <li class="li-person mt-2 mb-1">${personalidad[1]}</li>
        </div>
        <div class="container-li-person">
          <img
            src="https://res.cloudinary.com/df90q7vvj/image/upload/v1643335860/AdopcionMascotas/jugueton_fbkyyd.png"
            alt=""
          />
          <li class="li-person mt-2 mb-1">${personalidad[2]}</li>
        </div>
      </ul>
      <h2 class="fs-4 mt-4">Historia de Rocky</h2>
      <p class="mt-3 p-text">
          ${historia}
      </p>
      <div class="container-contact mt-4 mb-2">
        <img
          src="${imgusuario}"
          alt=""
        />
        <div class="container-public ms-3">
          <h5>Publicado por</h5>
          <h4 class="fw-bold">${usuario}</h4>
        </div>
        <button class="btnContact ms-4">
          <a href="../contactar.html">Contactar</a>
        </button>
      </div>
    </div>
  </div>
</div>
  `;
  agregadoInFavoritos(id, categoria);
};

document.addEventListener("DOMContentLoaded", getDataMascota());

const favorite = (dataMascot) => {
  let btnFavorite = document.getElementById(dataMascot.id);

  btnFavorite.addEventListener("click", () => {
    let key = [];

    if (localStorage.getItem("Favoritos")) {
      key = JSON.parse(localStorage.getItem("Favoritos"));
    }
    if (key.length === 0) {
      let newArray = [dataMascot];
      localStorage.setItem("Favoritos", JSON.stringify(newArray));
      cambColorHearth();
    } else {
      let bandeFavor = false;
      key.forEach((element) => {
        if (
          Number(element.id) === Number(dataMascot.id) &&
          element.categoria === dataMascot.categoria
        ) {
          bandeFavor = true;
        }
      });

      if (!bandeFavor) {
        console.log(key);
        let newArray = key;
        newArray.unshift(dataMascot);
        localStorage.setItem("Favoritos", JSON.stringify(newArray));
        cambColorHearth();
      } else {
        key.forEach((element, index) => {
          if (element.id === dataMascot.id) {
            key.splice(index, 1); // elimine
            localStorage.setItem("Favoritos", JSON.stringify(key));
            key = JSON.parse(localStorage.getItem("Favoritos"));
            cambColorGray();
          }
        });
      }
    }
  });
};

const cambColorHearth = () => {
  let imageHearth = document.querySelector(".imgFavor");
  imageHearth.setAttribute(
    "src",
    "https://res.cloudinary.com/df90q7vvj/image/upload/v1643491406/AdopcionMascotas/favoMorado_cpplna.png"
  );
};

const cambColorGray = () => {
  let imageHearth = document.querySelector(".imgFavor");
  imageHearth.setAttribute(
    "src",
    "https://res.cloudinary.com/df90q7vvj/image/upload/v1643326502/AdopcionMascotas/Union_j2oesj.png"
  );
};

const agregadoInFavoritos = (idClick, categoriaClick) => {
  let dataFavorite = JSON.parse(localStorage.getItem("Favoritos"));
  dataFavorite = dataFavorite !== null ? dataFavorite : [];

  dataFavorite.forEach((addFav) => {
    const { id, categoria } = addFav;
    if (id.includes(idClick) && categoria.includes(categoriaClick)) {
      cambColorHearth();
    }
  });
};
