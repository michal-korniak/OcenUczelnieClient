import { DataService } from "../../core/data-service";
import { AuthService } from "../../core/auth-service";
import { HttpClient } from "aurelia-fetch-client";
import { UniversityModel } from "../models/university-model";
import { autoinject } from "aurelia-dependency-injection";

@autoinject()
export class UniversityService extends DataService
{
    constructor(authService: AuthService, httpClient: HttpClient)
    {
        super(httpClient,authService);
    }
    async browseAll(): Promise<UniversityModel[]>
    {
        return await super.get<UniversityModel[]>("university",false);
    }
}