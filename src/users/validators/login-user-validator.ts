import {ValidationRules} from 'aurelia-validation'
import {LoginUserModel } from '../models/login-user-model';
export class LoginUserValidator
{
    validate(model: LoginUserModel)
    {
        ValidationRules
        .ensure((m:LoginUserModel)=>m.email)
            .required().withMessage("Email jest wymagany.")
            .email().withMessage("Email nie został zapisany poprawnie.")
        .ensure((m:LoginUserModel)=>m.password)
            .required().withMessage("Hasło jest wymagane.")
        .on(model);
    }
}