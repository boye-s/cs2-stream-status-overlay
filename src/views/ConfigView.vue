<template>
    <ConfigForm class="padding" />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import ConfigForm from "@/components/ConfigView/ConfigForm.vue";
import { getMatchupById } from "@/services/blService";

onMounted(async () => {
    const res = await getMatchupById("15898");
    console.log(res);
});
</script>

<style scoped lang="scss">
.padding {
    padding: 2rem;
}
</style>
