const getPeople = () => {
  const url2 = "https://ghibliapi.vercel.app/people";
  fetch(url2)
    .then((response2) => {
      return response2.json();
    })
    .then((result2) => {
      const ghibliPeople = result2;
      // controller(ghibliPeople);
      fetchSpecies(ghibliPeople);
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
      // filterEventListeners(speciesList);
      getChFilms(ghibliPeople);

      createRadioButtons(speciesList);
    });
};

const filterEventListeners = (ghibliPeople) => {
  const filterOptions = document.getElementsByName("speciesRadioButtons");
  console.log(filterOptions);

  for (let i = 0; i < filterOptions.length; i++) {
    filterOptions[i].addEventListener("change", (e) => {
      if (e.target.value == "defaultRadio") {
        buildCharactersTable(ghibliPeople);
      } else {
        const filteredArray = ghibliPeople.filter((person) => {
          return e.target.value === person.species;
        });
        buildCharactersTable(filteredArray);
      }
    });
  }
};

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
      createChFilmDropDown(ghibliPeople);
      dropdownEventListeners(ghibliPeople);
      filterEventListeners(ghibliPeople);
      buildCharactersTable(ghibliPeople);
    });
};

function buildCharactersTable(ghibliPeople) {
  const tableBody = document.getElementById("t-body");
  tableBody.innerText = "";
  for (let i = 0; i < ghibliPeople.length; i++) {
    if (ghibliPeople[i].my_films != undefined) {
    }

    const tableRow = document.createElement("tr");

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

function createRadioButtons(speciesList) {
  const radioBox = document.getElementById("radioButtons");
  //   console.log(speciesList)

  for (let i = 0; i < speciesList.length; i++) {
    const radioOptions = document.createElement("div");
    radioOptions.setAttribute("class", "form-check");

    radioBox.appendChild(radioOptions);

    const inputOptions = document.createElement("input");
    inputOptions.setAttribute("class", "form-check-input");
    inputOptions.setAttribute("type", "radio");
    inputOptions.setAttribute("name", "speciesRadioButtons");
    inputOptions.setAttribute("id", speciesList[i].name);
    inputOptions.setAttribute("value", speciesList[i].name);

    const labelOptions = document.createElement("label");
    labelOptions.setAttribute("class", "form-check-label");
    labelOptions.setAttribute("for", speciesList[i].name);
    // labelOptions.setAttribute("value", speciesList[i].name);
    labelOptions.innerText = speciesList[i].name;
    // labelOptions.innerText = "\u00A0" + speciesList[i].name + "s";

    // labelOptions.appendChild(inputOptions);
    radioBox.appendChild(inputOptions);
    radioBox.appendChild(labelOptions);
  }
  const defaultRadio = document.createElement("div");
  const defaultOption = document.createElement("input");
  defaultOption.setAttribute("type", "radio");
  defaultOption.setAttribute("id", "defaultRadio");
  defaultOption.setAttribute("value", "defaultRadio");
  defaultOption.setAttribute("name", "speciesRadioButtons");
  const defaultLabel = document.createElement("label");
  defaultLabel.setAttribute("for", "defaultRadio");
  defaultLabel.innerText = "All";

  defaultRadio.append(defaultOption, defaultLabel);
  radioBox.appendChild(defaultRadio);
}

function createChFilmDropDown(ghibliPeople) {
  const dropdown = document.getElementById("searchDropdown");
  //! DROPDOWN RESET

  const filmArray = ghibliPeople.map((person) => {
    return person.my_films;
  });

  const uniqueFilmsArray = [...new Set(filmArray)];

  const defaultOption = document.createElement("option");
  defaultOption.setAttribute("selected", true);
  defaultOption.setAttribute("value", "default");
  defaultOption.innerText = "Search by Films...";
  defaultOption.setAttribute("placeholder", "Search By Films...");
  dropdown.appendChild(defaultOption);

  uniqueFilmsArray.forEach((filmName) => {
    // return person.my_films;

    const option = document.createElement("option");
    option.setAttribute("value", filmName);
    option.innerText = filmName;

    dropdown.appendChild(option);
  });
}

const dropdownEventListeners = (ghibliPeople) => {
  const filmSearch = document.getElementById("searchDropdown");

  filmSearch.addEventListener("change", (e) => {
    console.log(e.target.value);
    filterByDropDown(ghibliPeople);
  });
};

const filterByDropDown = (ghibliPeople) => {
  const filmSearch = document.getElementById("searchDropdown");
  const defaultOption = "Search by Films...";
  let filmSearchValue = filmSearch.value;

  if (filmSearchValue === "default") {
    buildCharactersTable(ghibliPeople);
  } else {
    const filteredArray = ghibliPeople.filter((person) => {
      return filmSearchValue === person.my_films;
    });
    buildCharactersTable(filteredArray);
  }
};

getPeople();
