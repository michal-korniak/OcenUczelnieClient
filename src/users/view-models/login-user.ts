import { ValidationControllerFactory, ValidationController } from "aurelia-validation";
import { autoinject } from "aurelia-dependency-injection";
import { LoginUserModel } from "../models/login-user-model";
import { LoginUserValidator } from "../validators/login-user-validator";
import { UserService } from "../services/user-service";
import { Toastr } from "../../core/taostr";
import { AuthService } from "../../core/auth-service";
import { IdentityService } from "../../core/identity-service";
import { IdentityModel } from "../../core/models/identity-model";
import { Router } from "aurelia-router";
import { AuthModel } from "../../core/models/auth-model";
import { ApiError } from "../../core/models/api-error";

@autoinject()
export class LoginUser {
    validationController: ValidationController;
    model: LoginUserModel;
    constructor(controllerFactory: ValidationControllerFactory, loginUserValidator: LoginUserValidator,
        private userService: UserService, private toastr: Toastr, private authService: AuthService,
        private identityService: IdentityService, private router:Router) {
        this.model = new LoginUserModel();
        this.validationController = controllerFactory.createForCurrentScope();
        loginUserValidator.validate(this.model);
    }
    async login() {
        let authModel: AuthModel;
        try {
            authModel = await this.userService.loginUser(this.model);
        }
        catch (ex) {
            let error: ApiError = ex;
            if(error.code=="not_activated")
            {
                this.toastr.info("Przed zalogwaniem musisz aktywować swoje konto.");
                let user=await this.userService.getUserDetailsByEmail(this.model.email);
                this.router.navigate(`#/user/activate/${user.id}`);
                return;
            }
            else if(error.code=="invalid_credentials")
                this.toastr.error("Nieprawidłowe dane logowania.");
            return;
        }
        await this.authService.setToken(authModel);
        let model: IdentityModel = await this.identityService.getIdentityModel()
        window.location.reload(true);
        this.router.navigate("#/home",{ replace: true});

    }
}