import { CourseModel } from "../../courses/models/course-model";
import { UniversityModel } from "./university-model";

export class UniversityDetailsModel extends UniversityModel
{
    courses: CourseModel[];
    departments: string[];
}