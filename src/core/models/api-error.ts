export class ApiError extends Error
{
    code: string;
    constructor(code:string,message: string)
    {
        super(message);
        Object.setPrototypeOf(this, ApiError.prototype);
        this.code=code;
    }
}