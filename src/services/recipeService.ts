import { WithId } from "mongodb";
import { MongoRepository, Recipe } from "./mongo/mongoRepository";

export default class RecipeService{
    static async getRecipe(id: string): Promise<WithId<Recipe> | null>{
        return MongoRepository.getRecipe(id);
    }

    static async getRecipes(){
    }
    /*

    static async addRecipe(fields: RecipeRecord, image: File){
        return PocketBaseService.createRecipe(fields, image);
        
    }

    static async updateRecipe(id: string, fields: RecipeRecord, image: File): Promise<Record<any, any>>{
        return PocketBaseService.putRecipe(id, fields, image);
    }

    static async deleteRecipe(id: string){
    }

    static async getTags(){
        return PocketBaseService.getTags();
    }

    static async getTagsStartingWith(startsWith: string){
        return PocketBaseService.getTagsStartingWith(startsWith);
    }
    */
}