<template>
  <div style="width: 50%; height: 100%">
    <div
      v-for="section in formats"
      :key="section[0]"
      class="d-flex flex-row justify-space-between ml-n4 mr-n4"
    >
      <div
        style="width: 100%; height: 100%"
        class="mx-4 my-4"
        v-for="index in [0,1,2]"
        :key="index"
      >
        <v-card
          v-if="section[index]"
          outlined
          class="d-flex flex-column align-center"
          link
          width="100%"
          height="100px"
          @click="$emit('change', section[index])"
        >
          <div class="d-flex flex-row align-center" style="height: 100%">
            <h1 class="headline grey--text text--darken-1">{{ section[index] && section[index].toUpperCase() }}</h1>
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class UploadComponent extends Vue {
  @Prop()
  type!: string

  get formats () {
    return [
      ['png']
    ]
  }
}
</script>
