<template>
    <label for="logo-toggle">{{ props.title }}</label>
    <label class="switch">
        <input id="logo-toggle" name="logo-toggle" type="checkbox" v-model="model" />
        <span class="slider round"></span>
    </label>
</template>

<script setup lang="ts">
const props = defineProps<{ title: string }>();
const model = defineModel();
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
    background-color: #f8f1e3;
    -webkit-transition: 0.4s;
    transition: 0.4s;
}

.slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: #243f4d;
    -webkit-transition: 0.4s;
    transition: 0.4s;
}

input:checked + .slider {
    background-color: #9dac86;
}

input:focus + .slider {
    box-shadow: 0 0 1px #9dac86;
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
