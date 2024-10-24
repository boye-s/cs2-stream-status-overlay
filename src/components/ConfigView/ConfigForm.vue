<template>
    <h1>Game Form</h1>
    <div class="form-widget-wrapper">
        <div>
            <GameForm @update:game="updateGameForm" />
        </div>
        <div class="game-widget-wrapper">
            <GameWidget :game="game" />
        </div>
    </div>
    <h2>Maps</h2>
    <button @click="addMap">Add map</button>
    <ul v-if="game.maps.length">
        <MapForm
            v-for="gameMap in game.maps"
            :key="gameMap.index"
            :gameMap="gameMap"
            @update:map="updateMapForm"
        />
    </ul>
    <button @click="gameStore.setGame(game)">Save</button>
</template>

<script setup lang="ts">
import { ref } from "vue"
import GameForm from "@/components/ConfigView/GameForm.vue"
import MapForm from "@/components/ConfigView/MapForm.vue"
import { type Game, type GameMap } from "@/types"
import { useGameStore } from "@/stores/game"
import GameWidget from "../WidgetView/GameWidget.vue"

const gameStore = useGameStore()

const game = ref<Game>({
    homeTeam: "",
    awayTeam: "",
    maps: [],
    game: "",
    showTeamLogos: false
})

const updateGameForm = (updatedGame: {
    homeTeam: string
    awayTeam: string
    showTeamLogos: boolean
}) => {
    game.value = { ...game.value, ...updatedGame }
    console.log(game.value)
}

const updateMapForm = (updatedMap: GameMap) => {
    const index = game.value.maps.findIndex((gameMap) => gameMap.index === updatedMap.index)
    game.value.maps[index] = updatedMap
}

const addMap = () => {
    game.value?.maps.push({
        index: game.value.maps.length ? getHighestIndex(game.value.maps) + 1 : 0,
        name: "",
        pickedBy: "",
        homeScore: 0,
        awayScore: 0
    } as GameMap)
}

function getHighestIndex(maps: GameMap[]) {
    return maps.reduce((max, gameMap) => {
        return typeof gameMap.index === "number" && gameMap.index > max ? gameMap.index : max
    }, Number.NEGATIVE_INFINITY)
}
</script>

<style scoped lang="scss">
.form-widget-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
}

.game-widget-wrapper {
    background-image: url("@/assets/images/widget-bg.jpg");
    background-size: cover;
    height: 350px;
    width: 1800px;
    display: flex;
    justify-content: center;
    align-items: center;
}

ul {
    margin: 32px 0;
    padding: 0;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 32px;
}
</style>
