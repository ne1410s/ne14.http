import { OperationBase } from './base';
import { DeserialisationError, SerialisationError } from '../error/serialisation';
import { Ctor } from '@ne1410s/codl';

require('isomorphic-fetch');

export declare type Verb = 'get' | 'head' | 'post' | 'put' | 'patch' | 'delete';
export declare type BodylessVerb = 'get' | 'head';

export abstract class HttpOperation<TRequest, TResponse> extends OperationBase<
  TRequest,
  TResponse
> {
  readonly headers: Headers;

  protected _url: string;
  get url(): string {
    return this._url;
  }

  constructor(
    url: string,
    public readonly verb: Verb = 'get',
    headers?: HeadersInit,
    requestType?: Ctor<TRequest>,
    responseType?: Ctor<TResponse>
  ) {
    super(requestType, responseType);
    this.headers = new Headers(headers);
    this._url = url;
  }

  /**
   *
   * @param requestData Request data.
   */
  abstract async serialise(requestData: TRequest): Promise<string>;

  /**
   *
   * @param response The http response.
   * @param requestData Request data.
   */
  abstract async deserialise(response: Response, requestData: TRequest): Promise<TResponse>;

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
        throw new SerialisationError(
          'An error occurred serialising the request',
          requestData,
          error
        );
      }
    }

    const response = await fetch(runUrl, runParams);

    try {
      return await this.deserialise(response, requestData);
    } catch (error) {
      throw new DeserialisationError('An error occurred deserialising the response', error);
    }
  }

  private serialiseQuery(requestData: TRequest): string {
    return Object.keys(requestData)
      .map((k) => k + '=' + encodeURIComponent((requestData as any)[k]))
      .join('&');
  }
}
