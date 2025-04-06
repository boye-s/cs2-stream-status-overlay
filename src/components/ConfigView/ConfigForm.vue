<template>
    <div class="config-form">
        <h1>Game Form</h1>
        <div class="form-widget-wrapper">
            <div>
                <GameForm
                    v-model:homeTeam="game.homeTeam"
                    v-model:awayTeam="game.awayTeam"
                    v-model:showTeamLogos="game.showTeamLogos"
                />
            </div>
            <div class="game-widget-wrapper">
                <GameWidget :game="game" />
            </div>
        </div>
        <h2>Maps</h2>
        <button @click="addMap">Add map</button>
        <ul v-if="game.maps?.length">
            <MapForm
                v-for="gameMap in game.maps"
                :key="gameMap.index"
                :gameMap="gameMap"
                @update:map="updateMapForm"
                @delete:map="deleteMap"
            />
        </ul>

        <button @click="gameStore.setGame(game)">Save</button>
        <a class="button" href="/widget" target="_blank">Open Widget</a>
    </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import GameForm from "@/components/ConfigView/GameForm.vue";
import MapForm from "@/components/ConfigView/MapForm.vue";
import { type Game, type GameMap } from "@/types";
import { useGameStore } from "@/stores/game";
import GameWidget from "../WidgetView/GameWidget.vue";

const gameStore = useGameStore();

const game = ref<Game>({
    homeTeam: "",
    awayTeam: "",
    maps: [] as GameMap[],
    game: "",
    showTeamLogos: false,
    scoreNeededToWin: 0,
    homeTeamScore: 0,
    awayTeamScore: 0,
});

const updateMapForm = (updatedMap: GameMap) => {
    const index = game.value.maps?.findIndex((gameMap) => gameMap.index === updatedMap.index);
    if (index === -1) return;
    game.value.maps[index] = updatedMap;

    checkGameScore(game.value.maps);
};

const deleteMap = (index: number) => {
    const mapIndex = game.value.maps?.findIndex((gameMap) => gameMap.index === index);
    if (mapIndex === -1) return;
    game.value.maps?.splice(mapIndex, 1);

    checkGameScore(game.value.maps);
};

const checkGameScore = (maps: GameMap[]) => {
    game.value.scoreNeededToWin = Math.floor(maps?.length / 2) + 1;
    let previousMapHasScore: boolean = false;
    let homeTeamScore: number = 0;
    let awayTeamScore: number = 0;
    for (const gameMap of maps) {
        if (
            previousMapHasScore &&
            (!gameMap.homeScore || gameMap.homeScore < 1) &&
            (!gameMap.awayScore || gameMap.awayScore < 1) &&
            homeTeamScore < game.value.scoreNeededToWin &&
            awayTeamScore < game.value.scoreNeededToWin
        ) {
            console.log(gameMap.index, "up next");
            gameMap.upNext = true;
            previousMapHasScore = false;
            gameMap.notNeeded = false;
        } else if (gameMap.homeScore > 0 || gameMap.awayScore > 0) {
            console.log(gameMap.index, "has score");
            if (gameMap.homeScore > gameMap.awayScore) {
                homeTeamScore++;
            } else if (gameMap.homeScore < gameMap.awayScore) {
                awayTeamScore++;
            }

            previousMapHasScore = true;
            gameMap.upNext = false;
            gameMap.notNeeded = false;
        } else if (
            homeTeamScore >= game.value.scoreNeededToWin ||
            awayTeamScore >= game.value.scoreNeededToWin
        ) {
            console.log(gameMap.index, "game over");
            gameMap.upNext = false;
            gameMap.notNeeded = true;
        } else {
            console.log(gameMap.index, "no score");
            previousMapHasScore = false;
            gameMap.upNext = false;
            gameMap.notNeeded = false;
        }
    }

    game.value = { ...game.value, maps, homeTeamScore, awayTeamScore };
};

const addMap = () => {
    if (game.value.maps === undefined) {
        game.value.maps = [];
    }

    game.value.maps?.push({
        index: game.value.maps?.length ? getHighestIndex(game.value.maps) + 1 : 0,
        name: "",
        pickedBy: "",
        homeScore: 0,
        awayScore: 0,
    } as GameMap);
};

function getHighestIndex(maps: GameMap[]) {
    return maps.reduce((max, gameMap) => {
        return typeof gameMap.index === "number" && gameMap.index > max ? gameMap.index : max;
    }, Number.NEGATIVE_INFINITY);
}

onBeforeMount(async () => {
    await gameStore.getGame();

    if (gameStore.game) {
        game.value = gameStore.game;
    }
});
</script>

<style scoped lang="scss">
.config-form {
    margin: 0 auto;
    max-width: 1920px;
    height: 100%;
    background-color: rgba(36, 63, 77, 1);
}
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
