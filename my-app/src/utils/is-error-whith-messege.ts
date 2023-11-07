import { ErorrWithMessage } from "../types";

export const isErrorWhithMessage = (error: unknown): error is ErorrWithMessage => {
    return (
        typeof error === 'object' && error !== null && 'data' in error &&
        typeof (error as Record<string, unknown>).data === 'object'
    )
};
