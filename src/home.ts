import { autoinject } from "aurelia-dependency-injection";
import { UniversityService } from "./universities/services/university-service";
import { UniversityModel } from "./universities/models/university-model";
import { observable } from "aurelia-binding";
import { Router } from "aurelia-router";



@autoinject()
export class Home {
    universites: UniversityModel[];
    filterUniversites: UniversityModel[];

    @observable searchPhrase: string;
    constructor(private universityService: UniversityService, private router: Router) {
    }
    async activate() {      
        this.universites = await this.universityService.browseAll();
        this.searchPhrase="";
        console.log();
    }
    searchPhraseChanged(newValue: string)
    {
        this.filterUniversites=this.universites.filter(x=>
            {
                if(x.name.toLowerCase().includes(newValue.toLowerCase()) 
                || x.place.toLowerCase().includes(newValue.toLowerCase())
                || (x.shortcut!=null && x.shortcut.toLowerCase().includes(newValue.toLowerCase())))
                    return x;
            });
    }

}