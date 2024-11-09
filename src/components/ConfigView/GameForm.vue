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
import { ref, watch } from "vue";
import InputToggle from "../utils/InputToggle.vue";

const homeTeam = ref("");
const awayTeam = ref("");
const showTeamLogos = ref(false);

const emit = defineEmits(["update:game"]);

watch(homeTeam, (newValue) => {
    emit("update:game", { homeTeam: newValue, awayTeam, showTeamLogos });
});

watch(awayTeam, (newValue) => {
    emit("update:game", { homeTeam, awayTeam: newValue, showTeamLogos });
});

watch(showTeamLogos, (newValue) => {
    emit("update:game", { homeTeam, awayTeam, showTeamLogos: newValue });
});
</script>
