import { NavigationInstruction, Next } from "aurelia-router";
import { IdentityModel } from "./models/identity-model";
import { autoinject } from "aurelia-dependency-injection";
import { IdentityService } from "./identity-service";

@autoinject()
export class AuthorizeStep {
    constructor(private identityService: IdentityService)
    {
    }
    async run(navigationInstruction: NavigationInstruction, next: Next): Promise<any> {
        
        let model:IdentityModel=await this.identityService.getIdentityData();
        let role=model?model.role:null;
        let requiredRoles = navigationInstruction.getAllInstructions().map(i => i.config.settings.roles)[0];
        
        if(requiredRoles!=null && !requiredRoles.some(r=>r===role))
        {
            console.log('Unauthorized!');
            return next.cancel();
        }

        return next();
    }
}