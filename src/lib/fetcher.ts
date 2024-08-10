
export const fetcher = async (url: string): Promise<unknown> => {
  const response = await fetch(url)
  const data = await response.json()
  return data
}
