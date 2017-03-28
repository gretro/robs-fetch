import { RestPayload } from '../domain/RequestAction';
import 'jest';
import * as restActions from './restActions';

describe('restActions', () => {
    it('When invoking fetchGet, should return GET RestAction', () => {
        // Arrange
        const parameters: restActions.RestRequestParameters<void> = {
            url: '/api/dummy-endpoint',
            onCompleteAction: 'DUMMY_ENDPOINT_FETCHED'
        };

        // Act
        const action = restActions.fetchGet(parameters);

        // Assert
        expect(action).not.toBeNull();
        expect(action).not.toBeUndefined();
        expect(action.type).toEqual(restActions.REST_ACTION);
        expect(action.payload).not.toBeNull();
        expect(action.payload).not.toBeUndefined();
        expect(action.payload.body).toBeUndefined();
        expect(action.payload.method).toBe("GET");
        expect(action.payload.onCompleteAction).toBe(parameters.onCompleteAction);
        expect(action.payload.url).toBe(parameters.url);
    });

    it('When invoking fetchPost, should return POST RestAction', () => {
        // Arrange
        const parameters: restActions.RestRequestParameters<{}> = {
            url: '/api/dummy-endpoint',
            onCompleteAction: 'DUMMY_ENDPOINT_FETCHED',
            body: { }
        };

        // Act
        const action = restActions.fetchPost(parameters);

        // Assert
        expect(action).not.toBeNull();
        expect(action).not.toBeUndefined();
        expect(action.type).toEqual(restActions.REST_ACTION);
        expect(action.payload).not.toBeNull();
        expect(action.payload).not.toBeUndefined();
        expect(action.payload.method).toBe("POST");
        expect(action.payload.body).toBe(parameters.body);
        expect(action.payload.onCompleteAction).toBe(parameters.onCompleteAction);
        expect(action.payload.url).toBe(parameters.url);
    });

    it('When invoking fetchPut, should return PUT RestAction', () => {
        // Arrange
        const parameters: restActions.RestRequestParameters<{}> = {
            url: '/api/dummy-endpoint',
            onCompleteAction: 'DUMMY_ENDPOINT_FETCHED',
            body: { }
        };

        // Act
        const action = restActions.fetchPut(parameters);

        // Assert
        expect(action).not.toBeNull();
        expect(action).not.toBeUndefined();
        expect(action.type).toEqual(restActions.REST_ACTION);
        expect(action.payload).not.toBeNull();
        expect(action.payload).not.toBeUndefined();
        expect(action.payload.method).toBe("PUT");
        expect(action.payload.body).toBe(parameters.body);
        expect(action.payload.onCompleteAction).toBe(parameters.onCompleteAction);
        expect(action.payload.url).toBe(parameters.url);
    });

    it('When invoking fetchDelete, should return DELETE RestAction', () => {
        // Arrange
        const parameters: restActions.RestRequestParameters<{}> = {
            url: '/api/dummy-endpoint',
            onCompleteAction: 'DUMMY_ENDPOINT_FETCHED',
            body: { }
        };

        // Act
        const action = restActions.fetchDelete(parameters);

        // Assert
        expect(action).not.toBeNull();
        expect(action).not.toBeUndefined();
        expect(action.type).toEqual(restActions.REST_ACTION);
        expect(action.payload).not.toBeNull();
        expect(action.payload).not.toBeUndefined();
        expect(action.payload.method).toBe("DELETE");
        expect(action.payload.body).toBe(parameters.body);
        expect(action.payload.onCompleteAction).toBe(parameters.onCompleteAction);
        expect(action.payload.url).toBe(parameters.url);
    });

    it('When invoking fetchPatch, should return PATCH RestAction', () => {
        // Arrange
        const parameters: restActions.RestRequestParameters<{}> = {
            url: '/api/dummy-endpoint',
            onCompleteAction: 'DUMMY_ENDPOINT_FETCHED',
            body: { }
        };

        // Act
        const action = restActions.fetchPatch(parameters);

        // Assert
        expect(action).not.toBeNull();
        expect(action).not.toBeUndefined();
        expect(action.type).toEqual(restActions.REST_ACTION);
        expect(action.payload).not.toBeNull();
        expect(action.payload).not.toBeUndefined();
        expect(action.payload.method).toBe("PATCH");
        expect(action.payload.body).toBe(parameters.body);
        expect(action.payload.onCompleteAction).toBe(parameters.onCompleteAction);
        expect(action.payload.url).toBe(parameters.url);
    });

    it('When invoking fetchHead, should return HEAD RestAction', () => {
        // Arrange
        const parameters: restActions.RestRequestParameters<void> = {
            url: '/api/dummy-endpoint',
            onCompleteAction: 'DUMMY_ENDPOINT_FETCHED'
        };

        // Act
        const action = restActions.fetchHead(parameters);

        // Assert
        expect(action).not.toBeNull();
        expect(action).not.toBeUndefined();
        expect(action.type).toEqual(restActions.REST_ACTION);
        expect(action.payload).not.toBeNull();
        expect(action.payload).not.toBeUndefined();
        expect(action.payload.method).toBe("HEAD");
        expect(action.payload.body).toBeUndefined;
        expect(action.payload.onCompleteAction).toBe(parameters.onCompleteAction);
        expect(action.payload.url).toBe(parameters.url);
    });

    it('When invoking createRestAction, should return RestAction', () => {
        // Arrange
        const payload: RestPayload<{}> = {
            method: 'POST',
            url: '/api/dummy-endpoint',
            onCompleteAction: 'DUMMY_ENDPOINT_FETCHED',
            body: { }
        };

        // Act
        const action = restActions.createRestAction(payload);

        // Assert
        expect(action).not.toBeNull();
        expect(action).not.toBeUndefined();
        expect(action.type).toEqual(restActions.REST_ACTION);
        expect(action.payload).not.toBeNull();
        expect(action.payload).not.toBeUndefined();
        expect(action.payload.method).toBe("POST");
        expect(action.payload.body).toBe(payload.body);
        expect(action.payload.onCompleteAction).toBe(payload.onCompleteAction);
        expect(action.payload.url).toBe(payload.url);
    });
});
