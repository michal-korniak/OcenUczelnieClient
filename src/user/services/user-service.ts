import { DataService } from "../../core/data-service";
import { RegisterUserModel } from "../models/register-user-model";
import {HttpClient} from 'aurelia-fetch-client'
import { autoinject } from "aurelia-dependency-injection";

@autoinject()
export class UserService extends DataService
{
    constructor(httpClient: HttpClient)
    {
        super(httpClient);
    }
    async registerUser(model: RegisterUserModel)
    {
        await super.post('user/register',model);
    }
}