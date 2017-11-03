import { HttpClient, json } from 'aurelia-fetch-client'
import { AuthService } from './auth-service';

export abstract class DataService {
    constructor(private httpClient: HttpClient, protected authService: AuthService) {
        httpClient.configure(c => c.withBaseUrl('http://localhost:5000/'));
    }
    protected async get<TResult>(path: string, isSecured: boolean = false): Promise<TResult> {
        return this.createRequest<TResult>(path, 'GET', isSecured);
    }
    protected async post<TResult>(path: string, isSecured: boolean, body: any, ): Promise<TResult> {
        return this.createRequest<TResult>(path, 'POST', isSecured, body)
    }
    protected async put<TResult>(path: string, isSecured: boolean, body: any): Promise<TResult> {
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
            requestInit.headers =
            {
                'Authorization': `Bearer ${this.authService.getToken()}`
            };
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
            throw Error(jsonResult.error);
        }
        return jsonResult;
    }
    private configureHeaders(): any
    {

    }
}