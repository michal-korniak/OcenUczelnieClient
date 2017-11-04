import { RegisterUserModel } from "../models/register-user-model";
import { ValidationControllerFactory, ValidationRules, ValidationController } from "aurelia-validation";
import { autoinject } from "aurelia-dependency-injection";
import { RegisterUserValidator } from "../validators/register-user-validator";
import { UserService } from "../services/user-service";
import { Router } from 'aurelia-router';
import { Toastr } from "../../core/taostr";

@autoinject()
export class RegisterUser {
    validationController: ValidationController;
    model: RegisterUserModel;
    userService: UserService;

    constructor(controllerFactory: ValidationControllerFactory, registerUserValidator: RegisterUserValidator,
        userService: UserService, private router: Router, private toastr: Toastr)
        {
        this.model=new RegisterUserModel();
        this.userService = userService;

        this.validationController = controllerFactory.createForCurrentScope();
        registerUserValidator.validate(this.model);
    }
    async register() {
        console.log(this.model);
        try {
            await this.userService.registerUser(this.model);
        }
        catch (ex) {
            let error: Error = ex;
            this.toastr.error(error.message);
            return;
        }
        this.toastr.success("Zarejestrowano!");
        this.router.navigate("#/user/login");


    }
}