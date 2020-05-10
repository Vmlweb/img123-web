<template>
  <div
    style="width: 100%; height: 100%"
    class="d-flex flex-column align-center"
  >
    <p class="title font-weight-light grey--text mt-10">
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
        class="mx-4 my-4"
      >
        <v-card
          outlined
          class="d-flex flex-column align-center"
          link
          :disabled="item[0] === '!'"
          width="128px"
          height="128px"
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
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class UploadComponent extends Vue {
  get formats () {
    return [
      ['png', '!gif', '!tif', '!bmp'],
      ['!ico', '!icns']
    ]
  }
}
</script>
