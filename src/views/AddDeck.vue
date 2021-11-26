<template>
  <div class="add-deck">
    <div class="cards-list">
      <Card
        class="card"
        v-for="(card, index) in cards"
        :key="card.key"
        :suit="card.suit"
        :value="card.value"
        @click="removeCard(index)"
      />
    </div>

    <div class="card-addition">
      <p>Add cards to the pile</p>
      <input maxlength="3" v-model="cardInput" />
      <button @click="addCard">Add</button>
      <span class="error-message" v-if="errorMessage">{{ errorMessage }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Card from "@/components/Card.vue";
import { Suits, Values } from "@/constants/enums";
import { ICard } from "@/constants/interfaces";

@Component({
  components: { Card },
})
export default class AddDeck extends Vue {
  private cards: ICard[] = [];

  private cardInput = "";

  private errorMessage!: string;

  public addCard(): void {
    try {
      this.errorMessage = "";

      const card = this.getCard();
      this.cards.push(card);
      this.cardInput = "";
    } catch (error) {
      this.errorMessage = (error as Error)?.message;
    }
  }

  public removeCard(index: number): void {
    console.log(index);
    this.cards.splice(index, 1);
  }

  private getCard(): ICard {
    const key = this.cardInput?.toUpperCase();

    if (this.cards?.length >= 10) {
      throw new Error(
        "You can't add more then 10 cards. If you want, click on a card to remove it." // eslint-disable-line
      );
    }

    if (!key) throw new Error("Please, fulfill the card you want to add.");

    if (this.cards.find((card) => card.key === key)) {
      throw new Error("You can't add this card in duplicity. Try another card.");
    }

    const suit = key.slice(key.length - 1);
    const value = key.slice(0, key.length - 1);

    if (!Suits.find((item) => item.key === suit)) {
      throw new Error("The Suit you chose is invalid. Please fix it.");
    }

    if (!Values.includes(value)) {
      throw new Error("The Value you chose is invalid. Please fix it.");
    }

    return { value, suit, key };
  }
}
</script>

<style lang="scss">
.add-deck {
  background-color: #17644d;

  .cards-list {
    min-height: 250px;

    .card {
      margin: 20px;
    }
  }
  .card-addition {
    padding: 20px;

    & > p {
      color: white;
      font-weight: bold;
      margin: 5px 0;
    }

    & > input,
    button {
      line-height: 40px;
    }
    & > input {
      border-radius: 5px 0 0 5px;
      border: 0;
      text-transform: uppercase;
    }

    & > button {
      border-radius: 0 5px 5px 0;
      border: 0;
      background-color: #0ebc76;
      padding-left: 20px;
      padding-right: 20px;
      color: white;
      font-weight: bold;
      cursor: pointer;
    }

    & > .error-message {
      color: white;
      margin-left: 20px;
    }
  }
}
</style>
