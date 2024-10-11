<template>
	<div>
		<label for="homeTeam">Home Team Name</label>
		<input type="text" id="homeTeam" name="homeTeam" required v-model="homeTeam">
	</div>
	<div>
		<label for="awayTeam">Away Team Name</label>
		<input type="text" id="awayTeam" name="awayTeam" required v-model="awayTeam">
	</div>
	<div>
		<label for="logo-toggle">Show team logos</label>
		<label class="switch">
			<input id="logo-toggle" name="logo-toggle" type="checkbox" v-model="showTeamLogos">
			<span class="slider round"></span>
		</label>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const homeTeam = ref("");
const awayTeam = ref("");
const showTeamLogos = ref(false);

const emit = defineEmits(["update:game"]);

watch(homeTeam, (newValue) => {
	emit("update:game", { homeTeam: newValue, awayTeam, showTeamLogos });
});

watch(awayTeam, (newValue) => {
	emit("update:game", { homeTeam, awayTeam: newValue, showTeamLogos });
});

watch(showTeamLogos, (newValue) => {
	emit("update:game", { homeTeam, awayTeam, showTeamLogos: newValue });
});
</script>

<style lang="scss" scoped>
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #F8F1E3;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: #243F4D;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #9DAC86;
}

input:focus + .slider {
  box-shadow: 0 0 1px #9DAC86;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>