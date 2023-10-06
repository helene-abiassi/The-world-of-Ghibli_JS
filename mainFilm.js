const getFilms = () => {
  const url = "https://ghibliapi.vercel.app/films";
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      const ghibliFilms = result;
      // REVIEW it is a good idea to give a more understandable name to what we get from the API, but we don't need to create an extra variable. you could just do .then((ghibliFilms)) . We can name the argument of every callaback inside the .then() the way we want.
      postFilmCards(ghibliFilms);
      sortEventListeners(ghibliFilms);
      shuffleEventListener(ghibliFilms);
    });
  // REVIEW Do not forget to include a .catch() block to take account of some type of errors, and be able to handle them
};

function postFilmCards(ghibliFilms) {
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = "";

  for (let i = 0; i < ghibliFilms.length; i++) {
    const cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "card col-sm-12 col-md-6 col-lg-3");
    // cardDiv.innerHTML = "";

    const image = document.createElement("img");
    image.setAttribute("src", ghibliFilms[i].image);
    image.setAttribute("alt", ghibliFilms[i].title);
    image.setAttribute("class", "card-image-top");
    image.innerHTML = "";
    cardDiv.appendChild(image);

    const cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    cardBody.innerHTML = "";

    cardsContainer.appendChild(cardDiv);
    cardDiv.appendChild(cardBody);

    const h5 = document.createElement("h5");
    h5.setAttribute("class", "card-title");
    h5.innerText = ghibliFilms[i].title;
    cardBody.appendChild(h5);

    const p = document.createElement("p");
    p.setAttribute("class", "card-text text-single-line");
    p.setAttribute("class", "text single-line");
    p.innerText = ghibliFilms[i].description;
    cardBody.appendChild(p);

    const p2 = document.createElement("h6");
    p2.setAttribute("class", "card-text text-single-line");
    p2.innerText = ghibliFilms[i].director + ", " + ghibliFilms[i].release_date;
    cardBody.appendChild(p2);

    //CARD BUTTON

    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("class", "btn btn-primary");

    button.setAttribute("data-bs-toggle", "modal");
    button.setAttribute("data-bs-target", "#exampleModal" + i);
    button.innerText = "Discover more";

    // MODAL TRIGGER

    // REVIEW by doing all the DOM manipulation for the Modal, inside the for...loop , what you do is to create already all the modals, and have them waiting to be displayed when you click the button.
    //If you inspect your page, you will see that the modal is already created, with the image and all, but with a property "hidden=true" (in this case "aria-hidden=true").
    //It would be more efficient if our browser, instead of having to create 50 modals (or whatever number ), we create just one, the one we need, when we click on the button
    //For that, we could create a function that has all the code to generate the modal, that receives the information that the modal shoudl contain, that is triggered when we click the button.
    const modalDiv = document.createElement("div");

    modalDiv.setAttribute("class", "modal fade");
    modalDiv.setAttribute("id", "exampleModal" + i);
    modalDiv.setAttribute("tabindex", "-1");
    modalDiv.setAttribute("aria-labelledby", "exampleModalLabel");
    modalDiv.setAttribute("aria-hidden", "true");

    const modalDialog = document.createElement("div");
    modalDialog.setAttribute("class", "modal-dialog");

    const modalContent = document.createElement("div");
    modalContent.setAttribute("class", "modal-content card");
    modalContent.setAttribute("id", "modal-content");

    modalDialog.appendChild(modalContent);

    const modalHeader = document.createElement("div");
    modalHeader.setAttribute("class", "modal-header");

    modalContent.appendChild(modalHeader);

    const modalH1 = document.createElement("h1");
    modalH1.setAttribute("class", "modal-title fs-5");
    modalH1.setAttribute("id", "exampleModalLabel");
    modalH1.innerText = ghibliFilms[i].title;
    const br = document.createElement("br");

    const modalH1Jap = document.createElement("h1");
    modalH1Jap.setAttribute("class", "modal-title fs-5");
    modalH1Jap.innerText = ghibliFilms[i].original_title + "\u00A0";

    const modalButton = document.createElement("button");
    modalButton.setAttribute("type", "button");
    modalButton.setAttribute("class", "btn-close");
    modalButton.setAttribute("data-bs-dismiss", "modal");
    modalButton.setAttribute("aria-label", "Close");

    modalHeader.appendChild(modalH1);
    modalH1.appendChild(br);

    modalH1.appendChild(modalH1Jap);

    modalHeader.appendChild(modalButton);

    const modalBody = document.createElement("div");
    modalBody.setAttribute("class", "modal-body");
    modalBody.innerHTML = "";

    const modalBanner = document.createElement("img");
    modalBanner.setAttribute("src", ghibliFilms[i].movie_banner);
    modalBanner.setAttribute("class", "modal-body");
    modalBanner.setAttribute("alt", ghibliFilms[i].title);
    modalBanner.setAttribute(
      "style",
      "width: 100%; border-color: #4ba762; border-style: solid; padding: 0px"
    );
    modalBanner.setAttribute("alt", ghibliFilms[i].id);

    const modalDirector = document.createElement("h6");
    modalDirector.setAttribute("style", "padding-top: 10px");
    modalDirector.innerText =
      ghibliFilms[i].director + "," + "\u00A0" + ghibliFilms[i].release_date;

    const modalRating = document.createElement("h6");
    modalRating.innerText =
      "Rating:" + "\u00A0" + ghibliFilms[i].rt_score + "%";

    const modalText = document.createElement("p");
    modalText.innerText = ghibliFilms[i].description;

    const modalRunTime = document.createElement("h6");
    modalRunTime.innerText =
      "Running time:" +
      "\u00A0" +
      ghibliFilms[i].running_time +
      "\u00A0" +
      "mns";

    modalBody.appendChild(modalBanner);
    modalBody.appendChild(modalDirector);
    modalBody.appendChild(modalRating);
    modalBody.appendChild(modalText);
    modalBody.appendChild(modalRunTime);

    cardBody.appendChild(button);
    cardBody.appendChild(modalDiv);

    modalContent.appendChild(modalBody);
    modalDiv.appendChild(modalDialog);
  }
}

