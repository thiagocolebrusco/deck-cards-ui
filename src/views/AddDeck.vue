<template>
  <div>
    <div class="cards-list">
      <Card v-for="card in cards" :key="card.key" :suit="card.suit" :value="card.value" />
    </div>

    <div>
      <input v-model="cardInput" />
      <button @click="addCard">add</button>
    </div>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import Card from "@/components/Card.vue";

@Component({
  components: { Card },
})
export default class AddDeck extends Vue {
  private cards: any[] = [];

  private cardInput = "";

  public addCard(): void {
    const [value, suit] = this.cardInput.split("");
    this.cards.push({ value, suit, key: this.cardInput });
    this.cardInput = "";
  }
}
</script>

<style lang="scss">
.cards-list {
  margin: 20px;
}
</style>
