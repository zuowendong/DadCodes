<template>
  <div class="min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-12 pb-24 sm:pb-32 md:pb-40">
    <SequentialTypewriter storage-key="scene1_progress">
      <!-- 步骤0: 开场文字 -->
      <template #step-0="{ isActive, isCompleted, onComplete }">
        <div class="mb-8">
          <div v-if="isCompleted" class="flex justify-center items-start min-h-32 sm:min-h-40 md:min-h-50 px-4 sm:px-6 md:px-8 py-6 sm:py-8 w-full">
            <div class="w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
              <p class="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed text-center text-gray-800 dark:text-gray-200 m-0 min-h-[3em] flex items-start justify-center">
                <span class="inline-block">
                  在很久很久以前，一个偏远的小山村里，有一位猪妈妈和她的三只小猪，老大叫呼呼，老二叫噜噜，还有一个老三叫嘟。
                </span>
              </p>
            </div>
          </div>
          <TypewriterText
            v-else-if="isActive"
            text="在很久很久以前，一个偏远的小山村里，有一位猪妈妈和她的三只小猪，老大叫呼呼，老二叫噜噜，还有一个老三叫嘟。"
            :speed="80"
            @complete="onComplete"
          />
        </div>
      </template>

      <!-- 步骤1: 猪妈妈图片和对话 -->
      <template #step-1="{ isActive, isCompleted, onComplete }">
        <div class="space-y-8">
          <div class="flex justify-center">
            <img
              src="../assets/images/characters/mother.png"
              alt="猪妈妈"
              class="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 object-contain"
            />
          </div>
          <div class="w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto">
            <div v-if="isCompleted" class="flex justify-center items-start min-h-32 sm:min-h-40 md:min-h-50 px-4 sm:px-6 md:px-8 py-6 sm:py-8 w-full">
              <div class="w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
                <p class="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed text-center text-gray-800 dark:text-gray-200 m-0 min-h-[3em] flex items-start justify-center">
                  <span class="inline-block">
                    有一天，猪妈妈对小猪说：“现在，你们已经长大了，应该学一些本领。你们各自去盖一座房子吧！”
                  </span>
                </p>
              </div>
            </div>
            <TypewriterText
              v-else-if="isActive"
              text='有一天，猪妈妈对小猪说："现在，你们已经长大了，应该学一些本领。你们各自去盖一座房子吧！"'
              :speed="80"
              @complete="onComplete"
            />
          </div>
        </div>
      </template>

      <!-- 步骤2: 三只小猪的问题 -->
      <template #step-2="{ isActive, isCompleted, onComplete }">
        <div>
          <div v-if="isCompleted" class="flex justify-center items-start min-h-32 sm:min-h-40 md:min-h-50 px-4 sm:px-6 md:px-8 py-6 sm:py-8 w-full">
            <div class="w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
              <p class="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed text-center text-gray-800 dark:text-gray-200 m-0 min-h-[3em] flex items-start justify-center">
                <span class="inline-block">
                  三只小猪问："妈妈，妈妈，该用什么东西盖房子呢？"
                </span>
              </p>
            </div>
          </div>
          <TypewriterText
            v-else-if="isActive"
            text='三只小猪问："妈妈，妈妈，该用什么东西盖房子呢？"'
            :speed="80"
            @complete="onComplete"
          />
        </div>
      </template>

      <!-- 步骤3: 三只小猪图片和猪妈妈的回答 -->
      <template #step-3="{ isActive, isCompleted, onComplete }">
        <div class="space-y-8">
          <!-- 三只小猪图片 -->
          <div 
            v-if="isActive || isCompleted"
            class="flex justify-center items-center gap-4 sm:gap-6 md:gap-8"
          >
            <div class="flex-1 flex justify-center">
              <img
                src="../assets/images/characters/pig_eldest.png"
                alt="大猪"
                class="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain"
              />
            </div>
            <div class="flex-1 flex justify-center">
              <img
                src="../assets/images/characters/pig_second.png"
                alt="二猪"
                class="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain"
              />
            </div>
            <div class="flex-1 flex justify-center">
              <img
                src="../assets/images/characters/pig_youngest.png"
                alt="小猪"
                class="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain"
              />
            </div>
          </div>

          <!-- 猪妈妈的回答 -->
          <div>
            <div v-if="isCompleted" class="flex justify-center items-start min-h-32 sm:min-h-40 md:min-h-50 px-4 sm:px-6 md:px-8 py-6 sm:py-8 w-full">
              <div class="w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
                <p class="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed text-center text-gray-800 dark:text-gray-200 m-0 min-h-[3em] flex items-start justify-center">
                  <span class="inline-block">
                    猪妈妈笑着说："稻草、木头、砖都可以盖房子。"
                  </span>
                </p>
              </div>
            </div>
            <TypewriterText
              v-else-if="isActive"
              text='猪妈妈笑着说："稻草、木头、砖都可以盖房子。"'
              :speed="80"
              @complete="onComplete"
            />
          </div>
        </div>
      </template>

      <!-- 步骤4: 三只小猪出发 -->
      <template #step-4="{ isActive, isCompleted, onComplete }">
        <div>
          <div v-if="isCompleted" class="flex justify-center items-start min-h-32 sm:min-h-40 md:min-h-50 px-4 sm:px-6 md:px-8 py-6 sm:py-8 w-full">
            <div class="w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
              <p class="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed text-center text-gray-800 dark:text-gray-200 m-0 min-h-[3em] flex items-start justify-center">
                <span class="inline-block">
                  三只小猪高高兴兴的出发了，准备去自己盖房子。
                </span>
              </p>
            </div>
          </div>
          <TypewriterText
            v-else-if="isActive"
            text="三只小猪高高兴兴的出发了，准备去自己盖房子。"
            :speed="80"
            @complete="() => handleFinalComplete(onComplete)"
          />
        </div>
      </template>
    </SequentialTypewriter>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import TypewriterText from "../components/TypewriterText.vue";
import SequentialTypewriter from "../components/SequentialTypewriter.vue";

const router = useRouter();

const handleFinalComplete = (onComplete) => {
  onComplete();
  setTimeout(() => {
    router.push('/scene2');
  }, 2000);
};
</script>
