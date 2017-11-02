import { DataService } from "../../core/data-service";
import { RegisterUserModel } from "../models/register-user-model";
import {HttpClient} from 'aurelia-fetch-client'
import { autoinject } from "aurelia-dependency-injection";
import { LoginUserModel } from "../models/login-user-model";
import { AuthModel } from "../models/auth-model";
import { AuthService } from "../../core/auth-service";

@autoinject()
export class UserService extends DataService
{
    constructor(httpClient: HttpClient, authService: AuthService)
    {
        super(httpClient,authService);
    }
    async registerUser(model: RegisterUserModel)
    {
        await super.post('user/register',false,model);
    }
    loginUser(model: LoginUserModel): Promise<AuthModel>
    {
        return super.post('user/login',false,model);
    }
}