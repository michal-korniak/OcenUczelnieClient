import { AuthService } from "./auth-service";
import { DataService } from "./data-service";
import { HttpClient } from "aurelia-fetch-client";
import { autoinject } from "aurelia-dependency-injection";
import { IdentityModel } from "./models/identity-model";

@autoinject()
export class IdentityService extends DataService
{
    constructor(httpClient:HttpClient,authService: AuthService)
    {
        super(httpClient,authService);
    }
    public getIdentityData(): Promise<IdentityModel>
    {
        return super.get<IdentityModel>("user/details",true);
    }
}