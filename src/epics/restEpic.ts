import { RestAction, RestResponseAction } from '../domain';
import { Action, Dispatch } from 'redux';
import { Observable } from 'rxjs';
import { REST_ACTION } from '../actions/restActions';

const epic = (action$: Observable<Action>): Observable<Action> => {
    return action$
        .filter(action => action.type === REST_ACTION)
        .flatMap((action: RestAction<any>) => {
            const { url, body, method, onCompleteAction } = action.payload;

            const init: RequestInit = {
                method,
                body,
                headers: new Headers({
                    'Content-Type': 'application/json; charset=utf-8'
                })
            };

            return Observable.fromPromise(fetch(url, init))
                .flatMap(fetchResponse => {
                    const responseActionPromise = fetchResponse.ok
                        ? handleResponse(fetchResponse.json(), fetchResponse, action)
                        : handleResponse(fetchResponse.text(), fetchResponse, action);

                    return Observable.fromPromise(responseActionPromise);
                })
                .catch((reason: any) => {
                    return Observable.of(handleNonResponse(reason, action));
                });
        });
}

function handleResponse(dataHandle: Promise<any>, fetchResponse: Response, action: RestAction<any>): Promise<RestResponseAction<any, any>> {
    const { onCompleteAction } = action.payload;
    const { status, statusText } = fetchResponse;

    return dataHandle
        .then((data: any) => {
            const responseAction: RestResponseAction<any, any> = {
                type: onCompleteAction,
                payload: data,
                error: false,
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

function handleNonResponse(error: any, action: RestAction<any>): RestResponseAction<any, any> {
    return {
        type: action.payload.onCompleteAction,
        error: true,
        payload: error,
        meta: {
            request: action
        }
    };
}