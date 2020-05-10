import imageType from 'image-type'

export const detect = (buffer: ArrayBuffer) => {
  const type = imageType(new Uint8Array(buffer))
  return type?.mime.split('/')[1]
}