const sortEventListeners = (ghibliFilms) => {
  const filmSort = document.getElementById("filmSortBy");

  filmSort.addEventListener("change", (e) => {
    console.log(e.target.value);
    sortByDropDown(ghibliFilms);
  });
};

const sortByDropDown = (ghibliFilms) => {
  const sortedFilms = [...ghibliFilms];
  // console.log(sortedFilms);

  const filmSort = document.getElementById("filmSortBy");
  let filmSortValue = filmSort.value;

  if (filmSortValue === "default") {
    postFilmCards(ghibliFilms);
  } else if (filmSortValue === "A to Z") {
    sortedFilms.sort((a, b) => a.title.localeCompare(b.title));
    postFilmCards(sortedFilms);
  } else if (filmSortValue === "Release Year") {
    sortedFilms.sort((a, b) => b.release_date - a.release_date);
    postFilmCards(sortedFilms);
  } else if (filmSortValue === "Rating") {
    sortedFilms.sort((a, b) => b.rt_score - a.rt_score);
    postFilmCards(sortedFilms);
  } else if (filmSortValue === "Running Time")
    sortedFilms.sort((a, b) => b.running_time - a.running_time);
  postFilmCards(sortedFilms);
};

const shuffleEventListener = (ghibliFilms) => {
  const filmShuffle = document.getElementById("shuffleFilmButton");

  filmShuffle.addEventListener("click", (e) => {
    console.log(e.target.value);
    shuffleButton(ghibliFilms);
  });
};

const shuffleButton = (ghibliFilms) => {
  const sortedFilms = [...ghibliFilms];

  const filmShuffle = document.getElementById("shuffleFilmButton");
  let shuffleSortValue = filmShuffle.value;

  if (shuffleSortValue === "Shuffle") {
    sortedFilms.sort(() => Math.random() - 0.5);
    // console.log(sortedFilms);
    postFilmCards(sortedFilms);
  } else {
    postFilmCards(ghibliFilms);
  }
};

getFilms();

document
  .getElementById("learnMoreTextChange")
  .addEventListener("click", function () {
    this.innerText = "Learn Less";
  });
