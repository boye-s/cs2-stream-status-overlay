<template>
    <div class="widget-wrapper">
        <div class="widget-team-wrapper">
            <div class="home-team right">
                <p>{{ game.homeTeam }}</p>
                <div>
                    <img class="team-logo left" v-if="game.showTeamLogos" :src="homeTeamImage" />
                </div>
            </div>
            <div v-if="hasScore">
                <p class="score">{{ homeTeamScore }} - {{ awayTeamScore }}</p>
            </div>
            <div v-else>
                <p class="score">VS</p>
            </div>
            <div class="away-team left">
                <div>
                    <img class="team-logo right" v-if="game.showTeamLogos" :src="awayTeamImage" />
                </div>
                <p>{{ game.awayTeam }}</p>
            </div>
        </div>
        <div class="widget-map-wrapper" v-if="game.maps?.length > 0">
            <game-map-widget
                v-for="gameMap in game.maps"
                :gameMap="gameMap"
                :showLogos="true"
                :upNext="!gameMap.homeScore && !gameMap.awayScore"
                :key="gameMap.name"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { GameMap } from "@/types"
import GameMapWidget from "@/components/WidgetView/GameMap.vue"
import { computed } from "vue"

const props = defineProps(["game"])

const game = computed(() => props.game)

const hasScore = computed(() =>
    game.value.maps?.some((gameMap: GameMap) => gameMap.homeScore || gameMap.awayScore)
)

const homeTeamScore = computed(() =>
    game.value.maps?.reduce(
        (acc: number, gameMap: GameMap) => acc + (gameMap.homeScore > gameMap.awayScore ? 1 : 0),
        0
    )
)
const awayTeamScore = computed(() =>
    game.value.maps?.reduce(
        (acc: number, gameMap: GameMap) => acc + (gameMap.awayScore > gameMap.homeScore ? 1 : 0),
        0
    )
)

const homeTeamImage = computed(() => {
    return new URL(`../../assets/images/teams/${game.value.homeTeam}.png`, import.meta.url).href
})

const awayTeamImage = computed(() => {
    return new URL(`../../assets/images/teams/${game.value.awayTeam}.png`, import.meta.url).href
})
</script>

<style scoped lang="scss">
p {
    position: relative;
    top: 0.2rem;
}
.home-team,
.away-team {
    font-size: 3rem;
    padding: 8px;
    min-width: 600px;

    p {
        text-shadow: 0 0 10px rgba(36, 63, 77, 1);
    }
}

.home-team {
    display: flex;
    justify-content: flex-end;
    align-content: center;
}

.away-team {
    display: flex;
    justify-content: flex-start;
    align-content: center;
}

.team-logo {
    height: 50px;
    vertical-align: middle;

    &.left {
        margin-left: 8px;
    }

    &.right {
        margin-right: 8px;
    }
}

.score {
    font-size: 4rem;
    padding: 16px;
    font-weight: 700;
}

.widget-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 36px;

    .widget-team-wrapper {
        background-image: linear-gradient(
            to right,
            rgba(36, 63, 77, 0),
            rgba(36, 63, 77, 1),
            rgba(36, 63, 77, 0)
        );
        border-radius: 15px;
        max-height: 150px;
        min-width: 900px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .widget-map-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid rgb(248, 241, 227);
        border-radius: 15px;
        background-color: rgba(36, 63, 77, 0.7);
    }
}
</style>
