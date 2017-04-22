import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { Action, Dispatch } from 'redux';
import { RestAction, RestResponseAction, RestEpicOptions } from '../domain';
import { REST_ACTION } from '../actions/restActions';

type Fetch = (input: RequestInfo, init?: RequestInit) => Promise<Response>;
export type RestEpic = (action$: Observable<Action>) => Observable<Action>;

export const defaultOptions: RestEpicOptions = {
  headers: { },
  credentials: 'omit'
};

export const injectableEpic = (fetch: Fetch, options: RestEpicOptions, action$: Observable<Action>): Observable<Action> => {
  return action$
    .filter(action => action.type === REST_ACTION)
    .flatMap((action: RestAction<any>) => {
      const { url, body, method, onCompleteAction } = action.payload;

      const init: RequestInit = {
        method,
        body,
        credentials: options.credentials,
        headers: new Headers({
          ...options.headers,
          'Content-Type': 'application/json; charset=utf-8'
        })
      };

      return Observable.fromPromise(fetch(url, init))
        .flatMap(fetchResponse => {
          const responseActionPromise = fetchResponse.ok
            ? handleResponse(getBodyBasedOnHeader(fetchResponse), false, fetchResponse, action)
            : handleResponse(getBodyBasedOnHeader(fetchResponse), true, fetchResponse, action);

          return Observable.fromPromise(responseActionPromise);
        })
        .catch((reason: any) => {
          return Observable.of(handleNonResponse(reason, action));
        });
    });
};

/**
 * Rest Epic with default options.
 */
export const restEpic: RestEpic = injectableEpic.bind(null, window.fetch, defaultOptions);

/**
 * Creates a Rest Epic with the specified options.
 *
 * @param options Options to apply to the Fetch requests.
 */
export function createRestEpic(options: RestEpicOptions): RestEpic {
  const mergedOptions = {
    ...defaultOptions,
    ...options
  };

  return injectableEpic.bind(null, window.fetch, mergedOptions);
}

function getBodyBasedOnHeader(fetchResponse: Response): Promise<any> {
  const contentType = fetchResponse.headers.get('content-type') || '';

  return contentType.toLowerCase().indexOf('application/json') > -1
    ? fetchResponse.json()
    : fetchResponse.text();
}

export function handleResponse(dataHandle: Promise<any>, error: boolean, fetchResponse: Response, action: RestAction<any>): Promise<RestResponseAction<any, any>> {
  const { onCompleteAction } = action.payload;
  const { status, statusText } = fetchResponse;

  return dataHandle
    .then((data: any) => {
      const responseAction: RestResponseAction<any, any> = {
        type: onCompleteAction,
        payload: data,
        error: error,
        meta: {
          request: action,
          statusCode: status,
          statusText: statusText
        }
      };

      return responseAction;
    })
    .catch((reason: any) => {
      const errorResponseAction: RestResponseAction<any, any> = {
        type: onCompleteAction,
        payload: reason,
        error: true,
        meta: {
          request: action,
          statusCode: status,
          statusText: statusText
        }
      };

      return errorResponseAction;
    });
}

export function handleNonResponse(error: any, action: RestAction<any>): RestResponseAction<any, any> {
  return {
    type: action.payload.onCompleteAction,
    error: true,
    payload: error,
    meta: {
      request: action
    }
  };
}
