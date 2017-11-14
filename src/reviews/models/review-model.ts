import { UserModel } from "../../users/models/user-model";

export class ReviewModel
{
    id:string;
    rating: number;
    content: string;
    points: number;
    createdAt: Date;
    user: UserModel;
}