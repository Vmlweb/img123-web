export interface Supported {
  from: string;
  to: string;
}

export const supported = async () => {
  const res = await fetch('https://api.img123.tools/supported')
  const json = await res.json()
  return json as Supported[]
}
