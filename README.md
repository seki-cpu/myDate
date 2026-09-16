# myDate

> **People may change. The memories are still yours.**

**myDate** is a lightweight date-idea and memory-journal web app.

It helps people quickly find something worth doing, then keep the experience as a private Memory with ratings, moods, notes, and photos.

From finalized product design to the lightweight V1, the initial implementation took approximately **8 working hours**.

- V3 setup: [docs/v3-setup.md](docs/v3-setup.md)
- Memory Journal design: [docs/myDate_V3_Memory_Journal.md](docs/myDate_V3_Memory_Journal.md)

---

# 中文

## myDate 是什么

myDate 最初来自一个很简单的问题：

> 两个人已经见面了，但“接下来去哪？”、“今天做什么？”还是经常很难决定。

因此，myDate 的第一层价值始终是 **Activity First**：快速找到一个真正愿意去做的活动。

但一次约会结束以后，真正留下来的不是“完成了一张卡”，而是那天发生过的事情。

V3 因此进一步变成 **Memory Journal**：

> **人会改变，关系会改变，但经历始终属于你。**

## 核心流程

```text
Discover
↓
Choose an Activity
↓
Adventure
↓
Complete
↓
Memory Prompt
↓
Experience Rating
↓
✨ +1 Memory
↓
Memory Journal
```

完成 Adventure 后就会生成一个 Memory。

Memory Prompt 可以完成，也可以 Skip；跳过不会让这段经历消失。

## Memory Journal

每一段 Memory 都可以继续补充：

- 经历日期
- Experience Rating
- 自定义 Mood
- Journal Note
- 最多 **9 张私人照片**
- Memory Prompt 状态

照片、Mood 和 Note 都是可选的。

用户可以在之后重新打开 Memory，继续查看、编辑或补充内容。

## Past Memory

myDate 不要求“只有安装以后的人生才算数”。

用户可以直接添加以前已经发生过的经历：

```text
Memories
↓
Add Memory
↓
Something we already did
```

过去的经历可以使用自由标题、日期、评分、Mood、Note 和照片保存为 Memory。

如果 Memory 来自已有 myDate Activity，则该 Activity 会保留历史上的 **做过 / Tried** 状态。

## 隐私与账号

V3 的 Memory Journal 使用账号来区分私人数据。

Memory、Journal Note 和照片默认都是私有的。

当前版本不包含公开主页、社交 Feed、点赞、评论或公开相册。

账号存在的目的首先是：

> **让属于你的 Memories 只属于你的空间。**

## 当前功能

- Date Idea Discovery
- Random / Category Discovery
- Adventure Flow
- Memory Prompt
- Experience Rating
- `+1 Memory` Reward
- Memory Journal
- 自定义 Mood
- Journal Note
- 每个 Memory 最多 9 张照片
- 私有照片存储
- Past Memory / 自由记录过去经历
- Historical `Tried` 状态
- Discovery Cycle
- 中文 / 日本語 / English
- Mobile + Desktop Responsive UI
- Supabase Authentication / Database / Storage

## 技术栈

```text
Next.js 15
React 19
TypeScript
App Router
Supabase Auth
Supabase PostgreSQL
Supabase Storage
Row Level Security
Tailwind CSS 4
Vercel
pnpm
```

客户端仍保留 localStorage 用于语言、筛选、临时 Adventure 状态等轻量状态；Memory Journal 的长期数据以云端为准。

## 产品边界

当前版本刻意不做：

- Relationship Score
- Compatibility Score
- Couple Progress / XP
- 社交 Feed
- Likes / Comments / Followers
- 公开 Memories
- AI 自动写日记
- AI 关系分析
- Photo Handoff / 跨设备照片传送

myDate 目前仍然是一个小而私人的产品实验：先让“发现活动 → 真正去做 → 留下记忆”这个循环足够自然。

## PWA

PWA / 安装到手机主屏幕与桌面的能力正在作为下一步增强。

目标是让 myDate 保持 Web App 的开发与发布方式，同时在支持的浏览器上以更接近 App 的方式启动。

---

# 日本語

## myDate について

myDate は、デート中の小さな迷いから始まった Web App です。

> 「次はどこに行く？」「今日は何をする？」を決めるのは、意外と面倒。

そのため myDate の第一の役割は **Activity First**。

短い時間で「これならやってみたい」と思えるアイデアを見つけることです。

V3 では、その後に残る体験を **Memory Journal** として保存できるようになりました。

> **人は変わる。関係も変わる。それでも、その経験はあなたのもの。**

## Core Flow

```text
Discover
↓
Choose an Activity
↓
Adventure
↓
Complete
↓
Memory Prompt
↓
Experience Rating
↓
✨ +1 Memory
↓
Memory Journal
```

Adventure を完了すると Memory が作成されます。

