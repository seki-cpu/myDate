# myDate

> **This project was developed entirely through AI agent collaboration.**
>
> From finalized product design to a working lightweight V1, the total implementation effort was approximately **8 working hours**.
>
> 本项目由 **AI Agent 全流程协作开发**。
>
> 从产品设计确定到轻量版 V1 基本完成，整体开发投入约 **8 个工时**。
>
> 本プロジェクトは **AI Agent のみを用いた協調開発**によって制作されています。
>
> プロダクト設計の確定から軽量版 V1 の完成まで、開発工数は約 **8時間** です。

---

# 中文

## 关于 myDate

**myDate** 是一个 Mobile First 的轻量约会灵感 Web App。

它想解决一个非常简单的问题：

> 两个人见面以后，“接下来去哪？”、“今天玩什么？”往往比想象中更麻烦。

myDate 不希望成为复杂的约会规划工具。

它希望用户打开手机后，在很短的时间内找到一个：

> “这个好像可以。”

的活动。

用户可以随机抽取 Date Idea，完成约会后获得一个专属的 Memory Prompt，并通过 XP 让一颗小蛋慢慢成长。

myDate 的核心原则是：

> **Activity First, Egg Second.**

活动发现永远是第一优先级。

蛋只是用来增加一点记忆感、期待感和游戏感。

---

## 核心流程

```text
打开 myDate
↓
随机一个 Date Idea
↓
选择「就这个」
↓
实际去约会
↓
完成 Adventure
↓
获得 Memory Prompt
↓
用自己的手机拍下一张照片
↓
I got it / Skip
↓
完成轻量评价
↓
获得 XP
↓
Egg Progress 增长
```

---

## Memory Prompt

myDate 不上传、不读取，也不保存用户照片。

照片仍然保存在用户自己的手机相册里。

myDate 只负责给出一个和当前活动相关的拍摄灵感。

照片不需要露脸。

也不需要两个人同框。

它可以是：

- 一只手
- 两双鞋
- 一束光
- 一张唱片
- 一张车票
- 一杯饮料
- 一片绿色
- 两个人的影子
- 一件共同完成的作品
- 某个以后看到就会想起今天的小细节

例如：

### Picnic

> 拍下今天你最喜欢的一抹绿色。

### Sunset

> 不拍太阳，拍一件被夕阳照亮的东西。

### Arcade

> 拍下今天最像“战利品”的东西。

### Bookstore

> 拍下对方拿起来看了最久的一本书。

### Night Walk

> 拍下一个如果今天独自出来，可能不会注意到的东西。

Memory Prompt 的目标不是制造标准情侣照。

而是留下一个未来可以重新唤起记忆的视觉锚点。

---

## V1 功能

- Mobile First UI
- 随机 Date Idea
- Activity 分类筛选
- Date Card
- Adventure 状态
- Adventure Complete
- Memory Prompt
- `I got it` / `Skip`
- 私密轻量评价
- XP 结算
- Egg Progress
- Egg 颜色调整
- Memories 历史
- localStorage 本地持久化
- 中文 / 日本語 / English 三语言
- 浅黄色 / 香槟金 XP 星星动画

---

## XP 系统

当前 V1 XP 规则：

```text
完成 Adventure        +20 XP
完成 Memory Prompt     +5 XP
完成 Rating            +5 XP
```

一次完整约会最多获得：

```text
30 XP
```

XP 结算必须是幂等的。

以下操作不能造成重复获得 XP：

- 页面刷新
- Back Navigation
- Forward Navigation
- 重复点击
- 重新打开 Complete 页面
- 重放动画

奖励动画只是表现层。

XP 状态本身不能依赖动画是否成功播放。

---

## Reward Animation

当用户在 Memory Prompt 点击：

```text
I got it
```

之后：

```text
Reward Modal
↓
OK
↓
浅黄色 / 香槟金小星星出现
↓
星星飞向 Egg mini icon
↓
Egg 轻微发光 / bump
↓
继续后续流程
```

