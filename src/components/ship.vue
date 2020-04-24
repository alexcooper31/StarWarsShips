<template>
  <div class="ship" @click="findShip(ship.name)">
    <div class="ship--background">
      <img src="../../src/assets/ship.png" style="width:130px;height:130px" />
      <div class="ship--speed">{{ Number.isInteger(Number(ship.MGLT)) ? ship.MGLT : '??' }}</div>
    </div>
      <div class="ship--info">
        <div class="ship--info--name"><b>{{ ship.name }}</b></div>
        <div>Resources Duration: <b>{{ ship.consumables }}</b></div>
        <div>Total Crew Needed: <b>{{ ship.crew }}</b></div>
        <div>Stops until destination: <b :style="stopsColor">{{ getEstimatedStops(ship) }}</b></div>
      </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

interface IShip {
  MGLT: string;
  consumables: string;
}

export default Vue.extend({
  props: {
    ship: {
      type: Object,
      default: [],
    },
    distance: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    stopsColor() {
      const value = this.getEstimatedStops(this.ship);
      switch (value) {
        case 'No stops': {
          return 'color: lightgreen';
        }
        case 'unknown': {
          return 'color: red;text-transform: capitalize;';
        }
        default: {
          return 'color: deepskyblue';
        }
      }
    },
  },
  methods: {
    getEstimatedStops(ship: IShip) {
      const speed = Number(ship.MGLT);
      if (isNaN(speed)) {
        return ship.MGLT;
      }
      const [count, multiplier] = ship.consumables.split(' ');

      const stops = Math.floor(
        (this.distance / Number(ship.MGLT)) /
        (this.getTime(multiplier) * Number(count) * 24),
      );

      return stops === 0 ? 'No stops' : stops;
    },

    getTime(multiplier: string) {
      const count = (
        (multiplier.includes('week') && 7)
        || (multiplier.includes('month') && 30)
        || (multiplier.includes('year') && 365)
        || (multiplier.includes('day') && 1)
      );

      if (!count) {
        throw new TypeError('Could not calculate right multipler');
      }

      return count;
    },

    findShip(ship: string) {
      window.open(`https://starwars.fandom.com/wiki/${ship.replace(' ', '_')}`, '_blank');
    },
  },
});
</script>

<style lang='scss'>
  .ship {
    display: flex;
    height: fit-content;
    margin: 20px 0;
    user-select: none;
    cursor: pointer;
    border-color: white;
    transition: transform 0.3s, border-color 0.3s;

    &:hover {
      transform: translateY(-5px);
      border-color: gold;
    }

    &--background {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 150px;
      height: 150px;
      border-radius: 15px;
      border: 2px solid white;
      border-color: inherit;
    }

    &--speed {
      position: absolute;
      bottom: -30px;
      left: -25px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      font-weight: 500;
      font-size: 22px;
      border-radius: 100%;
      border: 2px solid white;
      background-color: black;
      border-color: inherit;

      &::before {
        content: "MTGL Per Hour";
        position: absolute;
        white-space: nowrap;
        left: 48px;
        border: 2px solid white;
        border-radius: 0 5px 5px 0;
        padding: 3px 5px 3px 0;
        border-left: none;
        background-color: black;
        font-size: 12px;
        border-color: inherit;
      }
    }

    &--info {
      display: flex;
      margin: 5px 10px;
      flex-direction: column;
      justify-content: space-between;
      border-color: inherit;

      &--name {
        border: 2px solid white;
        border-color: inherit;
        color: white;
        text-align: center;
        padding: 10px;
        border-radius: 10px;
      }
    }
  }

</style>
