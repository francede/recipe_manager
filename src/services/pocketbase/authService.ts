import { PocketBaseService } from "@/services/pocketbase/pocketbaseService";

export default class AuthService{
    static async register(username: string, password: string, passwordConfirm: string){
        return PocketBaseService.register(username, password, passwordConfirm);
    }

    static async login(username: string, password: string) {
        return PocketBaseService.login(username, password);
    }

    static async logout(){
        return PocketBaseService.logout();
    }

    static getUser() {
        return PocketBaseService.pb.authStore.model
    }
}