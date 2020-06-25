import { IOperation } from '../operation/base';
import { Verb } from '../operation/http';

/**
 * Thrown when an operation was not invoked successfully.
 */
export class OperationInvocationError<
  TRequest,
  TResponse,
  TOperation extends IOperation<TRequest, TResponse>
> extends Error {
  constructor(
    public readonly message: string,
    public readonly operation: TOperation,
    public readonly request: TRequest,
    public readonly cause?: any
  ) {
    super(message);
  }
}

/**
 * Thrown when an http response is deemed to be unworkable.
 */
export class HttpResponseError extends Error {
  body: string;
  headers: Record<string, string>;
  statusCode: number;
  statusText: string;
  url: string;

  constructor(response: Response, public readonly verb: Verb) {
    super('Unexpected response');

    this.headers = {};
    response.headers.forEach((val, key) => (this.headers[key] = val));
    response.text().then((body) => (this.body = body));
    this.statusCode = response.status;
    this.statusText = response.statusText;
    this.url = response.url;
  }
}
