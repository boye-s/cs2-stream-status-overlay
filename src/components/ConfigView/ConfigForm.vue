<template>
		<h1>Game Form</h1>
		<GameForm @update:game="updateGameForm" />
		<h2>Maps</h2>
		<button @click="addMap">Add map</button>
		<ul v-if="game.maps.length">
			<MapForm v-for="gameMap in game.maps" :key="gameMap.id" :gameMap="gameMap" @update:map="updateMapForm" />
		</ul>
		<button @click="gameStore.setGame(game)">Save</button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import GameForm from "@/components/ConfigView/GameForm.vue";
import MapForm from "@/components/ConfigView/MapForm.vue";
import { type Game, type GameMap } from "@/types";
import { useGameStore } from "@/stores/game";

const gameStore = useGameStore();

const game = ref<Game>({
	homeTeam: "",
	awayTeam: "",
	maps: [],
	game: ""
});

const updateGameForm = (updatedGame: { homeTeam: string, awayTeam: string }) => {
	game.value = { ...game.value, ...updatedGame };
	console.log(game.value);
};

const addMap = () => {
	game.value?.maps.push({
		index: game.value.maps.length ? getHighestIndex(game.value.maps) + 1 : 0,
		name: "",
		pickedBy: "",
		homeScore: 0,
		awayScore: 0
	} as GameMap);
};

function getHighestIndex(maps:GameMap[]) {
    return maps.reduce((max, gameMap) => {
        return (typeof gameMap.index === 'number' && gameMap.index > max) ? gameMap.index : max;
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