<template>
  <div>
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
        <p class="label">Add cards to the pile</p>
        <input class="form-input" placeholder="Card name" maxlength="3" v-model="cardInput" />
        <button class="btn" @click="addCard">Add</button>
        <span class="error-message" v-if="errorMessage">{{ errorMessage }}</span>
      </div>
    </div>

    <div class="submit-form">
      <div>
        <p class="label">Rotation card</p>
        <input class="form-input" placeholder="Card name" maxlength="3" v-model="rotationCard" />
      </div>
      <div>
        <button class="btn" @click="submitDeck">Submit deck</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Card from "@/components/Card.vue";
import { ICard, IDeck } from "@/constants/interfaces";
import { getCardData, validateCard } from "@/util";
import CardService from "@/services/CardService";

@Component({
  components: { Card },
})
export default class AddDeck extends Vue {
  private cards: ICard[] = [];

  private cardInput = "";

  private rotationCard = "";

  private errorMessage = "";

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
    this.cards.splice(index, 1);
  }

  public async submitDeck(): Promise<void> {
    const rotationCard = getCardData(this.rotationCard);

    const [deck, rotationDeck] = (await Promise.allSettled([
      this.createMainDeck(),
      this.createRotationDeck(rotationCard),
    ])) as {
      value?: any; //eslint-disable-line
      status?: string;
    }[];

    const decksId = `${deck?.value?.deckId}|${rotationDeck?.value?.deckId}`;

    this.$router.push(`/deck/${decksId}/`);
  }

  private async createMainDeck(): Promise<IDeck> {
    const deck = await this.createDeck(this.cards);
    await CardService.drawCardsFromDeck(deck.deckId, this.cards.length);
    await CardService.addCardsToPile(deck.deckId, this.cards);

    return deck;
  }

  private async createRotationDeck(rotationCard: ICard): Promise<IDeck> {
    const rotationCardDeck = await this.createDeck([rotationCard]);
    await CardService.drawCardsFromDeck(rotationCardDeck.deckId, 1);
    await CardService.addCardsToPile(rotationCardDeck.deckId, [rotationCard], "rotation");

    return rotationCardDeck;
  }

  // eslint-disable-next-line class-methods-use-this
  private async createDeck(cards: ICard[]): Promise<IDeck> {
    const { data } = await CardService.addDeck(cards);
    const deck: IDeck = {
      deckId: data.deck_id,
      remaining: data.remaining,
      shuffled: data.shuffled,
      success: data.success,
    };
    return deck;
  }

  // private async addCardsToPile(deckId: string): Promise<void> {
  //   const { data } = await CardService.addCardsToPile(deckId, this.cards);
  // }

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

    const card: ICard = getCardData(key);

    validateCard(card);

    return card;
  }
}
</script>

<style lang="scss" scoped>
.add-deck {
  background-color: #17644d;
  border: 1px #0a4634 solid;
  margin-bottom: 15px;

  .cards-list {
    min-height: 230px;

    .card {
      margin: 10px 20px;
    }
  }
  .card-addition {
    padding: 20px;

    & .form-input {
      border-radius: 5px 0 0 5px;
    }

    & .btn {
      border-radius: 0 5px 5px 0;
      border: 0;
    }

    & > .error-message {
      color: white;
      margin-left: 20px;
    }
  }
}

.submit-form {
  float: right;

  & > div {
    display: inline-block;
  }

  & .form-input,
  & .btn {
    border-radius: 5px;
  }

  & .form-input {
    margin-right: 20px;
  }

  & .btn {
    border: 1px white solid;
    padding: 15px 50px;
  }
}
</style>
