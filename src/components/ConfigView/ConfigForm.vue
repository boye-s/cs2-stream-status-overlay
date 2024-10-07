<template>
	<form @submit.prevent>
		<GameForm @update:game="updateGameForm" />
		<MapForm v-for="i in rounds" :key="i" :index="i" @update:map="updateMapForm" />
	</form>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import GameForm from "@/components/ConfigView/GameForm.vue";
import MapForm from "@/components/ConfigView/MapForm.vue";
import { type Game } from "@/types";

const game = ref<Game>({});

const rounds = computed(() => game.value.rounds || 0);

const updateGameForm = (updatedGame: { homeTeam: string, awayTeam: string, rounds: number }) => {
	game.value = { ...game.value, ...updatedGame };
	console.log(game.value);
};
</script>