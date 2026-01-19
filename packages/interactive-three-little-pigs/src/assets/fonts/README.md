# 字体使用指南

## 1. 添加字体文件
将你的 `.ttf` 字体文件放在此目录下。

## 2. 配置字体
在 `fonts.css` 中修改字体配置：
- 将 `your-font-name.ttf` 替换为你的实际字体文件名
- 修改 `font-family: 'CustomFont'` 为你想要的字体名称

## 3. 使用字体

### 方法一：全局使用
在 `src/style.css` 中修改：
```css
:root {
  font-family: 'CustomFont', system-ui, sans-serif;
}
```

### 方法二：在组件中使用
```vue
<template>
  <div class="custom-font-text">
    使用自定义字体的文本
  </div>
</template>

<style scoped>
.custom-font-text {
  font-family: 'CustomFont', sans-serif;
}
</style>
```

### 方法三：使用 Tailwind CSS
在 `vite.config.js` 或 Tailwind 配置中扩展字体：
```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      fontFamily: {
        custom: ['CustomFont', 'sans-serif'],
      },
    },
  },
}
```

然后在模板中使用：
```vue
<div class="font-custom">自定义字体文本</div>
```

## 4. 字体格式说明
- `.ttf` - TrueType Font（已支持）
- `.woff` / `.woff2` - Web 字体格式（推荐用于生产环境）

## 5. 性能优化建议
- 使用 `font-display: swap` 避免字体加载阻塞渲染
- 考虑将 TTF 转换为 WOFF2 格式以获得更好的压缩率
- 只加载需要的字重和样式
