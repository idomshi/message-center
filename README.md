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
<template>
  <MessageCenter />
</template>

<script setup lang="ts">
import MessageCenter from './components/MessageCenter.vue'
</script>
```

## 使用例

```ts
const messageCenter = useMessageCenter()
messageCenter.pushMessage({ type: 'success', title: '完了', text: '保存が完了しました' })
```

## 特徴

- 自動消えるトースト（デフォルト 5000ms）
- 未読件数バッジ
- 履歴一覧表示
- 既読・全消去操作

## Nuxt 3での利用

`plugins/message-center.client.ts`を追加。

```ts
const { $messageCenter } = useNuxtApp()
$messageCenter.pushMessage({ type: 'info', text: 'Nuxt plugin from anywhere' })
```
