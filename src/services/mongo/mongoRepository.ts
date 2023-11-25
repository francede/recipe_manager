import { ObjectId } from "bson";
import { MongoClient, WithId } from "mongodb";

export class MongoRepository{
    static readonly MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
        static client: MongoClient;

    static{
        if(this.MONGO_CONNECTION_STRING){
            MongoRepository.client = new MongoClient(this.MONGO_CONNECTION_STRING);
            this.client.db("RecipeManager").collection<Recipe>("Recipes").findOne({_id: new ObjectId("655792bc9a7ca2b5f9d46615")}).then(
                x => console.log(x)
            )
        }
        
    }

    static async getRecipe(id: string): Promise<WithId<Recipe> | null>{
        return await this.client.db("RecipeManager").collection<Recipe>("Recipes").findOne({_id: new ObjectId(id)});
    }
}

export interface Recipe {
    name: string
    description: string
    image: string,
    owner: string,
    ingredients: Ingredient[]
    tags: string[]
}

export interface Ingredient{
    name: string
    amount: number
    unit: string
}