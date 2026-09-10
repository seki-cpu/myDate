# myDate

> **This project is developed entirely through AI agent collaboration.**  
> From finalized product design to the lightweight V1, the total implementation effort was approximately **8 working hours**.
>
> 本项目由 **AI Agent 全流程协作开发**。  
> 从产品设计确定到轻量版 V1，整体开发投入约 **8 个工时**。
>
> 本プロジェクトは **AI Agent のみを用いた協調開発**によって制作されています。  
> プロダクト設計の確定から軽量版 V1 まで、開発工数は約 **8時間** です。

---

# 中文

## 关于 myDate V2

**myDate** 是一个 Mobile First 的轻量约会灵感 Web App。

它解决的问题很简单：

> 两个人见面以后，“接下来去哪？”、“今天玩什么？”往往比想象中更麻烦。

myDate 希望用户打开手机后，在很短的时间内找到一个真正愿意去做的活动。

V2 的产品方向从 V1 的关系成长机制改为 **Memory First**。

核心理念：

> **人会改变，关系会改变，但经历始终属于你。**
>
> **People may change. The memories are still yours.**

用户本人始终是 myDate 的永久主体。约会对象可能改变，但用户经历过的事情仍然属于自己。

因此，V2 不再使用 Egg、XP、孵化或关系进度机制，而是把每一次完成的 Adventure 记录为一个 **Memory**。

---

## 核心原则

### Activity First

最重要的事情仍然是快速找到一个想做的活动。

### Memory Second

Memory 是完成活动后的正反馈与留存层，不应该阻碍活动发现。

### User Owned

Memory 属于用户本人，而不是某一段关系。

### No Relationship KPI

myDate 不评价一段关系是否“成功”，也不把亲密关系做成等级或分数。

---

## V2 核心流程

```text
Open myDate
↓
Discover / Random Date Idea
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

### 重要规则

**完成 Adventure 就会创建一个 Memory。**

Memory Prompt 是可选的。

```text
I got it
→ memoryPromptCompleted = true

Skip
→ Memory 仍然会被保存
```

用户不会因为没有拍照或跳过 Memory Prompt 而失去这段经历。

---

## Memory Prompt

myDate 不上传、不读取，也不保存用户照片。

照片仍然保存在用户自己的手机相册中。

myDate 只负责给出一个和当前活动有关的拍摄灵感，帮助用户给这一天留下一个视觉记忆锚点。

照片不需要露脸，也不需要两个人同框。

例如：

- 野餐：拍下今天你最喜欢的一抹绿色。
- 日落：不拍太阳，拍一件被夕阳照亮的东西。
- 电玩城：拍下今天最像“战利品”的东西。
- 书店：拍下对方拿起来看了最久的一本书。
- 夜间散步：拍下一个如果今天独自出来，可能不会注意到的东西。
- 唱片店：拍下两张本来可能永远不会出现在同一张照片里的唱片。

Memory Prompt 的目标不是制造标准情侣照，而是帮助未来的自己重新想起这一天。

---

## 正反馈机制

V2 删除 XP 与 Egg Progress。

完成一次 Adventure 后，用户获得：

```text
+1 Memory
```

现有浅黄色 / 香槟金星星动画被重新定义为 **Memory Reward Animation**。

```text
Memory completed
↓
Gold stars appear
↓
Stars travel toward Memories
↓
+1
↓
Memory collected ✦
```

它奖励的是“你真的出去经历了一件事情”，而不是关系进度。

---

## Experience Rating

Rating 不用于评价约会对象。

它只记录：

> 这次体验对我来说怎么样？

V2 可以保留：

- How much fun did you have?
- How comfortable did today feel?
- Would you do something like this again?

这些数据只属于用户自己的体验记录，并可以在未来用于改善活动推荐。

---

## V2 功能

- Mobile First UI
- Random Date Ideas
- Activity 分类筛选
- Date Cards
- Adventure 状态
- Adventure Complete
- Memory Prompt
- `I got it` / `Skip`
- Experience Rating
- `+1 Memory` 正反馈
- Memories 历史记录
- localStorage 本地持久化
- 中文 / 日本語 / English 三语言
- 淡金色 Memory Reward Animation

---

## V2 删除的 V1 功能

- Egg system
- Egg customization
- Egg page
- Egg progress
- Hatch system
- XP system
- XP settlement
- XP delta badge
- relationship progression
- love progression
- pet naming

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

V2 暂时不使用：

```text
Backend
Database
Authentication
Cloud Storage
AI API
```

---

## V2 暂不实现

- 用户注册
- Couple Account
- 双人实时同步
- 图片上传
- 图片云存储
- GPS
- 地图
- 商家预约
- AI 个性推荐
- Solo Mode
- Group Mode
- Chat
- Push Notification
- Relationship Score
- Compatibility Score

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

- Integration Bugs
- TypeScript / Runtime Errors
- Hydration
- localStorage
- State Recovery
- Build Failures

### QA & Release Engineer

负责：

- Regression Testing
- Mobile Viewport Testing
- Production Build Verification
- localStorage Testing
- Release Verification
- Deployment
- Production Smoke Testing

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
    └── release/v2
```

