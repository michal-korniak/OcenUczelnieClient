import { UniversityService } from "../../universities/services/university-service";
import { UniversityModel } from "../../universities/models/university-model";
import { autoinject } from "aurelia-framework";
import { UniversityDetailsModel } from "../../universities/models/university-details-model";
import { CourseModel } from "../../courses/models/course-model";
import {Department} from '../models/department-model';


@autoinject()
export class CourseEditor {

    departments:Department[];
    constructor(private universityService: UniversityService) { }
    async activate(params: any) {
        let universityModel: UniversityDetailsModel = await this.universityService.getDetails(params.universityId);
        let courses: CourseModel[]=universityModel.courses;
        this.departments=Department.createArrayFromCourseModels(courses);
        console.log(this.departments);
    }
}