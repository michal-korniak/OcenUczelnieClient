import { DataService } from "../../core/data-service";
import { AuthService } from "../../core/auth-service";
import { HttpClient } from "aurelia-fetch-client";
import { UniversityModel } from "../models/university-model";
import { autoinject } from "aurelia-dependency-injection";
import { CourseModel } from "../../courses/models/course-model";
import { UniversityDetailsModel } from "../models/university-details-model";
import {NewUniversityModel} from "../models/new-university-model";
import {UpdateCoursesModel} from "../models/update-courses-model";

@autoinject()
export class UniversityService extends DataService
{
    constructor(authService: AuthService, httpClient: HttpClient)
    {
        super(httpClient,authService);
    }
    async browseAll(): Promise<UniversityModel[]>
    {
        return await super.get<UniversityModel[]>("university",false);
    }
    async getDetails(universityId: string): Promise<UniversityDetailsModel>
    {
        return await super.get<UniversityDetailsModel>(`university/${universityId}`,false);
    }
    async addUniversity(newUniversity: NewUniversityModel)
    {
        await super.post('university/add_university',true,newUniversity);
    }
    async updateCourses(updateCourses: UpdateCoursesModel)
    {
        await super.put('university/update_courses',true,updateCourses);
    }
}