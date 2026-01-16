<template>
  <div
    class="min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-12 pb-24 sm:pb-32 md:pb-40"
  >
    <SequentialTypewriter storage-key="scene4_progress">
      <!-- 步骤0: 老三来到山脚 -->
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
                  老三走到山脚下，看到了一堆坚固的石头。
                </span>
              </p>
            </div>
          </div>
          <TypewriterText
            v-else-if="isActive"
            text="老三走到山脚下，看到了一堆坚固的石头。"
            :speed="80"
            @complete="onComplete"
          />
        </div>
      </template>

      <!-- 步骤1: 老三的想法 -->
      <template #step-1="{ isActive, isCompleted, onComplete }">
        <div class="space-y-8">
          <div class="flex justify-center">
            <img
              src="../assets/images/materials/material_stone.png"
              alt="石头材料"
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
                    老三想："石头是最坚固的材料，我要用石头建造一座牢不可破的房子！"
                  </span>
                </p>
              </div>
            </div>
            <TypewriterText
              v-else-if="isActive"
              text='老三想："石头是最坚固的材料，我要用石头建造一座牢不可破的房子！"'
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
            <!-- 右侧：房子建造区域 -->
            <div class="flex flex-col items-center space-y-4">
              <div
                class="relative drop-zone"
                ref="houseContainer"
                :class="{ 'drop-zone-active': isDragOver || isTouchOver }"
                @dragover="onDragOver"
                @dragenter="onDragEnter"
                @dragleave="onDragLeave"
                @drop="(e) => onDrop(e, onComplete)"
              >
                <img
                  v-if="dragCount >= 5"
                  src="../assets/images/houses/house_stone_finished.png"
                  alt="完成的石头房子"
                  class="w-44 h-44 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-contain transition-all duration-500"
                />
                <img
                  v-else
                  src="../assets/images/houses/house_stone_unfinished.png"
                  alt="未完成的石头房子"
                  class="w-44 h-44 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-contain transition-all duration-500"
                />
              </div>
            </div>
            <!-- 左侧：材料区域 -->
            <div class="flex flex-col items-center space-y-4">
              <div class="relative">
                <img
                  ref="stoneMaterial"
                  src="../assets/images/materials/material_stone.png"
                  alt="石头材料"
                  class="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain cursor-grab transition-transform hover:scale-105 select-none"
                  :class="{
                    'animate-pulse': dragCount < 5,
                    'cursor-grabbing': isDragging || isTouching,
                  }"
                  draggable="true"
                  @dragstart="onDragStart"
                  @dragend="onDragEnd"
                  @touchstart="onTouchStart"
                  @touchmove="onTouchMove"
                  @touchend="(e) => onTouchEnd(e, onComplete)"
                />
              </div>
              <!-- 移动端拖拽石头元素 -->
              <div
                v-if="isTouching"
                class="touch-drag-stone"
                :style="touchDragStyle"
              >
                <img
                  src="../assets/images/materials/material_stone.png"
                  alt="拖拽中的石头"
                  class="w-12 h-12 object-contain opacity-80"
                />
              </div>
              <div class="hidden"><!-- 占位div --></div>
              <p
                class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center"
              >
                <span class="hidden sm:inline">拖拽石头到房子</span>
                <span class="sm:hidden">按住并滑动石头到房子</span>
                ({{ dragCount }}/5)
              </p>
            </div>
          </div>
        </div>
      </template>

      <!-- 步骤3: 老三的满意 -->
      <template #step-3="{ isActive, isCompleted, onComplete }">
        <div class="space-y-8">
          <!-- 老三的满意 -->
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
                    老三看着自己的石头房子，满怀信心地说："这座房子坚如磐石，任何风雨都无法摧毁它！"
                  </span>
                </p>
              </div>
            </div>
            <TypewriterText
              v-else-if="isActive"
              text='老三看着自己的石头房子，满怀信心地说："这座房子坚如磐石，任何风雨都无法摧毁它！"'
              :speed="80"
              @complete="onComplete"
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
const dragCount = ref(0);
const isDragging = ref(false);
const isDragOver = ref(false);
const isTouching = ref(false);
const isTouchOver = ref(false);
const touchStartPos = ref({ x: 0, y: 0 });
const touchDragStyle = ref({});

// localStorage 功能
const STORAGE_KEY = "scene4_stone_drags";

