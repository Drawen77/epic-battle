function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      dragonHealth: 100,
      knightHealth: 100,
      currentRound: 1,
      winner: null,
      logMessage: [],
    };
  },
  computed: {
    dragonBarStyles() {
      if (this.dragonHealth <= 0) {
        return { width: "0%" };
      }
      return { width: this.dragonHealth + "%" };
    },
    knightBarStyles() {
      if (this.knightHealth <= 0) {
        return { width: "0%" };
      }
      return { width: this.knightHealth + "%" };
    },
    canIUseSpecAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    knightHealth(value) {
      if (value <= 0 && this.dragonHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "dragon";
      }
    },
    dragonHealth(value) {
      if (value <= 0 && this.knightHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "knight";
      }
    },
  },
  methods: {
    attackDragon() {
      this.currentRound++;
      const attackValue = getRandomValue(5, 12);
      this.dragonHealth -= attackValue;
      this.addLogMessage("knight", "attack", attackValue);
      this.attackKnight();
    },
    attackKnight() {
      const attackValue = getRandomValue(8, 15);
      this.knightHealth -= attackValue;
      this.addLogMessage("dragon", "attack", attackValue);
    },
    specialAttackDragon() {
      this.currentRound++;
      const attackValue = getRandomValue(10, 25);
      this.dragonHealth -= attackValue;
      this.addLogMessage("knight", "special-attack", attackValue);
      this.attackKnight();
    },
    healKnight() {
      this.currentRound++;
      const healValue = getRandomValue(8, 20);
      if (this.knightHealth + healValue > 100) {
        this.knightHealth = 100;
      } else {
        this.knightHealth += healValue;
      }
      this.addLogMessage("knight", "heal", healValue);
      this.attackKnight();
    },
    knightSurrender() {
      this.knightHealth = 0;
    },
    restartGame() {
      this.knightHealth = 100;
      this.dragonHealth = 100;
      this.currentRound = 1;
      this.winner = null;
      this.logMessage = [];
    },
    addLogMessage(who, what, value) {
      this.logMessage.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
}).mount("#game");
