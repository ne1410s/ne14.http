
export class SerialisationError<TModel> extends Error {

    constructor(
            public model: TModel) {

        super("The model data could not be serialised");
    }
}

export class DeserialisationError extends Error {

    constructor() {

        super("The model data could not be deserialised");
    }
}