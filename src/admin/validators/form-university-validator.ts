import {ValidationRules} from 'aurelia-validation'
import { FormUniversityModel } from '../../universities/models/form-university-model';

export class FormUniversityValidator
{
    validate(model: FormUniversityModel)
    {
        ValidationRules
        .ensure((m:FormUniversityModel)=>m.name)
            .required().withMessage("Nazwa jest wymagana.")
            .minItems(6).withMessage("Nazwa jest za krótka.")
        .ensure((m:FormUniversityModel)=>m.place)
            .required().withMessage("Miasto jest wymagane.")
        .on(model);
    }
}