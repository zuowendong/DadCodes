<template>
  <div
    class="min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-12 pb-24 sm:pb-32 md:pb-40"
  >
    <SequentialTypewriter ref="sequentialTypewriter" storage-key="scene6_progress">
      <!-- 步骤1: 噜噜开门 -->
      <template #step-0="{ isActive, isCompleted, onComplete }">
        <div class="mb-8">
          <div
            v-if="isCompleted"
            class="flex justify-center items-start min-h-32 sm:min-h-40 md:min-h-50 px-4 sm:px-6 md:px-8 py-6 sm:py-8 w-full"
          >
            <div class="w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
              <p
                class="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed text-center text-gray-800 dark:text-gray-200 m-0 min-h-[3em] flex items-start justify-center"
              >
                <span class="inline-block">
                  木房里的噜噜听见了，连忙打开门，让呼呼进来，然后又把门紧紧地关上。
                </span>
              </p>
            </div>
          </div>
          <TypewriterText
            v-else-if="isActive"
            text="木房里的噜噜听见了，连忙打开门，让呼呼进来，然后又把门紧紧地关上。"
            :speed="80"
            @complete="onComplete"
          />
        </div>
      </template>

      <!-- 步骤2: 大灰狼来到木房前 -->
      <template #step-1="{ isActive, isCompleted, onComplete }">
        <div class="mb-8">
          <div
            v-if="isCompleted"
            class="flex justify-center items-start min-h-32 sm:min-h-40 md:min-h-50 px-4 sm:px-6 md:px-8 py-6 sm:py-8 w-full"
          >
            <div class="w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
              <p
                class="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed text-center text-gray-800 dark:text-gray-200 m-0 min-h-[3em] flex items-start justify-center"
              >
                <span class="inline-block">
                  大灰狼来到木房前，叫小猪噜噜开门。噜噜不肯开。
                </span>
              </p>
            </div>
          </div>
          <TypewriterText
            v-else-if="isActive"
            text="大灰狼来到木房前，叫小猪噜噜开门。噜噜不肯开。"
            :speed="80"
            @complete="onComplete"
          />
        </div>
      </template>

      <!-- 步骤3: 拖拽大灰狼吹倒木房 -->
      <template #step-2="{ isActive, isCompleted, onComplete }">
        <div v-if="isActive || isCompleted" class="mb-8">
          <div
            class="flex justify-center items-center gap-8 md:gap-16 px-4 py-8"
          >
            <!-- 大灰狼 -->
            <div class="relative">
              <img
                v-if="isBlowing"
                :src="wolfBlowingImg"
                alt="大灰狼吹气"
                class="w-[6.4rem] h-[6.4rem] sm:w-32 sm:h-32 md:w-[9.6rem] md:h-[9.6rem] object-contain cursor-pointer select-none"
                @click="blowHouse"
              />
              <img
                v-else
                :src="isDragging || (isTouching && hasMoved) ? wolfDraggedImg : wolfStandingImg"
                alt="大灰狼"
                class="w-[6.4rem] h-[6.4rem] sm:w-32 sm:h-32 md:w-[9.6rem] md:h-[9.6rem] object-contain select-none"
                :class="{ 'cursor-grab': !isDragging && !isTouching, 'cursor-grabbing': isDragging || (isTouching && hasMoved), 'cursor-pointer': !isDragging && !isTouching }"
                draggable="true"
                @click="handleClick"
                @dragstart="handleDragStart"
                @dragend="handleDragEnd"
                @touchstart="handleTouchStart"
                @touchmove="handleTouchMove"
                @touchend="handleTouchEnd"
              />
              <!-- 移动端拖拽大灰狼元素 -->
              <div
                v-if="isTouching && hasMoved"
                class="touch-drag-wolf"
                :style="touchDragStyle"
              >
                <img
                  :src="wolfDraggedImg"
                  alt="拖拽中的大灰狼"
                  class="w-[6.4rem] h-[6.4rem] sm:w-32 sm:h-32 md:w-[9.6rem] md:h-[9.6rem] object-contain opacity-80"
                />
              </div>
            </div>

            <!-- 木房 -->
            <div
              class="relative drop-zone"
              :class="{ 'drop-zone-active': isDragOver || isTouchOver }"
              @dragover="onDragOver"
              @dragenter="onDragEnter"
              @dragleave="onDragLeave"
              @drop="handleDrop"
              ref="houseRef"
            >
              <img
                v-if="dragCount < 3"
                src="../assets/images/houses/house_wood_finished.png"
                alt="木房"
                class="w-56 h-56 sm:w-[16.8rem] sm:h-[16.8rem] md:w-[19.6rem] md:h-[19.6rem] object-contain select-none transition-transform duration-300"
                :class="{ 'animate-shake': isShaking }"
              />
              <img
                v-else
                src="../assets/images/houses/house_wood_broken_pieces.png"
                alt="木房倒塌"
                class="w-56 h-56 sm:w-[16.8rem] sm:h-[16.8rem] md:w-[19.6rem] md:h-[19.6rem] object-contain select-none transition-transform duration-300 rotate-y-180"
              />
            </div>
          </div>

           <!-- 再来一次按钮 -->
          <div v-if="dragCount >= 3" class="flex justify-center mt-8">
            <button
              @click="resetDragProcess"
              class="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-black font-semibold rounded-lg shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
            >
              再来一次
            </button>
          </div>

          <div v-if="dragCount >= 3" class="text-center mt-4">
            <div
              v-if="showFirstMessage"
              class="flex justify-center items-start min-h-32 sm:min-h-40 md:min-h-50 px-4 sm:px-6 md:px-8 py-6 sm:py-8 w-full"
            >
              <div class="w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
                <p
                  class="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed text-center text-gray-800 dark:text-gray-200 m-0 min-h-[3em] flex items-start justify-center"
                >
                  <span class="inline-block">
                    大灰狼用力撞了三次，木房被撞坏了！
                  </span>
                </p>
              </div>
            </div>
            <TypewriterText
              v-else
              text="大灰狼用力撞了三次，木房被撞坏了！"
              :speed="80"
              @complete="() => handleFirstMessageComplete(onComplete)"
            />
          </div>

         
        </div>
      </template>

      <!-- 步骤4: 呼呼和噜噜逃跑 -->
      <template #step-3="{ isActive, isCompleted, onComplete }">
        <div v-if="isActive || isCompleted" class="mb-8">
          <div
            v-if="isCompleted"
            class="flex justify-center items-start min-h-32 sm:min-h-40 md:min-h-50 px-4 sm:px-6 md:px-8 py-6 sm:py-8 w-full"
          >
            <div class="w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
              <p
                class="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed text-center text-gray-800 dark:text-gray-200 m-0 min-h-[3em] flex items-start justify-center"
              >
                <span class="inline-block">
                  呼呼和噜噜急忙逃出木房，边跑边大声呼喊："大灰狼来了！大灰狼来了！"
                </span>
              </p>
            </div>
          </div>
          <TypewriterText
            v-else-if="isActive"
            text='呼呼和噜噜急忙逃出木房，边跑边大声呼喊："大灰狼来了！大灰狼来了！"'
            :speed="80"
            @complete="() => handleStep4Complete(onComplete)"
          />
        </div>
      </template>
    </SequentialTypewriter>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import TypewriterText from "../components/TypewriterText.vue";
