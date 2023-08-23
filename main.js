const getFilms = () => {
  const url = "https://ghibliapi.vercel.app/films";
  fetch(url)
    .then((response) => {
      // console.log(response.json());
      return response.json();
    })
    .then((result) => {
      // console.log("result :>> ", result);
      const ghibliFilms = result;
      postFilmCards(ghibliFilms);
    });
};

function postFilmCards(ghibliFilms) {
  //   const cardsContainer =get document.getElementById("cards-container");
  const cardsContainer = document.getElementById("cards-container");

  for (let i = 0; i < ghibliFilms.length; i++) {
    // console.log("ghibliFilms :>> ", ghibliFilms[i]);

    //CARD DIV

    const cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "card col-sm-12 col-md-6 col-lg-3");
    cardDiv.setAttribute;

    // console.log('cardDiv :>> ', cardDiv);

    //CARD IMAGE

    const image = document.createElement("img");
    image.setAttribute("src", ghibliFilms[i].image);
    image.setAttribute("alt", ghibliFilms[i].title);
    image.setAttribute("class", "card-image-top");
    cardDiv.appendChild(image);

    // console.log("image :>> ", image);

    //CARD BODY

    const cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");

    cardsContainer.appendChild(cardDiv);
    cardDiv.appendChild(cardBody);

    // console.log('cardBody :>> ', cardBody);

    //CARD TITLE

    const h5 = document.createElement("h5");
    h5.classList.add("card-title");
    h5.innerText = ghibliFilms[i].title;
    cardBody.appendChild(h5);

    // console.log('ghibliFilms[i].title :>> ', ghibliFilms[i].title);

    //CARD TEXT

    const p = document.createElement("p");
    p.setAttribute("class", "card-text text-single-line");
    p.setAttribute("class", "text single-line");
    p.innerText = ghibliFilms[i].description;
    cardBody.appendChild(p);

    const p2 = document.createElement("h6");
    p2.setAttribute("class", "card-text text-single-line");
    p2.innerText = ghibliFilms[i].director + ", " + ghibliFilms[i].release_date;
    cardBody.appendChild(p2);

    // ADDITIONAL INFO

    //CARD BUTTON TRIGGER MODAL

    const button = document.createElement("button");
    button.setAttribute("class", "btn btn-primary");
    button.setAttribute("data-bs-toggle", "modal");
    button.setAttribute("data-bs-target", "#exampleModal");

    button.innerText = "Discover more";
    cardBody.appendChild(button);

    const modalDiv = document.createElement("div");
    modalDiv.setAttribute("class", "modal fade");
    modalDiv.setAttribute("id", "exampleModal");
    modalDiv.setAttribute("tabindex", "-1");
    modalDiv.setAttribute("aria-labelledby", "exampleModalLabel");
    modalDiv.setAttribute("aria-hidden", "true");
    cardBody.appendChild(modalDiv);

    const modalDialog = document.createElement("div");
    modalDialog.setAttribute("class", "modal-dialog");
    cardBody.appendChild(modalDialog);

    const modalContent = document.createElement("div");
    modalContent.setAttribute("class", "modal-content");
    cardBody.appendChild(modalContent);

    const modalHeader = document.createElement("div");
    modalHeader.setAttribute("class", "modal-header");

    const modalH1 = document.createElement("h1");
    modalH1.setAttribute("class", "modal-title fs-5");
    modalH1.setAttribute("id", "exampleModalLabel");
    modalH1.innerText = ghibliFilms[i].title;

    const modalBtn = document.createElement("button");
    modalBtn.setAttribute("type", "button");
    modalBtn.setAttribute("class", "btn-close");
    modalBtn.setAttribute("data-bs-dismiss", "modal");
    modalBtn.setAttribute("aria-label", "Close");
    modalHeader.appendChild(modalH1);
    modalHeader.appendChild(modalBtn);

    // modalDialog.appendChild(modalHeader);
  }
}

getFilms();

// postFilmCards(getFilms);

// getChFilms();
