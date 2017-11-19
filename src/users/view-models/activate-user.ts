import { UserModel } from "../models/user-model";
import { UserService } from "../services/user-service";
import { autoinject } from "aurelia-framework";
import { Toastr } from "../../core/taostr";
import { Router } from "aurelia-router";
import { ApiError } from "../../core/models/api-error";

@autoinject()
export class ActivateUser
{
    token: string;
    user: UserModel;
    constructor(private userService:UserService, private toastr:Toastr, private router: Router) {
        
    }
    async activate(params: any)
    {
        this.user=await this.userService.getUserDetailsById(params.id);
    }
    async validate()
    {
        try{
        await this.userService.validateConfirmToken(this.user.id,this.token);
        }
        catch(err)
        {
            let error:ApiError=err;
            if(error.code=='token_expired')
            {
                this.toastr.error("Ważność twojego kodu skończyła się, na twój adres zostanie wysłany nowy.");
                this.generateNewToken();
            }
            else if(error.code=='invalid_token')
            {
                this.toastr.error("Podany kod nie jest poprawny.");
            }
            
            return;
        }
        this.toastr.success("Kod zweryfkowany prawidłowo, teraz możesz się zalogować!");
        this.router.navigate("#/user/login");
    }
    async generateNewToken()
    {
        await this.userService.generateConfirmToken(this.user.id);
        this.toastr.info("Na twój adres został wysłany nowy kod potwierdzający.");
    }
}