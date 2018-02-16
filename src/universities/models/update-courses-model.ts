export class Course {
    id: string;
    name: string;
    department: string;
}

export class UpdateCoursesModel {
    universityId: string;
    courses: Course[]=new Array<Course>();
}