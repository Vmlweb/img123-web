<template>
  <div style="width: 50%; height: 100%">
    <input ref="upload" style="display: none" type="file" accept="image/*" @change="openFile($event)"><br>
    <v-card
      height="400"
      outlined
      class="d-flex flex-column align-center"
      link
      @click="$refs.upload.click()"
    >
      <div class="d-flex flex-row align-center" style="height:100%">
        <v-icon size="128" class="grey--text text--darken-3">{{ icons.mdiCloudUploadOutline }}</v-icon>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { detect } from '@/helpers'
import { mdiCloudUploadOutline } from '@/helpers/icons'

@Component
export default class UploadComponent extends Vue {
  icons = {
    mdiCloudUploadOutline
  }

  openFile (event: any) {
    const reader = new FileReader()
    reader.onload = async () => {
      if (reader.result instanceof ArrayBuffer) {
        const type = detect(reader.result)
        if (type) {
          this.$emit('change', { type, data: reader.result })
        }
      }
    }
    reader.readAsArrayBuffer(event.target.files[0])
  }
}
</script>
