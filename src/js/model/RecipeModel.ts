import { IngredientModel } from "./IngredientModel";

export interface RecipeModel {
    id: number;
    name: string;
    servings: number;
    ingredients: IngredientModel[];
    time: number;
    description: string;
    appliance: string;
    ustensils: Array<string>;
}