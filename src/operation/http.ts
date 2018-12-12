import { OperationBase } from "./base";
import { DeserialisationError, SerialisationError } from "../error/serialisation";
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
     */
    async abstract serialise(requestData: TRequest): Promise<string>;

    /**
     * 
     * @param response The http response.
     */
    async abstract deserialise(response: Response): Promise<TResponse>;

    /**
     * @inheritdoc
     * @throws {SerialisationError}
     * @throws {DeserialisationError}
     */
    protected async invokeInternal(requestData: TRequest): Promise<TResponse> {
        
        let runUrl = this.url;
        const runParams: RequestInit = {
            method: this.verb,
            headers: this.headers,
        };

        // Incorporate request data according to verb
        if (requestData != null) {

            try {
                if (this.verb === 'get' || this.verb === 'head') {
                    runUrl = `${this.url}?${this.serialiseQuery(requestData)}`;

                } else {
                    runParams.body = await this.serialise(requestData);
                }
            } catch (error) {
                throw new SerialisationError('An error occurred serialising the request', requestData, error);
            }
        }

        const response = await fetch(runUrl, runParams);

        try {
            return await this.deserialise(response);
        }
        catch (error) {
            throw new DeserialisationError('An error occurred deserialising the response', error);
        }
    }

    private serialiseQuery(requestData: TRequest): string {        
        return Object.keys(requestData).map(k => k + '=' + encodeURIComponent((requestData as any)[k])).join('&');
    }
}