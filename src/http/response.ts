
export abstract class HttpResponseBase {

    private _headers: any = null;

    response: Response;

    get headers(): any {

        if (!this._headers) {
            this._headers = {};
            this.response.headers.forEach((k, v) => this._headers[k] = v);
        }

        return this._headers;
    }
}

export abstract class HttpBodyResponseBase<TModel> extends HttpResponseBase {
    
    result: TModel;

    abstract deserialise(): Promise<TModel>;
}

export class JsonResponse<TModel> extends HttpBodyResponseBase<TModel> {

    async deserialise(): Promise<TModel> {
        
        const result = await this.response.text();
        return JSON.parse(result) as TModel;
    }
}