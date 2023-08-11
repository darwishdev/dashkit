interface CachedData {
    [key: string]: any[];
}

class CacheSingleton {
    private static instance: CacheSingleton;
    private cachedData: CachedData = {};

    private constructor() { }

    static getInstance(): CacheSingleton {
        if (!CacheSingleton.instance) {
            CacheSingleton.instance = new CacheSingleton();
        }
        return CacheSingleton.instance;
    }

    private getKey(identifier: string, filterModel: Record<string, any>, showDeleted: boolean = false): string {
        const filterString = JSON.stringify(filterModel);
        return `${identifier}.${filterString}.${showDeleted ? 'deleted' : ''}`;
    }

    set(identifier: string, filterModel: Record<string, any>, data: any[], showDeleted: boolean = false): void {
        const key = this.getKey(identifier, filterModel, showDeleted);
        this.cachedData[key] = data;
    }

    get(identifier: string, filterModel: Record<string, any>, showDeleted: boolean = false): any[] | undefined {
        const key = this.getKey(identifier, filterModel, showDeleted);
        return this.cachedData[key];
    }

    update(identifier: string, filterModel: Record<string, any>, newData: any[]): void {
        const key = this.getKey(identifier, filterModel);
        this.cachedData[key] = newData;
    }

    clearForm(identifier: string): void {
        const prefix = `${identifier}.`;
        for (const key in this.cachedData) {
            if (key.startsWith(prefix)) {
                delete this.cachedData[key];
            }
        }
    }

    clearCache(): void {
        this.cachedData = {};
    }
}


export default CacheSingleton.getInstance();
// Usage