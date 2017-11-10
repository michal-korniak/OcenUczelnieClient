import { DataService } from "../../core/data-service";
import { autoinject } from "aurelia-dependency-injection";
import { AuthService } from "../../core/auth-service";
import {HttpClient} from 'aurelia-fetch-client'
import { CourseModel } from "../models/course-model";
import { ReviewModel } from "../../reviews/models/review-model";
import { NewReviewModel } from "../../reviews/models/new-review-model";
@autoinject()
export class CourseService extends DataService
{
    constructor(httpClient:HttpClient,authService:AuthService)
    {
        super(httpClient,authService);
    }
    async getDetails(courseId: string): Promise<CourseModel>
    {
        return await super.get<CourseModel>(`course/${courseId}/details`,false)
    }
    async postReview(courseId: string,newReview:NewReviewModel)
    {
        await super.post(`course/${courseId}/post_review`,true,newReview);
    }
}