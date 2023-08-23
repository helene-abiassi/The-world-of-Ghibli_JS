const getPeople = () => {
  const url2 = "https://ghibliapi.vercel.app/people";
  fetch(url2)
    .then((response2) => {
      return response2.json();
    })
    .then((result2) => {
      const ghibliPeople = result2;
      fetchSpecies(ghibliPeople);

      // buildCharactersTable(ghibliPeople);
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
      getChFilms(ghibliPeople);
    });
};

getPeople();

function buildCharactersTable(ghibliPeople) {
  console.log(ghibliPeople);
  const tableBody = document.getElementById("t-body");
  for (let i = 0; i < ghibliPeople.length; i++) {
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

    const peopleEye = document.createElement("td");
    peopleEye.innerText = ghibliPeople[i].eye_color;

    const peopleHair = document.createElement("td");
    // const peopleHairColor = document.createElement("span");
    // peopleHairColor.setAttribute("style", "background-color:");
    peopleHair.innerText = ghibliPeople[i].hair_color;

    const peopleFilm = document.createElement("td");
    peopleFilm.innerHTML = ghibliPeople[i].my_films + "PLEASE";
    // const filmImage = document.createElement("img");
    // image.setAttribute("src", ghibliPeople[i].my_films);
    // image.setAttribute("class", "card-image-top");
    // peopleFilm.appendChild(filmImage);

    tableRow.appendChild(peopleImageRow);
    // tableRow.appendChild(peopleImage);
    tableRow.appendChild(peopleName);
    tableRow.appendChild(peopleSpecie);
    tableRow.appendChild(peopleEye);
    tableRow.appendChild(peopleHair);
    tableRow.appendChild(peopleFilm);

    // tableRow.appendChild(filmImage);

    tableBody.appendChild(tableRow);
  }
}

const getChFilms = (ghibliPeople) => {
  const chLink = "https://ghibliapi.vercel.app/films/";
  fetch(chLink)
    .then((responseCh) => {
      let chList = responseCh.json();
      // console.log(chList);
      return chList;
    })
    .then((chFilmList) => {
      //   console.log("chFilmList", chFilmList);

      //! LOOP THROUGH THE chFilmList array to access [i] Objects and access the URL
      //! Do we want ghibliPeople[i].films == chFilmList[i][j--]
      // for (let i = 0; i < ghibliPeople.length; i++) {
      //   console.log(ghibliPeople[i]);
      // }

      for (let i = 0; i < ghibliPeople.length; i++) {
        // console.log(ghibliPeople[i].films);

        const myChFilmIDs = [];
        for (let h = 0; h < ghibliPeople[i].films.length; h++) {
          const slicedID = ghibliPeople[i].films[h].slice(35);

          myChFilmIDs.push(slicedID);
        }
        // console.log(myChFilmIDs);
        const myFilmsAfter = [];

        // console.log("myChFilmID", myChFilmIDs);
        for (let j = 0; j < chFilmList.length; j++) {
          const filmID = chFilmList[j].id; //!
          for (let e = 0; e < myChFilmIDs.length; e++) {
            if (myChFilmIDs[e] == filmID) {
              myFilmsAfter.push(chFilmList[j].title);
            }
          }
        }
        ghibliPeople[i].my_films = myFilmsAfter.toString();
        // myFilmsAfterString = myFilmsAfter.toString();
        // console.log("films After array", ghibliPeople[i].my_films);
        // console.log(ghibliPeople[0].my_films);
      }
    });

  buildCharactersTable(ghibliPeople);
};
