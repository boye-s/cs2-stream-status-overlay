<template>
	<form>
		<label for="mapName">Map Name</label>
		<input type="text" id="mapName" name="mapName" required v-model="name">
		<label for="pickedBy">Picked By</label>
		<input type="text" id="pickedBy" name="pickedBy" required v-model="pickedBy">
		<label for="homeScore">Home Team Score</label>
		<input type="number" id="homeScore" name="homeScore" required v-model="homeScore">
		<label for="awayScore">Away Team Score</label>
		<input type="number" id="awayScore" name="awayScore" required v-model="awayScore">
	</form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps(["index"]);

const name = ref("");
const pickedBy = ref("");
const homeScore = ref(0);
const awayScore = ref(0);

const emit = defineEmits(["update:map"]);

watch(name, (newValue) => {
	emit("update:map", { index: props.index, name: newValue, pickedBy, homeScore, awayScore });
});

watch(pickedBy, (newValue) => {
	emit("update:map", { index: props.index, name, pickedBy: newValue, homeScore, awayScore });
});

watch(homeScore, (newValue) => {
	emit("update:map", { index: props.index, name, pickedBy, homeScore: newValue, awayScore });
});

watch(awayScore, (newValue) => {
	emit("update:map", { index: props.index, name, pickedBy, homeScore, awayScore: newValue });
});
</script>