# Message Center (Vue 3 + Composition API + TypeScript)

このリポジトリは、Vue 3 + TypeScriptで動作するメッセージセンターコンポーネントを提供します。Nuxt 3にも対応（プラグイン例あり）。

## 主要ファイル

- `src/types/message.ts` - `Message`型定義
- `src/composables/useMessageCenter.ts` - 状態管理 Composable
- `src/components/MessageToast.vue` - 個別トースト
- `src/components/MessageCenter.vue` - メインUI
- `plugins/message-center.client.ts` - Nuxt plugin

## インストール例

プロジェクトにコピーして、`MessageCenter`コンポーネントを配置し、ルートに置きます。

```vue
<script setup lang="ts">
import MessageCenter from './components/MessageCenter.vue'
</script>

<template>
  <MessageCenter />
</template>
```

## 使用例


### 方法1

App.vueで `provideMessageCenter` して、同じコンポーネント内で `messageCenter.pushMessage` したいとき：

App.vue:

```ts
const messageCenter = createMessageCenter()
provideMessageCenter(messageCenter)

// 同じファイルでは messageCenter をそのまま使う
// （この時 useMessageCenter() を呼ぶ必要なし）
const messageCenter = useMessageCenter()
messageCenter.pushMessage({ type: 'success', title: '完了', text: '保存が完了しました' })
```

### 方法2

App.vueで `provideMessageCenter` して、子コンポーネント内で `messageCenter.pushMessage` したいとき：

App.vue:

```ts
provideMessageCenter(useMessageCenter())
```

SomeChild.vue:

```ts
const messageCenter = useMessageCenter()
messageCenter.pushMessage({ type: 'success', title: '完了', text: '保存が完了しました' })
```

## 特徴

- トーストは一定時間が経過したあとで自動的に消える
- バッジに未読件数が表示される
- 履歴の一覧表示ができる
- 既読・全消去機能がある

## Nuxt 3での利用

`plugins/message-center.client.ts`を追加。

```ts
const { $messageCenter } = useNuxtApp()
$messageCenter.pushMessage({ type: 'info', text: 'Nuxt plugin from anywhere' })
```