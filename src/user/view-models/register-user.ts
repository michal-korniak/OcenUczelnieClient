import { RegisterUserModel } from "../models/register-user-model";
import { ValidationControllerFactory, ValidationRules, ValidationController } from "aurelia-validation";
import { autoinject } from "aurelia-dependency-injection";
import { RegisterUserValidator } from "../validators/register-user-validator";

@autoinject()
export class RegisterUser
{
    validationController: ValidationController;
    model:RegisterUserModel;
    constructor(controllerFactory: ValidationControllerFactory, registerUserValidator: RegisterUserValidator)
    {
        this.model=new RegisterUserModel();
        this.validationController=controllerFactory.createForCurrentScope();
        registerUserValidator.validate(this.model);
    }
    register()
    {
        console.log(this.model);
    }
}