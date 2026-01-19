<template>
  <div
    class="min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-12 pb-24 sm:pb-32 md:pb-40"
  >
    <SequentialTypewriter
      ref="sequentialTypewriter"
      storage-key="scene5_progress"
    >
      <!-- 步骤1: 山后边住着一只大灰狼 -->
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
                <span class="inline-block"> 山后边住着一只大灰狼。 </span>
              </p>
            </div>
          </div>
          <TypewriterText
            v-else-if="isActive"
            text="山后边住着一只大灰狼。"
            :speed="80"
            @complete="onComplete"
          />
        </div>
      </template>

      <!-- 步骤2: 大灰狼登场 -->
      <template #step-1="{ isActive, isCompleted, onComplete }">
        <div class="space-y-8">
          <div class="flex justify-center">
            <img
              src="../assets/images/characters/wolf_standing.png"
              alt="大灰狼"
              class="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 object-contain"
            />
          </div>
          <div
            class="w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto"
          >
            <div
              v-if="isCompleted"
              class="flex justify-center items-start min-h-32 sm:min-h-40 md:min-h-50 px-4 sm:px-6 md:px-8 py-6 sm:py-8 w-full"
            >
              <div
                class="w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl"
              >
                <p
                  class="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed text-center text-gray-800 dark:text-gray-200 m-0 min-h-[3em] flex items-start justify-center"
                >
                  <span class="inline-block">
                    它听说来了三只小猪，哈哈大笑说："三只小猪来得好，正好让我吃个饱！"
                  </span>
                </p>
              </div>
            </div>
            <TypewriterText
              v-else-if="isActive"
              text='它听说来了三只小猪，哈哈大笑说："三只小猪来得好，正好让我吃个饱！"'
              :speed="80"
              @complete="onComplete"
            />
          </div>
        </div>
      </template>

      <!-- 步骤3: 大灰狼来到草房前 -->
      <template #step-2="{ isActive, isCompleted, onComplete }">
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
                  大灰狼来到草房前，叫小猪呼呼开门。呼呼不肯开。
                </span>
              </p>
            </div>
          </div>
          <TypewriterText
            v-else-if="isActive"
            text="大灰狼来到草房前，叫小猪呼呼开门。呼呼不肯开。"
            :speed="80"
            @complete="onComplete"
          />
        </div>
      </template>

      <!-- 步骤4: 互动场景 - 大灰狼吹房子 -->
      <template #step-3="{ isActive, isCompleted, onComplete }">
        <div v-if="isActive || isCompleted" class="space-y-8">
          <!-- 互动区域 -->
          <div
            class="flex flex-row justify-center items-center gap-8 sm:gap-16 lg:gap-24"
          >
            <!-- 左侧：大灰狼 -->
            <div class="flex flex-col items-center space-y-4 pt-16">
              <div
                class="cursor-pointer transition-transform hover:scale-105"
                @click="blowHouse"
              >
                <img
                  v-if="isBlowing"
                  :src="wolfBlowingImg"
                  alt="大灰狼吹气"
                  class="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 object-contain transition-all duration-300"
                /><img
                  v-else
                  :src="wolfStandingImg"
                  alt="大灰狼"
                  class="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 object-contain transition-all duration-300"
                  :class="{ 'animate-pulse': blowCount < 2 && !isBlowing }"
                />
              </div>
            </div>

            <!-- 右侧：草房子 -->
            <div class="flex flex-col items-center space-y-4">
              <div class="relative">
                <img
                  v-if="blowCount < 2"
                  :src="houseStrawFinishedImg"
                  alt="草房子"
                  class="w-52 h-52 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-88 lg:h-88 object-contain transition-all duration-500"
                  :class="{ 'animate-shake': isBlowing }"
                />
                <img
                  v-if="blowCount >= 2"
                  :src="houseStrawDestroyedImg"
                  alt="被吹倒的草房子"
                  class="w-52 h-52 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-88 lg:h-88 object-contain transition-all duration-500 rotate-y-180"
                />
              </div>
            </div>
          </div>

          <!-- 再来一次按钮 -->
          <div v-if="blowCount >= 2" class="flex justify-center mt-8">
            <button
              @click="resetBlowingProcess"
              class="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-black font-semibold rounded-lg shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
            >
              再来一次
            </button>
          </div>

          <!-- 完成提示 -->
          <div v-if="blowCount >= 2" class="text-center">
            <div
              class="w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto"
            >
              <div
                v-if="isCompleted"
                class="flex justify-center items-start min-h-32 sm:min-h-40 md:min-h-50 px-4 sm:px-6 md:px-8 py-6 sm:py-8 w-full"
              >
                <div
                  class="w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl"
                >
                  <p
                    class="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed text-center text-gray-800 dark:text-gray-200 m-0 min-h-[3em] flex items-start justify-center"
                  >
                    <span class="inline-block">
                      大灰狼用力吹了两次，草房子被吹倒了！
                    </span>
                  </p>
                </div>
              </div>
              <TypewriterText
                v-else
                text="大灰狼用力吹了两次，草房子被吹倒了！"
                :speed="80"
                @complete="onComplete"
              />
            </div>
          </div>
        </div>
      </template>

      <!-- 步骤5: 呼呼逃跑 -->
      <template #step-4="{ isActive, isCompleted, onComplete }">
        <div v-if="isActive || isCompleted" class="space-y-8">
          <!-- 呼呼的话 -->
          <div class="text-center mb-8">
            <div
              v-if="textCompleted || isCompleted"
              class="flex justify-center items-start min-h-32 sm:min-h-40 md:min-h-50 px-4 sm:px-6 md:px-8 py-6 sm:py-8 w-full"
            >
              <div
                class="w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl"
              >
                <p
                  class="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed text-center text-gray-800 dark:text-gray-200 m-0 min-h-[3em] flex items-start justify-center"
                >
                  <span class="inline-block">
                    呼呼急忙逃出草房，边跑边喊："大灰狼来了！大灰狼来了！"
                  </span>
                </p>
              </div>
            </div>
            <TypewriterText
              v-else-if="isActive"
              text='呼呼急忙逃出草房，边跑边喊："大灰狼来了！大灰狼来了！"'
              :speed="80"
              @complete="handleTextComplete"
            />
          </div>

          <!-- 逃跑场景 -->
          <div
            v-if="textCompleted || isCompleted"
            class="flex justify-center items-center relative h-64"
          >
            <!-- 逃跑的小猪 -->
            <div
              class="absolute pig-escape"
              :class="{ 'pig-escaping': pigEscaping }"
            >
              <img
                :src="pigEscapingImg"
                alt="逃跑的呼呼"
                class="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 object-contain rotate-y-180"
              />
            </div>
          </div>
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
import wolfStandingImg from "../assets/images/characters/wolf_standing.png";
import wolfBlowingImg from "../assets/images/characters/wolf_blowing.png";
import houseStrawFinishedImg from "../assets/images/houses/house_straw_finished.png";
import houseStrawDestroyedImg from "../assets/images/houses/house_straw_destroyed.png";
import pigEscapingImg from "../assets/images/characters/pig_escaping.png";

