<template>
		<h1>Game Form</h1>
		<GameForm @update:game="updateGameForm" />
		<h2>Maps</h2>
		<button @click="addMap">Add map</button>
		<ul>
			<MapForm v-for="gameMap in game.maps" :key="gameMap.id" :gameMap="gameMap" @update:map="updateMapForm" />
		</ul>
</template>

<script setup lang="ts">
import { ref } from "vue";
import GameForm from "@/components/ConfigView/GameForm.vue";
import MapForm from "@/components/ConfigView/MapForm.vue";
import { type Game, type GameMap } from "@/types";

const game = ref<Game>({
	homeTeam: "",
	awayTeam: "",
	maps: []
});

const updateGameForm = (updatedGame: { homeTeam: string, awayTeam: string }) => {
	game.value = { ...game.value, ...updatedGame };
	console.log(game.value);
};

const addMap = () => {
	game.value?.maps.push({
		index: getMaxValue(game.value?.maps, "index") + 1 || 0,
		name: "",
		pickedBy: "",
		homeScore: 0,
		awayScore: 0
	} as GameMap);
};

function getMaxValue<T>(arr: T[], key: keyof T): number | null {
    if (!arr || arr.length === 0) return null;

    return arr.reduce((max, obj) => {
        const value = obj[key];
        return (typeof value === 'number' && value > max) ? value : max;
    }, Number.NEGATIVE_INFINITY);
}
</script>

<style scoped lang="scss">
ul {
	margin: 32px 0;
	padding: 0;
	list-style-type: none;
	display: flex;
	flex-direction: column;
	gap: 32px;
}
</style>