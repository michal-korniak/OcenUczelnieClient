import * as $ from 'jquery';
import { UniversityService } from '../services/university-service';
import { UniversityDetailsModel } from '../models/university-details-model';
import { autoinject } from 'aurelia-dependency-injection';
import { CourseModel } from '../../courses/models/course-model';
import { DepartmentColors } from '../models/department-colors';

@autoinject()
export class UniversityDetails {


    model: UniversityDetailsModel;
    colors: Map<string, DepartmentColors> = new Map<string, DepartmentColors>();
    constructor(private universityService: UniversityService) {
    }
    async activate(params: any) {
        this.model = await this.universityService.getDetails(params.id);
        this.setDepartmentColors();
        console.log(this.model.courses);
    }

    attached() {
        $(document).ready(function () {
            $('.btn-filter').on('click', function () {
                var $target = $(this).data('target');
                if ($target != 'all') {
                    $('.table tr').css('display', 'none');
                    $('.table tr[data-status="' + $target + '"]').fadeIn('slow');
                } else {
                    $('.table tr').css('display', 'none').fadeIn('slow');
                }
            });
        });
    }
    setDepartmentColors() {
        for (let i = 0; i < this.model.departments.length; ++i) {
            let departmentName: string = this.model.departments[i];
            let modulo: number = i % 17;
            if (modulo == 0)
                this.colors.set(departmentName, new DepartmentColors('btn-success', 'successColor'));
            else if (modulo == 1)
                this.colors.set(departmentName, new DepartmentColors('btn-primary', 'primaryColor'));
            else if (modulo == 2)
                this.colors.set(departmentName, new DepartmentColors('btn-info', 'infoColor'));
            else if (modulo == 3)
                this.colors.set(departmentName, new DepartmentColors('btn-warning', 'warningColor'));
            else if (modulo == 4)
                this.colors.set(departmentName, new DepartmentColors('btn-red', 'redColor'));
            else if (modulo == 5)
                this.colors.set(departmentName, new DepartmentColors('btn-violet', 'violetColor'));
            else if (modulo == 6)
                this.colors.set(departmentName, new DepartmentColors('btn-orange', 'orangeColor'));
            else if (modulo == 7)
                this.colors.set(departmentName, new DepartmentColors('btn-lightgreen', 'lightgreenColor'));
            else if (modulo == 8)
                this.colors.set(departmentName, new DepartmentColors('btn-green', 'greenColor'));
            else if (modulo == 9)
                this.colors.set(departmentName, new DepartmentColors('btn-darkblue', 'darkblueColor'));
            else if (modulo == 10)
                this.colors.set(departmentName, new DepartmentColors('btn-yellow', 'yellowColor'));
            else if (modulo == 11)
                this.colors.set(departmentName, new DepartmentColors('btn-gray', 'grayColor'));
            else if (modulo == 12)
                this.colors.set(departmentName, new DepartmentColors('btn-pink', 'pinkColor'));
            else if (modulo == 13)
                this.colors.set(departmentName, new DepartmentColors('btn-blue', 'blueColor'));
            else if (modulo == 14)
                this.colors.set(departmentName, new DepartmentColors('btn-danger', 'dangerColor'));
        }
    }
    getBtnClass(name: string): string {
        return this.colors.get(name).btnClass;
    }
    getColorClass(name: string): string {
        return this.colors.get(name).colorClass;
    }

}