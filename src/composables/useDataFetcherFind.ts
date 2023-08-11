import { ref, onBeforeMount } from 'vue';
import type { Ref } from 'vue';
// import type { RouteLocationNormalizedLoaded } from 'vue-router';
export default function useDataFetcherFind<Request, Response>(fetchFunction: Function, request: Request, mapFunction?: Function): {
    responseData: Ref<Response | null>,
    loading: Ref<boolean>,
    error: Ref<string | null>,
    fetchData: () => Promise<void>
} {
    const responseData: Ref<Response | null> = ref(null)
    const loading: Ref<boolean> = ref(true)
    const error: Ref<string | null> = ref(null)
    const fetchData = async () => {
        loading.value = true
        try {
            const response = await fetchFunction(request)
            if (mapFunction) {
                responseData.value = mapFunction(response)
            } else {
                responseData.value = response
            }
            error.value = null

        } catch (err: any) {
            error.value = err.message || 'An error occurred.'
        } finally {
            loading.value = false
        }
    }

    onBeforeMount(() => {
        fetchData()
    })

    return {
        responseData,
        loading,
        error,
        fetchData
    };
}
