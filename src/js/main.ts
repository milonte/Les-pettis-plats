// Import our custom CSS
import '../scss/main.scss';

// Import all of Bootstrap's JS
import 'bootstrap';
import { recipes } from '../../data/recipes';
import KeyFilter from './components/KeyFilterButton';
import KeyFilterPill from './components/KeyFilterPill';

const filtersResultsSections: HTMLElement = document.getElementById("filters-results");
const filtersButtonsSections: HTMLElement = document.getElementById("filters-buttons");

const ingredients : Array<string> = [];
const appliances : Array<string> = [];
const ustensils : Array<string> = [];

recipes.forEach(recipe => { 
    recipe.ingredients.forEach(ingredient => {
        !ingredients.includes(ingredient.ingredient) ? ingredients.push(ingredient.ingredient) : null;
    });
    !appliances.includes(recipe.appliance) ? appliances.push(recipe.appliance) : null;
    recipe.ustensils.forEach(ustensil => {
        !ustensils.includes(ustensil) ? ustensils.push(ustensil) : null;
    });
});


/*
    Filters Buttons
*/
const ingredientsFilter = new KeyFilter("ingredients", ingredients, drawPillCallback).getDOMElement();
const appliancesFilter = new KeyFilter("appliances", appliances, drawPillCallback).getDOMElement();
const ustensilsFilter = new KeyFilter("ustensils", ustensils, drawPillCallback).getDOMElement();

filtersButtonsSections.appendChild(ingredientsFilter);
filtersButtonsSections.appendChild(appliancesFilter);
filtersButtonsSections.appendChild(ustensilsFilter);


/* 
    Filters Pills
*/
function drawPillCallback(type: string, value: string) {
        const pillArleadyDrawn = document.querySelector(`.${type}-filter-pill[data-value="${value}"]`);

        if (pillArleadyDrawn) {
            return;
        } else {

        const pillButtonElement = new KeyFilterPill(type, value).getDOMElement();

        filtersResultsSections.appendChild(pillButtonElement);
    }


}