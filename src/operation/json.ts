import { HttpOperation, Verb, BodylessVerb } from './http';
import { Ctor } from '@ne1410s/codl';

export abstract class JsonOperation<TRequest, TResponse> extends HttpOperation<
  TRequest,
  TResponse
> {
  constructor(
    url: string,
    verb: Verb = 'get',
    headers?: HeadersInit,
    requestType?: Ctor<TRequest>,
    responseType?: Ctor<TResponse>
  ) {
    super(url, verb, headers, requestType, responseType);

    this.headers.set('content-type', 'application/json');
    this.headers.set('accept', 'application/json');
  }

  /**
   * @inheritdoc
   */
  async serialise(requestData: TRequest): Promise<string> {
    await Promise.resolve();

    return requestData ? JSON.stringify(requestData) : null;
  }

  /**
   * @inheritdoc
   */
  async deserialise(response: Response, requestData: TRequest): Promise<TResponse> {
    const raw = await response.text();
    return JSON.parse(raw);
  }
}

export abstract class JsonBodylessOperation<TResponse> extends JsonOperation<any, TResponse> {
  constructor(
    url: string,
    verb: BodylessVerb = 'get',
    headers?: HeadersInit,
    responseType?: Ctor<TResponse>
  ) {
    super(url, verb, headers, null, responseType);
  }

  async invoke(): Promise<TResponse> {
    return super.invoke(null);
  }
}
