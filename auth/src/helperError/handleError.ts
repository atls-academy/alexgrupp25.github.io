/* eslint no-console: 0 */ // --> off console.log errors

export const handleError = async (callback: () => Promise<void>): Promise<void> => {
  try {
    await callback()
  } catch (error: any) {
    console.error(error.message)
  }
}
