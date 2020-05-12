export const convert = async (from: string, to: string, body: ArrayBuffer) => {
  const response = await fetch(`https://api.img123.tools/convert?from=${from}&to=${to}`, {
    method: 'POST',
    body
  })
  return await response.blob()
}
