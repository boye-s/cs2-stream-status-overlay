<template>
	<label for="homeTeam">Home Team Name</label>
	<input type="text" id="homeTeam" name="homeTeam" required v-model="homeTeam">
	<label for="awayTeam">Away Team Name</label>
	<input type="text" id="awayTeam" name="awayTeam" required v-model="awayTeam">
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const homeTeam = ref("");
const awayTeam = ref("");
const rounds = ref(0);

const emit = defineEmits(["update:game"]);

watch(homeTeam, (newValue) => {
	emit("update:game", { homeTeam: newValue, awayTeam, rounds });
});

watch(awayTeam, (newValue) => {
	emit("update:game", { homeTeam, awayTeam: newValue, rounds });
});
</script>