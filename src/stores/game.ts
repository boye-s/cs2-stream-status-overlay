import { ref } from "vue";
import { defineStore } from "pinia";
import { type Game } from "@/types";

export const useGameStore = defineStore("game", () => {
    const game = ref<Game>();

    const setGame = (newGame: Game) => {
        game.value = newGame;
    }

    return { game, setGame }
});
