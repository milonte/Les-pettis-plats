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
        card.classList.add('card', "col-xs-12", "col-sm-6", "col-lg-4", "mt-3", "p-2");

        const ingredientsDiv = document.createElement("div");
        ingredientsDiv.classList.add('recipe-ingredients');

        ingredients.forEach(ingr => {
            const ingrDiv = document.createElement("div");

            for (const [key, value] of Object.entries(ingr)) {

                const span = document.createElement("span");
                span.classList.add('recipe-' + key);

                if ("unit" == key && "grammes" == value) {
                    span.innerHTML = "g";
                } else {
                    span.innerHTML = value;
                }

                ingrDiv.appendChild(span);
            }
            ingredientsDiv.appendChild(ingrDiv);
        });

        card.innerHTML = `
            <div class="card-header p-0">
                <img class="card-img-top img-fluid" src="https://via.placeholder.com/400" alt="${name}" width="400" height="400">
            </div>
            <div class="card-body">
                <div class="col">
                    <div class="d-flex row align-items-center">
                        <div class="col-8">
                            <h5 class="card-title d-flex  text-nowrap text-truncate justify-content-between recipe-name">
                                ${name}
                            </h5>
                        </div>
                        <div class="col-4 recipe-time">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-stopwatch" viewBox="0 0 20 20">
                                <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z"/>
                                <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z"/>
                            </svg>
                            ${time} min
                        </div>
                    </div>
                    <div class="row mt-1">
                        <div class="col-5 recipe-ingredient">
                            ${ingredientsDiv.innerHTML}
                        </div>
                        <div class="col-7 recipe-description">
                            ${description.length > 200 ? description.slice(0, 197) + '...' : description}
                        </div>
                    </div>
                </div>
            </div>
        `;

        return card;
    }
}
