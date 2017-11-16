import { UserModel } from "../models/user-model";
import { UserService } from "../services/user-service";
import { autoinject } from "aurelia-framework";
import { Toastr } from "../../core/taostr";
import { Router } from "aurelia-router";

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
            let error:Error=err;
            this.toastr.error(error.message)
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