<template>
  <div
    style="width: 100%; height: 100%"
    class="d-flex flex-column align-center"
  >
    <p
      class="font-weight-light grey--text mt-6"
      :class="$vuetify.breakpoint.smAndDown ? 'subtitle-1' : 'title'"
    >
      Choose the desired image format
    </p>
    <div
      v-for="section in formats"
      :key="section[0]"
      class="d-flex flex-row justify-space-between ml-n4 mr-n4"
    >
      <div
        v-for="item in section"
        :key="item"
        :class="{
          'mx-4 my-4': !$vuetify.breakpoint.smAndDown,
          'mx-3 my-3': $vuetify.breakpoint.smAndDown,
        }"
      >
        <v-card
          outlined
          class="d-flex flex-column align-center"
          link
          :disabled="item[0] === '!'"
          :style="{
            width: $vuetify.breakpoint.smAndDown ? '80px' : '128px',
            height: $vuetify.breakpoint.smAndDown ? '80px' : '128px'
          }"
          @click="$emit('change', item)"
        >
          <div
            class="d-flex flex-column align-center justify-center"
            style="height: 100%"
          >
            <h1
              v-if="item[0] === '!'"
              class="headline grey--text text--darken-1 my-2"
            >
              {{ item.slice(1).toUpperCase() }}
            </h1>
            <h1
              v-else
              class="headline grey--text text--lighten-1 my-2"
            >
              {{ item.toUpperCase() }}
            </h1>
            <h4
              v-if="item[0] === '!'"
              class="subtitle-2 font-weight-light grey--text text--darken-1"
            >
              Coming Soon
            </h4>
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Supported } from '@/helpers/supported'

@Component
export default class UploadComponent extends Vue {
  @Prop()
  supported!: Supported[]

  @Prop()
  inputType!: string

  get formats () {
    const items = this.supported.filter(o => o.from === this.inputType || o.from === '*')
    const columns: string[][] = []
    while (items.length) {
      columns.push(items.splice(0, this.$vuetify.breakpoint.smAndDown ? 3 : 4).map(o => o.to))
    }
    return columns
  }
}
</script>
