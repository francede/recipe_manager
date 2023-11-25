import PocketBase, { ListResult, RecordListQueryParams } from 'pocketbase';
import { RecipeRecord, RecipeResponse, TagRecord, UsersResponse } from './pocketbase-types';

export class PocketBaseService{
    static readonly PB_HOST = 'http://127.0.0.1:8090';
    static readonly PB_FILES = '/api/files'
    static readonly PB_RECIPE = '/recipe'
    static readonly pb: PocketBase = new PocketBase('http://127.0.0.1:8090');
    static{
        this.pb.autoCancellation(false);
    }

    static async register(username: string, password: string, passwordConfirm: string){
        return this.pb.collection('users').create({
            username,
            password,
            passwordConfirm
        })
    }

    static async login(username: string, password: string){
        return this.pb.collection('users').authWithPassword(username, password)
    }

    static async logout(){
        return this.pb.authStore.clear();
    }

    static async getRecipe(id: string): Promise<RecipeResponse<UsersResponse>>{
        return await this.pb.collection('recipe').getOne(id, {expand: 'owner'});
    }

    static async createRecipe(fields: RecipeRecord, image: File): Promise<RecipeResponse>{
        const formData = new FormData();
        formData.append('name', fields.name);
        fields.description && formData.append('description', fields.description);
        this.pb.authStore.model?.id && formData.append('owner', this.pb.authStore.model?.id);
        image && formData.append('image', image);

        return this.pb.collection('recipe').create(formData);
    }

    static async putRecipe(id: string, fields: RecipeRecord, image: File): Promise<RecipeResponse>{
        const formData = new FormData();
        formData.append('name', fields.name)
        fields.description && formData.append('description', fields.description);
        image && formData.append('image', image)
        return this.pb.collection('recipe').update(id, formData)
    }

    static async getTags(): Promise<ListResult<TagRecord>>{
        return await this.pb.collection('tag').getList();
    }

    static async getTagsStartingWith(startWith: string): Promise<ListResult<TagRecord>>{
        const params: RecordListQueryParams = {}
        startWith && (params.filter = 'name~"' + startWith.toLowerCase() + '%"');
        params.sort = '+name';
        return await this.pb.collection('tag').getList(undefined, undefined, params);
    }
}