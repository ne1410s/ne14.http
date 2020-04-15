import { IOperation } from '../operation/base';

/**
 * Thrown when an operation was not invoked successfully.
 */
export class OperationInvocationError<TRequest, TResponse, TOperation extends IOperation<TRequest, TResponse>> extends Error {

  constructor(
      public readonly message: string,
      public readonly operation: TOperation,
      public readonly request: TRequest,
      public readonly cause?: any) {

    super(message);
  }
}

/**
 * Thrown when an http response is deemed to be unworkable.
 */
export class HttpResponseError extends Error {

  constructor(
      public readonly statusCode: number,
      public readonly statusText: string,
      public readonly headers: Headers,
      public readonly body: string) {

    super();
  }
}