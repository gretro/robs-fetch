import { RestAction, RestPayload } from '../domain';

/**
 * Action type that will be dispatched in the Redux store.
 */
export const REST_ACTION = '@@ROBS_FETCH/REST';

/**
 * Parameters to create a REST Action.
 */
export interface RestRequestParameters<T> {
  /**
   * Url of the endpoint.
   */
  url: string;

  /**
   * Action to dispatch when the fetch request has completed.
   */
  onCompleteAction: string;

  /**
   * Body of the request.
   */
  body?: T;
}

/**
 * Creates a REST Action for a GET request.
 *
 * @param parameters Parameters used to create the REST Action.
 */
export function fetchGet(parameters: RestRequestParameters<void>): RestAction<void> {
  return createRestAction<void>({
    ...parameters,
    method: 'GET'
  });
}

/**
 * Creates a REST Action for a POST request.
 *
 * @param parameters Parameters used to create the REST Action.
 */
export function fetchPost<T>(parameters: RestRequestParameters<T>): RestAction<T> {
  return createRestAction<T>({
    ...parameters,
    method: 'POST'
  });
}

/**
 * Creates a REST Action for a PUT request.
 *
 * @param parameters Parameters used to create the REST Action.
 */
export function fetchPut<T>(parameters: RestRequestParameters<T>): RestAction<T> {
  return createRestAction<T>({
    ...parameters,
    method: 'PUT'
  });
}

/**
 * Creates a REST Action for a DELETE request.
 *
 * @param parameters Parameters used to create the REST Action.
 */
export function fetchDelete<T>(parameters: RestRequestParameters<T>): RestAction<T> {
  return createRestAction<T>({
    ...parameters,
    method: 'DELETE'
  });
}

/**
 * Creates a REST Action for a PATCH request.
 *
 * @param parameters Parameters used to create the REST Action.
 */
export function fetchPatch<T>(parameters: RestRequestParameters<T>): RestAction<T> {
  return createRestAction<T>({
    ...parameters,
    method: 'PATCH'
  });
}

/**
 * Creates a REST Action for a HEAD request.
 *
 * @param parameters Parameters used to create the REST Action.
 */
export function fetchHead(parameters: RestRequestParameters<void>): RestAction<void> {
  return createRestAction<void>({
    ...parameters,
    method: 'HEAD'
  });
}

/**
 * Creates a generic REST Action using the specified payload.
 *
 * @param payload Payload to include in the REST Action.
 */
export function createRestAction<T>(payload: RestPayload<T>): RestAction<T> {
  return {
    type: REST_ACTION,
    payload
  };
}
