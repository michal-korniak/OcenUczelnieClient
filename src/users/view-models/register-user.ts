import { RegisterUserModel } from "../models/register-user-model";
import { ValidationControllerFactory, ValidationRules, ValidationController } from "aurelia-validation";
import { autoinject } from "aurelia-dependency-injection";
import { RegisterUserValidator } from "../validators/register-user-validator";
import { UserService } from "../services/user-service";
import { Router } from 'aurelia-router';
import { Toastr } from "../../core/taostr";
import { ApiError } from "../../core/models/api-error";

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
            var user=await this.userService.registerUser(this.model);
        }
        catch (ex) {
            let error: ApiError = ex;
            if(error.code=='email_occupied')
                this.toastr.error("Użytkownik z podanym adresem email już istnieje.");
            else if(error.code=='name_occupied')
            this.toastr.error("Użytkownik z podaną nazwą już istnieje.");
            return;
        }
        this.toastr.success("Na podany adres został wysłany kod aktywacyjny.");
        this.userService.generateConfirmToken(user.id);
        this.router.navigate(`#/user/activate/${user.id}`);


    }
}