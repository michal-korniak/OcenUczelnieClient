import { HttpClient, json } from 'aurelia-fetch-client'
import { AuthService } from './auth-service';
import { ApiError } from './models/api-error';
import {AureliaConfiguration} from 'aurelia-configuration';
import { autoinject } from 'aurelia-framework';

export abstract class DataService {
    constructor(private httpClient: HttpClient, protected authService: AuthService, config: AureliaConfiguration) {
        var apiUrl=config.get("api");
        console.log(apiUrl);
        httpClient.configure(c => c.withBaseUrl(apiUrl));
    }
    protected async get<TResult>(path: string, isSecured: boolean = false): Promise<TResult> {
        return this.createRequest<TResult>(path, 'GET', isSecured);
    }
    protected async post<TResult>(path: string, isSecured: boolean, body: any=null): Promise<TResult> {
        return this.createRequest<TResult>(path, 'POST', isSecured, body)
    }
    protected async put<TResult>(path: string, isSecured: boolean, body: any=null): Promise<TResult> {
        return this.createRequest<TResult>(path, 'PUT', isSecured, body)
    }
    protected async delete<TResult>(path: string, isSecured: boolean): Promise<TResult> {
        return this.createRequest<TResult>(path, 'DELETE', isSecured)
    }
    private async createRequest<TResult>(path: string, method: string, isSecured: boolean, body: any = null): Promise<TResult> {
        let requestInit: RequestInit = {};
        requestInit.method = method;
        if (body !== null)
            requestInit.body = json(body);
        if (isSecured)
        {
            requestInit.headers =new Headers({'Authorization': `Bearer ${this.authService.getToken()}`});
        }

        let response = await this.httpClient.fetch(path, requestInit);

        let hasMessage: boolean = true;
        let jsonResult;
        try {
            jsonResult = await response.json();
        }
        catch (error) {
            //emptyJSON
            hasMessage = false;
        }
        if (!response.ok && hasMessage) {
            throw new ApiError(jsonResult.code, jsonResult.message);
        }
        return jsonResult;
    }
}