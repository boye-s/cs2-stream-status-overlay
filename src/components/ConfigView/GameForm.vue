<template>
    <div>
        <label for="homeTeam">Home Team Name</label>
        <input type="text" id="homeTeam" name="homeTeam" required v-model="homeTeam" />
    </div>
    <div>
        <label for="awayTeam">Away Team Name</label>
        <input type="text" id="awayTeam" name="awayTeam" required v-model="awayTeam" />
    </div>
    <div>
        <InputToggle v-model="showTeamLogos" title="Show team logos" />
    </div>
</template>

<script setup lang="ts">
import InputToggle from "../utils/InputToggle.vue";

const homeTeam = defineModel("homeTeam", {
    type: String,
});
const awayTeam = defineModel("awayTeam", {
    type: String,
});
const showTeamLogos = defineModel("showTeamLogos", {
    type: Boolean,
});
</script>
