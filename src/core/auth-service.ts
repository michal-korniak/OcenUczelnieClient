import { AuthModel } from "./models/auth-model";




export class AuthService {
    private rememberMe: boolean = true;
    
    private key: string="authToken";
    private expiresKey: string='expiresTokenTime';

    constructor()
    {
        this.rememberMe=true;
    }

    private get storage() { return this.rememberMe ? localStorage : sessionStorage };

    public setToken(authModel: AuthModel)
    {
        this.storage.setItem(this.key,authModel.token);
        this.storage.setItem(this.expiresKey,authModel.expires);
    }
    public getToken()
    {
        return this.storage.getItem(this.key);
    }
    public getExpiresTime(): number
    {
        return parseInt(this.storage.getItem(this.expiresKey));
    }
    public removeToken()
    {
        this.storage.removeItem(this.key);
        this.storage.removeItem(this.expiresKey);
    }

}