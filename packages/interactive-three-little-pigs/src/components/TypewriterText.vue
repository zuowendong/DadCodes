<template>
  <div
    class="flex justify-center items-start min-h-32 sm:min-h-40 md:min-h-50 px-4 sm:px-6 md:px-8 py-6 sm:py-8 w-full"
  >
    <div class="w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
      <p
        class="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed text-center text-gray-800 dark:text-gray-200 m-0 min-h-[3em] flex items-start justify-center"
      >
        <span class="inline-block">
          {{ displayText }}
          <span v-if="!isComplete" class="animate-pulse font-bold">|</span>
        </span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  speed: {
    type: Number,
    default: 100,
  },
});

const emit = defineEmits(['complete']);

const displayText = ref("");
const isComplete = ref(false);

onMounted(() => {
  let index = 0;
  const typeWriter = () => {
    if (index < props.text.length) {
      displayText.value += props.text.charAt(index);
      index++;
      setTimeout(typeWriter, props.speed);
    } else {
      isComplete.value = true;
      emit('complete');
    }
  };
  typeWriter();
});
</script>
