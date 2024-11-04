<template>
    <div class="map-strip">
        <div class="logo-name-wrapper">
            <div v-if="showLogos" class="game-map-logo-container">
                <img class="game-map-logo" :src="gameMapLogo" />
            </div>
            <div class="map-name-wrapper">
                <p class="map-name">
                    {{ gameMap.name.toUpperCase() }}
                </p>
                <div class="picked-by-wrapper" v-if="gameMap.pickedBy">
                    <div>
                        <p class="picked-by">PICKED BY</p>
                    </div>
                    <div>
                        <img class="picked-by-logo" v-if="showLogos" :src="gameMapPickedBy" />
                        <p v-else>{{ gameMap.pickedBy }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="score" v-if="hasScore">{{ gameMap.homeScore }} - {{ gameMap.awayScore }}</div>
        <div class="no-score" v-else>-</div>
    </div>
</template>

<script setup lang="ts">
import type { GameMap } from "@/types"
import { computed } from "vue"

const props = defineProps<{ gameMap: GameMap; showLogos: boolean }>()

const gameMap = computed(() => props.gameMap)
const hasScore = computed(() => gameMap.value.homeScore || gameMap.value.awayScore)
const gameMapLogo = computed(() => {
    return new URL(
        `../../assets/images/maps/${gameMap.value.name.toLowerCase()}.png`,
        import.meta.url
    ).href
})

const gameMapPickedBy = computed(() => {
    return new URL(`../../assets/images/teams/${gameMap.value.pickedBy}.png`, import.meta.url).href
})
</script>

<style scoped lang="scss">
.map-strip {
    padding: 8px 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 24px;
    font-size: 1.5rem;
    min-width: 400px;
    margin: 0;

    .map-name-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 0px;
    }

    .map-name {
        position: relative;
        bottom: -10px;
        margin: 0;
        padding: 0;
        font-weight: 900;
    }

    .picked-by-wrapper {
        position: relative;
        top: -5px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 4px;
        margin: 0;

        .picked-by {
            font-size: 0.7rem;
            margin: 0;
        }

        .picked-by-logo {
            position: relative;
            top: -3px;
            height: 15px;
            width: auto;
        }
    }

    &:not(:last-child) {
        border-right: 1px solid #ccc;
    }

    .score {
        font-weight: 700;
        font-size: 3rem;
    }

    .no-score {
        padding: 0 12px;
        font-weight: 700;
    }

    .logo-name-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;

        .game-map-logo,
        .game-map-logo-container {
            height: 50px;
            overflow: visible;
        }
    }
}
</style>
