/**
 * Thrown when a model is deemed to be invalid.
 */
export class ValidationError<TModel> extends Error {
  constructor(public message: string, public model: TModel, public errors?: Array<string>) {
    super(message);
  }
}
