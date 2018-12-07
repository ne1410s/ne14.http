import { HttpRequestBase, HttpBodyRequestBase } from "./request";
import { HttpResponseBase, HttpBodyResponseBase } from "./response";
import { OperationBase } from "../operation";

export abstract class HttpOperationBase<TRequest extends HttpRequestBase, TResponse extends HttpResponseBase> extends OperationBase<TRequest, TResponse> {

    abstract get relPath(): string;

    constructor(private baseUrl: string) {
        super();
    }

    protected async invokeInternal(request: TRequest): Promise<TResponse> {

        const invokeHeaders = new Headers();

        for (const key in request.headers || {}) {
            invokeHeaders.append(key, request.headers[key]);
        }

        const params: RequestInit = {
            method: request.verb,
            headers: invokeHeaders,
        }

        if (request instanceof HttpBodyRequestBase) {
            params.body = request.serialise();
        }

        const invokeResponse = await fetch(`${this.baseUrl}${this.relPath}`, params);

        const retVal: TResponse = {} as any;
        retVal.response = invokeResponse;

        if (retVal instanceof HttpBodyResponseBase) {
            retVal.result = await retVal.deserialise();
        }

        return retVal;
    }
}

