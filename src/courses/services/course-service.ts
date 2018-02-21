import { DataService } from "../../core/data-service";
import { autoinject } from "aurelia-dependency-injection";
import { AuthService } from "../../core/auth-service";
import {HttpClient} from 'aurelia-fetch-client'
import { CourseModel } from "../models/course-model";
import { AureliaConfiguration } from "aurelia-configuration";
@autoinject()
export class CourseService extends DataService
{
    constructor(httpClient:HttpClient,authService:AuthService, config: AureliaConfiguration)
    {
        super(httpClient,authService,config);
    }
    async getDetails(courseId: string): Promise<CourseModel>
    {
        return await super.get<CourseModel>(`course/${courseId}`,false)
    }

}