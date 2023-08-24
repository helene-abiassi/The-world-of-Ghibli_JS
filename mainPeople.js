const getPeople = () => {
  const url2 = "https://ghibliapi.vercel.app/people";
  fetch(url2)
    .then((response2) => {
      return response2.json();
    })
    .then((result2) => {
      const ghibliPeople = result2;

      fetchSpecies(ghibliPeople);

      //   buildCharactersTable(ghibliPeople);
    });
};

const fetchSpecies = (ghibliPeople) => {
  const link = " https://ghibliapi.vercel.app/species/ ";
  fetch(link)
    .then((response3) => {
      return response3.json();
    })
    .then((speciesList) => {
      for (let i = 0; i < ghibliPeople.length; i++) {
        const myID = ghibliPeople[i].species.slice(37);
        for (let j = 0; j < speciesList.length; j++) {
          if (myID === speciesList[j].id) {
            ghibliPeople[i].species = speciesList[j].name;
            break;
          } else {
            ghibliPeople[i].species = "unknown";
          }
        }
      }
      createRadioButtons(speciesList);
      getChFilms(ghibliPeople);
    });
};

getPeople();

const getChFilms = (ghibliPeople) => {
  const chLink = "https://ghibliapi.vercel.app/films/";
  fetch(chLink)
    .then((responseCh) => {
      let chList = responseCh.json();
      return chList;
    })
    .then((chFilmList) => {
      for (let i = 0; i < ghibliPeople.length; i++) {
        const myChFilmIDs = [];
        for (let h = 0; h < ghibliPeople[i].films.length; h++) {
          const slicedID = ghibliPeople[i].films[h].slice(35);

          myChFilmIDs.push(slicedID);
        }
        const myFilmsAfter = [];

        for (let j = 0; j < chFilmList.length; j++) {
          const filmID = chFilmList[j].id;
          for (let e = 0; e < myChFilmIDs.length; e++) {
            if (myChFilmIDs[e] == filmID) {
              myFilmsAfter.push(chFilmList[j].title);
            }
          }
        }
        ghibliPeople[i].my_films = myFilmsAfter.toString();

        // console.log(ghibliPeople);
      }
      buildCharactersTable(ghibliPeople);
      createChFilmDropDown(ghibliPeople);
    });
};

function buildCharactersTable(ghibliPeople) {
  const tableBody = document.getElementById("t-body");
  for (let i = 0; i < ghibliPeople.length; i++) {
    if (ghibliPeople[i].my_films != undefined) {
    }
    // ROWS
    const tableRow = document.createElement("tr");
    //ELEMENTS
    const peopleImageRow = document.createElement("td");
    peopleImageRow.setAttribute("scope", "row");

    const peopleImage = document.createElement("img");
    peopleImage.setAttribute("src", ghibliPeoplePhotos[i].photo);
    peopleImageRow.appendChild(peopleImage);

    const peopleName = document.createElement("td");
    peopleName.innerText = ghibliPeople[i].name;

    const peopleSpecie = document.createElement("td");
    peopleSpecie.innerText = ghibliPeople[i].species;
    // console.log(ghibliPeople[i].species);

    const peopleEye = document.createElement("td");
    peopleEye.innerText = ghibliPeople[i].eye_color;

    const peopleHair = document.createElement("td");
    peopleHair.innerText = ghibliPeople[i].hair_color;

    const peopleFilm = document.createElement("td");
    peopleFilm.innerText = ghibliPeople[i].my_films;

    tableRow.appendChild(peopleImageRow);
    tableRow.appendChild(peopleName);
    tableRow.appendChild(peopleSpecie);
    tableRow.appendChild(peopleEye);
    tableRow.appendChild(peopleHair);
    tableRow.appendChild(peopleFilm);

    tableBody.appendChild(tableRow);
  }
}

//!Function to create radio buttons

function createRadioButtons(speciesList) {
  const radioBox = document.getElementById("radioButtons");
  //   console.log(speciesList);

  for (let i = 0; i < speciesList.length; i++) {
    const radioOptions = document.createElement("div");
    radioOptions.setAttribute("class", "form-check");

    radioBox.appendChild(radioOptions);

    const inputOptions = document.createElement("input");
    inputOptions.setAttribute("class", "form-check-input");
    inputOptions.setAttribute("type", "radio");
    inputOptions.setAttribute("name", "flexRadioDefault");
    inputOptions.setAttribute("id", "flexRadioDefault1");
    inputOptions.setAttribute("value", speciesList[i].name);

    const labelOptions = document.createElement("label");
    labelOptions.setAttribute("class", "form-check-label");
    labelOptions.setAttribute("for", "flexRadioDefault1");
    labelOptions.setAttribute("for", speciesList[i].name);
    labelOptions.innerText = "\u00A0" + speciesList[i].name;

    // labelOptions.appendChild(inputOptions);
    radioBox.appendChild(inputOptions);
    radioBox.appendChild(labelOptions);
  }
}

function createChFilmDropDown(ghibliPeople) {
  const dropdown = document.getElementById("searchDropdown");

  const filmArray = ghibliPeople.map((person) => {
    return person.my_films;
  });

  const uniqueFilmsArray = [...new Set(filmArray)];

  const defaultOption = document.createElement("option");
  defaultOption.setAttribute("selected", true);
  defaultOption.innerText = "Search by Films...";

  dropdown.appendChild(defaultOption);

  uniqueFilmsArray.forEach((filmName) => {
    // return person.my_films;

    const option = document.createElement("option");
    option.innerText = filmName;

    dropdown.appendChild(option);
  });
}
