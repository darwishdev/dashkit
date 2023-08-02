
import useDataFetcherList from './useDataFetcherList';
import { rolesListResponse } from '../api/ApiMock'
import { describe, expect, it } from 'vitest'
import { createApp } from 'vue'
import apiClient from '../api/ApiMock';
import type { RolesListResponse, RolesListRequest } from '@/api/ApiTypes'
const withSetup = (hook: any) => {
    let result;

    const app = createApp({
        setup() {
            result = hook();
            return () => { };
        },
    });

    app.mount(document.createElement("div"));

    return [result, app];
}

describe('useDataFetcherList', () => {
    it('fetches data and updates reactive variables', async () => {
        const [results, app] = withSetup(() => useDataFetcherList<RolesListRequest, RolesListResponse>(apiClient.rolesList, {} as RolesListRequest));
        expect(results.loading.value).toBe(true);
        expect(results.responseData.value).toBeNull();
        expect(results.error.value).toBeNull();
        await new Promise((resolve) => setTimeout(resolve, 1000));
        expect(results.loading.value).toBe(false);
        expect(results.responseData.value).toStrictEqual(rolesListResponse);
        expect(results.error.value).toBeNull();
        app.unmount();
    });
    it('handles API failure and updates error variable', async () => {
        const [results, app] = withSetup(() => useDataFetcherList<RolesListRequest, RolesListResponse>(apiClient.rolesListWithErr, {} as RolesListRequest));
        expect(results.loading.value).toBe(true);
        expect(results.responseData.value).toBeNull();
        await new Promise((resolve) => setTimeout(resolve, 1000));
        expect(results.loading.value).toBe(false);
        expect(results.error.value).toStrictEqual('Failed to fetch roles list');
        app.unmount();
    });
});
