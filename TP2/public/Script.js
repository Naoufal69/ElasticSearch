var modalMod = document.getElementById("modalMod");


var modalDel = document.getElementById("modalDel");

const handleFile = async () => {
  var input = document.querySelector('input[type="file"]');

  var data = new FormData();
  data.append("file", input.files[0]);

  console.log("Envoi des données en cours...");
  try {
    const response = await fetch("/submitFile", {
      method: "POST",
      body: data,
    });
    const result = await response.text();
    alert(result);
  }
  catch (error) {
    alert("Erreur lors de l'envoi des données");
  }
}

const getAllTitles = async (type) => {
  try {
    let element = "";
    let div = "";

    if (type == "modification") {
      element = "input";
      div = "contentModalUpdate";
    } else {
      element = "p";
      div = "contentModalDel";
    }
    const response = await fetch("/getAllTitles");
    const result = await response.json();
    document.getElementById(div).innerHTML = "";
    for (let i = 0; i < result.length; i++) {
      const film = result[i]._source;
      const id = result[i]._id;
      if (
        film.title != undefined &&
        film.director != undefined &&
        film.year != undefined &&
        film.title != "" &&
        film.director != "" &&
        film.year != ""
      ) {
        const title = film.title;
        const director = film.director;
        const year = film.year;
        var e = document.createElement("div");

        var titleElement = document.createElement(element);

        titleElement.style.fontWeight = "500";
        titleElement.style.fontSize = "20px";
        titleElement.style.marginBottom = "5px";
        titleElement.id = "title_" + id;
        if (type === "modification") {
          titleElement.setAttribute("type", "text");
          titleElement.value = title;
        } else {
          titleElement.textContent = "Nom du film : " + title;
        }
        e.appendChild(titleElement);

        var yearElement = document.createElement(element);
        yearElement.style.fontWeight = "500";
        yearElement.style.fontSize = "20px";
        yearElement.style.marginBottom = "5px";
        yearElement.id = "year_" + id;
        if (type === "modification") {
          yearElement.setAttribute("type", "number");
          yearElement.value = year;
        } else {
          yearElement.textContent = "Année de sortie : " + year;
        }
        e.appendChild(yearElement);

        var directorElement = document.createElement(element);
        var button = document.createElement("button");
        directorElement.style.fontWeight = "500";
        directorElement.style.fontSize = "20px";
        directorElement.style.marginBottom = "30px";
        directorElement.id = "director_" + id;
        if (type == "modification") {
          directorElement.setAttribute("type", "text");
          directorElement.value = director;
          button.textContent = "Modifier";
          button.onclick = handleUpdate = async () => {
            const t = document.getElementById("title_" + id).value;
            const y = document.getElementById("year_" + id).value;
            const d = document.getElementById("director_" + id).value;
            const data = { id, title: t, year: y, director: d };
            console.log("Envoi des données en cours...");

            try {
              const response = await fetch("/update", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              });
              const result = await response.text();
              alert(result);
            } catch (error) {
              alert("Erreur lors de l'envoi des données");
            }
          };
        } else {
          directorElement.textContent = "Directeur du film : " + director;
          button.textContent = "Supprimer";
          button.id = "button_" + id;
          button.onclick = handleDelete = async () => {
            const data = { id };
            console.log("Suppression en cours...");
            try {
              const response = await fetch("/delete", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              });
              const result = await response.text();
              alert(result);

              document.getElementById("title_" + id).remove();
              document.getElementById("year_" + id).remove();
              document.getElementById("director_" + id).remove();
              document.getElementById("button_" + id).remove();
            } catch (error) {
              alert("Erreur lors de l'envoi des données");
            }
          };
        }
        e.appendChild(directorElement);
        e.appendChild(button);

        document.getElementById(div).appendChild(e);
      }
    }
  } catch (error) {
    alert("Erreur lors de l'envoi des données");
  }
};

const handleModalModOpen = () => {
  modalMod.style.display = "block";
  getAllTitles("modification");
};

const handleModalModClose = () => {
  modalMod.style.display = "none";
};

const handleModalDelOpen = () => {
  modalDel.style.display = "block";
  getAllTitles("Suppression");
};

const handleModalDelClose = () => {
  modalDel.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modalMod) {
    modalMod.style.display = "none";
  }
  if (event.target == modalDel) {
    modalDel.style.display = "none";
  }
};

const handleGetAll = async () => {
  try{
    const response = await fetch("/getAllTitles");
    const result = await response.json();
    document.getElementById("listFilms").innerHTML = "";
    for (let i = 0; i < result.length; i++) {
      const film = result[i]._source;
      const id = result[i]._id;
      if (
        film.title != undefined &&
        film.director != undefined &&
        film.year != undefined &&
        film.title != "" &&
        film.director != "" &&
        film.year != ""
      ){
        const title = film.title;
        const director = film.director;
        const year = film.year;
        var e = document.createElement("div");

        var titleElement = document.createElement("p");
      titleElement.textContent = "Nom du film : " + title;
      titleElement.style.fontWeight = "500";
      titleElement.style.fontSize = "20px";
      titleElement.style.marginBottom = "5px";
      e.appendChild(titleElement);

      var yearElement = document.createElement("p");
      yearElement.textContent = "Année de sortie : " + year;
      yearElement.style.fontWeight = "500";
      yearElement.style.fontSize = "20px";
      yearElement.style.marginBottom = "5px";
      e.appendChild(yearElement);

      var directorElement = document.createElement("p");
      directorElement.textContent = "Réalisateur : " + director;
      directorElement.style.fontWeight = "500";
      directorElement.style.fontSize = "20px";
      directorElement.style.marginBottom = "30px";
      e.appendChild(directorElement);

      document.getElementById("listFilms").appendChild(e);
      }
    }
  }catch(error){
    alert("Erreur lors de l'envoi des données");
  }
}

const handleSearch = async () => {
  const search = document.getElementById("search").value;
  const data = { search };

  console.log("Envoi des données en cours...");
  try {
    const response = await fetch("/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    document.getElementById("listFilms").innerHTML = "";
    for (let i = 0; i < result.length; i++) {
      const film = result[i]._source;
      const title = film.title;
      const director = film.director;
      const year = film.year;
      var e = document.createElement("div");

      var titleElement = document.createElement("p");
      titleElement.textContent = "Nom du film : " + title;
      titleElement.style.fontWeight = "500";
      titleElement.style.fontSize = "20px";
      titleElement.style.marginBottom = "5px";
      e.appendChild(titleElement);

      var yearElement = document.createElement("p");
      yearElement.textContent = "Année de sortie : " + year;
      yearElement.style.fontWeight = "500";
      yearElement.style.fontSize = "20px";
      yearElement.style.marginBottom = "5px";
      e.appendChild(yearElement);

      var directorElement = document.createElement("p");
      directorElement.textContent = "Réalisateur : " + director;
      directorElement.style.fontWeight = "500";
      directorElement.style.fontSize = "20px";
      directorElement.style.marginBottom = "30px";
      e.appendChild(directorElement);

      document.getElementById("listFilms").appendChild(e);
    }
  } catch (error) {
    alert("Erreur lors de l'envoi des données");
  }
};

const handleSubmit = async () => {
  const title = document.getElementById("title").value;
  const director = document.getElementById("director").value;
  const year = document.getElementById("year").value;
  const data = { title, director, year };

  console.log("Envoi des données en cours...");
  try {
    const response = await fetch("/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.text();
    alert(result); // Affiche la réponse du serveur
  } catch (error) {
    alert("Erreur lors de l'envoi des données");
  }
};
