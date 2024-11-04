<template>
    <GameWidget class="stick-to-bottom" :game="game" />
</template>

<script setup lang="ts">
import gameState from "../../server/overlay-state.json"
import GameWidget from "@/components/WidgetView/GameWidget.vue"
import { ref, onBeforeMount } from "vue"
import { Game, GameMap } from "@/types"

const game = ref<Game>({
    homeTeam: "",
    awayTeam: "",
    maps: [],
    game: "",
    showTeamLogos: false
})

onBeforeMount(async () => {
    game.value = gameState
})
</script>

<style scoped lang="scss">
.stick-to-bottom {
    position: fixed;
    bottom: 50px;
    left: 0;
    width: 100%;
    z-index: 100;
}
</style>
