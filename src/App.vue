<template>
  <div class="container">
    <div class="midground" />
    <div class="foreground" />

    <div class="content">
      <div class="content--header">
        <h1>In a galaxy far far away...</h1>
        <h1>What is the best ship for your journey?</h1>
        <h3 style="padding-top: 20px;">How many parsecs are you planning to run?</h3>
        <form @submit.stop.prevent="callShips(1)">
          <input v-model.number="distance" type="number" />
          <button> Submit </button>
        </form>
        <img v-if="loading" src="../src/assets/spinner.svg" />
      </div>

      <div class="content--ships" v-if="!loading">
        <div v-for="(ship, index) in ships" style="width: 45%" :key="index">
          <ship :distance="distance" :ship="ship" />
        </div>
      </div>

      <div class="content--navigation" v-if="ships.length > 0">
        <button v-if="page > 1" @click="goBack"> Prev </button>
        <button v-if="page < total / 10" @click="goForward">Next</button>
      </div>
      <div>Page {{ page }} of {{ Math.ceil(total / 10) }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { getShips } from './services/swapi';
import ship from './components/ship.vue';

export default Vue.extend({
  components: {
    ship,
  },
  data() {
    return {
      distance: '',
      page: 1,
      ships: [],
      loading: false,
      total: 0,
    };
  },
  methods: {
    async callShips(page: number) {
      if (page === 1) this.page = 1;
      this.loading = true;
      const data = await getShips(page);
      this.ships = data.results;
      this.total = data.count;
      this.loading = false;
    },

    goForward() {
      this.page += 1;
      this.changePage();
    },

    goBack() {
      this.page -= 1;
      this.changePage();
    },

    async changePage() {
      window.scrollTo(0, 0);
      await this.callShips(this.page);
    },
  },
});
</script>

<style lang="scss">
  @keyframes STAR-MOVE {
    from {
      background-position: 5% 5%
    }
    to { 
      background-position: 1300% 600%
    }
  }

  .midground {
    background: url('../src/assets/midground.png') repeat 20% 20%;
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    z-index: 2;
    
    animation-name: STAR-MOVE;
    animation-duration: 150s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  .foreground {
    background: url('../src/assets/foreground.png') repeat 35% 35%;
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    z-index: 1;
    
    animation-name: STAR-MOVE;
    animation-duration: 200s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  .container {
    width: 100vw;
    min-height: 100vh;
    font-family: 'Montserrat';
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background: url('../src/assets/background.png') repeat;
    color: white;
  }

  .content {
    max-width: 1024px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    padding-bottom: 40px;
    z-index: 3;

    &--header {
      width: 1024px;
      padding: 40px 0;
      display: flex;
      align-items: center;
      flex-direction: column;

      h1 {
        margin: 0;
        color: gold;
        font-size: 42px;
        transform: perspective(10em) rotateX(40deg);
      }

      input {
        width: calc(60% - 40px);
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        background-color: black;
        border: 2px solid white;
        transition: border-color 0.3s;
        outline: none;

        &:focus {
          border-color: gold;
        }
      }
      
      button {
        padding: 15px 40px;
        margin-left: 20px;
        border-radius: 5px;
        border: 2px solid white;
        color: white;
        background-color: black;
        cursor: pointer;
        font-weight: 500;
        transition: color 0.3s, border-color 0.3s;

        &:hover {
          color: gold;
          border-color: gold;
        }

        &:focus {
          outline: none;
        }
      }
    }

    &--ships {
      width: 1024px;
      display: flex;
      flex-wrap:wrap;
      justify-content: space-between;
    }

    &--navigation {
      width: 100%;
      height: fit-content;
      display: flex;
      justify-content: center;
      padding: 60px 0 20px;

      button {
        border: 2px solid white;
        color: white;
        background-color: black;
        border-radius: 5px;
        margin: 0 5px;
        font-weight: 500;
        outline: none;
        padding: 10px 20px;
        cursor: pointer;
        transition: color 0.3s, border-color 0.3s;

        &:hover {
          color: gold;
          border-color: gold;
        }

      }
    }

  }
</style>
