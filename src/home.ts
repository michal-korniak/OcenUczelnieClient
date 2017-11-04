import { autoinject } from "aurelia-dependency-injection";
import { UniversityService } from "./universities/services/university-service";
import { UniversityModel } from "./universities/models/university-model";



@autoinject()
export class Home {
    universites: UniversityModel[];
    constructor(private universityService: UniversityService) {
    }
    async activate() {
        this.universites = await this.universityService.browseAll();
        console.log(this.universites[0]);
    }

}