import imageType from 'image-type'

const supported = [
  'jpeg'
]

export const detect = (buffer: ArrayBuffer) => {
  const type = imageType(new Uint8Array(buffer))
  const format = type?.mime.split('/')[1]
  if (format && supported.includes(format)) {
    return format
  } else {
    return null
  }
}
