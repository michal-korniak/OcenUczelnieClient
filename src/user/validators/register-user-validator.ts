import {ValidationRules} from 'aurelia-validation'
import { RegisterUserModel } from '../models/register-user-model';
export class RegisterUserValidator
{
    validate(model: RegisterUserModel)
    {
        ValidationRules
        .ensure((m:RegisterUserModel)=>m.login)
            .required().withMessage("Login jest wymagany.")
        .ensure((m:RegisterUserModel)=>m.email)
            .required().withMessage("Email jest wymagany.")
            .email().withMessage("Email nie został zapisany poprawnie.")
        .ensure((m:RegisterUserModel)=>m.password)
            .required().withMessage("Hasło jest wymagane.")
            .minItems(6).withMessage("Hasło musi posiadać przynajmniej 6 znaków.")
        .ensure((m:RegisterUserModel)=>m.confirmPassword)
            .satisfies((value,model:RegisterUserModel)=>value==model.password).withMessage("Hasła nie są takie same.")
        .on(model);
    }
}