"use client";

import { useEffect, useState } from "react";
import type { DateIdea } from "../../types/domain";

export type Locale = "zh" | "en" | "ja";

export const localeEventName = "mydate-locale-change";

export function detectLocale(): Locale {
  if (typeof navigator === "undefined") return "en";
  const language = navigator.language.toLowerCase();
  if (language.startsWith("zh")) return "zh";
  if (language.startsWith("ja")) return "ja";
  return "en";
}

export function getStoredLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem("mydate-locale");
  if (saved === "zh" || saved === "ja" || saved === "en") return saved;
  return detectLocale();
}

export function setStoredLocale(locale: Locale) {
  window.localStorage.setItem("mydate-locale", locale);
  document.documentElement.lang = locale === "zh" ? "zh-CN" : locale;
  window.dispatchEvent(new CustomEvent(localeEventName, { detail: locale }));
}

export function useLocale() {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const initial = getStoredLocale();
    setLocale(initial);
    document.documentElement.lang = initial === "zh" ? "zh-CN" : initial;

    function handleLocaleChange(event: Event) {
      setLocale((event as CustomEvent<Locale>).detail);
    }

    window.addEventListener(localeEventName, handleLocaleChange);
    return () => window.removeEventListener(localeEventName, handleLocaleChange);
  }, []);

  return locale;
}

const cardCopy: Record<string, Record<Locale, Pick<DateIdea, "title" | "description">>> = {
  "sunset-walk": {
    zh: { title: "沿着夕阳散步", description: "找一条风景舒服的路线，不设终点，只一起走到想停下来的时候。" },
    en: { title: "Sunset Walk", description: "Pick a scenic route and walk without a destination. Stop whenever the moment feels right." },
    ja: { title: "夕暮れ散歩", description: "景色のいい道を、目的地を決めずに歩く。止まりたくなった場所が今日のゴール。" },
  },
  "one-canvas": {
    zh: { title: "一起画一幅画", description: "不要各画各的。共享一张画布，轮流加入颜色、形状和只有你们懂的东西。" },
    en: { title: "One Canvas", description: "Share one canvas and take turns adding colors, shapes, and little things only the two of you understand." },
    ja: { title: "二人で一枚の絵", description: "別々ではなく、一枚のキャンバスを共有。色や形、二人にしかわからないものを自由に足していく。" },
  },
  "dance-night": {
    zh: { title: "一起去跳舞", description: "找一家音乐合口味的地方。不玩游戏，不完成挑战，只跟着音乐一起跳。" },
    en: { title: "Dance Night", description: "Find a place playing music you both like. No games, no challenges—just dance and enjoy the night." },
    ja: { title: "一緒に踊る夜", description: "二人とも好きな音楽が流れる場所へ。ゲームも課題もなし。ただ音楽に任せて踊る。" },
  },
  "convenience-store-picnic": {
    zh: { title: "便利店野餐", description: "各自挑一点零食和饮料，再找一个舒服的公园、河边或长椅坐下来。" },
    en: { title: "Convenience Store Picnic", description: "Pick a few snacks and drinks, then find a park, riverside spot, or quiet bench to share them." },
    ja: { title: "コンビニピクニック", description: "お菓子と飲み物を少し買って、公園や川辺、気持ちのいいベンチへ。" },
  },
  "five-beautiful-things": {
    zh: { title: "寻找五件漂亮的东西", description: "没有目的地地逛一会儿，一起找到五样值得停下来看的东西。" },
    en: { title: "Find Five Beautiful Things", description: "Wander without a destination and find five things worth stopping to notice." },
    ja: { title: "きれいなものを5つ探す", description: "目的地を決めずに歩きながら、思わず立ち止まりたくなるものを5つ探す。" },
  },
  "arcade-date": {
    zh: { title: "电玩城乱玩一晚", description: "赛车、音游、抓娃娃，看到什么好玩就玩什么。输赢都不用太认真。" },
    en: { title: "Arcade Date", description: "Race, play rhythm games, try a claw machine—just follow whatever looks fun." },
    ja: { title: "ゲームセンターデート", description: "レース、音ゲー、クレーンゲーム。気になったものを自由に遊んでみる。" },
  },
  "cook-something-new": {
    zh: { title: "一起做一道没做过的菜", description: "选一道你们都不会的菜，一边查步骤一边合作。做成功不是重点。" },
    en: { title: "Cook Something New", description: "Choose a recipe neither of you has made before and figure it out together. Success is optional." },
    ja: { title: "初めての料理を一緒に作る", description: "二人とも作ったことのない料理を選んで、一緒に試してみる。成功しなくても大丈夫。" },
  },
  "quiet-reading-date": {
    zh: { title: "安静地一起看书", description: "找一家舒服的咖啡馆，各自看自己的书。不需要一直聊天，也是在约会。" },
    en: { title: "Quiet Reading Date", description: "Find a cozy café and read your own books side by side. You do not have to keep talking to be together." },
    ja: { title: "静かな読書デート", description: "落ち着くカフェで、それぞれ好きな本を読む。ずっと話さなくても、一緒にいる時間になる。" },
  },
};

export function localizeIdea(idea: DateIdea, locale: Locale): DateIdea {
  const localized = cardCopy[idea.id]?.[locale];
  return localized ? { ...idea, ...localized } : idea;
}

export const uiCopy = {
  zh: {
    eyebrow: "属于你们两个人",
    heroTitle: "今天要一起做什么？",
    heroCopy: "几秒钟找到一个简单的约会灵感，不用反复计划，直接去做点值得一起体验的事。",
    random: "帮我们选一个",
    browse: "看看活动",
    mood: "选一种感觉",
    ideas: "现在就可以做",
    surprise: "随机一个",
    more: "换一批",
    emptyTitle: "活动正在准备中",
    emptyCopy: "内容接入后会自动显示在这里。",
  },
  en: {
    eyebrow: "For the two of you",
    heroTitle: "What should we do today?",
    heroCopy: "Find a simple date idea in seconds. No planning spiral, just something worth doing together.",
    random: "Pick something for us",
    browse: "Browse ideas",
    mood: "Choose a mood",
    ideas: "Ideas for right now",
    surprise: "Surprise us",
    more: "Show me another three",
    emptyTitle: "Date ideas are on the way",
    emptyCopy: "Activity cards will appear here as soon as the shared content source is populated.",
  },
  ja: {
    eyebrow: "二人のために",
    heroTitle: "今日は何をする？",
    heroCopy: "数秒で気軽なデート案を見つける。考えすぎず、二人でやってみたいことを選ぼう。",
    random: "二人のために選ぶ",
    browse: "アイデアを見る",
    mood: "気分で選ぶ",
    ideas: "今すぐできること",
    surprise: "おまかせ",
    more: "別の3つを見る",
    emptyTitle: "デート案を準備中",
    emptyCopy: "共有コンテンツが追加されると、ここに表示される。",
  },
} as const;