const router = useRouter();

// 响应式数据
const blowCount = ref(0);
const isBlowing = ref(false);
const pigEscaping = ref(false);
const textCompleted = ref(false);
const sequentialTypewriter = ref(null);

// localStorage 功能
const STORAGE_KEY = "scene5_blow_progress";

const saveBlowProgress = () => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        blowCount: blowCount.value,
      })
    );
  } catch (error) {
    console.error("保存吹房子进度失败:", error);
  }
};

const loadBlowProgress = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const progress = JSON.parse(saved);
      if (typeof progress.blowCount === "number") {
        blowCount.value = Math.min(progress.blowCount, 2); // 最多2次吹风
      }
    }
  } catch (error) {
    console.error("加载吹房子进度失败:", error);
  }
};

// 吹房子方法
const blowHouse = async () => {
  if (blowCount.value >= 2 || isBlowing.value) return;

  isBlowing.value = true;

  // 吹风动画持续时间
  setTimeout(() => {
    isBlowing.value = false;
    blowCount.value++;
    saveBlowProgress();
  }, 1000);
};

// 处理文字完成
const handleTextComplete = () => {
  textCompleted.value = true;
  // 文字完成后立即开始逃跑动画
  setTimeout(() => {
    startEscapeAnimation();
  }, 500);
};

// 开始逃跑动画
const startEscapeAnimation = () => {
  pigEscaping.value = true;
  // 动画完成后跳转到 Scene6
  setTimeout(() => {
    router.push("/scene6");
  }, 3500);
};

// 重置吹房子过程
const resetBlowingProcess = () => {
  // 重置吹风次数
  blowCount.value = 0;

  // 清除localStorage中的吹风进度
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("清除吹风进度失败:", error);
  }

  // 重置story_progress到步骤3
  if (sequentialTypewriter.value) {
    sequentialTypewriter.value.resetToStep(3);
  }
};

// 组件挂载时加载进度
onMounted(() => {
  loadBlowProgress();
});
</script>

<style scoped>
/* 点击反馈 */
.cursor-pointer:active {
  transform: scale(0.95);
}

/* 移动端触摸优化 */
@media (hover: none) and (pointer: coarse) {
  .cursor-pointer:active {
    transform: scale(0.95);
  }
}

/* 左右摇摆动画 */
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-4px);
  }
  75% {
    transform: translateX(4px);
  }
}

.animate-shake {
  animation: shake 0.3s ease-in-out infinite;
}

/* 小猪逃跑动画 - 向右逃跑并丝滑缩小消失 */
.pig-escape {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
}

.pig-escaping {
  animation: smoothEscape 3s ease-out forwards;
}

@keyframes smoothEscape {
  0% {
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  100% {
    left: 120%;
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
  }
}
</style>
