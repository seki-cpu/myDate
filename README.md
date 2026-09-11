# myDate

> **People may change. The memories are still yours.**

myDate is a mobile-first web app for discovering date ideas and keeping small memories from real experiences.

From finalized product design to the lightweight V1, the total implementation effort was approximately **8 working hours**.

从产品设计确定到轻量版 V1，整体实现投入约 **8 个工时**。

プロダクト設計の確定から軽量版 V1 まで、実装工数は約 **8時間** です。

---

# 中文

## 关于 myDate V2

**myDate** 是一个 Mobile First 的轻量约会灵感 Web App。

它解决的问题很简单：

> 两个人见面以后，“接下来去哪？”、“今天玩什么？”往往比想象中更麻烦。

myDate 希望用户打开手机后，在很短的时间内找到一个真正愿意去做的活动。

V2 的核心方向是 **Memory First**。

> **人会改变，关系会改变，但经历始终属于你。**

用户本人始终是 myDate 的主体。约会对象和关系可能变化，但用户经历过的事情仍然属于自己。

因此，V2 不再使用 Egg、XP、孵化或关系进度机制。每一次完成的 Adventure 都会成为一个属于用户自己的 **Memory**。

## 核心原则

- **Activity First**：先帮助用户快速找到想做的活动。
- **Memory Second**：Memory 是体验后的留存与正反馈，不阻碍活动发现。
- **User Owned**：Memory 属于用户本人，而不是某一段关系。
- **No Relationship KPI**：myDate 不评价关系是否“成功”，也不把亲密关系做成等级或分数。

## V2 核心流程

```text
Discover Date Idea
↓
Let's do it
↓
Adventure
↓
Adventure Complete
↓
Memory Prompt
↓
I got it / Skip
↓
Experience Rating
↓
✨ Memory Reward
↓
+1 Memory
↓
Memory saved
```

**完成 Adventure 就会创建一个 Memory。**

Memory Prompt 是可选的：

```text
I got it
→ memoryPromptCompleted = true

Skip
→ Memory 仍然会被保存
```

用户不会因为跳过 Memory Prompt 而失去这段经历。

## Memory Prompt

myDate 不上传、不读取，也不保存用户照片。

照片保留在用户自己的手机相册中。myDate 只提供一个与当前活动相关的拍摄灵感，帮助用户给这一天留下一个视觉记忆锚点。

照片不需要露脸，也不需要两个人同框。

例如：

- 野餐：拍下今天你最喜欢的一抹绿色。
- 日落：不拍太阳，拍一件被夕阳照亮的东西。
- 电玩城：拍下今天最像“战利品”的东西。
- 书店：拍下对方拿起来看了最久的一本书。
- 夜间散步：拍下一个如果今天独自出来，可能不会注意到的东西。
- 唱片店：拍下两张本来可能永远不会出现在同一张照片里的唱片。

Memory Prompt 的目标不是制造标准情侣照，而是帮助未来的自己重新想起这一天。

## Experience Rating

Rating 不用于评价约会对象，而是记录：

> 这次体验对我来说怎么样？

例如：

- How much fun did you have?
- How comfortable did today feel?
- Would you do something like this again?

这些数据只属于用户自己的体验记录，并可以在未来用于改善活动推荐。

## V2 功能

- Mobile First UI
- Random Date Ideas
- Activity 分类筛选
- Date Cards
- Adventure Flow
- Memory Prompt
- `I got it` / `Skip`
- Experience Rating
- `+1 Memory` 正反馈
- Memories 历史记录
- localStorage 本地持久化
- 中文 / 日本語 / English 三语言
- 淡金色 Memory Reward Animation

## 技术栈

```text
Next.js 14
TypeScript
React
App Router
localStorage
Mobile First Responsive Design
Vercel
```

V2 暂时不使用：

```text
Backend
Database
Authentication
Cloud Storage
AI API
```

## V2 暂不实现

- 用户注册
- Couple Account
- 双人实时同步
- 图片上传
- 图片云存储
- GPS / 地图
- 商家预约
- AI 个性推荐
- Solo Mode
- Group Mode
- Chat
- Relationship Score
- Compatibility Score

---

# 日本語

## myDate V2 について

**myDate** は Mobile First の軽量デートアイデア Web App です。

解決したい問題はシンプルです。

> 二人で会ったあと、「次はどこに行く？」「何をする？」を決めるのは意外と面倒。

V2 の中心コンセプトは **Memory First** です。

> **人は変わる。関係も変わる。それでも、その経験はあなたのもの。**

myDate の主体は常にユーザー本人です。デート相手や関係性が変わっても、その日に経験したことはユーザー自身の Memory として残ります。

そのため V2 では Egg、XP、孵化、関係性の進捗システムを廃止し、完了した Adventure を **Memory** として記録します。

## Core Flow

