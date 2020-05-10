export const convert = async (from: string, to: string, body: ArrayBuffer) => {
  const response = await fetch(`https://img123-api-velijis6da-uc.a.run.app/convert?from=${from}&to=${to}`, {
    method: 'POST',
    body
  })
  return await response.blob()
}
