import {CourseModel} from '../../courses/models/course-model'
import { UpdateCoursesModel, Course } from '../../universities/models/update-courses-model';

export class DepartmentModel
{
    name: string;
    courses: CourseModel[];
    constructor(name: string)
    {
        this.name=name;
        this.courses=new Array<CourseModel>();
    }

    static createArrayFromCourseModels(models: CourseModel[]): DepartmentModel[]
    {
        var departments: DepartmentModel[]=new Array<DepartmentModel>();
        models.forEach((course) => {
            let found: boolean=false;
            for(var i=0; i<departments.length; ++i)
            {
                if(departments[i].name==course.department)
                {
                    departments[i].courses.push(course);
                    found=true;
                    break;
                }
            }
            if(!found)
            {
                departments.push(new DepartmentModel(course.department));
                departments[departments.length-1].courses=new Array<CourseModel>();
                departments[departments.length-1].courses.push(course)
            }
        });
        return departments;
    }
    static convertArrayToUpdateCoursesModel(universityId: string,departments: DepartmentModel[]): UpdateCoursesModel
    {
        var updateCourses: UpdateCoursesModel=new UpdateCoursesModel();
        updateCourses.universityId=universityId;
        departments.forEach(department => {
            department.courses.forEach(course => {
                var updateCourse: Course=new Course();
                updateCourse.id=course.id;
                updateCourse.name=course.name;
                updateCourse.department=department.name;
                updateCourses.courses.push(updateCourse);
            });
        });
        return updateCourses;
    }
}