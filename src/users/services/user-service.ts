import { DataService } from "../../core/data-service";
import { RegisterUserModel } from "../models/register-user-model";
import {HttpClient} from 'aurelia-fetch-client'
import { autoinject } from "aurelia-dependency-injection";
import { LoginUserModel } from "../models/login-user-model";

import { AuthService } from "../../core/auth-service";
import { AuthModel } from "../../core/models/auth-model";
import { UserModel } from "../models/user-model";

@autoinject()
export class UserService extends DataService
{
    constructor(httpClient: HttpClient, authService: AuthService)
    {
        super(httpClient,authService);
    }
    async registerUser(model: RegisterUserModel): Promise<UserModel>
    {
        return await super.post<UserModel>('user/register',false,model);
    }
    async loginUser(model: LoginUserModel): Promise<AuthModel>
    {
        return await super.post<AuthModel>('user/login',false,model);
    }
    logoutUser()
    {
        this.authService.removeToken();
    }
    async generateConfirmToken(userId: string)
    {
        await super.post(`user/generate_token/${userId}`,false);
    }
    async validateConfirmToken(userId: string, token: string)
    {
        await super.get(`user/validate_token/${userId}/${token}`);
    }
    async getUserDetailsById(userId: string): Promise<UserModel>
    {
        return await super.get<UserModel>(`user/${userId}`);
    }
    async getUserDetailsByEmail(email: string): Promise<UserModel>
    {
        return await super.get<UserModel>(`user/get_by_email/${email}`);
    }
    
}