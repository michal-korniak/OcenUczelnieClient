import {ValidationRules} from 'aurelia-validation'
import {NewUniversityModel} from '../../universities/models/new-university-model'

export class AddUniversityValidator
{
    validate(model: NewUniversityModel)
    {
        ValidationRules
        .ensure((m:NewUniversityModel)=>m.name)
            .required().withMessage("Nazwa jest wymagana.")
            .minItems(6).withMessage("Nazwa jest za krótka.")
        .ensure((m:NewUniversityModel)=>m.place)
            .required().withMessage("Miasto jest wymagane.")
        .on(model);
    }
}