视觉原则：

- Light
- Soft
- Warm
- Minimal
- Champagne Gold
- 不做高饱和黄色
- 不做大型粒子爆炸
- 不做重手游感特效

---

## Egg

Egg 不是 myDate 的主要功能。

用户即使完全不关心 Egg，也应该能够正常使用 Date Ideas。

V1 中 Egg 只支持简单的颜色调整。

正常情况下，大约完成：

```text
3–5 次完整约会
```

以后 Egg 会逐渐孵化。

myDate 不设计：

- Love Level
- Relationship Level
- Compatibility Score
- 情侣排行榜
- 连续签到
- 感情冷淡惩罚
- Pet Death
- Breakup Failure State

Egg 的成长只代表：

> 两个人一起经历过更多事情。

---

## 产品原则

### Activity First

用户打开 myDate 后，应当能够快速找到一个活动。

Egg 不能妨碍这个流程。

### Mobile First

主要使用场景包括：

- 地铁途中
- 吃完饭后
- 咖啡店里
- 两个人临时讨论下一站
- 约会结束回家途中

### Low Pressure

不把恋爱关系做成 KPI。

### Memory Oriented

重点不是证明关系。

而是记录经历。

### Optional Pet

蛋是可选的游戏层，而不是任务系统。

### Minimal

V1 优先验证核心体验，不追求复杂功能。

---

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

V1 暂时不使用：

```text
Backend
Database
Authentication
Cloud Storage
AI API
```

---

## AI Agent 开发模式

myDate 使用多个专门角色的 AI Agent 协作开发。

### Lead Architect

负责：

- Architecture
- Shared Contract
- Type Definition
- Code Review
- Scope Control
- Merge Decision
- Release Approval

### Mobile UI Developer

负责：

- Mobile UI
- Pages
- Components
- Interaction
- Animation
- Localization UI

### Date Content Developer

负责：

- Date Ideas
- Categories
- Little Missions
- Memory Prompts
- 中文 / 日本語 / English 内容

### Troubleshooting Engineer

负责：

- Integration Bug
- TypeScript Error
- Runtime Error
- Hydration
- localStorage
- State Recovery
- Build Failure

### QA & Release Engineer

负责：

- Regression Testing
- Mobile Viewport Testing
- Production Build
- localStorage Testing
- Release Verification
- Deployment
- Production Smoke Test

---

## Branch Strategy

```text
master
│
└── develop
    │
    ├── feature/ui-mobile
    ├── feature/date-content
    ├── fix/integration-troubleshooting
    └── release/v1
```

基本开发流程：

```text
Product Change
↓
Architect
↓
Content
↓
UI
↓
Architect Review
↓
develop
↓
Troubleshooting（必要时）
↓
release/v1
↓
QA
↓
Architect Approval
↓
master
↓
Production
```

`master` 只保存正式发布版本。

---

## V1 暂不实现

- 用户注册
- Couple Account
- 双人实时同步
- 图片上传
- 图片云存储
- GPS
- 地图
- 商家预约
- AI 个性推荐
- Chat
- Push Notification
- 情侣排行榜
- Love Score
- Compatibility Score
- 连续签到
- 复杂宠物养成
- 宠物死亡

---

## V1 验证目标

myDate V1 主要验证三个问题：

1. 当用户不知道约会做什么时，会不会打开 myDate？
2. Random Date Card 能不能让用户快速找到一个“这个可以”的活动？
3. 完成约会后，用户会不会回来完成 Memory Prompt / Rating，并期待 Egg 的下一次变化？

---

# 日本語

## myDate について

**myDate** は Mobile First の軽量デートアイデア Web App です。

解決したい問題はとてもシンプルです。

> 二人で会ったあと、「次はどこに行く？」「何をする？」を決めるのは意外と面倒。

