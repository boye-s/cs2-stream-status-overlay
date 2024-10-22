<template>
	<div class="map-strip">
		<div>
			{{ gameMap.name }}
		</div>
		<div class="score" v-if="hasScore">
			{{ gameMap.homeScore }} - {{ gameMap.awayScore }}
		</div>
		<div class="no-score" v-else>
			-
		</div>
	</div>
</template>

<script setup lang="ts">
import type { GameMap } from '@/types';
import { computed } from 'vue';

const props = defineProps<{ gameMap: GameMap; }>();

const gameMap = computed(() => props.gameMap);
const hasScore = computed(() => gameMap.value.homeScore || gameMap.value.awayScore);
</script>

<style scoped lang="scss">
.map-strip {
	padding: 8px 16px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 12px;

	&:not(:last-child) {
		border-right: 1px solid #ccc;
	}

	.score {
		font-weight: 700;
	}

	.no-score {
		padding: 0 12px;
		font-weight: 700;
	}
}
</style>
