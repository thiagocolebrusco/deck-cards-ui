<template>
  <div v-if="rotationCard">
    <div class="add-deck">
      <div class="cards-list">
        <Card
          class="card"
          v-for="card in sortedCards"
          :key="card.key"
          :suit="card.suit"
          :value="card.value"
        />
      </div>
      <h2>Rotation Card</h2>
      <div class="cards-list">
        <Card
          class="card"
          :key="rotationCard.key"
          :suit="rotationCard.suit"
          :value="rotationCard.value"
        />
      </div>
    </div>
    <div class="sort-buttons">
      <p>Sort cards by</p>
      <div>
        <button class="btn" :class="{ active: sortMode === 'input' }" @click="changeSort('input')">
          Input order
        </button>
        <button
          class="btn"
          :class="{ active: sortMode === 'rotation' }"
          @click="changeSort('rotation')"
        >
          Rotation order
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Card from "@/components/Card.vue";
import CardService from "@/services/CardService";
import { ICard } from "@/constants/interfaces";
import { getCardData, getCardRank } from "@/util";
// import CardService from "@/services/CardService";

@Component({
  components: { Card },
})
export default class ViewDeck extends Vue {
  private deckId!: string;

  private rotationCardId!: string;

  private cards: ICard[] = [];

  private rotationCard: ICard | null = null;

  private sortMode = "input";

  created(): void {
    const decksId = this.$route?.params?.deckId;

    const [deckId, rotationCardId] = decksId.split("|");
    this.deckId = deckId;
    this.rotationCardId = rotationCardId;

    this.loadData();
  }

  get sortedCards(): ICard[] {
    if (this.sortMode === "input" || !this.rotationCard) {
      return this.cards;
    }

    return [...this.cards].sort(
      (a: ICard, b: ICard) =>
        getCardRank(a, this.rotationCard!) - getCardRank(b, this.rotationCard!) // eslint-disable-line
    );
  }

  public async loadData(): Promise<void> {
    await Promise.allSettled([this.loadDeck(), this.loadRotationCardDeck()]);
  }

  public async loadDeck(): Promise<void> {
    const { data } = await CardService.getCardsFromPile(this.deckId, "hand");
    this.cards = data?.piles?.hand?.cards?.map((card: any) => getCardData(card?.code)); // eslint-disable-line
  }

  public async loadRotationCardDeck(): Promise<void> {
    const { data } = await CardService.getCardsFromPile(this.rotationCardId, "rotation");
    const rotationCardDeck = data?.piles?.rotation?.cards?.map(
      (card: any) => getCardData(card?.code) // eslint-disable-line
    );
    this.rotationCard = rotationCardDeck?.[0];
  }

  public changeSort(sortMode = "input"): void {
    this.sortMode = sortMode;
  }
}
</script>

<style lang="scss" scoped>
.add-deck {
  background-color: #17644d;
  border: 1px #0a4634 solid;
  margin-bottom: 15px;

  h2 {
    margin: 5px 20px;
    color: #efef5f;
    font-size: 1.2em;
  }

  .cards-list {
    min-height: 230px;

    .card {
      margin: 10px 20px;
    }
  }
}
.sort-buttons {
  text-align: center;

  p {
    color: white;
  }
}
</style>
