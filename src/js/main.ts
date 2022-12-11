// Import our custom CSS
import '../scss/main.scss';

// Import all of Bootstrap's JS
import 'bootstrap';
import KeyFilterButton from './components/KeyFilterButton';
import KeyFilterPill from './components/KeyFilterPill';
import RecipeCard from './components/RecipeCard';
import { RecipeModel } from './model/RecipeModel';
import { FiltersModel } from './model/filtersModel';
import Api from '../api/Api';
import formatFilterName from './services/formatFilterName';

const filtersResultsSections: HTMLElement | null = document.getElementById("filters-results");
const filtersButtonsSections: HTMLElement | null = document.getElementById("filters-buttons");
const recipesSection: HTMLElement | null = document.getElementById("recipes-container");

const recipeSearch: HTMLElement | null = document.getElementById("recipe-search");

const filters: FiltersModel = {
    'search': '',
    'ingredients': [],
    'appliances': [],
    'ustensils': []
};

/**
 * Add filter to recipe filters list
 * and display corresponding recipes
 * @param key type of filter
 * @param value value of filter
 */
function addRecipeFilter(key: string, value: string): void {
    if ('search' == key) {
        filters['search'] = value;
    } else if ('ingredients' == key && !filters['ingredients'].includes(value)) {
        filters['ingredients'].push(value);
    } else if ('appliances' == key && !filters['appliances'].includes(value)) {
        filters['appliances'].push(value);
    } else if ('ustensils' == key && !filters['ustensils'].includes(value)) {
        filters['ustensils'].push(value);
    }

    displayRecipes();
}

/**
 * Remove filter from recipe filters list
 * and display corresponding recipes
 * @param key type of filter
 * @param value value of filter
 */
function removeRecipeFilter(key: string, value: string): void {
    if ('ingredients' == key && filters['ingredients'].includes(value)) {
        filters['ingredients'].splice(filters['ingredients'].indexOf(value), 1);
    } else if ('appliances' == key && filters['appliances'].includes(value)) {
        filters['appliances'].splice(filters['appliances'].indexOf(value), 1);
    } else if ('ustensils' == key && filters['ustensils'].includes(value)) {
        filters['ustensils'].splice(filters['ustensils'].indexOf(value), 1); 
    }

    displayRecipes();
    
}

/**
 * Get recipes corresponding to filters
 * @returns {Array<RecipeModel>}
 */
function getRecipes(): Array<RecipeModel> {
    const api = new Api(filters);
    const recipesToDisplay = api.getRecipes();
    /* update filters buttons */
    displayFiltersButtons(recipesToDisplay);

    return recipesToDisplay;
}

/**
 * Display Recipes Cards
 */
function displayRecipes(): void {
    const recipes = getRecipes();
    // remove all cards from recipes section
    if (recipesSection) {
        recipesSection.innerHTML = "";
    }
    // display message if no recipe to display
    if (recipes.length <= 0) {
        const noResultDiv = document.createElement("div");
        noResultDiv.innerHTML = '« Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc';
        recipesSection?.appendChild(noResultDiv);
    }
    // siplay recipes in recipes section
    else {
        recipes.forEach((recipe: RecipeModel) => { 
            const recipeCard = new RecipeCard(recipe).getDOMElement();
        
            recipesSection?.appendChild(recipeCard);
        });
    }
}

/**
 * display / update avanced filters buttons
 * @param recipes List of displayed recipes
 */
function displayFiltersButtons(recipes: Array<RecipeModel>) {
    const ingredients : Array<string> = [];
    const appliances : Array<string> = [];
    const ustensils: Array<string> = [];

    // update filters to show from displayed recipes
    // ingredients filters
    recipes.forEach((recipe: RecipeModel) => {
        recipe.ingredients.forEach(ingredient => {
            if (!ingredients.includes(formatFilterName(ingredient.ingredient))) {

                /* check if ingredient don't exists as plural
                ex : if "Banane" exists, "Bananes" does not push */
                if ("S" == formatFilterName(ingredient.ingredient)[ingredient.ingredient.length - 1].toUpperCase()
                    && ingredients.includes(formatFilterName(ingredient.ingredient).slice(0, ingredient.ingredient.length - 1))) {
                    return;
                } else {
                    ingredients.push(formatFilterName(ingredient.ingredient));
                }
            }
        });
        // appliances filters
        !appliances.includes(formatFilterName(recipe.appliance)) ? appliances.push(formatFilterName(recipe.appliance)) : null;
        // ustensils filters
        recipe.ustensils.forEach(ustensil => {
            !ustensils.includes(formatFilterName(ustensil)) ? ustensils.push(formatFilterName(ustensil)) : null;
        });
    });

    // display filters buttons, alphabeticaly sorted
    const ingredientsFilter = new KeyFilterButton("ingredients", ingredients.sort(), drawPillOnClick).getDOMElement();
    const appliancesFilter = new KeyFilterButton("appliances", appliances.sort(), drawPillOnClick).getDOMElement();
    const ustensilsFilter = new KeyFilterButton("ustensils", ustensils.sort(), drawPillOnClick).getDOMElement();
    if (filtersButtonsSections) {
        filtersButtonsSections.innerHTML = "";
        filtersButtonsSections.appendChild(ingredientsFilter);
        filtersButtonsSections.appendChild(appliancesFilter);
        filtersButtonsSections.appendChild(ustensilsFilter);
    }
}

/**
 * Display filters pills on click on filter button list
 * Used in KeyFilterButton as callback
 * @param type type of filter
 * @param value value of filter
 */
function drawPillOnClick(type: string, value: string) {
    // if no pill with same name already displayed, display new one
    const pillArleadyDrawn = document.querySelector(`.${type}-filter-pill[data-value="${value}"]`);
    if (pillArleadyDrawn) {
        return;
    } else {
        const pillButtonElement = new KeyFilterPill(type, value, removeRecipeFilter).getDOMElement();
        filtersResultsSections?.appendChild(pillButtonElement);
        // add filter to global filters, then update displayed recipes
        addRecipeFilter(type, value);
    }
}

// init
// diplay all recipes, no filters
displayRecipes();

// update search filter (then filter and display filtered recipes) on search input changes
recipeSearch?.addEventListener('input', (e : any) => {
    const searchValue: string = e.target.value;
    addRecipeFilter('search', formatFilterName(searchValue));
    displayRecipes();
});


    
