export const convert = async (from: string, to: string, body: ArrayBuffer) => {
  const response = await fetch(`http://localhost:8080/convert?from=${from}&to=${to}`, {
    method: 'POST',
    body
  })
  return await response.blob()
}
