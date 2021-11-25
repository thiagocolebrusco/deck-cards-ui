<template>
  <div class="card" :class="suitName">
    <div class="header">
      <div class="value">{{ value }}</div>
      <div class="suit">{{ suitSymbol }}</div>
    </div>
    <div class="body">{{ suitSymbol }}</div>
    <div class="footer">
      <div class="value">{{ value }}</div>
      <div class="suit">{{ suitSymbol }}</div>
    </div>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component
export default class Card extends Vue {
  @Prop({ required: true }) readonly suit!: string;

  @Prop({ required: true }) readonly value!: string;

  private suitName!: string;

  private suitSymbol!: string;

  created(): void {
    this.setupData();
  }

  public setupData(): void {
    switch (this.suit) {
      case "H":
        this.suitName = "hearts";
        this.suitSymbol = "♥";
        break;
      case "D":
        this.suitName = "diamonds";
        this.suitSymbol = "♦";
        break;
      case "S":
        this.suitName = "spades";
        this.suitSymbol = "♠";
        break;
      case "C":
        this.suitName = "clubs";
        this.suitSymbol = "♣";
        break;
      default:
        break;
    }
  }

  @Watch("suit")
  suitChanged(): void {
    this.setupData();
  }
}
</script>

<style lang="scss">
.card {
  width: 130px;
  height: 200px;
  background-color: #f3f3f3;
  border-radius: 15px;
  position: relative;
  font-size: 20px;
  display: inline-block;

  > .header {
    top: 20px;
    left: 20px;
    position: absolute;
  }

  > .footer {
    bottom: 20px;
    right: 20px;
    position: absolute;
    -moz-transform: scale(-1, -1);
    -webkit-transform: scale(-1, -1);
    -o-transform: scale(-1, -1);
    -ms-transform: scale(-1, -1);
    transform: scale(-1, -1);
  }

  .suit,
  .value {
    font-weight: bold;
  }

  &.hearts,
  &.diamonds {
    color: red;
  }

  &.clubs,
  &.spades {
    color: black;
  }

  .body {
    font-size: 60px;
    line-height: 200px;
    text-align: center;
  }
}
</style>
