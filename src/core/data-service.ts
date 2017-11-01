import { HttpClient, json } from 'aurelia-fetch-client'

export abstract class DataService {
    constructor(private httpClient: HttpClient) {
        httpClient.configure(c => c.withBaseUrl('http://localhost:5000/'));
    }
    protected async get<TResult>(path: string): Promise<TResult> {
        return this.createRequest<TResult>(path, 'GET')
    }
    protected async post<TResult>(path: string,body: any): Promise<TResult> {
        return this.createRequest<TResult>(path, 'POST',body)
    }
    protected async put<TResult>(path: string,body: any): Promise<TResult> {
        return this.createRequest<TResult>(path, 'PUT',body)
    }
    protected async delete<TResult>(path: string): Promise<TResult> {
        return this.createRequest<TResult>(path, 'DELETE')
    }
    private async createRequest<TResult>(path: string, method: string, body: any = null): Promise<TResult> {
        let requestInit: RequestInit = {};
        requestInit.method = method;
        if (body !== null)
            requestInit.body = json(body);
        
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
}