import SequentialTypewriter from "../components/SequentialTypewriter.vue";

const router = useRouter();

const sequentialTypewriter = ref(null);

// 图片资源
const wolfStandingImg = new URL(
  "../assets/images/characters/wolf_standing.png",
  import.meta.url
).href;
const wolfBlowingImg = new URL(
  "../assets/images/characters/wolf_blowing.png",
  import.meta.url
).href;
const wolfDraggedImg = new URL(
  "../assets/images/characters/wolf_dragged.png",
  import.meta.url
).href;
const houseFinishedImg = new URL(
  "../assets/images/houses/house_wood_finished.png",
  import.meta.url
).href;
const houseBrokenImg = new URL(
  "../assets/images/houses/house_wood_broken_pieces.png",
  import.meta.url
).href;

// 吹风状态
const isBlowing = ref(false);
const blowCount = ref(0);

// 拖拽状态
const isDragging = ref(false);
const dragCount = ref(0);
const isShaking = ref(false);
const houseRef = ref(null);
const showFirstMessage = ref(false);

// 触摸拖拽相关
const isTouching = ref(false);
const isTouchOver = ref(false);
const touchStartPos = ref({ x: 0, y: 0 });
const touchDragStyle = ref({});
const hasMoved = ref(false);
const DRAG_THRESHOLD = 10; // 移动超过10px才算拖拽

