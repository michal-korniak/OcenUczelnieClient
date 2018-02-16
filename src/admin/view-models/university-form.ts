import { UniversityService } from "../../universities/services/university-service";
import { Router } from "aurelia-router";
import { NewUniversityModel } from "../../universities/models/new-university-model";
import { Toastr } from "../../core/taostr";
import { autoinject } from "aurelia-framework";
import { ApiError } from "../../core/models/api-error";
import { ValidationControllerFactory, ValidationController } from "aurelia-validation";
import { AddUniversityValidator } from '../validators/add-university-validator'
import { EditUniversityModel } from "../../universities/models/edit-university-model";
import { UniversityDetails } from "../../universities/view-models/university-details";
import { UniversityDetailsModel } from "../../universities/models/university-details-model";

@autoinject
export class UniversityForm {

    selectedFiles: FileList;
    model: EditUniversityModel | NewUniversityModel;
    editorMode: boolean;
    validationController: ValidationController;


    constructor(private universityService: UniversityService, private router: Router, private toastr: Toastr,
        private controllerFactory: ValidationControllerFactory, private addUniversityValidator: AddUniversityValidator) { }
    async activate(params: any) {
        var id: string = params.id;
        if (id != null) {
            await this.setEditMode(id);
        }
        else
            this.setCreateMode();
        this.validationController = this.controllerFactory.createForCurrentScope();
        this.addUniversityValidator.validate(this.model);
    }


    async setEditMode(id: string) {
        this.editorMode=true;
        this.model = new EditUniversityModel();
        var university: UniversityDetailsModel = await this.universityService.getDetails(id);
        this.model.id=id;
        this.model.name = university.name;
        this.model.place = university.place;
        this.model.shortcut = university.shortcut;
        this.setBase64ImageFromUrl(university.imagePath);

    }
    setBase64ImageFromUrl(url:string)
    {
        var xhr = new XMLHttpRequest()
        xhr.open("GET", url);
        xhr.responseType = "blob";
        xhr.send();
        var _this = this;
        xhr.addEventListener("load", function () {
            var _this1 = _this;
            var reader = new FileReader();
            reader.readAsDataURL(xhr.response);
            reader.addEventListener("loadend", function () {
                _this1.model.base64Image=reader.result;
                _this1.model.base64Image=_this1.model.base64Image.split(',')[1];
            });
        });
    }

    setCreateMode() {
        this.model = new NewUniversityModel();
    }
    refreshImage() {

        var file = this.selectedFiles[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        var _this = this;
        reader.onloadend = function () {
            var base64result: string = reader.result;
            _this.model.base64Image = base64result.split(',')[1];
        }
    }
    async submit() {
        if (this.model.base64Image == null) {
            this.toastr.error("Nie wybrano loga.");
            return;
        }
        try {
            console.log(this.model);
            if(this.editorMode==true)
                await this.universityService.updateUniversity(this.model);
            else
                await this.universityService.addUniversity(this.model)

            this.router.navigate("#/home");
        }
        catch (ex) {
            let error: ApiError = ex;
            if (error.code == 'name_occupied')
                this.toastr.error("Uczelnia o podanej nazwie już istnieje.");
        }
    }
}