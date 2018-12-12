/**
 * Thrown when serialisation was not successful.
 */
export class SerialisationError<TModel> extends Error {

    constructor(
            public readonly message: string,
            public readonly model: TModel,
            public readonly cause?: any) {

        super(message);
    }
}

/**
 * Thrown when deserialisation was not successful.
 */
export class DeserialisationError extends Error {

    constructor(
            public readonly message: string,
            public readonly cause?: any) {

        super(message);
    }
}