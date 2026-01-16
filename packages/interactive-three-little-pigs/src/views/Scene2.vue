<template>
  <div
    class="min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-12 pb-24 sm:pb-32 md:pb-40"
  >
    <SequentialTypewriter storage-key="scene2_progress">
      <!-- 步骤0: 老大来到田野 -->
      <template #step-0="{ isActive, isCompleted, onComplete }">
        <div class="mb-8">
          <div
            v-if="isCompleted"
            class="flex justify-center items-start px-4 sm:px-6 md:px-8 py-4 sm:py-6 w-full"
          >
            <div class="w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
              <p
                class="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed text-center text-gray-800 dark:text-gray-200 m-0 flex items-start justify-center"
              >
                <span class="inline-block">
                  老大走到田野里，看到了一堆稻草。
                </span>
              </p>
            </div>
          </div>
          <TypewriterText
            v-else-if="isActive"
            text="老大走到田野里，看到了一堆稻草。"
            :speed="80"
            @complete="onComplete"
          />
        </div>
      </template>

      <!-- 步骤1: 老大的想法 -->
      <template #step-1="{ isActive, isCompleted, onComplete }">
        <div class="space-y-8">
          <div class="flex justify-center">
            <img
              src="../assets/images/materials/material_straw.png"
              alt="老大"
              class="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 object-contain"
            />
          </div>
          <div
            class="w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto"
          >
            <div
              v-if="isCompleted"
              class="flex justify-center items-start px-4 sm:px-6 md:px-8 py-4 sm:py-6 w-full"
            >
              <div
                class="w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl"
              >
                <p
                  class="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed text-center text-gray-800 dark:text-gray-200 m-0 flex items-start justify-center"
                >
                  <span class="inline-block">
                    老大想："稻草轻便又容易搭建，我就用稻草盖房子吧！"
                  </span>
                </p>
              </div>
            </div>
            <TypewriterText
              v-else-if="isActive"
              text='老大想："稻草轻便又容易搭建，我就用稻草盖房子吧！"'
              :speed="80"
              @complete="onComplete"
            />
          </div>
        </div>
      </template>

      <!-- 步骤2: 盖房子过程 -->
      <template #step-2="{ isActive, isCompleted, onComplete }">
        <div v-if="isActive || isCompleted" class="space-y-8">
          <!-- 盖房子互动区域 -->
          <div
            class="flex flex-row justify-center items-end gap-8 sm:gap-16 lg:gap-24"
          >
            <!-- 左侧：材料区域 -->
            <div class="flex flex-col items-center space-y-4">
              <div class="relative">
                <img
                  ref="strawMaterial"
                  src="../assets/images/materials/material_straw.png"
                  alt="稻草材料"
                  class="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain cursor-pointer transition-transform hover:scale-105 active:scale-95"
                  :class="{ 'animate-pulse': clickCount < 2 }"
                  @click="() => onStrawClick(onComplete)"
                />
                <!-- 飞行稻草放到body层级，避免相对定位影响 -->
              </div>
              <!-- 飞行稻草元素 -->
              <div
                v-if="flyingStraw"
                class="flying-straw"
                :style="flyingStrawStyle"
              >
                <img
                  src="../assets/images/materials/material_straw.png"
                  alt="飞行的稻草"
                  class="w-8 h-8 sm:w-12 sm:h-12 object-contain"
                />
              </div>
              <div class="hidden"><!-- 占位div -->
              </div>
              <p
                class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center"
              >
                点击稻草 ({{ clickCount }}/2)
              </p>
            </div>

            <!-- 右侧：房子建造区域 -->
            <div class="flex flex-col items-center space-y-4">
              <div class="relative" ref="houseContainer">
                <img
                  v-if="clickCount >= 2"
                  src="../assets/images/houses/house_straw_finished.png"
                  alt="完成的稻草房子"
                  class="w-44 h-44 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-contain transition-all duration-500"
                />
                <img
                  v-else
                  src="../assets/images/houses/house_straw_unfinished.png"
                  alt="未完成的稻草房子"
                  class="w-44 h-44 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-contain transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- 步骤3: 老大的满意 -->
      <template #step-3="{ isActive, isCompleted, onComplete }">
        <div class="space-y-8">
          <!-- 老大的满意 -->
          <div>
            <div
              v-if="isCompleted"
              class="flex justify-center items-start px-4 sm:px-6 md:px-8 py-4 sm:py-6 w-full"
            >
              <div
                class="w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl"
              >
                <p
                  class="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed text-center text-gray-800 dark:text-gray-200 m-0 flex items-start justify-center"
                >
                  <span class="inline-block">
                    老大看着自己的稻草房子，满意地说："这样就够了，我可以好好休息了！"
                  </span>
                </p>
              </div>
            </div>
            <TypewriterText
              v-else-if="isActive"
              text='老大看着自己的稻草房子，满意地说："这样就够了，我可以好好休息了！"'
              :speed="80"
              @complete="() => onFinalComplete(onComplete)"
            />
          </div>
        </div>
      </template>
    </SequentialTypewriter>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from "vue";
