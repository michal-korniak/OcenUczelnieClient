import { AuthService } from "./auth-service";
import { DataService } from "./data-service";
import { HttpClient } from "aurelia-fetch-client";
import { autoinject } from "aurelia-dependency-injection";
import { IdentityModel } from "./models/identity-model";
import { AureliaConfiguration } from "aurelia-configuration";

@autoinject()
export class IdentityService extends DataService {
    identityModel: IdentityModel;

    constructor(httpClient:HttpClient,authService:AuthService, config: AureliaConfiguration)
    {
        super(httpClient,authService,config);
    }
    public async getIdentityModel(): Promise<IdentityModel> {

        if (this.identityModel == null || this.isUserLogged()) {
            await this.reloadIdentityModel();
        }
        return this.identityModel;
    }
    public async reloadIdentityModel() {
        try {
            this.identityModel = await super.get<IdentityModel>("user/current_user", true);
        }
        catch (ex) {
            this.identityModel = null;
        }
    }
    public isUserLogged(): boolean {
        let expireTime: number = this.authService.getExpiresTime();

        if (isNaN(expireTime) || expireTime < Date.now())
            return false;
        return true;
    }


}