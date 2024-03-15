import { useState } from "react";
import { useMutation } from "convex/react";

// This is a custom hook that wraps the useMutation hook from Convex. It adds a loading state and error state to the mutation.
// This is useful for displaying a loading spinner and error message when making a mutation.

export const useApiMutation = (apiMutation: any) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const apiMutationHook = useMutation(apiMutation);

    const mutate = async (payload: any) => {
        setLoading(true);
        setError(null);
        return apiMutationHook(payload)
        .finally(() => setLoading(false))
        .catch((error) => setError(error))
        .then((response) => {
            return response;
        });
    }

    return {
        mutate,
        loading,
        error
    };
};