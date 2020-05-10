import * as FileSaver from 'file-saver'

export const download = (blob: Blob, filename: string) => {
  FileSaver.saveAs(blob, filename)
}