myDate は複雑なデート計画ツールを目指していません。

スマートフォンを開いて短時間で：

> 「これ、やってみよう。」

と思えるアクティビティを見つけることを目的としています。

デート終了後には、その体験に合わせた Memory Prompt が表示されます。

さらに XP によって小さな Egg が少しずつ成長します。

コア原則は：

> **Activity First, Egg Second.**

最も重要なのはアクティビティを見つけることです。

Egg は思い出、期待感、ゲーム感を少し加えるためのサブ要素です。

---

## 基本フロー

```text
myDate を開く
↓
Date Idea をランダムに引く
↓
「これにする」
↓
実際にデートする
↓
Adventure Complete
↓
Memory Prompt
↓
自分のスマートフォンで写真を撮る
↓
I got it / Skip
↓
簡単な Rating
↓
XP 獲得
↓
Egg Progress
```

---

## Memory Prompt

myDate はユーザーの写真をアップロード、閲覧、保存しません。

写真はユーザー自身のスマートフォンの写真アプリに残ります。

myDate が提供するのは、その日の体験に合わせた小さな撮影テーマだけです。

写真に顔が写っている必要はありません。

二人が同じ写真に写る必要もありません。

例えば：

- 手
- 靴
- 光
- レコード
- チケット
- 飲み物
- 景色
- 影
- 二人で作ったもの
- 今日を思い出せる小さなディテール

### Picnic

> 今日見つけた、一番好きな「緑」を撮ってみよう。

### Sunset

> 太陽ではなく、夕日に照らされた何かを撮ってみよう。

### Arcade

> 今日いちばん「戦利品らしい」と感じたものを撮ろう。

### Bookstore

> 相手が一番長く手に取っていた本を撮ってみよう。

### Night Walk

> 一人で歩いていたら気づかなかったかもしれないものを撮ろう。

---

## V1 機能

- Mobile First UI
- Random Date Idea
- Category Filter
- Date Card
- Adventure State
- Adventure Complete
- Memory Prompt
- `I got it` / `Skip`
- 非公開の簡易 Rating
- XP Settlement
- Egg Progress
- Egg Color Customization
- Memories
- localStorage
- 中国語 / 日本語 / 英語対応
- 淡い黄色 / シャンパンゴールドの XP スターアニメーション

---

## XP

```text
Adventure 完了        +20 XP
Memory Prompt 完了    +5 XP
Rating 完了           +5 XP
```

1回の完全な体験：

```text
最大 30 XP
```

XP は重複加算されません。

リロード、戻る操作、連打、再表示などによって同じ XP が二重に加算されないようにします。

---

## Egg

Egg は myDate のメイン機能ではありません。

Egg に興味がないユーザーでも Date Idea 機能を問題なく利用できます。

V1 では Egg の色のみ変更可能です。

通常は約：

```text
3〜5回のデート
```

で孵化する想定です。

myDate では以下を採用しません：

- Love Level
- Relationship Score
- Compatibility Score
- Streak
- Relationship Penalty
- Pet Death
- Breakup Failure State

Egg の成長が意味するのは：

> 二人で経験したことが増えた。

それだけです。

---

## 技術スタック

```text
Next.js 14
TypeScript
React
App Router
localStorage
Mobile First Responsive Design
Vercel
```

V1 では以下を使用しません：

```text
Backend
Database
Authentication
Cloud Storage
AI API
```

---

## AI Agent 開発体制

myDate は複数の専門 AI Agent による分業開発を行っています。

### Lead Architect

- Architecture
- Contract
- Type Definition
- Code Review
- Scope Control
- Merge Decision
- Release Approval

### Mobile UI Developer

- Mobile UI
- Pages
- Components
- Interaction
- Animation
- Localization UI

### Date Content Developer

- Date Ideas
- Categories
- Little Missions
- Memory Prompts
- 中国語 / 日本語 / 英語コンテンツ

### Troubleshooting Engineer

