import { recipes } from "../../data/recipes";
import { FiltersModel } from "../js/model/filtersModel";
import { RecipeModel } from "../js/model/RecipeModel";

export default class Api {

    filters: FiltersModel;

    constructor(filters:FiltersModel) { 
        this.filters = filters;
    }

    getRecipes(): Array<RecipeModel> {
        return this.filterRecipesByAvancedFilters(this.filterRecipesBySearchName(recipes));
     }

    filterRecipesBySearchName(recipesToFilter: Array<RecipeModel>): Array<RecipeModel> { 

        return recipesToFilter.filter((recipe: RecipeModel) => {

            // search bar filter 
            if (this.filters['search'].length > 2) {
                if (
                    !recipe.name.toLowerCase().includes(this.filters['search'].toLowerCase())
                    && !recipe.description.toLowerCase().includes(this.filters['search'].toLowerCase())
                    && !recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(this.filters['search'].toLowerCase()))
                ) {
                    return false;
                }
            }
            return recipe;
        });
    }

    filterRecipesByAvancedFilters(recipesToFilter: Array<RecipeModel>): Array<RecipeModel> { 
        return recipesToFilter.filter((recipe: RecipeModel) => {
             // ingredients filter
        if (this.filters['ingredients'].length > 0) {
            let filterIngredient = "";
            for (filterIngredient of this.filters['ingredients']) {

                let recipeHaveIngredient = false;
                for (const recipeIngredient of recipe.ingredients) { 
                    if (recipeIngredient.ingredient.toLowerCase() == filterIngredient.toLowerCase()) {
                        recipeHaveIngredient = true;
                    }
                }
                if (!recipeHaveIngredient) {
                    return false;
                }
            }
        }

        if (this.filters['ustensils'].length > 0) {
            let filterUstensils = "";
            for (filterUstensils of this.filters['ustensils']) {

                let recipeHaveUstensil = false;
                for (const recipeUstensil of recipe.ustensils) { 
                    if (recipeUstensil.toLowerCase() == filterUstensils.toLowerCase()) {
                        recipeHaveUstensil = true;
                    }
                }
                if (!recipeHaveUstensil) {
                    return false;
                }
            }
        }

        if (this.filters['appliances'].length > 0) { 
            let filterAppliance = "";
            for (filterAppliance of this.filters['appliances']) { 
                if (recipe.appliance.toLowerCase() !== filterAppliance.toLowerCase()) {
                    return false;
                }
            }
        }

        return recipe;
        });
    }
}