// localStorage 功能
const STORAGE_KEY = "scene6_drag_progress";

const saveDragProgress = () => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        dragCount: dragCount.value,
      })
    );
  } catch (error) {
    console.error("保存撞击进度失败:", error);
  }
};

const loadDragProgress = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const progress = JSON.parse(saved);
      if (typeof progress.dragCount === "number") {
        dragCount.value = Math.min(progress.dragCount, 3); // 最多3次撞击
        // 如果已经撞击3次，显示完成消息
        if (dragCount.value >= 3) {
          showFirstMessage.value = true;
        }
      }
    }
  } catch (error) {
    console.error("加载撞击进度失败:", error);
  }
};

// 处理第一条消息完成
const handleFirstMessageComplete = (onComplete) => {
  showFirstMessage.value = true;
  // 延迟后自动触发下一步
  setTimeout(() => {
    onComplete();
  }, 1000);
};

// 处理步骤4完成，自动跳转到场景7
const handleStep4Complete = (onComplete) => {
  onComplete();
  // 延迟后自动跳转到场景7
  setTimeout(() => {
    router.push('/scene7');
  }, 1500);
};

// PC端点击处理（只吹气）
const handleClick = (e) => {
  // 只在PC端响应点击（非触摸设备）
  if (e.pointerType === 'touch') return;
  blowHouse();
};

// 吹房子方法（无效果,只有动画，会重置撞击计数）
const blowHouse = async () => {
  if (isBlowing.value || isDragging.value) return;

  isBlowing.value = true;
  isShaking.value = true;
  blowCount.value++;
  
  // 吹风会重置撞击计数，必须连续撞击才有效
  dragCount.value = 0;
  saveDragProgress();

  // 吹风动画持续时间
  setTimeout(() => {
    isBlowing.value = false;
    isShaking.value = false;
  }, 1000);
};

// 拖拽状态
const isDragOver = ref(false);

// 拖拽开始
const handleDragStart = (e) => {
  if (dragCount.value >= 3 || isBlowing.value) {
    e.preventDefault();
    return;
  }
  isDragging.value = true;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/plain", "wolf");
};

// 拖拽结束
const handleDragEnd = (e) => {
  isDragging.value = false;
};

// 拖拽过程
const onDragOver = (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
};

const onDragEnter = (e) => {
  e.preventDefault();
  if (dragCount.value < 3) {
    isDragOver.value = true;
  }
};

const onDragLeave = (e) => {
  // 只有当离开整个drop zone时才取消高亮
  if (!e.currentTarget.contains(e.relatedTarget)) {
    isDragOver.value = false;
  }
};

// 放置到木房上
const handleDrop = (e) => {
  e.preventDefault();
  isDragOver.value = false;
  isDragging.value = false;

  if (dragCount.value >= 3) return;

  const data = e.dataTransfer.getData("text/plain");
  if (data === "wolf") {
    dragCount.value++;
    triggerShake();
    saveDragProgress();
  }
};

