import { ValidationControllerFactory, ValidationController } from "aurelia-validation";
import { autoinject } from "aurelia-dependency-injection";
import { LoginUserModel } from "../models/login-user-model";
import { LoginUserValidator } from "../validators/login-user-validator";
import { UserService } from "../services/user-service";
import { AuthModel } from "../models/auth-model";
import { Toastr } from "../../core/taostr";
import { AuthService } from "../../core/auth-service";
import { IdentityService } from "../../core/identity-service";
import { IdentityModel } from "../../core/models/identity-model";

@autoinject()
export class LoginUser {
    validationController: ValidationController;
    model: LoginUserModel;
    constructor(controllerFactory: ValidationControllerFactory, loginUserValidator: LoginUserValidator,
        private userService: UserService, private toastr:Toastr, private authService:AuthService, private identityService: IdentityService) 
    {
        this.model = new LoginUserModel();
        this.validationController = controllerFactory.createForCurrentScope();
        loginUserValidator.validate(this.model);
    }
    async login() {
        let authModel: AuthModel;
        try{
            authModel=await this.userService.loginUser(this.model);
        }
        catch(ex)
        {
            let error: Error=ex;
            this.toastr.error(error.message);
            return;
        }
        this.authService.setToken(authModel);
        let model: IdentityModel=await this.identityService.getIdentityData()
        this.toastr.success(`Cześć ${model.name}!`,"");
        
    }
}