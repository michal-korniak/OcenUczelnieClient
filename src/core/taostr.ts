import * as toastr from 'toastr';

export class Toastr {
    public error(message: string, title: string = "Error!") {
        toastr.error(message, title,
            this.settings());
    }
    public warning(message: string, title: string = "Warning!") {
        toastr.warning(message, title,
            this.settings());
    }
    public info(message: string, title: string = "Info!") {
        toastr.info(message, title,
            this.settings());
    }
    public success(message: string, title: string = "Success!") {
        toastr.success(message, title,
            this.settings());
    }

    private settings(): any {
        return {
            positionClass: 'toast-top-center',
            closeButton: true,
        };
    }
}