// 触发摇晃动画
const triggerShake = () => {
  isShaking.value = true;
  setTimeout(() => {
    isShaking.value = false;
  }, 500);
};

// 触摸开始
const handleTouchStart = (e) => {
  if (dragCount.value >= 3 || isBlowing.value) return;

  e.preventDefault();
  isTouching.value = true;
  hasMoved.value = false;
  const touch = e.touches[0];
  touchStartPos.value = { x: touch.clientX, y: touch.clientY };

  // 初始化拖拽大灰狼位置
  const wolfSize = 51.2; // 6.4rem = 51.2px (6.4 * 8)
  touchDragStyle.value = {
    position: "fixed",
    left: `${touch.clientX - wolfSize / 2}px`,
    top: `${touch.clientY - wolfSize / 2}px`,
    zIndex: "1000",
    pointerEvents: "none",
    transition: "none",
  };
};

// 触摸移动
const handleTouchMove = (e) => {
  if (!isTouching.value || dragCount.value >= 3) return;

  e.preventDefault();
  const touch = e.touches[0];

  // 检查是否移动超过阈值
  const deltaX = Math.abs(touch.clientX - touchStartPos.value.x);
  const deltaY = Math.abs(touch.clientY - touchStartPos.value.y);
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  
  if (distance > DRAG_THRESHOLD) {
    hasMoved.value = true;
  }

  // 更新拖拽大灰狼位置
  const wolfSize = 51.2;
  touchDragStyle.value = {
    ...touchDragStyle.value,
    left: `${touch.clientX - wolfSize / 2}px`,
    top: `${touch.clientY - wolfSize / 2}px`,
  };

  // 检查是否在房子区域上方
  if (houseRef.value) {
    const houseRect = houseRef.value.getBoundingClientRect();
    const isOverHouse =
      touch.clientX >= houseRect.left &&
      touch.clientX <= houseRect.right &&
      touch.clientY >= houseRect.top &&
      touch.clientY <= houseRect.bottom;

    isTouchOver.value = isOverHouse;
  }
};

// 触摸结束
const handleTouchEnd = (e) => {
  if (!isTouching.value || dragCount.value >= 3) return;

  e.preventDefault();

  // 判断是点击还是拖拽
  if (!hasMoved.value) {
    // 没有移动，是点击 -> 吹气
    blowHouse();
  } else if (isTouchOver.value) {
    // 有移动且在房子区域上方松开 -> 完成拖拽撞击
    dragCount.value++;
    triggerShake();
    saveDragProgress();
  }

  // 重置状态
  isTouching.value = false;
  isTouchOver.value = false;
  hasMoved.value = false;
  touchDragStyle.value = {};
};

// 重置拖拽撞击过程
const resetDragProcess = () => {
  // 重置撞击次数
  dragCount.value = 0;
  showFirstMessage.value = false;
  
  // 清除localStorage中的撞击进度
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('清除撞击进度失败:', error);
  }
  
  // 重置story_progress到步骤2
  if (sequentialTypewriter.value) {
    sequentialTypewriter.value.resetToStep(2);
  }
};

// 组件挂载时加载进度
onMounted(() => {
  loadDragProgress();
});
</script>

<style scoped>
/* 点击反馈 */
.cursor-pointer:active {
  transform: scale(0.95);
}

/* 左右摇摆动画 */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

.animate-shake {
  animation: shake 0.3s ease-in-out infinite;
}

/* 移动端触摸优化 */
@media (hover: none) and (pointer: coarse) {
  .cursor-pointer:active {
    transform: scale(0.95);
  }
}

/* 拖拽区域 */
.drop-zone {
  transition: all 0.3s ease;
}

.drop-zone-active {
  transform: scale(1.05);
}

/* 移动端拖拽元素 */
.touch-drag-wolf {
  position: fixed;
  pointer-events: none;
  z-index: 1000;
}
</style>
