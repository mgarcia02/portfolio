/** Yields to the browser so long work does not block input or painting. */
export const nextTask = (): Promise<void> => new Promise((resolve) => setTimeout(resolve))
