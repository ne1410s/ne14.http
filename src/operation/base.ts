import { ReflectValidation, Ctor } from '@ne1410s/codl';
import { ValidationError } from '../error/validation';
import { OperationInvocationError } from '../error/operation';

/**
 * A contract for that which generates a response from a request.
 */
export interface IOperation<TRequest, TResponse> {
  /**
   * Performs the commands necessary to yield a response.
   * @param requestData The request data.
   * @throws {OperationInvocationError}
   */
  invoke(requestData: TRequest): Promise<TResponse>;

  /**
   * Checks the data in a request.
   * @param requestData The request data.
   * @throws {ValidationError}
   */
  validateRequest(requestData: TRequest): void;

  /**
   * Checks the data in a response.
   * @param responseData The response data.
   * @throws {ValidationError}
   */
  validateResponse(responseData: TResponse): void;
}

/**
 * Base implementation for that which generates a response from a request.
 */
export abstract class OperationBase<TRequest, TResponse>
  implements IOperation<TRequest, TResponse> {
  /**
   * Creates a new instance. Parameters are model prototypes. They are only
   * needed if automatic validation (of @ne1410s/codl decorators) is required.
   * @param requestType The request type.
   * @param responseType The response type.
   */
  constructor(
    private readonly requestType?: Ctor<TRequest>,
    private readonly responseType?: Ctor<TResponse>
  ) {}

  /**
   * @inheritdoc
   */
  async invoke(requestData: TRequest): Promise<TResponse> {
    this.validateRequest(requestData);

    let responseData: TResponse;

    try {
      responseData = await this.invokeInternal(requestData);
    } catch (error) {
      throw new OperationInvocationError(
        'An error occurred invoking the operation',
        this,
        requestData,
        error
      );
    }

    this.validateResponse(responseData);

    return responseData;
  }

  /** Validates a request according to @ne1410s/codl decorators. */
  validateRequest(requestData: TRequest): void {
    if (!this.requestType) return;

    const summary = ReflectValidation.validate(requestData, this.requestType);
    if (!summary.valid) {
      const errors: string[] = [];
      for (let key in summary.errors) {
        errors.push(...summary.errors[key]);
      }
      throw new ValidationError('The request is invalid', requestData, errors);
    }
  }

  /** Validates the response according to @ne1410s/codl decorators. */
  validateResponse(responseData: TResponse): void {
    if (!this.responseType) return;

    const summary = ReflectValidation.validate(responseData, this.responseType);
    if (!summary.valid) {
      const errors: string[] = [];
      for (let key in summary.errors) {
        errors.push(...summary.errors[key]);
      }
      throw new ValidationError('The response is invalid', responseData, errors);
    }
  }

  /**
   *
   * @param requestData The request data.
   */
  protected abstract async invokeInternal(requestData: TRequest): Promise<TResponse>;
}
