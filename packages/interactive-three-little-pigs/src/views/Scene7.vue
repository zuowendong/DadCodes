<template>
  <div
    class="min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-12 pb-24 sm:pb-32 md:pb-40"
  >
    <SequentialTypewriter storage-key="scene7_progress">
      <!-- 步骤1: 嘟嘟开门 -->
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
                  砖房里的嘟嘟听见了，连忙打开门，让呼呼和噜噜进来，然后又把门紧紧地关上。
                </span>
              </p>
            </div>
          </div>
          <TypewriterText
            v-else-if="isActive"
            text="砖房里的嘟嘟听见了，连忙打开门，让呼呼和噜噜进来，然后又把门紧紧地关上。"
            :speed="80"
            @complete="onComplete"
          />
        </div>
      </template>

      <!-- 步骤2: 大灰狼来到砖房前 -->
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
                  大灰狼来到砖房前，叫小猪嘟嘟开门。嘟嘟不肯开。
                </span>
              </p>
            </div>
          </div>
          <TypewriterText
            v-else-if="isActive"
            text="大灰狼来到砖房前，叫小猪嘟嘟开门。嘟嘟不肯开。"
            :speed="80"
            @complete="onComplete"
          />
        </div>
      </template>

      <!-- 步骤3: 大灰狼尝试吹和撞砖房（无效） -->
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

            <!-- 砖房 -->
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
                src="../assets/images/houses/house_stone_finished.png"
                alt="砖房"
                class="w-56 h-56 sm:w-[16.8rem] sm:h-[16.8rem] md:w-[19.6rem] md:h-[19.6rem] object-contain select-none transition-transform duration-300"
                :class="{ 'animate-shake': isShaking }"
              />
            </div>
          </div>

          <!-- 提示信息：吹和撞都没用 -->
          <div v-if="blowCount >= 3 && dragCount >= 3" class="text-center mt-4">
            <div
              v-if="showMessage"
              class="flex justify-center items-start min-h-32 sm:min-h-40 md:min-h-50 px-4 sm:px-6 md:px-8 py-6 sm:py-8 w-full"
            >
              <div class="w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
                <p
                  class="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed text-center text-gray-800 dark:text-gray-200 m-0 min-h-[3em] flex items-start justify-center"
                >
                  <span class="inline-block">
                    大灰狼又吹又撞，可是砖房坚不可摧，一点也不动摇！
                  </span>
                </p>
              </div>
            </div>
            <TypewriterText
              v-else
              text="大灰狼又吹又撞，可是砖房坚不可摧，一点也不动摇！"
              :speed="80"
              @complete="() => handleMessageComplete(onComplete)"
            />
          </div>
        </div>
      </template>

      <!-- 步骤4: 大灰狼失败逃跑 -->
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
                  大灰狼气急败坏的绕着房子转了一圈，最后爬上屋顶，它想从烟囱溜进去。老三从窗口发现后，马上点起了火。大灰狼滑下来时，刚好掉进火炉里，整条尾巴都烧焦了。它嚎叫着夹着尾巴逃走了，再也不敢来找三只小猪的麻烦了。
                </span>
              </p>
            </div>
          </div>
          <TypewriterText
            v-else-if="isActive"
            text="大灰狼气急败坏的绕着房子转了一圈，最后爬上屋顶，它想从烟囱溜进去。老三从窗口发现后，马上点起了火。大灰狼滑下来时，刚好掉进火炉里，整条尾巴都烧焦了。它嚎叫着夹着尾巴逃走了，再也不敢来找三只小猪的麻烦了。"
            :speed="80"
            @complete="onComplete"
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

// 吹风状态
const isBlowing = ref(false);
const blowCount = ref(0);

// 拖拽状态
const isDragging = ref(false);
const dragCount = ref(0);
const isShaking = ref(false);
const houseRef = ref(null);
const showMessage = ref(false);

