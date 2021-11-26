<template>
  <div class="card" :class="suitData.name" @click="$emit('click')">
    <div class="header">
      <div class="value">{{ value }}</div>
      <div class="suit">{{ suitData.symbol }}</div>
    </div>
    <div class="body">{{ suitData.symbol }}</div>
    <div class="footer">
      <div class="value">{{ value }}</div>
      <div class="suit">{{ suitData.symbol }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Suits } from "@/constants/enums";

@Component
export default class Card extends Vue {
  @Prop({ required: true }) readonly suit!: string;

  @Prop({ required: true }) readonly value!: string;

  get suitData(): { name: string; symbol: string; key: string } | undefined {
    return Suits.find((suit) => suit.key === this.suit);
  }
}
</script>

<style lang="scss">
.card {
  width: 130px;
  height: 200px;
  background-color: white;
  border-radius: 15px;
  position: relative;
  font-size: 20px;
  display: inline-block;
  cursor: pointer;

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
