/**
 * Action that will be dispatched in Redux to trigger a REST Action.
 */
export interface RestAction<T> {
    /**
     * Type of Action.
     */
    type: string;

    /**
     * Provides information about the request to be made.
     */
    payload: RestPayload<T>
}

/**
 * Payload of the RestAction.
 * 
 * @see RestAction
 */
export interface RestPayload<T> {
    /**
     * Specifies the URL of the endpoint.
     */
    url: string;

    /**
     * Specifies the HTTP Method to use in the request.
     */
    method: string;

    /**
     * Specifies the Action to dispatch once the request has completed.
     */
    onCompleteAction: string;

    /**
     * Specified the body to include in the request.
     */
    body?: T;
}

/**
 * Action that will be dispatched in Redux once the request has been completed.
 */
export interface RestResponseAction<TReq, TRes> {
    /**
     * Type of action.
     */
    type: string;

    /**
     * Payload containing the response or the error message.
     */
    payload: TRes | string;

    /**
     * Indicates if the response contains an error or a valid response.
     */
    error: boolean;

    /**
     * Metadata about the request that was made.
     */
    meta: RestResponseMeta<TReq>;
}

/**
 * Metadata included in a RestResponseAction.
 * 
 * @see RestResponseAction
 */
export interface RestResponseMeta<T> {
    /**
     * Original action that triggered this response.
     */
    request: RestAction<T>

    /**
     * HTTP Status code returned with the Response.
     * 
     * May be undefined if the error occurred before there was a Response.
     */
    statusCode?: number;

    /**
     * HTTP Status text return with the Response.
     * 
     * May be undefined if the error occurred before there was a Response.
     */
    statusText?: string;
}
