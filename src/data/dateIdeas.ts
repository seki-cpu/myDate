import type { DateIdea } from "../types/domain";

/**
 * Canonical lightweight V1 date idea source.
 *
 * V1 intentionally ships the first eight fully localized cards.
 * Additional cards remain content backlog until they are migrated to this
 * same contract. UI must not maintain a second activity-copy catalog.
 */
export const dateIdeas: DateIdea[] = [
  {
    id: "sunset-walk",
    title: {
      zh: "沿着夕阳散步",
      en: "Sunset Walk",
      ja: "夕暮れ散歩",
    },
    description: {
      zh: "找一条风景舒服的路线，不设终点，只一起走到想停下来的时候。",
      en: "Pick a scenic route and walk without a destination. Stop whenever the moment feels right.",
      ja: "景色のいい道を、目的地を決めずに歩く。止まりたくなった場所が今日のゴール。",
    },
    categories: ["romantic"],
    cost: "free",
    duration: "medium",
    indoor: false,
    tags: ["outdoor", "relaxing", "walk"],
    photoPrompt: {
      zh: "拍一张两个人的鞋或影子同时入镜的照片。",
      en: "Take one photo with both of your shoes or shadows in the frame.",
      ja: "二人の靴か影が一緒に写る写真を一枚撮る。",
    },
  },
  {
    id: "one-canvas",
    title: {
      zh: "一起画一幅画",
      en: "One Canvas",
      ja: "二人で一枚の絵",
    },
    description: {
      zh: "不要各画各的。共享一张画布，轮流加入颜色、形状和只有你们懂的东西。",
      en: "Share one canvas and take turns adding colors, shapes, and little things only the two of you understand.",
      ja: "別々ではなく、一枚のキャンバスを共有。色や形、二人にしかわからないものを自由に足していく。",
    },
    categories: ["creative"],
    cost: "low",
    duration: "medium",
    indoor: true,
    tags: ["art", "collaboration", "playful"],
  },
  {
    id: "dance-night",
    title: {
      zh: "一起去跳舞",
      en: "Dance Night",
      ja: "一緒に踊る夜",
    },
    description: {
      zh: "找一家音乐合口味的地方。不玩游戏，不完成挑战，只跟着音乐一起跳。",
      en: "Find a place playing music you both like. No games, no challenges—just dance and enjoy the night.",
      ja: "二人とも好きな音楽が流れる場所へ。ゲームも課題もなし。ただ音楽に任せて踊る。",
    },
    categories: ["adventure"],
    cost: "medium",
    duration: "long",
    indoor: true,
    tags: ["night", "music", "active"],
  },
  {
    id: "convenience-store-picnic",
    title: {
      zh: "便利店野餐",
      en: "Convenience Store Picnic",
      ja: "コンビニピクニック",
    },
    description: {
      zh: "各自挑一点零食和饮料，再找一个舒服的公园、河边或长椅坐下来。",
      en: "Pick a few snacks and drinks, then find a park, riverside spot, or quiet bench to share them.",
      ja: "お菓子と飲み物を少し買って、公園や川辺、気持ちのいいベンチへ。",
    },
    categories: ["food"],
    cost: "low",
    duration: "short",
    indoor: false,
    tags: ["outdoor", "casual", "spontaneous"],
  },
  {
    id: "five-beautiful-things",
    title: {
      zh: "寻找五件漂亮的东西",
      en: "Find Five Beautiful Things",
      ja: "きれいなものを5つ探す",
    },
    description: {
      zh: "没有目的地地逛一会儿，一起找到五样值得停下来看的东西。",
      en: "Wander without a destination and find five things worth stopping to notice.",
      ja: "目的地を決めずに歩きながら、思わず立ち止まりたくなるものを5つ探す。",
    },
    categories: ["adventure"],
    cost: "free",
    duration: "medium",
    indoor: false,
    tags: ["outdoor", "photo", "exploration"],
    photoPrompt: {
      zh: "最后一张照片里，让你们两个人的一小部分同时入镜。",
      en: "Make the final photo include a small part of both of you.",
      ja: "最後の写真には、二人の一部分を一緒に入れる。",
    },
  },
  {
    id: "arcade-date",
    title: {
      zh: "电玩城乱玩一晚",
      en: "Arcade Date",
      ja: "ゲームセンターデート",
    },
    description: {
      zh: "赛车、音游、抓娃娃，看到什么好玩就玩什么。输赢都不用太认真。",
      en: "Race, play rhythm games, try a claw machine—just follow whatever looks fun.",
      ja: "レース、音ゲー、クレーンゲーム。気になったものを自由に遊んでみる。",
    },
    categories: ["indoor"],
    cost: "low",
    duration: "medium",
    indoor: true,
    tags: ["playful", "games", "casual"],
  },
  {
    id: "cook-something-new",
    title: {
      zh: "一起做一道没做过的菜",
      en: "Cook Something New",
      ja: "初めての料理を一緒に作る",
    },
    description: {
      zh: "选一道你们都不会的菜，一边查步骤一边合作。做成功不是重点。",
      en: "Choose a recipe neither of you has made before and figure it out together. Success is optional.",
      ja: "二人とも作ったことのない料理を選んで、一緒に試してみる。成功しなくても大丈夫。",
    },
    categories: ["food"],
    cost: "low",
    duration: "medium",
    indoor: true,
    tags: ["creative", "collaboration", "home"],
  },
  {
    id: "quiet-reading-date",
    title: {
      zh: "安静地一起看书",
      en: "Quiet Reading Date",
      ja: "静かな読書デート",
    },
    description: {
      zh: "找一家舒服的咖啡馆，各自看自己的书。不需要一直聊天，也是在约会。",
      en: "Find a cozy café and read your own books side by side. You do not have to keep talking to be together.",
      ja: "落ち着くカフェで、それぞれ好きな本を読む。ずっと話さなくても、一緒にいる時間になる。",
    },
    categories: ["relaxing"],
    cost: "low",
    duration: "medium",
    indoor: true,
    tags: ["quiet", "cafe", "reading"],
  },
];