- Integration Bug
- TypeScript Error
- Runtime Error
- Hydration
- localStorage
- State Recovery
- Build Failure

### QA & Release Engineer

- Regression Testing
- Mobile Viewport Testing
- Production Build
- localStorage Testing
- Release Verification
- Deployment
- Production Smoke Test

---

## Branch Strategy

```text
master
│
└── develop
    │
    ├── feature/ui-mobile
    ├── feature/date-content
    ├── fix/integration-troubleshooting
    └── release/v1
```

開発フロー：

```text
Product Change
↓
Architect
↓
Content
↓
UI
↓
Architect Review
↓
develop
↓
Troubleshooting（必要な場合）
↓
release/v1
↓
QA
↓
Architect Approval
↓
master
↓
Production
```

---

## V1 では実装しないもの

- User Registration
- Couple Account
- Real-time Sync
- Photo Upload
- Cloud Photo Storage
- GPS
- Maps
- Venue Booking
- AI Personalization
- Chat
- Push Notification
- Ranking
- Love Score
- Compatibility Score
- Streak
- Complex Pet System
- Pet Death

---

## V1 の検証目標

1. デート内容に困ったとき、ユーザーは myDate を開くか？
2. Random Date Card によって「これならやってみたい」と思えるか？
3. デート終了後に戻って Memory Prompt や Rating を完了し、Egg の変化を楽しめるか？

---

# English

## About myDate

**myDate** is a lightweight, Mobile First dating activity web app.

It solves a very simple problem:

> Two people are already together, but deciding where to go or what to do next can still be surprisingly annoying.

myDate is not designed to be a complex date planning system.

The goal is to let users open their phone and quickly find an activity that makes them think:

> “That sounds fun.”

Users can randomly discover a Date Idea, complete the activity, receive a dedicated Memory Prompt, and gradually grow an Egg through XP.

The core principle is:

> **Activity First, Egg Second.**

Activity discovery is always the primary experience.

The Egg exists only to add a small sense of memory, anticipation, and playfulness.

---

## Core Flow

```text
Open myDate
↓
Randomize a Date Idea
↓
Choose "Let's do it"
↓
Go on the date
↓
Complete the Adventure
↓
Receive a Memory Prompt
↓
Take a photo with your own phone
↓
I got it / Skip
↓
Complete a lightweight Rating
↓
Earn XP
↓
Grow the Egg
```

---

## Memory Prompt

myDate does not upload, access, or store user photos.

Photos remain in the user's own phone gallery.

myDate only provides a small photography prompt connected to the current activity.

The photo does not need to include faces.

It does not need to include both people.

It may be:

- a hand
- shoes
- light
- a record
- a ticket
- a drink
- a shadow
- food
- something created together
- scenery
- any small detail that may bring the memory back later

### Picnic

> Photograph your favorite shade of green you saw today.

### Sunset

> Don't photograph the sun. Photograph something touched by the sunset.

### Arcade

> Photograph something that feels like today's trophy.

### Bookstore

> Photograph the book the other person spent the longest looking at.

### Night Walk

> Photograph something you probably would not have noticed if you were walking alone.

The goal is not to create a standard couple photo.

The goal is to create a visual memory anchor.

---

## V1 Features

- Mobile First UI
- Random Date Ideas
- Category filtering
- Date Cards
- Adventure state
- Adventure completion
- Memory Prompts
- `I got it` / `Skip`
- Private lightweight Rating
- XP settlement
- Egg progression
- Egg color customization
- Memories
- localStorage persistence
- Chinese / Japanese / English localization
- Soft pale-yellow / champagne-gold XP star animation

---

## XP System

```text
Complete Adventure       +20 XP
Complete Memory Prompt   +5 XP
Complete Rating          +5 XP
```

Maximum XP per complete experience:

```text
30 XP
```

XP settlement is idempotent.

