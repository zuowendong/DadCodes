<template>
  <div class="space-y-10">
    <div
      v-for="(step, index) in steps"
      :key="index"
      v-show="index <= currentStep"
    >
      <slot
        :name="`step-${index}`"
        :isActive="index === currentStep"
        :isCompleted="index < currentStep"
        :onComplete="() => completeStep(index)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, useSlots, nextTick } from 'vue';

const props = defineProps({
  storageKey: {
    type: String,
    default: 'story_progress'
  }
});

const slots = useSlots();
const currentStep = ref(-1);
const steps = ref([]);

// 自动滚动到底部
const scrollToBottom = () => {
  nextTick(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  });
};

// 完成当前步骤，进入下一步
const completeStep = (stepIndex) => {
  if (stepIndex === currentStep.value) {
    setTimeout(() => {
      currentStep.value++;
      saveProgress();
      scrollToBottom();
    }, 500);
  }
};

// localStorage 功能
const saveProgress = () => {
  try {
    localStorage.setItem(props.storageKey, JSON.stringify({
      currentStep: currentStep.value
    }));
  } catch (error) {
    console.error('保存进度失败:', error);
  }
};

const loadProgress = () => {
  try {
    const saved = localStorage.getItem(props.storageKey);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('加载进度失败:', error);
    return null;
  }
};

const initializeSteps = () => {
  // 获取所有 step- 开头的插槽
  const stepSlots = Object.keys(slots).filter(name => name.startsWith('step-'));
  steps.value = stepSlots.map((name, index) => ({ name, index }));
  
  // 从localStorage恢复进度
  const progress = loadProgress();
  if (progress && typeof progress.currentStep === 'number') {
    const savedStep = Math.min(progress.currentStep, steps.value.length - 1);
    // 如果有保存的进度，将所有步骤设置为已完成状态，不触发打字效果
    currentStep.value = savedStep + 1; // 设置为下一步，让所有保存的步骤显示为completed
    if (savedStep >= 0) {
      scrollToBottom();
    }
  } else {
    // 首次访问，开始第一步
    currentStep.value = 0;
  }
};

onMounted(() => {
  initializeSteps();
});
</script>
