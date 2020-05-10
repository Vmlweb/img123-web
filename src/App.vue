<template>
  <v-app>
    <v-container class="d-flex flex-column align-center">
      <v-img
        :src="require('@/assets/logo.svg')"
        contain
        height="100px"
        class="my-6"
        style="cursor: pointer"
        @click="reload"
      />
      <v-stepper
        :alt-labels="!$vuetify.breakpoint.smAndDown"
        :style="{ width: $vuetify.breakpoint.smAndDown ? '85%' : '60%' }"
        class="mb-6"
        :value="step"
      >
        <v-stepper-header>
          <v-stepper-step
            step="1"
            :editable="step > 1"
            :complete="step > 1"
            edit-icon="$complete"
            @click="reset"
          >
            Upload
            <small class="mt-1">{{ inputType ? inputType.toUpperCase() : 'Image' }}</small>
          </v-stepper-step>
          <v-stepper-step
            step="2"
            :editable="step > 2"
            :complete="step > 2"
            edit-icon="$complete"
            @click="outputFormat = null"
          >
            Customize
            <small class="mt-1">Format</small>
          </v-stepper-step>
          <v-stepper-step
            step="3"
            :editable="step === 3"
            :complete="step === 3"
            edit-icon="$complete"
            @click="() => step === 3 && $refs.download.download()"
          >
            Download
            <small class="mt-1">{{ outputFormat ? outputFormat.toUpperCase() : 'Image' }}</small>
          </v-stepper-step>
        </v-stepper-header>
      </v-stepper>
      <div
        style="width: 50%; height: 100%"
        class="d-flex flex-column align-center"
      >
        <upload
          v-if="step === 1"
          @change="inputType = $event.inputType; inputData = $event.inputData; inputFilename = $event.inputFilename"
        />
        <customize
          v-if="step === 2"
          @change="outputFormat = $event"
        />
        <download
          v-if="step === 3"
          ref="download"
          :input-type="inputType"
          :input-filename="inputFilename"
          :input-data="inputData"
          :output-format="outputFormat"
        />
      </div>
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
  inputType: string | null = null
  inputFilename: string | null = null
  inputData: ArrayBuffer | null = null
  outputFormat: string | null = null

  reload () {
    location.reload()
  }

  reset () {
    this.inputType = null
    this.inputFilename = null
    this.inputData = null
    this.outputFormat = null
  }

  get step () {
    if (!this.inputType || !this.inputFilename || !this.inputData) {
      return 1
    } else if (!this.outputFormat) {
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

.v-stepper__step {
  padding: 12px !important;
}

@media only screen and (max-width: 959px) {
  .v-stepper:not(.v-stepper--vertical) .v-stepper__label {
    display: -webkit-box !important; /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box !important; /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox !important; /* TWEENER - IE 10 */
    display: -webkit-flex !important; /* NEW - Chrome */
    display: flex !important; /* NEW, Spec - Opera 12.1, Firefox 20+ */
  }
  @media only screen and (max-width: 959px) {
    .v-stepper:not(.v-stepper--vertical) .v-stepper__step__step {
      margin-right: 12px !important;
    }
  }
}
</style>
