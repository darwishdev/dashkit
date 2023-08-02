import { describe, expect, it } from 'vitest';
import { createApp } from 'vue';
import useDataFetcherFind from './useDataFetcherFind';
import apiClient from '../api/ApiMock';
import type { RoleFindRequest, RoleFindResponse } from '@/api/ApiTypes';

const withSetup = (hook: any) => {
    let result;

    const app = createApp({
        setup() {
            result = hook();
            return () => { };
        },
    });

    app.mount(document.createElement('div'));

    return [result, app];
};

describe('useDataFetcherFind', () => {
    it('fetches data and updates reactive variables', async () => {
        const [results, app] = withSetup(() =>
            useDataFetcherFind<RoleFindRequest, RoleFindResponse>(apiClient.roleFind, {} as RoleFindRequest)
        );
        expect(results.loading.value).toBe(true);
        expect(results.responseData.value).toBeNull();
        expect(results.error.value).toBeNull();
        await new Promise((resolve) => setTimeout(resolve, 1000));
        expect(results.loading.value).toBe(false);
        // You can check for the expected response data here
        // For example, expect(results.responseData.value).toEqual(expectedResponseData);
        expect(results.error.value).toBeNull();
        app.unmount();
    });

    it('handles API failure and updates error variable', async () => {
        const [results, app] = withSetup(() =>
            useDataFetcherFind<RoleFindRequest, RoleFindResponse>(apiClient.roleFindWithErr, {} as RoleFindRequest)
        );
        expect(results.loading.value).toBe(true);
        expect(results.responseData.value).toBeNull();
        await new Promise((resolve) => setTimeout(resolve, 1000));
        expect(results.loading.value).toBe(false);
        expect(results.error.value).toStrictEqual('error finding the role');
        app.unmount();
    });

    // Add more test cases as needed
});
