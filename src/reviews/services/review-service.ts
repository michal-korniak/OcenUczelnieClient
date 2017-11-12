import { DataService } from "../../core/data-service";
import { autoinject } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { AuthService } from "../../core/auth-service";
import { NewReviewModel } from "../models/new-review-model";

@autoinject
export class ReviewService extends DataService
{
    constructor(httpClient: HttpClient, authService:AuthService) {
        super(httpClient,authService);
        
    }
    async postReview(courseId: string,newReview:NewReviewModel)
    {
        await super.post(`course/${courseId}/post_review`,true,newReview);
    }
    async approveReview(reviewId: string)
    {
        await super.post(`review/${reviewId}/approve`,true);
    }
    async deleteApproveFromReview(reviewId: string)
    {
        await super.delete(`review/${reviewId}/delete_approve`,true);
    }
    async deleteDisapproveFromReview(reviewId: string)
    {
        await super.delete(`review/${reviewId}/delete_disapprove`,true);
    }
    async disapproveReview(reviewId: string)
    {
        await super.post(`review/${reviewId}/disapprove`,true);
    }
    async getUserMarkToReview(reviewId: string):Promise<number>
    {
        return await super.get<number>(`review/${reviewId}/mark`,true);
    }
}