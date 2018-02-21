import { UniversityService } from "../../universities/services/university-service";
import { UniversityModel } from "../../universities/models/university-model";
import { autoinject } from "aurelia-framework";
import { UniversityDetailsModel } from "../../universities/models/university-details-model";
import { CourseModel } from "../../courses/models/course-model";
import { DepartmentModel } from '../models/department-model';
import { start } from "repl";
import { UpdateCoursesModel } from "../../universities/models/update-courses-model";
import { Router } from "aurelia-router";


@autoinject()
export class CoursesEditor {

    departments: DepartmentModel[];
    universityName: string;
    universityId:string;
    courseHTML: string;



    constructor(private universityService: UniversityService, private router:Router) { }

    async activate(params: any) {
        this.universityId=params.universityId;
        let universityModel: UniversityDetailsModel = await this.universityService.getDetails(params.universityId);
        this.universityName = universityModel.name;
        let courses: CourseModel[] = universityModel.courses;
        this.departments = DepartmentModel.createArrayFromCourseModels(courses);
    }
    startEditingDepartment(departmentIndex: number) {
        var departmentAnchor = document.getElementById(`department-anchor-${departmentIndex}`);
        if (departmentAnchor.getAttribute('aria-expanded') == "true")
            departmentAnchor.click();

        var departmentEditor = document.getElementById(`department-editor-${departmentIndex}`);
        var departmentPanel = document.getElementById(`department-panel-${departmentIndex}`);
        departmentEditor.setAttribute("style", "display:show");
        departmentPanel.setAttribute("style", "display:none");
    }
    completeEditingDepartment(departmentIndex: number) {
        var departmentEditor = document.getElementById(`department-editor-${departmentIndex}`);
        var departmentPanel = document.getElementById(`department-panel-${departmentIndex}`);
        departmentEditor.setAttribute("style", "display:none");
        departmentPanel.setAttribute("style", "display:show");
    }
    startEditingCourse(course: CourseModel) {
        var courseEditor = document.getElementById(`course-editor-${course.id}`);
        var coursePanel = document.getElementById(`course-${course.id}`);
        courseEditor.setAttribute("style", "display:show");
        coursePanel.setAttribute("style", "display:none");
    }
    completeEditingCourse(course: CourseModel) {
        var courseEditor = document.getElementById(`course-editor-${course.id}`);
        var coursePanel = document.getElementById(`course-${course.id}`);
        courseEditor.setAttribute("style", "display:none");
        coursePanel.setAttribute("style", "display:show");
    }
    async addCourse(departmentIndex: number) {
        var departmentAnchor = document.getElementById(`department-anchor-${departmentIndex}`);
        if (departmentAnchor.getAttribute('aria-expanded') == "false")
            departmentAnchor.click();
        var courseModel: CourseModel = new CourseModel();
        courseModel.id = this.generateGuid();
        await this.departments[departmentIndex].courses.push(courseModel);
        this.startEditingCourse(courseModel);
    }
    private generateGuid(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    async addDepartment()
    {
        await this.departments.push(new DepartmentModel(""));
        this.startEditingDepartment(this.departments.length-1);
    }
    deleteDepartment(departmentIndex: number)
    {
        var numberOfCourses: number=this.departments[departmentIndex].courses.length;
        if(numberOfCourses>0 && !confirm(`Wewnątrz wydziału znajduje następująca liczba kierunków: ${numberOfCourses}.\nCzy chcesz kontynuować usuwanie?`))
            return;
        this.departments.splice(departmentIndex,1);
    }
    deleteCourse(department: DepartmentModel, courseIndex: number)
    {
        //are you sure (if course contains review) TODO
        department.courses.splice(courseIndex,1);
    }
    async saveChanges()
    {
        for(var i=0; i<this.departments.length; ++i)
         {
            if(this.departments[i].courses.length==0)
            {
                if(confirm("Wydziały nie posiadające kierunków zostaną usunięte.\nCzy chcesz kontynuować?"))
                    break;
                else
                    return;
            }
        }
        var updateCourses: UpdateCoursesModel=DepartmentModel.convertArrayToUpdateCoursesModel(this.universityId,this.departments);
        document.getElementById("submitBtn").setAttribute("disabled","");
        await this.universityService.updateCourses(updateCourses);
        this.router.navigate("#/admin");
    }

}