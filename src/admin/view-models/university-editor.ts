import { UniversityService } from "../../universities/services/university-service";
import { Router } from "aurelia-router";
import { NewUniversityModel } from "../../universities/models/new-university-model";
import { Toastr } from "../../core/taostr";
import { autoinject } from "aurelia-framework";
import { ApiError } from "../../core/models/api-error";
import { ValidationControllerFactory, ValidationController } from "aurelia-validation";
import { AddUniversityValidator } from '../validators/add-university-validator'

@autoinject
export class UniversityEditor {

    selectedFiles: FileList;
    model: NewUniversityModel;
    validationController: ValidationController;
    

    constructor(private universityService: UniversityService, private router: Router, private toastr: Toastr,
        controllerFactory: ValidationControllerFactory, addUniversityValidator: AddUniversityValidator) {

        this.model = new NewUniversityModel();
        this.validationController = controllerFactory.createForCurrentScope();
        addUniversityValidator.validate(this.model);

    }
    refreshImage() {

        var file = this.selectedFiles[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        var _this = this;
        reader.onloadend = function () {
            var base64result: string = reader.result;
            _this.model.base64Image = base64result.split(',')[1];
            var src = document.getElementById("logoPreview").setAttribute('src',
                `data:image/png;base64,${_this.model.base64Image}`);
        }
    }
    async submit() {
        if (this.model.base64Image == null) {
            this.toastr.error("Nie wybrano loga.");
            return;
        }
        try {
            await this.universityService.addUniversity(this.model);
            this.router.navigate("#/home");
        }
        catch (ex) {
            let error: ApiError = ex;
            if (error.code == 'name_occupied')
                this.toastr.error("Uczelnia o podanej nazwie już istnieje.");
        }



    }
}