<template>
  <div
    style="width: 100%; height: 100%"
    class="d-flex flex-column align-center"
    @drop.prevent="fileDropped"
    @dragover.prevent
  >
    <p
      class="title font-weight-light grey--text mt-10"
      style="cursor: pointer"
      @click="$refs.upload.click()"
    >
      Click here or drag an image into the window
    </p>
    <v-progress-circular
      v-if="uploading"
      indeterminate
      size="64"
      width="2"
      class="mt-6"
    />
    <v-card
      v-else
      width="256"
      height="256"
      outlined
      class="d-flex flex-column align-center mt-6"
      link
      @click="$refs.upload.click()"
    >
      <div
        class="d-flex flex-row align-center"
        style="height:100%"
      >
        <v-icon
          size="128"
          class="grey--text text--darken-3"
        >
          {{ icons.mdiUpload }}
        </v-icon>
      </div>
    </v-card>
    <input
      ref="upload"
      style="display: none"
      type="file"
      accept="image/*"
      @change="fileChanged"
    >
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Supported } from '@/helpers/supported'
import { mdiUpload } from '@/helpers/icons'
import imageType from 'image-type'

@Component
export default class UploadComponent extends Vue {
  icons = {
    mdiUpload
  }

  @Prop()
  supported!: Supported[]

  uploading = false

  fileDropped (event: any) {
    this.uploadFile(event.dataTransfer.files[0])
  }

  fileChanged (event: any) {
    this.uploadFile(event.target.files[0])
  }

  uploadFile (file: File) {
    this.uploading = true
    const reader = new FileReader()
    reader.onload = async () => {
      if (reader.result instanceof ArrayBuffer) {
        const format = imageType(new Uint8Array(reader.result))
        let ext = format?.ext as string
        if (ext === 'tif') {
          ext = 'tiff'
        } else if (file.name.endsWith('.icns')) {
          ext = 'icns'
        }
        if (ext && this.supported.some(o => o.from === ext)) {
          setTimeout(() => {
            this.$emit('change', {
              inputFilename: file.name,
              inputType: ext,
              inputData: reader.result
            })
            this.uploading = false
          }, 500)
        } else {
          this.uploading = false
          this.$emit('error', 'Image file type unsupported')
        }
      } else {
        this.uploading = false
        this.$emit('error', 'Unexpected data format')
      }
    }
    reader.onerror = (event: any) => {
      this.uploading = false
      this.$emit('error', `Failed to read file: ${event.target.error.code}`)
      reader.abort()
    }
    reader.onabort = () => {
      this.uploading = false
    }
    reader.readAsArrayBuffer(file)
  }
}
</script>
