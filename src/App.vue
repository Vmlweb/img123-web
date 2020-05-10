<template>
  <v-app>
    <v-container class="d-flex flex-column align-center">
      <v-stepper alt-labels style="width: 50%" class="mt-8 mb-8" :value="step">
        <v-stepper-header>
          <v-stepper-step step="1" :editable="step === 3" @click="() => step === 3 && reset()">Upload</v-stepper-step>
          <v-stepper-step step="2">Customize</v-stepper-step>
          <v-stepper-step step="3" :editable="step === 3" @click="() => step === 3 && $refs.download.download()">Download</v-stepper-step>
        </v-stepper-header>
      </v-stepper>
      <upload v-if="step === 1" @change="type = $event.type; data = $event.data" />
      <customize v-if="step === 2" :type="type" @change="format = $event" />
      <download ref="download" v-if="step === 3" :type="type" :data="data" :format="format" />
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Upload from '@/views/Upload.vue'
import Customize from '@/views/Customize.vue'
import Download from '@/views/Download.vue'

@Component({
  components: {
    Upload,
    Customize,
    Download
  }
})
export default class AppComponent extends Vue {
  type: string | null = null
  data: ArrayBuffer | null = null
  format: string | null = null

  reset () {
    this.type = null
    this.data = null
    this.format = null
  }

  get step () {
    if (!this.data || !this.type) {
      return 1
    } else if (!this.format) {
      return 2
    } else {
      return 3
    }
  }
}
</script>

<style lang="scss">
* {
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: -moz-none;
    -o-user-select: none;
    user-select: none;
}
</style>
