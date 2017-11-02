import { AuthModel } from "../user/models/auth-model";


export class AuthService {
    private rememberMe: boolean = true;
    
    private key: string="authToken"

    constructor()
    {
        this.rememberMe=true;
    }

    private get storage() { return this.rememberMe ? localStorage : sessionStorage };

    public setToken(authModel: AuthModel)
    {
        this.storage.setItem(this.key,authModel.token);
    }
    public getToken(): string
    {
        return this.storage.getItem(this.key);
    }
    public removeToken()
    {
        this.storage.removeItem(this.key);
    }
}