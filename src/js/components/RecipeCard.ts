import { RecipeModel } from "../model/RecipeModel";

export default class RecipeCard {

    data: RecipeModel;
    constructor(data: RecipeModel) {
        this.data = data;
    }

    /**
     * Returns the card of recipe
     * @returns 
     */
    getDOMElement() { 

        const { id, name, servings, ingredients, time, description, appliance, ustensils } = this.data;

        const card = document.createElement('div');
        card.classList.add('card', "col-sm-5", "col-lg-4");
        
        const cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header', 'p-0');

        const image = document.createElement('img');
        image.classList.add('card-img-top', 'img-fluid');
        image.src = "https://via.placeholder.com/400";

        cardHeader.appendChild(image);
        card.appendChild(cardHeader);

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title', 'd-flex' , 'justify-content-between');

        const titleDiv = document.createElement('div');
        titleDiv.innerText = name;
        
        const timeDiv = document.createElement('div');
        timeDiv.innerText = String(time);

        cardTitle.appendChild(titleDiv);
        cardTitle.appendChild(timeDiv);

        const cardText = document.createElement('p');
        cardText.classList.add('card-text', "row");

        cardBody.appendChild(cardTitle);
        card.appendChild(cardBody);

        return card;
    }
}