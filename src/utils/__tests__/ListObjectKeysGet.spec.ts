import { ListObjectKeysGet } from '@/utils/helpers'; // Replace with the actual path
import { expect, it, describe } from "vitest";

describe('ListObjectKeys', () => {
    it('should return correct keys', () => {
        const keys = ListObjectKeysGet('category');
        expect(keys.rows).toBe('categories');
        expect(keys.deletedRows).toBe('deletedCategories');
    });

    it('should handle capitalization', () => {
        const keys = ListObjectKeysGet('user');
        expect(keys.rows).toBe('users');
        expect(keys.deletedRows).toBe('deletedUsers');
    });

    // Add more test cases if needed
});
