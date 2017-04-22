import { Observable, Observer } from 'rxjs';
import { createRestEpic, defaultOptions, injectableEpic, restEpic } from './restEpic';
import { fetchGet } from '../actions';
import { RestAction, RestResponseAction, RestEpicOptions } from '../domain';
import { testObservable } from '../../tests/utils';
import { js2xml } from 'xml-js';

const onCompleteAction = 'REST_COMPLETED';
const restAction = fetchGet({
  url: '/api/dummy',
  onCompleteAction
});

describe('restEpic', () => {
  describe('when dispatching RestAction resulting in an OK response', () => {
    const status = 200;
    const statusText = 'OK';

    it('and result is JSON, should emit non-error RestResponseAction with deserialized result', (done) => {
      // Arrange
      const action$ = Observable.of(restAction);

      const payload = { value: 'test' };
      const headers = new Headers({
        'Content-Type': 'application/json; charset=utf-8'
      });
      (fetch as any).mockResponse(JSON.stringify(payload), { status, statusText, headers });

      // Act
      const responseAction$ = restEpic(action$);

      // Assert
      testObservable(responseAction$, done, (responseAction: RestResponseAction<any, any>) => {
        expect(responseAction.type).toEqual(onCompleteAction);
        expect(responseAction.error).toEqual(false);
        expect(responseAction.payload).toMatchObject(payload);
        expect(responseAction.meta.request).toEqual(restAction);
        expect(responseAction.meta.statusCode).toEqual(status);
        expect(responseAction.meta.statusText).toEqual(statusText);
      });
    });

    it('and result is plain text, should emit non-error RestResponseAction with text result as payload', (done) => {
      // Arrange
      const action$ = Observable.of(restAction);

      const payload = 'Some text data';
      const headers = new Headers({
        'Content-Type': 'text/plain'
      });
      (fetch as any).mockResponse(payload, { status, statusText, headers });

      // Act
      const responseAction$ = restEpic(action$);

      // Assert
      testObservable(responseAction$, done, (responseAction: RestResponseAction<any, any>) => {
        expect(responseAction.type).toEqual(onCompleteAction);
        expect(responseAction.error).toEqual(false);
        expect(responseAction.payload).toEqual(payload);
        expect(responseAction.meta.request).toEqual(restAction);
        expect(responseAction.meta.statusCode).toEqual(status);
        expect(responseAction.meta.statusText).toEqual(statusText);
      });
    });

    it('and result is XML, should emit non-error RestResponseAction with text result as payload', (done) => {
      // Arrange
      const action$ = Observable.of(restAction);

      const payload = { value: 'test' };
      const xmlPayload = js2xml(payload);
      const headers = new Headers({
        'Content-Type': 'application/xml'
      });
      (fetch as any).mockResponse(xmlPayload, { status, statusText, headers });

      // Act
      const responseAction$ = restEpic(action$);

      // Assert
      testObservable(responseAction$, done, (responseAction: RestResponseAction<any, any>) => {
        expect(responseAction.type).toEqual(onCompleteAction);
        expect(responseAction.error).toEqual(false);
        expect(responseAction.payload).toEqual(xmlPayload);
        expect(responseAction.meta.request).toEqual(restAction);
        expect(responseAction.meta.statusCode).toEqual(status);
        expect(responseAction.meta.statusText).toEqual(statusText);
      });
    });

    it('and result has content-type JSON but is not, should emit erroneous RestResponseAction with error in payload', (done) => {
      // Arrange
      const action$ = Observable.of(restAction);

      const payload = 'Some text data';
      const headers = new Headers({
        'Content-Type': 'application/json; charset=utf-8'
      });
      (fetch as any).mockResponse(payload, { status, statusText, headers });

      // Act
      const responseAction$ = restEpic(action$);

      // Assert
      testObservable(responseAction$, done, (responseAction: RestResponseAction<any, any>) => {
        expect(responseAction.type).toEqual(onCompleteAction);
        expect(responseAction.error).toEqual(true);
        expect(responseAction.payload).toBeInstanceOf(Error);
        expect(responseAction.meta.request).toEqual(restAction);
        expect(responseAction.meta.statusCode).toEqual(status);
        expect(responseAction.meta.statusText).toEqual(statusText);
      });
    });
  });

  describe('when dispatching RestAction resulting in an error response', () => {
    const status = 500;
    const statusText = 'Internal Server Error';

    it('and result is JSON, should emit erroneous RestResponseAction with deserialized result', (done) => {
      // Arrange
      const action$ = Observable.of(restAction);

      const payload = { value: 'test' };
      const headers = new Headers({
        'Content-Type': 'application/json; charset=utf-8'
      });
      (fetch as any).mockResponse(JSON.stringify(payload), { status, statusText, headers });

      // Act
      const responseAction$ = restEpic(action$);

      // Assert
      testObservable(responseAction$, done, (responseAction: RestResponseAction<any, any>) => {
        expect(responseAction.type).toEqual(onCompleteAction);
        expect(responseAction.error).toEqual(true);
        expect(responseAction.payload).toMatchObject(payload);
        expect(responseAction.meta.request).toEqual(restAction);
        expect(responseAction.meta.statusCode).toEqual(status);
        expect(responseAction.meta.statusText).toEqual(statusText);
      });
    });

    it('and result is plain text, should emit non-error RestResponseAction with text result as payload', (done) => {
      // Arrange
      const action$ = Observable.of(restAction);

      const payload = 'Some text data';
      const headers = new Headers({
        'Content-Type': 'text/plain'
      });
      (fetch as any).mockResponse(payload, { status, statusText, headers });

      // Act
      const responseAction$ = restEpic(action$);

      // Assert
      testObservable(responseAction$, done, (responseAction: RestResponseAction<any, any>) => {
        expect(responseAction.type).toEqual(onCompleteAction);
        expect(responseAction.error).toEqual(true);
        expect(responseAction.payload).toEqual(payload);
        expect(responseAction.meta.request).toEqual(restAction);
        expect(responseAction.meta.statusCode).toEqual(status);
        expect(responseAction.meta.statusText).toEqual(statusText);
      });
    });

    it('and result is XML, should emit non-error RestResponseAction with text result as payload', (done) => {
      // Arrange
      const action$ = Observable.of(restAction);

      const payload = { value: 'test' };
      const xmlPayload = js2xml(payload);
      const headers = new Headers({
        'Content-Type': 'application/xml'
      });
      (fetch as any).mockResponse(xmlPayload, { status, statusText, headers });

      // Act
      const responseAction$ = restEpic(action$);

      // Assert
      testObservable(responseAction$, done, (responseAction: RestResponseAction<any, any>) => {
        expect(responseAction.type).toEqual(onCompleteAction);
        expect(responseAction.error).toEqual(true);
        expect(responseAction.payload).toEqual(xmlPayload);
        expect(responseAction.meta.request).toEqual(restAction);
        expect(responseAction.meta.statusCode).toEqual(status);
        expect(responseAction.meta.statusText).toEqual(statusText);
      });
    });

    it('and result has content-type JSON but is not, should emit erroneous RestResponseAction with error in payload', (done) => {
      // Arrange
      const action$ = Observable.of(restAction);

      const payload = 'Some text data';
      const headers = new Headers({
        'Content-Type': 'application/json; charset=utf-8'
      });
      (fetch as any).mockResponse(payload, { status, statusText, headers });

      // Act
      const responseAction$ = restEpic(action$);

      // Assert
      testObservable(responseAction$, done, (responseAction: RestResponseAction<any, any>) => {
        expect(responseAction.type).toEqual(onCompleteAction);
        expect(responseAction.error).toEqual(true);
        expect(responseAction.payload).toBeInstanceOf(Error);
        expect(responseAction.meta.request).toEqual(restAction);
        expect(responseAction.meta.statusCode).toEqual(status);
        expect(responseAction.meta.statusText).toEqual(statusText);
      });
    });
  });

  describe('when fetch rejects the promise', () => {
    it('should dispatch error action', (done) => {
      // Arrange
      const action$ = Observable.of(restAction);
      const error = new Error('error');
      const mockFetch = () => {
        return Promise.reject(error);
      };

      // Act
      const epic = injectableEpic(mockFetch, defaultOptions, action$);

      // Assert
      testObservable(epic, done, (responseAction: RestResponseAction<any, any>) => {
        expect(responseAction.type).toEqual(onCompleteAction);
        expect(responseAction.error).toEqual(true);
        expect(responseAction.payload).toEqual(error);
        expect(responseAction.meta.request).toEqual(restAction);
        expect(responseAction.meta.statusCode).toBeUndefined();
        expect(responseAction.meta.statusText).toBeUndefined();
      });
    });
  });

  describe('When creating RestEpic with custom options', () => {
    it('should send relevant options to fetch API', () => {
      // Arrange
      const action$ = Observable.of(restAction);
      const options: RestEpicOptions = {
        credentials: 'include',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      };
      const mockFetch = (request: RequestInfo, init: RequestInit) => {
        // Assert
        expect(init.credentials).toEqual(options.credentials);
        expect(init.headers.get('X-Requested-With')).toEqual(options.headers['X-Requested-With']);

        return Promise.reject('test');
      };

      // Act
      const epic = injectableEpic(mockFetch, options, action$);

      // Assert
      epic
        .take(1)
        .subscribe();
    });
  });
});