```text
Discover Date Idea
↓
Let's do it
↓
Adventure
↓
Adventure Complete
↓
Memory Prompt
↓
I got it / Skip
↓
Experience Rating
↓
✨ Memory Reward
↓
+1 Memory
↓
Memory saved
```

Adventure を完了した時点で Memory が作成されます。

Memory Prompt は任意です。Skip しても、その体験は Memory として保存されます。

## Memory Prompt

myDate は写真をアップロード、閲覧、保存しません。

写真はユーザー自身のスマートフォンに残ります。myDate が提供するのは、その日の体験に関連した小さな撮影テーマです。

顔や二人のツーショットは必要ありません。

例：

- ピクニック：今日見つけた、一番好きな「緑」を撮る。
- 夕日：太陽ではなく、夕日に照らされた何かを撮る。
- ゲームセンター：今日いちばん「戦利品らしい」と感じたものを撮る。
- 書店：相手が一番長く手に取っていた本を撮る。
- 夜の散歩：一人なら気づかなかったかもしれないものを撮る。

目的は「カップルらしい写真」を作ることではなく、未来の自分がその日を思い出すきっかけを残すことです。

## Experience Rating

Rating は相手を評価するための機能ではありません。

記録するのは：

> この体験は自分にとってどうだったか？

## V2 Features

- Mobile First UI
- Random Date Ideas
- Category Filtering
- Date Cards
- Adventure Flow
- Memory Prompt
- `I got it` / `Skip`
- Experience Rating
- `+1 Memory`
- Memories History
- localStorage
- 中国語 / 日本語 / 英語
- Champagne Gold Memory Reward Animation

## Tech Stack

```text
Next.js 14
TypeScript
React
App Router
localStorage
Mobile First Responsive Design
Vercel
```

V2 では以下を使用しません：

```text
Backend
Database
Authentication
Cloud Storage
AI API
```

---

# English

## About myDate V2

**myDate** is a lightweight, mobile-first dating activity web app.

It solves a simple problem:

> Two people are already together, but deciding where to go or what to do next can still be surprisingly annoying.

V2 is built around **Memory First**.

> **People may change. The memories are still yours.**

The user is the permanent subject of myDate. Dating partners and relationships may change over time, but the user's experiences remain their own.

Because of this, V2 removes Egg, XP, hatching, and relationship progression. Every completed Adventure becomes a user-owned **Memory**.

## Core Principles

- **Activity First** — help users find something worth doing quickly.
- **Memory Second** — keep the experience without getting in the way of discovery.
- **User Owned** — memories belong to the user, not to a relationship.
- **No Relationship KPI** — myDate does not score, rank, or judge a relationship.

## Core Flow

```text
Discover Date Idea
↓
Let's do it
↓
Adventure
↓
Adventure Complete
↓
Memory Prompt
↓
I got it / Skip
↓
Experience Rating
↓
✨ Memory Reward
↓
+1 Memory
↓
Memory saved
```

A completed Adventure creates a Memory.

Completing the Memory Prompt is optional:

```text
I got it
→ memoryPromptCompleted = true

Skip
→ Memory is still saved
```

Skipping a Memory Prompt never invalidates the experience.

## Memory Prompt

myDate does not upload, access, or store user photos.

Photos stay in the user's own phone gallery. myDate only provides a small photography prompt connected to the current activity.

The photo does not need to include faces or both people.

Examples:

- Picnic: Photograph your favorite shade of green you saw today.
- Sunset: Don't photograph the sun. Photograph something touched by the sunset.
- Arcade: Photograph something that feels like today's trophy.
- Bookstore: Photograph the book the other person spent the longest looking at.
- Night Walk: Photograph something you probably would not have noticed if you were walking alone.
- Record Store: Photograph two records that probably would never have appeared in the same photo otherwise.

The goal is not to create a standard couple photo. It is to leave a visual anchor that helps the future you remember the day.

## Experience Rating

Rating is not about judging the other person.

It records how the experience felt to the user, for example:

- How much fun did you have?
- How comfortable did today feel?
- Would you do something like this again?

## V2 Features

- Mobile First UI
- Random Date Ideas
- Category Filtering
- Date Cards
- Adventure Flow
- Memory Prompt
- `I got it` / `Skip`
- Experience Rating
- `+1 Memory`
- Memories History
- localStorage persistence
- Chinese / Japanese / English
- Champagne-gold Memory Reward Animation

## Tech Stack

```text
Next.js 14
TypeScript
React
App Router
localStorage
Mobile First Responsive Design
Vercel
```

V2 intentionally does not require:

```text
Backend
Database
Authentication
Cloud Storage
AI API
```

## Not in V2

- User Accounts
- Couple Accounts
- Real-time Pair Sync
- Photo Upload / Cloud Photo Storage
- GPS / Maps
- Venue Booking
- AI Personalization
- Solo Mode
- Group Mode
- Chat
- Relationship Score
- Compatibility Score