import { useRouter } from "vue-router";
import TypewriterText from "../components/TypewriterText.vue";
import SequentialTypewriter from "../components/SequentialTypewriter.vue";

const router = useRouter();

// 响应式数据
const clickCount = ref(0);
const flyingStraw = ref(false);
const flyingStrawStyle = ref({});

// localStorage 功能
const STORAGE_KEY = 'scene2_straw_clicks';

const saveStrawProgress = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      clickCount: clickCount.value
    }));
  } catch (error) {
    console.error('保存稻草点击进度失败:', error);
  }
};

const loadStrawProgress = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const progress = JSON.parse(saved);
      if (typeof progress.clickCount === 'number') {
        clickCount.value = Math.min(progress.clickCount, 2); // 最多2次点击
      }
    }
  } catch (error) {
    console.error('加载稻草点击进度失败:', error);
  }
};

const strawMaterial = ref(null);
const houseContainer = ref(null);

// 方法
const onStrawClick = async (onComplete) => {
  if (clickCount.value >= 2) return;

  // 创建飞行动画
  await createFlyingAnimation();

  // 增加点击次数
  clickCount.value++;
  
  // 保存进度
  saveStrawProgress();

  // 如果点击了2次，自动进入下一步
  if (clickCount.value >= 2) {
    // 等待一小段时间让用户看到完成的房子
    setTimeout(() => {
      onComplete();
    }, 1000);
  }
};

const createFlyingAnimation = () => {
  return new Promise((resolve) => {
    if (!strawMaterial.value || !houseContainer.value) {
      resolve();
      return;
    }

    // 获取元素位置
    const strawRect = strawMaterial.value.getBoundingClientRect();
    const houseRect = houseContainer.value.getBoundingClientRect();

    // 计算飞行路径
    const startX = strawRect.left + strawRect.width / 2;
    const startY = strawRect.top + strawRect.height / 2;
    const endX = houseRect.left + houseRect.width / 2;
    const endY = houseRect.top + houseRect.height / 2;
    
    // 计算弧线的最高点（向上抛物线）
    const distance = Math.abs(endX - startX);
    const arcHeight = Math.max(80, distance * 0.3); // 弧线高度根据距离调整
    const midX = (startX + endX) / 2;
    const midY = Math.min(startY, endY) - arcHeight;

    // 设置飞行稻草的初始位置
    flyingStrawStyle.value = {
      position: "fixed",
      left: `${startX - 20}px`,
      top: `${startY - 20}px`,
      zIndex: "1000",
      pointerEvents: "none",
      transform: "scale(1) rotate(0deg)",
      opacity: "1",
    };

    flyingStraw.value = true;

    // 分阶段动画：上升阶段
    setTimeout(() => {
      flyingStrawStyle.value = {
        ...flyingStrawStyle.value,
        left: `${midX - 20}px`,
        top: `${midY - 20}px`,
        transform: "scale(1.1) rotate(180deg)",
        transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      };
      
      // 下降阶段
      setTimeout(() => {
        flyingStrawStyle.value = {
          ...flyingStrawStyle.value,
          left: `${endX - 20}px`,
          top: `${endY - 20}px`,
          transform: "scale(0.7) rotate(360deg)",
          opacity: "0.4",
          transition: "all 0.8s cubic-bezier(0.55, 0.055, 0.675, 0.19)",
        };
        
        // 动画结束后清理
        setTimeout(() => {
          flyingStraw.value = false;
          resolve();
        }, 800);
      }, 600);
    }, 50);
  });
};

// 处理最后一步完成，自动跳转到场景3
const onFinalComplete = (onComplete) => {
  // 先完成当前步骤
  onComplete();
  
  // 等待一段时间后自动跳转到场景3
  setTimeout(() => {
    router.push('/scene3');
  }, 2000); // 2秒后自动跳转
};

// 组件挂载时加载进度
onMounted(() => {
  loadStrawProgress();
});
</script>
