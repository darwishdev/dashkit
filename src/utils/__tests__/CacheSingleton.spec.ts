
import { expect, it, describe } from "vitest";
import cache from '@/utils/CacheSingleton'; // Update the path based on your directory structure

describe('CacheSingleton', () => {
    it('should set and get cached data', () => {

        const filterModel = { name: 'admin', createdAt: '2022/05/05' };
        const identifier = 'RolesList';

        const data = [
            { roleName: 'admin', createdAt: 'bla' },
            { roleName: 'super admin', createdAt: 'bla' },
        ];

        cache.set(identifier, filterModel, data);
        const retrievedData = cache.get(identifier, filterModel);

        expect(retrievedData).toEqual(data);
    });

    it('should update cached data', () => {

        const filterModel = { name: 'admin', createdAt: '2022/05/05' };
        const identifier = 'RolesList';

        const initialData = [
            { roleName: 'admin', createdAt: 'bla' },
            { roleName: 'super admin', createdAt: 'bla' },
        ];

        const newData = [
            { roleName: 'admin', createdAt: 'bla' },
            { roleName: 'super admin', createdAt: 'bla' },
            { roleName: 'super advisor', createdAt: 'bla' },
        ];

        cache.set(identifier, filterModel, initialData);
        cache.update(identifier, filterModel, newData);

        const updatedData = cache.get(identifier, filterModel);
        expect(updatedData).toEqual(newData);
    });

    it('should clear form data', () => {

        const filterModel = { name: 'admin', createdAt: '2022/05/05' };
        const identifier = 'RolesList';

        const data = [
            { roleName: 'admin', createdAt: 'bla' },
            { roleName: 'super admin', createdAt: 'bla' },
        ];

        cache.set(identifier, filterModel, data);
        cache.clearForm(identifier);

        const clearedData = cache.get(identifier, filterModel);
        expect(clearedData).toBeUndefined();
    });

    it('should clear cache', () => {

        const filterModel = { name: 'admin', createdAt: '2022/05/05' };
        const identifier = 'RolesList';

        const data = [
            { roleName: 'admin', createdAt: 'bla' },
            { roleName: 'super admin', createdAt: 'bla' },
        ];

        cache.set(identifier, filterModel, data);
        cache.clearCache();

        const cachedData = cache.get(identifier, filterModel);
        expect(cachedData).toBeUndefined();
    });
});