const saveStoneProgress = () => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        dragCount: dragCount.value,
      })
    );
  } catch (error) {
    console.error("保存石头拖拽进度失败:", error);
  }
};

const loadStoneProgress = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const progress = JSON.parse(saved);
      if (typeof progress.dragCount === "number") {
        dragCount.value = Math.min(progress.dragCount, 5); // 最多5次拖拽
      }
    }
  } catch (error) {
    console.error("加载石头拖拽进度失败:", error);
  }
};

const stoneMaterial = ref(null);
const houseContainer = ref(null);

// 拖拽相关方法
const onDragStart = (e) => {
  if (dragCount.value >= 5) {
    e.preventDefault();
    return;
  }
  isDragging.value = true;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/plain", "stone");
};

const onDragEnd = () => {
  isDragging.value = false;
};

const onDragOver = (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
};

const onDragEnter = (e) => {
  e.preventDefault();
  if (dragCount.value < 5) {
    isDragOver.value = true;
  }
};

const onDragLeave = (e) => {
  // 只有当离开整个drop zone时才取消高亮
  if (!e.currentTarget.contains(e.relatedTarget)) {
    isDragOver.value = false;
  }
};

const onDrop = async (e, onComplete) => {
  e.preventDefault();
  isDragOver.value = false;

  if (dragCount.value >= 5) return;

  const data = e.dataTransfer.getData("text/plain");
  if (data === "stone") {
    await handleStonePlacement(onComplete);
  }
};

// 触摸事件处理
const onTouchStart = (e) => {
  if (dragCount.value >= 5) return;

  e.preventDefault();
  isTouching.value = true;
  const touch = e.touches[0];
  touchStartPos.value = { x: touch.clientX, y: touch.clientY };

  // 初始化拖拽石头位置
  touchDragStyle.value = {
    position: "fixed",
    left: `${touch.clientX - 24}px`, // 24px = 12 * 2 (w-12的一半)
    top: `${touch.clientY - 24}px`,
    zIndex: "1000",
    pointerEvents: "none",
    transition: "none",
  };
};

const onTouchMove = (e) => {
  if (!isTouching.value || dragCount.value >= 5) return;

  e.preventDefault();
  const touch = e.touches[0];

  // 更新拖拽石头位置
  touchDragStyle.value = {
    ...touchDragStyle.value,
    left: `${touch.clientX - 24}px`,
    top: `${touch.clientY - 24}px`,
  };

  // 检查是否在房子区域上方
  if (houseContainer.value) {
    const houseRect = houseContainer.value.getBoundingClientRect();
    const isOverHouse =
      touch.clientX >= houseRect.left &&
      touch.clientX <= houseRect.right &&
      touch.clientY >= houseRect.top &&
      touch.clientY <= houseRect.bottom;

    isTouchOver.value = isOverHouse;
  }
};

const onTouchEnd = async (e, onComplete) => {
  if (!isTouching.value || dragCount.value >= 5) return;

  e.preventDefault();

  // 如果在房子区域上方松开，则完成拖拽
  if (isTouchOver.value) {
    isTouchOver.value = false;
    await handleStonePlacement(onComplete);
  }

  // 重置状态
  isTouching.value = false;
  isTouchOver.value = false;
  touchDragStyle.value = {};
};

// 统一的石头放置处理函数
const handleStonePlacement = async (onComplete) => {
  if (dragCount.value >= 5) return;

  // 增加拖拽次数
  dragCount.value++;

  // 保存进度
  saveStoneProgress();

  // 如果拖拽了5次，自动进入下一步
  if (dragCount.value >= 5) {
    // 等待一小段时间让用户看到完成的房子
    setTimeout(() => {
      onComplete();
    }, 500);
  }
};

// 组件挂载时加载进度
onMounted(() => {
  loadStoneProgress();
});
</script>

<style scoped>
.drop-zone {
  transition: all 0.3s ease;
}

.drop-zone-active {
  transform: scale(1.05);
}

.cursor-grab {
  cursor: grab;
}

.cursor-grabbing {
  cursor: grabbing;
}

/* 移动端触摸优化 */
.select-none {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
}

/* 移动端拖拽石头 */
.touch-drag-stone {
  pointer-events: none;
  z-index: 1000;
}

/* 触摸反馈 */
@media (hover: none) and (pointer: coarse) {
  .cursor-grab:active {
    transform: scale(0.95);
  }
}
</style>
