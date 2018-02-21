import { UniversityService } from "../../universities/services/university-service";
import { Router } from "aurelia-router";
import { Toastr } from "../../core/taostr";
import { autoinject } from "aurelia-framework";
import { ApiError } from "../../core/models/api-error";
import { ValidationControllerFactory, ValidationController } from "aurelia-validation";
import { FormUniversityValidator } from '../validators/form-university-validator'
import { FormUniversityModel } from "../../universities/models/form-university-model";
import { UniversityDetails } from "../../universities/view-models/university-details";
import { UniversityDetailsModel } from "../../universities/models/university-details-model";

@autoinject
export class UniversityForm {

    selectedFiles: FileList;
    model: FormUniversityModel;
    editorMode: boolean;
    validationController: ValidationController;
    previewSrc: string;

    constructor(private universityService: UniversityService, private router: Router, private toastr: Toastr,
        private controllerFactory: ValidationControllerFactory, private addUniversityValidator: FormUniversityValidator) { }
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
        this.model = new FormUniversityModel();
        var university: UniversityDetailsModel = await this.universityService.getDetails(id);
        this.model.id=id;
        this.model.name = university.name;
        this.model.place = university.place;
        this.model.shortcut = university.shortcut;
        this.previewSrc=`https://process.filestackapi.com/AhTgLagciQByzXpFGRI0Az/resize=width:200,height:200/${university.imagePath}`;

    }
    setCreateMode() {
        this.editorMode=false;
        this.model = new FormUniversityModel();
        this.previewSrc="http://via.placeholder.com/200x200";
    }
    refreshImage() {

        var file = this.selectedFiles[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        var _this = this;
        reader.onloadend = function () {
            var base64result: string = reader.result;
            _this.previewSrc=base64result;
            _this.model.base64Image = base64result.split(',')[1];
        }
    }
    async submit() {
        if (this.editorMode==false && this.model.base64Image == null) {
            this.toastr.error("Nie wybrano loga.");
            return;
        }
        try {
            console.log(this.model);
            document.getElementById("submitBtn").setAttribute("disabled","");
            if(this.editorMode==true)
                await this.universityService.updateUniversity(this.model);
            else
                await this.universityService.addUniversity(this.model)

            this.router.navigate("#/admin");
        }
        catch (ex) {
            let error: ApiError = ex;
            if (error.code == 'name_occupied')
                this.toastr.error("Uczelnia o podanej nazwie już istnieje.");
        }
    }
}