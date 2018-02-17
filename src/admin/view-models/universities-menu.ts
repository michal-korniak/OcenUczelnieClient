import { UniversityService } from "../../universities/services/university-service";
import { UniversityModel } from "../../universities/models/university-model";
import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";

@autoinject()
export class UniversitiesMenu {
    universities: UniversityModel[];
    constructor(private universityService: UniversityService, private router: Router) {
    }
    async activate() {
        this.universities = await this.universityService.browseAll();
    }
    inovkeUniversityEditor(universityId: string) {
        this.router.navigate(`#/admin/university-editor/${universityId}`);
    }
    inovkeCoursesEditor(universityId) {
        this.router.navigate(`#/admin/courses-editor/${universityId}`);
    }
    invokeUniversityCreator() {
        this.router.navigate("#/admin/university-creator");
    }
    async removeUniversity(universityId: string, index: number) {
        if (confirm("Czy na pewno chcesz usunąć tę uczelnię?")) {
            await this.universityService.deleteUniversity(universityId);
            this.universities.splice(index,1);
        }
    }

}