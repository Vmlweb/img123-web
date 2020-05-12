<template>
  <div
    style="width: 100%; height: 100%"
    class="d-flex flex-column align-center justify-space-between"
  >
    <template v-if="!done">
      <p
        class="font-weight-light grey--text mt-6"
        :class="$vuetify.breakpoint.smAndDown ? 'subtitle-1' : 'title'"
      >
        Wait for the download to start...
      </p>
      <v-progress-circular
        indeterminate
        size="64"
        width="2"
        class="mt-6"
      />
    </template>
    <template v-else>
      <p
        class="font-weight-light mt-6"
        :class="$vuetify.breakpoint.smAndDown ? 'subtitle-1' : 'title'"
      >
        Download complete
      </p>
      <v-icon
        v-if="done"
        color="green"
        size="128"
        class="mb-6"
      >
        {{ icons.mdiCheckCircle }}
      </v-icon>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { convert } from '@/helpers/convert'
import { mdiCheckCircle } from '@/helpers/icons'
import * as FileSaver from 'file-saver'

@Component
export default class DownloadComponent extends Vue {
  icons = {
    mdiCheckCircle
  }

  @Prop()
  inputType!: string

  @Prop()
  inputFilename!: string

  @Prop()
  inputData!: ArrayBuffer

  @Prop()
  outputFormat!: string

  done = false

  mounted () {
    this.download()
  }

  async download () {
    this.done = false
    await new Promise(resolve => setTimeout(resolve, 500))
    const blob = await convert(this.inputType, this.outputFormat, this.inputData)
    const filename = this.inputFilename.replace(/\.[^.]+$/, `.${this.outputFormat}`)
    FileSaver.saveAs(blob, filename)
    this.done = true
  }
}
</script>
