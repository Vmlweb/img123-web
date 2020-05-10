<template>
  <div style="width: 50%; height: 100%" class="d-flex flex-column align-center justify-space-between py-12">
    <v-progress-circular
      indeterminate
      size="96"
      width="4"
      class="my-4"
      color="green"
      v-if="!done"
    />
    <v-icon
      v-if="done"
      color="green"
      size="128"
      class="mb-4"
    >
      {{ icons.mdiCheckCircle }}
    </v-icon>
    <p v-if="done" class="title font-weight-regular">Download starting...</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { download, convert } from '@/helpers'
import { mdiCheckCircle } from '@/helpers/icons'

@Component
export default class DownloadComponent extends Vue {
  icons = {
    mdiCheckCircle
  }

  @Prop()
  type!: string

  @Prop()
  data!: ArrayBuffer

  @Prop()
  format!: string

  done = false

  mounted () {
    this.download()
  }

  async download () {
    this.done = false
    await new Promise(resolve => setTimeout(resolve, 500))
    const blob = await convert(this.type, this.format, this.data)
    download(blob, 'test.png')
    this.done = true
  }
}
</script>
