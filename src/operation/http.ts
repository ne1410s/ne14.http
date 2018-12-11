import { OperationBase } from "./base";
require('isomorphic-fetch');

export abstract class HttpOperation<TRequest, TResponse> extends OperationBase<TRequest, TResponse> {

    readonly headers: Headers;

    constructor (
            public readonly url: string,
            public readonly verb: 'get' | 'head' | 'post' | 'put' | 'delete' = 'get',
            headers?: HeadersInit) {

        super();
        this.headers = new Headers(headers);
    }

    /**
     * 
     * @param requestData Request data.
     * @throws {SerialisationError}
     */
    abstract serialise(requestData: TRequest): string;

    /**
     * @param response The http response.
     * @throws {DeserialisationError}
     */
    async abstract deserialise(response: Response): Promise<TResponse>;

    protected async invokeInternal(requestData: TRequest): Promise<TResponse> {
        
        let runUrl = this.url;
        const runParams: RequestInit = {
            method: this.verb,
            headers: this.headers,
        };

        // Incorporate request data according to verb
        if (requestData != null) {

            if (this.verb === 'get') {
                runUrl = `${this.url}?${this.serialiseQuery(requestData)}`;

            } else {
                runParams.body = this.serialise(requestData);
            }
        }

        const response = await fetch(runUrl, runParams);

        return this.deserialise(response);
    }

    private serialiseQuery(requestData: TRequest): string {        
        return Object.keys(requestData).map(k => k + '=' + encodeURIComponent((requestData as any)[k])).join('&');
    }
}