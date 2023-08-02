import { ref, onBeforeMount } from 'vue';
import type { Ref } from 'vue';

export default function useDataFetcherList<Request, Response>(fetchFunction: (req: Request) => Promise<Response>, req: Request): {
    responseData: Ref<Response | null>,
    loading: Ref<boolean>,
    error: Ref<string | null>,
    fetchData: () => Promise<void>
} {
    // Declare reactive variables using the ref function
    const responseData: Ref<Response | null> = ref(null)
    const loading: Ref<boolean> = ref(false)
    const error: Ref<string | null> = ref(null)

    // Define the fetchData function
    const fetchData = async () => {
        loading.value = true
        try {
            // Execute the fetchFunction with the given request parameter
            const response = await fetchFunction(req)
            // Assign the response to the responseData variable
            responseData.value = response
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
