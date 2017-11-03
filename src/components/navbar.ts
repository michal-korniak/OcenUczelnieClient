import { IdentityService } from "../core/identity-service";

export class Navbar
{
    identityService: IdentityService;
    async activate(identityService: IdentityService)
    {
        this.identityService=identityService;  
    }
}