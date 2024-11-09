<template>
    <li class="map-form-card">
        <div>
            <label for="mapName">Map Name</label>
            <input type="text" id="mapName" name="mapName" required v-model="name" />
            <label for="pickedBy">Picked By</label>
            <input type="text" id="pickedBy" name="pickedBy" required v-model="pickedBy" />
            <InputToggle v-model="decider" title="Map is decider" />
        </div>
        <div>
            <label for="homeScore">Home Team Score</label>
            <input type="number" id="homeScore" name="homeScore" required v-model="homeScore" />
            <label for="awayScore">Away Team Score</label>
            <input type="number" id="awayScore" name="awayScore" required v-model="awayScore" />
        </div>
    </li>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import InputToggle from "../utils/InputToggle.vue";

const props = defineProps(["gameMap"]);

const name = ref("");
const pickedBy = ref("");
const homeScore = ref(0);
const awayScore = ref(0);
const decider = ref(false);

const emit = defineEmits(["update:map"]);

watch(name, (newValue) => {
    emit("update:map", {
        index: props.gameMap.index,
        name: newValue,
        pickedBy,
        homeScore,
        awayScore,
        decider,
    });
});

watch(pickedBy, (newValue) => {
    emit("update:map", {
        index: props.gameMap.index,
        name,
        pickedBy: newValue,
        homeScore,
        awayScore,
        decider,
    });
});

watch(homeScore, (newValue) => {
    emit("update:map", {
        index: props.gameMap.index,
        name,
        pickedBy,
        homeScore: newValue,
        awayScore,
        decider,
    });
});

watch(awayScore, (newValue) => {
    emit("update:map", {
        index: props.gameMap.index,
        name,
        pickedBy,
        homeScore,
        awayScore: newValue,
        decider,
    });
});

watch(decider, (newValue) => {
    emit("update:map", {
        index: props.gameMap.index,
        name,
        pickedBy,
        homeScore,
        awayScore,
        decider: newValue,
    });
});

onMounted(() => {
    name.value = props.gameMap.name;
    pickedBy.value = props.gameMap.pickedBy;
    homeScore.value = props.gameMap.homeScore;
    awayScore.value = props.gameMap.awayScore;
});
</script>

<style scoped lang="scss">
.map-form-card {
    border: 2px solid rgba(235, 235, 235, 0.64);
    border-radius: 5px;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
}
</style>
