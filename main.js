



// console.log('ghibliFilms :>> ', ghibliFilms);


function postFilmCards(){
    const cardsContainer=document.getElementById("cards-container");

    for (let i = 0; i < ghibliFilms.length; i++) {
        // console.log('ghibliFilms :>> ', ghibliFilms[i]);

        //CARD DIV

        const cardDiv=document.createElement("div");
        cardDiv.setAttribute("class", "card");
        cardDiv.setAttribute("style", "width: 15rem;")

        // console.log('cardDiv :>> ', cardDiv);

        //CARD IMAGE

        const image=document.createElement("img");
        image.setAttribute("src", ghibliFilms[i].image);
        image.setAttribute("alt", ghibliFilms[i].title);
        image.setAttribute("class", "card-image-top");
        cardDiv.appendChild(image);

        cardsContainer.appendChild(cardDiv);

        // console.log('image :>> ', image);

        //CARD BODY

        const cardBody=document.createElement("div");
        cardBody.setAttribute("class", "card-body");
        cardDiv.appendChild(cardBody);

        // console.log('cardBody :>> ', cardBody);

        //CARD TITLE

        const h5=document.createElement("h6")
        h5.classList.add("card-title");
        h5.innerText=ghibliFilms[i].title;
        cardBody.appendChild(h5);

        // console.log('ghibliFilms[i].title :>> ', ghibliFilms[i].title);

        //CARD TEXT

        const p=document.createElement("p");
        p.setAttribute("class", "card-text");
        p.innerText=ghibliFilms[i].description;
        cardBody.appendChild(p);

        //CARD BUTTON

        const a=document.createElement("a");
        a.setAttribute("class", "btn btn-primary")
        a.setAttribute("href", "people.html")
        a.innerText="Discover more"
        cardBody.appendChild(a)

    }

}

console.log(postFilmCards())