开发流程：

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
release/v2
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

# 日本語

## myDate V2 について

**myDate** は Mobile First の軽量デートアイデア Web App です。

解決したい問題はシンプルです。

> 二人で会ったあと、「次はどこに行く？」「何をする？」を決めるのは意外と面倒。

V2 では、V1 の関係性進行システムを廃止し、プロダクトの中心を **Memory First** に変更しました。

コアメッセージ：

> **人は変わる。関係も変わる。それでも、その経験はあなたのもの。**
>
> **People may change. The memories are still yours.**

myDate の主体は常にユーザー本人です。

デート相手や関係性が変わっても、その日に経験したことはユーザー自身の Memory として残ります。

---

## Core Flow

```text
Open myDate
↓
Discover / Random Date Idea
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

Memory Prompt は任意です。

Skip しても、その体験が Memory にならないことはありません。

---

## Memory Prompt

myDate は写真をアップロード、閲覧、保存しません。

写真はユーザー自身のスマートフォンに残ります。

myDate が提供するのは、その日の体験に関連した小さな撮影テーマです。

顔や二人のツーショットは必要ありません。

例えば：

- ピクニック：今日見つけた、一番好きな「緑」を撮る。
- 夕日：太陽ではなく、夕日に照らされた何かを撮る。
- ゲームセンター：今日いちばん「戦利品らしい」と感じたものを撮る。
- 書店：相手が一番長く手に取っていた本を撮る。
- 夜の散歩：一人なら気づかなかったかもしれないものを撮る。

目的は「カップルらしい写真」を作ることではなく、未来の自分がその日を思い出すための視覚的なきっかけを残すことです。

---

## Positive Feedback

V2 では XP と Egg Progress を廃止します。

1回の Adventure 完了につき：

```text
+1 Memory
```

淡い黄色 / シャンパンゴールドの星アニメーションは Memory Reward として再利用します。

---

## Experience Rating

Rating は相手を評価するための機能ではありません。

記録するのは：

> この体験は自分にとってどうだったか？

例：

- How much fun did you have?
- How comfortable did today feel?
- Would you do something like this again?

---

## V2 Features

- Mobile First UI
- Random Date Ideas
- Category Filtering
- Date Cards
- Adventure Flow
- Adventure Complete
- Memory Prompt
- `I got it` / `Skip`
- Experience Rating
- `+1 Memory`
- Memories History
- localStorage
- 中国語 / 日本語 / 英語
- Champagne Gold Memory Reward Animation

---

## V2 で廃止する V1 機能

- Egg System
- Egg Customization
- Egg Page
- Egg Progress
- Hatch System
- XP System
- Relationship Progression
- Love Progression

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

V2 では以下を使用しません：

```text
Backend
Database
Authentication
Cloud Storage
AI API
```

---

## V2 ではまだ実装しないもの

- User Registration
- Couple Account
- Real-time Sync
- Photo Upload
- Cloud Photo Storage
- GPS
- Maps
- Venue Booking
- AI Personalization
- Solo Mode
- Group Mode
- Chat
- Relationship Score

---

# English

## About myDate V2

**myDate** is a lightweight, Mobile First dating activity web app.

It solves a simple problem:

> Two people are already together, but deciding where to go or what to do next can still be surprisingly annoying.

V2 changes the product from relationship progression to **Memory First**.

Core statement:

> **People may change. The memories are still yours.**

The user is the permanent subject of myDate.

Dating partners and relationships may change over time, but the user's experiences remain their own.

Because of this, V2 removes Egg, XP, hatching, and relationship progression entirely.

Every completed Adventure becomes a user-owned **Memory**.

---

## Core Principles

### Activity First

Users should be able to quickly find something worth doing.

### Memory Second

Memory is the retention and positive-feedback layer after the experience.

### User Owned

Memories belong to the user, not to a relationship.

### No Relationship KPI

myDate does not judge whether a relationship is successful, healthy, serious, or progressing.

---

## Core Flow

```text
Open myDate
↓
Discover / Random Date Idea
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

