export function safeWrap<T>(
  operation: () => Promise<T>,
  errorMessage: string
): Promise<T> {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await operation()
      resolve(result)
    } catch (error) {
      reject(new Error(`${errorMessage}: ${error instanceof Error ? error.message : 'Unknown error'}`))
    }
  })
} 