import { ref } from "vue"
import { defineStore } from "pinia"
import stateService from "@/services/stateService"
import { type Game } from "@/types"

export const useGameStore = defineStore("gameState", () => {
    const game = ref<Game>()

    const setGame = async (newGame: Game) => {
        const result = await stateService.setState(newGame)
        game.value = result
    }

    const getGame = async () => {
        game.value = await stateService.fetchState()
        return game.value
    }

    return { game, setGame, getGame }
})
