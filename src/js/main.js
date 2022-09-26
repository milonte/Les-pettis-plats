// Import our custom CSS
import '../scss/main.scss';
// Import all of Bootstrap's JS
import 'bootstrap';
import { recipes } from '../../data/recipes';
import KeyFilter from './components/KeyFilterButton';
import KeyFilterPill from './components/KeyFilterPill';
const filtersResultsSections = document.getElementById("filters-results");
const filtersButtonsSections = document.getElementById("filters-buttons");
const ingredients = [];
const appliances = [];
const ustensils = [];
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
function drawPillCallback(type, value) {
    const pillArleadyDrawn = document.querySelector(`.${type}-filter-pill[data-value="${value}"]`);
    if (pillArleadyDrawn) {
        return;
    }
    else {
        const pillButtonElement = new KeyFilterPill(type, value).getDOMElement();
        filtersResultsSections.appendChild(pillButtonElement);
    }
}