Memory Prompt は任意で、Skip しても Memory は残ります。

## Memory Journal

Memory には以下を追加できます。

- 体験した日
- Experience Rating
- 自由な Mood
- Journal Note
- 最大 **9枚のプライベート写真**
- Memory Prompt の完了状態

写真・Mood・Note はすべて任意です。

Memory はあとから開き直して、閲覧・編集・追記できます。

## Past Memory

myDate を使い始める前の体験も記録できます。

```text
Memories
↓
Add Memory
↓
Something we already did
```

自由なタイトル、日付、Rating、Mood、Note、写真を使って過去の Memory を追加できます。

既存の myDate Activity と関連付けた場合、その Activity には履歴として **体験済み / Tried** が残ります。

## Privacy

V3 の Memory Journal はアカウントごとのプライベートデータとして保存されます。

Memory、Note、写真はデフォルトで非公開です。

現在は Public Profile、Social Feed、Like、Comment、公開アルバムを持ちません。

## Current Features

- Date Idea Discovery
- Random / Category Discovery
- Adventure Flow
- Memory Prompt
- Experience Rating
- `+1 Memory` Reward
- Memory Journal
- Custom Mood
- Journal Note
- 最大9枚の写真 / Memory
- Private Photo Storage
- Past Memory
- Historical `Tried`
- Discovery Cycle
- 中国語 / 日本語 / English
- Mobile + Desktop Responsive UI
- Supabase Authentication / Database / Storage

## Tech Stack

```text
Next.js 15
React 19
TypeScript
App Router
Supabase Auth
Supabase PostgreSQL
Supabase Storage
Row Level Security
Tailwind CSS 4
Vercel
pnpm
```

## Not in the current scope

- Relationship Score
- Compatibility Score
- Couple Progress / XP
- Social Feed
- Likes / Comments / Followers
- Public Memories
- AI-written journals
- AI relationship analysis
- Photo Handoff

## PWA

ホーム画面やデスクトップへインストールできる PWA 対応は、次の改善として進行中です。

---

# English

## About myDate

myDate started with a small but recurring dating problem:

> Two people are already together, but deciding what to do next can still be surprisingly annoying.

The first job of myDate is therefore **Activity First**: help people find something worth doing quickly.

V3 extends that idea into a private **Memory Journal**.

> **People may change. The memories are still yours.**

## Core Flow

```text
Discover
↓
Choose an Activity
↓
Adventure
↓
Complete
↓
Memory Prompt
↓
Experience Rating
↓
✨ +1 Memory
↓
Memory Journal
```

Completing an Adventure creates a Memory.

The Memory Prompt is optional. Skipping it never invalidates or removes the experience.

## Memory Journal

A Memory can include:

- experience date
- Experience Rating
- arbitrary Moods
- Journal Note
- up to **9 private photos**
- Memory Prompt completion state

Photos, moods, and notes are optional.

Users can reopen a Memory later to review, edit, or enrich it.

## Past Memories

Life does not start when someone installs myDate.

Users can directly record something that already happened:

```text
Memories
↓
Add Memory
↓
Something we already did
```

A past Memory can use a free-form title, date, rating, moods, note, and photos.

When a Memory is linked to an existing myDate Activity, that Activity keeps its historical **Tried** state.

## Privacy

V3 stores Memory Journal data under authenticated private accounts.

Memories, journal notes, and photos are private by default.

The current product has no public profiles, social feed, likes, comments, or public albums.

The account exists primarily to answer one question:

> **Who owns this private memory space?**

## Current Features

- Date Idea Discovery
- Random / Category Discovery
- Adventure Flow
- Memory Prompt
- Experience Rating
- `+1 Memory` Reward
- Memory Journal
- Custom Moods
- Journal Notes
- Up to 9 photos per Memory
- Private Photo Storage
- Past Memory entry
- Historical `Tried` state
- Discovery Cycle
- Chinese / Japanese / English
- Mobile + Desktop Responsive UI
- Supabase Authentication / Database / Storage

## Tech Stack

```text
Next.js 15
React 19
TypeScript
App Router
Supabase Auth
Supabase PostgreSQL
Supabase Storage
Row Level Security
Tailwind CSS 4
Vercel
pnpm
```

localStorage is still used for lightweight client state such as language, filters, and temporary Adventure state. Persistent Memory Journal data is cloud-backed.

## Intentionally Out of Scope

- Relationship Score
- Compatibility Score
- Couple Progress / XP
- Social Feed
- Likes / Comments / Followers
- Public Memories
- AI-written journals
- AI relationship analysis
- Photo Handoff / cross-device photo transfer

myDate remains intentionally small and private: the goal is to make the loop from **finding something → actually doing it → keeping the memory** feel natural.

## PWA

PWA installation for mobile home screens and desktop is the next product enhancement currently being prepared.
