export class UniversityModel {
    name: string;
    place: string;
    shortcut: string;
    imagePath: string;

    constructor(name: string, shortcut: string, place: string, imagePath: string) {
        this.name = name;
        this.place = place;
        this.shortcut = shortcut;
        this.imagePath = imagePath;
    }
}