import { UniversityModel } from "../../universities/models/university-model";
import { ReviewModel } from "../../reviews/models/review-model";

export class CourseModel
{
    id: string;
    name: string;
    department: string;
    university: UniversityModel;
    reviews: ReviewModel[];
    avgRating: number;
    countRating: number;

}