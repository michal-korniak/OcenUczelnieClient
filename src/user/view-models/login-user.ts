import { ValidationControllerFactory, ValidationController } from "aurelia-validation";
import { autoinject } from "aurelia-dependency-injection";
import { LoginUserModel } from "../models/login-user-model";
import { LoginUserValidator } from "../validators/login-user-validator";

@autoinject()
export class LoginUser {
    validationController: ValidationController;
    model: LoginUserModel;
    constructor(controllerFactory: ValidationControllerFactory, loginUserValidator: LoginUserValidator) {
        this.model = new LoginUserModel();
        this.validationController = controllerFactory.createForCurrentScope();
        loginUserValidator.validate(this.model);
    }
    login() {
        console.log(this.model);
    }
}