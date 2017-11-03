import { IdentityService } from "./core/identity-service";
import { autoinject } from "aurelia-dependency-injection";

@autoinject()
export class Home
{
    userName: string;
    constructor(private identityService: IdentityService)
    {
        
    }
    async activate()
    {
        if(this.identityService.isUserLogged())
            this.userName=(await this.identityService.getIdentityModel()).name;
    }
}