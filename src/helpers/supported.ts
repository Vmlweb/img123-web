export interface Supported {
  from: string;
  to: string;
}

export const supported = async () => {
  const res = await fetch('http://localhost:8081/supported')
  const json = await res.json()
  return json as Supported[]
}