// 触摸拖拽相关
const isTouching = ref(false);
const isTouchOver = ref(false);
const touchStartPos = ref({ x: 0, y: 0 });
const touchDragStyle = ref({});
const hasMoved = ref(false);
const DRAG_THRESHOLD = 10; // 移动超过10px才算拖拽

// localStorage 功能
const STORAGE_KEY = "scene7_progress";

const saveProgress = () => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        blowCount: blowCount.value,
        dragCount: dragCount.value,
      })
    );
  } catch (error) {
    console.error("保存进度失败:", error);
  }
};

const loadProgress = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const progress = JSON.parse(saved);
      if (typeof progress.blowCount === "number") {
        blowCount.value = progress.blowCount;
      }
      if (typeof progress.dragCount === "number") {
        dragCount.value = progress.dragCount;
      }
      // 如果已经完成吹和撞，显示完成消息
      if (blowCount.value >= 3 && dragCount.value >= 3) {
        showMessage.value = true;
      }
    }
  } catch (error) {
    console.error("加载进度失败:", error);
  }
};

// 处理消息完成
const handleMessageComplete = (onComplete) => {
  showMessage.value = true;
  // 延迟后自动触发下一步
  setTimeout(() => {
    onComplete();
  }, 1000);
};

// PC端点击处理（只吹气）
const handleClick = (e) => {
  // 只在PC端响应点击（非触摸设备）
  if (e.pointerType === 'touch') return;
  blowHouse();
};

// 吹房子方法（无效果，砖房吹不倒）
const blowHouse = async () => {
  if (isBlowing.value || isDragging.value) return;

  isBlowing.value = true;
  isShaking.value = true;
  blowCount.value++;
  saveProgress();

  // 吹风动画持续时间（砖房只是轻微摇晃）
  setTimeout(() => {
    isBlowing.value = false;
    isShaking.value = false;
  }, 800);
};

// 拖拽状态
const isDragOver = ref(false);

// 拖拽开始
const handleDragStart = (e) => {
  if (isBlowing.value) {
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
  isDragOver.value = true;
};

const onDragLeave = (e) => {
  // 只有当离开整个drop zone时才取消高亮
  if (!e.currentTarget.contains(e.relatedTarget)) {
    isDragOver.value = false;
  }
};

// 放置到砖房上（无效果，砖房撞不倒）
const handleDrop = (e) => {
  e.preventDefault();
  isDragOver.value = false;
  isDragging.value = false;

  const data = e.dataTransfer.getData("text/plain");
  if (data === "wolf") {
    dragCount.value++;
    triggerShake();
    saveProgress();
  }
};

// 触发摇晃动画（砖房只是轻微摇晃）
const triggerShake = () => {
  isShaking.value = true;
  setTimeout(() => {
    isShaking.value = false;
  }, 400);
};

// 触摸开始
const handleTouchStart = (e) => {
  if (isBlowing.value) return;

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
  if (!isTouching.value) return;

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
  if (!isTouching.value) return;

  e.preventDefault();

  // 判断是点击还是拖拽
  if (!hasMoved.value) {
    // 没有移动，是点击 -> 吹气
    blowHouse();
  } else if (isTouchOver.value) {
    // 有移动且在房子区域上方松开 -> 完成拖拽撞击（但砖房撞不倒）
    dragCount.value++;
    triggerShake();
    saveProgress();
  }

  // 重置状态
  isTouching.value = false;
  isTouchOver.value = false;
  hasMoved.value = false;
  touchDragStyle.value = {};
};

// 组件挂载时加载进度
onMounted(() => {
  loadProgress();
});
</script>

<style scoped>
/* 点击反馈 */
.cursor-pointer:active {
  transform: scale(0.95);
}

/* 轻微摇摆动画（砖房更稳固） */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  75% { transform: translateX(2px); }
}

.animate-shake {
  animation: shake 0.2s ease-in-out 2;
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
  transform: scale(1.02);
}

/* 移动端拖拽元素 */
.touch-drag-wolf {
  position: fixed;
  pointer-events: none;
  z-index: 1000;
}
</style>
