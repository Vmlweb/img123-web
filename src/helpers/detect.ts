import imageType from 'image-type'

const supported: string[] = [
  'jpg',
  'png'
  // 'gif',
  // 'bmp',
  // 'webp',
  // 'tiff'
]

export const detect = (buffer: ArrayBuffer) => {
  const type = imageType(new Uint8Array(buffer))
  let format = type?.ext as string
  if (format === 'tif') {
    format = 'tiff'
  }
  if (format && supported.includes(format)) {
    return format
  } else {
    return null
  }
}
