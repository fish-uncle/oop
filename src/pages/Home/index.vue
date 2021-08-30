<template lang="pug">
editor
</template>
<script lang="ts">
import editor from '@/vue3/components/editor.vue'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'home',
	components: {
		editor,
	},
})
</script>