Refreshing, navigating back, reopening a page, replaying an animation, or repeatedly clicking an action must never grant duplicate XP.

Reward animations are presentation-only.

Business state must never depend on animation completion.

---

## Reward Animation

After the user taps:

```text
I got it
```

the reward sequence is:

```text
Reward Modal
↓
OK
↓
Small pale-yellow / champagne-gold stars appear
↓
Stars travel toward the Egg mini icon
↓
Egg glows / bumps
↓
Continue
```

Visual direction:

- Soft
- Light
- Warm
- Minimal
- Champagne Gold
- No saturated yellow
- No large particle explosion
- No heavy mobile-game visual noise

---

## Egg System

The Egg is not the primary feature of myDate.

Users who do not care about the Egg should still be able to use Date Ideas normally.

V1 only allows simple Egg color customization.

With normal usage, the Egg is expected to hatch after approximately:

```text
3–5 dates
```

myDate intentionally does not include:

- Love Level
- Relationship Level
- Compatibility Score
- Relationship Ranking
- Streaks
- Relationship penalties
- Pet death
- Breakup failure states

Egg progression only means:

> You have experienced more things together.

---

## Product Principles

### Activity First

Users should be able to find something to do quickly.

### Mobile First

The product is primarily designed for short moments during real dates.

### Low Pressure

Relationships are not turned into KPIs.

### Memory Oriented

The goal is to preserve experiences rather than prove the relationship.

### Optional Pet

The Egg is an optional game layer, not a responsibility.

### Minimal

V1 prioritizes validating the core experience over building a large feature set.

---

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

V1 intentionally does not use:

```text
Backend
Database
Authentication
Cloud Storage
AI API
```

---

## AI Agent Development

myDate is developed through a multi-agent AI workflow.

### Lead Architect

Responsible for:

- Architecture
- Shared contracts
- Type definitions
- Code review
- Scope control
- Merge decisions
- Release approval

### Mobile UI Developer

Responsible for:

- Mobile UI
- Pages
- Components
- Interaction
- Animation
- Localization UI

### Date Content Developer

Responsible for:

- Date Ideas
- Categories
- Little Missions
- Memory Prompts
- Chinese / Japanese / English content

### Troubleshooting Engineer

Responsible for:

- Integration bugs
- TypeScript errors
- Runtime errors
- Hydration issues
- localStorage
- State recovery
- Build failures

### QA & Release Engineer

Responsible for:

- Regression testing
- Mobile viewport testing
- Production build verification
- localStorage testing
- Release verification
- Deployment
- Production smoke testing

---

## Branch Strategy

```text
master
│
└── develop
    │
    ├── feature/ui-mobile
    ├── feature/date-content
    ├── fix/integration-troubleshooting
    └── release/v1
```

Development flow:

```text
Product Change
↓
Architect
↓
Content
↓
UI
↓
Architect Review
↓
develop
↓
Troubleshooting if required
↓
release/v1
↓
QA
↓
Architect Approval
↓
master
↓
Production
```

`master` contains production-ready releases only.

---

## Not Included in V1

- User registration
- Couple accounts
- Real-time synchronization
- Photo upload
- Cloud photo storage
- GPS
- Maps
- Venue booking
- AI personalization
- Chat
- Push notifications
- Relationship ranking
- Love score
- Compatibility score
- Streaks
- Complex pet simulation
- Pet death

---

## V1 Validation Goals

myDate V1 focuses on three questions:

1. Will users open myDate when they do not know what to do on a date?
2. Can random Date Cards help users quickly reach a “this sounds fun” decision?
3. After the date, will users return to complete the Memory Prompt / Rating flow and feel curious about the Egg's progression?

---

## Development Note

This repository is also an experiment in **AI-agent-based software development**.

Product design, architecture, implementation, content development, code review, troubleshooting, QA, and release preparation are handled through specialized AI agent roles.

Approximate development effort from finalized product design to the lightweight V1:

**~8 working hours**
