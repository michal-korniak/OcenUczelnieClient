import * as toastr from 'toastr';

export class Toastr {
    public error(message: string, title: string = "") {
        toastr.error(message, title,
            this.settings());
    }
    public warning(message: string, title: string = "") {
        toastr.warning(message, title,
            this.settings());
    }
    public info(message: string, title: string = "") {
        toastr.info(message, title,
            this.settings());
    }
    public success(message: string, title: string = "") {
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