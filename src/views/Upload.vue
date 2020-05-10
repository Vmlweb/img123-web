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
    ><br>
    <v-overlay
      :value="error"
      opacity="0.8"
    >
      <div class="d-flex flex-column justify-space-between align-center">
        <v-icon
          color="yellow"
          size="64"
        >
          {{ icons.mdiAlert }}
        </v-icon>
        <p class="title font-weight-light">
          {{ error }}
        </p>
        <v-btn
          text
          @click="error = ''"
        >
          Ok
        </v-btn>
      </div>
    </v-overlay>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { detect } from '@/helpers'
import { mdiUpload, mdiAlert } from '@/helpers/icons'

@Component
export default class UploadComponent extends Vue {
  icons = {
    mdiUpload,
    mdiAlert
  }

  uploading = false
  error = ''

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
        const inputType = detect(reader.result)
        if (inputType) {
          setTimeout(() => {
            this.$emit('change', {
              inputFilename: file.name,
              inputType,
              inputData: reader.result
            })
            this.uploading = false
          }, 500)
        } else {
          this.uploading = false
          this.error = 'File type unsupported'
        }
      } else {
        this.uploading = false
        this.error = 'Unexpected data format'
      }
    }
    reader.onerror = (event: any) => {
      this.uploading = false
      this.error = `Failed to read file: ${event.target.error.code}`
      reader.abort()
    }
    reader.onabort = () => {
      this.uploading = false
    }
    reader.readAsArrayBuffer(file)
  }
}
</script>