Completing the Memory Prompt is optional.

```text
I got it
→ memoryPromptCompleted = true

Skip
→ Memory is still saved
```

Skipping a photo prompt must never erase or invalidate the experience.

---

## Memory Prompt

myDate does not upload, access, or store user photos.

Photos stay in the user's own phone gallery.

myDate only provides a small photography prompt connected to the current activity.

The photo does not need to include faces or both people.

Examples:

- Picnic: Photograph your favorite shade of green you saw today.
- Sunset: Don't photograph the sun. Photograph something touched by the sunset.
- Arcade: Photograph something that feels like today's trophy.
- Bookstore: Photograph the book the other person spent the longest looking at.
- Night Walk: Photograph something you probably would not have noticed if you were walking alone.
- Record Store: Photograph two records that probably would never have appeared in the same photo otherwise.

The goal is not to create a standard couple photo.

The goal is to create a visual memory anchor.

---

## Positive Feedback

V2 removes XP and Egg progression.

Each completed Adventure adds:

```text
+1 Memory
```

The existing pale-yellow / champagne-gold star effect is repurposed as the **Memory Reward Animation**.

```text
Adventure completed
↓
Gold stars appear
↓
Stars travel toward Memories
↓
+1
↓
Memory collected ✦
```

The reward celebrates the fact that the user went out and experienced something, not the progress of a relationship.

---

## Experience Rating

Rating is not used to score the dating partner.

It records:

> How did this experience feel to me?

Examples:

- How much fun did you have?
- How comfortable did today feel?
- Would you do something like this again?

These signals may later help myDate understand what kinds of experiences the user enjoys.

---

## V2 Features

- Mobile First UI
- Random Date Ideas
- Category Filtering
- Date Cards
- Adventure State
- Adventure Completion
- Memory Prompts
- `I got it` / `Skip`
- Experience Rating
- `+1 Memory` positive feedback
- Memories History
- localStorage persistence
- Chinese / Japanese / English localization
- Soft champagne-gold Memory Reward Animation

---

## Removed from V1

V2 removes:

- Egg system
- Egg customization
- Egg page
- Egg progress
- Hatch system
- XP system
- XP settlement
- XP delta badge
- relationship progression
- love progression
- pet naming

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

V2 intentionally does not use:

```text
Backend
Database
Authentication
Cloud Storage
AI API
```

---

## Not Included in V2

- User registration
- Couple accounts
- Real-time synchronization
- Photo upload
- Cloud photo storage
- GPS
- Maps
- Venue booking
- AI personalization
- Solo Mode
- Group Mode
- Chat
- Push notifications
- Relationship Score
- Compatibility Score

---

## AI Agent Development

myDate is developed through a multi-agent AI workflow.

Main roles:

- **Lead Architect** — architecture, contracts, code review, merge decisions, release approval
- **Mobile UI Developer** — pages, components, interaction, responsive UI, animations
- **Date Content Developer** — Date Ideas, categories, little missions, Memory Prompts, localization
- **Troubleshooting Engineer** — integration bugs, state, localStorage, runtime and build issues
- **QA & Release Engineer** — regression testing, mobile testing, build verification, deployment and smoke testing

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
    └── release/v2
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
release/v2
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

## Development Note

This repository is also an experiment in **AI-agent-based software development**.

Product design, architecture, implementation, content development, code review, troubleshooting, QA, and release preparation are handled through specialized AI agent roles.

Approximate effort from finalized product design to the lightweight V1:

**~8 working hours**
