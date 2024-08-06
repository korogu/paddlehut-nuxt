import {useToast} from "primevue/usetoast";

export const useErrorHandlers = () => {
    const toast = useToast();

    return {
        xhrDefaultErrorHandler: async () => {
            toast.add({
                severity: 'error',
                summary: 'Technical error',
                detail: 'An unexpected error occurs. Please try again.',
                group: 'global-notifications',
                life: 3000
            })
        }
    }
}