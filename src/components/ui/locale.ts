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

export type LocalizedDateIdea = Omit<
  DateIdea,
  "title" | "description" | "littleMission" | "photoPrompt"
> & {
  title: string;
  description: string;
  littleMission?: string;
  photoPrompt?: string;
};

function pickLocalizedText(text: DateIdea["title"], locale: Locale): string {
  return text[locale] ?? text.en;
}

export function localizeIdea(idea: DateIdea, locale: Locale): LocalizedDateIdea {
  return {
    ...idea,
    title: pickLocalizedText(idea.title, locale),
    description: pickLocalizedText(idea.description, locale),
    littleMission: idea.littleMission ? pickLocalizedText(idea.littleMission, locale) : undefined,
    photoPrompt: idea.photoPrompt ? pickLocalizedText(idea.photoPrompt, locale) : undefined,
  };
}

export function localizePhotoPrompt(idea: DateIdea, locale: Locale): string | undefined {
  return idea.photoPrompt ? pickLocalizedText(idea.photoPrompt, locale) : undefined;
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

export const flowCopy = {
  zh: {
    saved: "收藏",
    memories: "回忆",
    resultPick: "今晚就选这个",
    time: "时长",
    cost: "预算",
    place: "地点",
    indoor: "室内",
    flexible: "灵活",
    another: "换一个",
    start: "就做这个",
    resultPreview: "结果预览",
    resultEmptyTitle: "你的约会灵感会出现在这里。",
    resultEmptyCopy: "共享内容还没有可用活动，接入后会自动显示。",
    backHome: "回到主页",
    adventureMode: "约会进行中",
    adventureTitle: "你们已经出发了。",
    adventureCopy: "约会的时候把 app 放到一边，结束后再回来就好。",
    currentDate: "当前活动",
    selectedActivity: "你们选中的活动",
    reminder: "小提醒",
    beHere: "待在此刻，不要待在 app 里。",
    noChecklist: "不用打卡，不用评分，只享受你们一起选的这件事。",
    finished: "我们完成了",
    dateComplete: "约会完成",
    keepPiece: "留下一点今天的痕迹。",
    noFaces: "不需要拍脸，一个小细节也足够让以后想起今天。",
    photoIdea: "照片灵感",
    memoryWithoutPosing: "不用摆拍的回忆",
    genericPhoto: "拍一张能同时留下两个人小小痕迹的照片：两只手、两双鞋，或者一起选中的东西。",
    finishedDate: "完成的约会",
    optionalPhoto: "V1 里拍照或上传照片都不是必须的。完成约会本身比填写 app 更重要。",
    saveMemory: "保存这段回忆",
    maybeLater: "以后再说",
    duration: { short: "短", medium: "中等", long: "较长" },
    budget: { free: "免费", low: "低", medium: "中等", high: "高" },
  },
  en: {
    saved: "Saved",
    memories: "Memories",
    resultPick: "TONIGHT'S PICK",
    time: "Time",
    cost: "Cost",
    place: "Place",
    indoor: "Indoor",
    flexible: "Flexible",
    another: "Give us another",
    start: "Let's do this",
    resultPreview: "Result preview",
    resultEmptyTitle: "Your date idea will land here.",
    resultEmptyCopy: "The shared content list is empty right now. Once content is available, this screen will render it automatically.",
    backHome: "Back home",
    adventureMode: "Adventure mode",
    adventureTitle: "You are doing it.",
    adventureCopy: "Keep the app quiet while you are together. Come back when the date is done.",
    currentDate: "Current date",
    selectedActivity: "Your selected activity",
    reminder: "Tiny reminder",
    beHere: "Be here, not in the app.",
    noChecklist: "No checklist. No score. Just enjoy the thing you picked together.",
    finished: "We finished it",
    dateComplete: "Date complete",
    keepPiece: "Keep a little piece of it.",
    noFaces: "No faces required. A small detail can be enough to remember the day.",
    photoIdea: "Photo idea",
    memoryWithoutPosing: "A memory without posing",
    genericPhoto: "Take one photo that shows a small trace of both of you: two hands, two pairs of shoes, or something you picked together.",
    finishedDate: "Your finished date",
    optionalPhoto: "In V1, taking or uploading a photo is optional. Finishing the date matters more than filling out the app.",
    saveMemory: "Save this memory",
    maybeLater: "Maybe later",
    duration: { short: "Short", medium: "Medium", long: "Long" },
    budget: { free: "Free", low: "Low", medium: "Medium", high: "High" },
  },
  ja: {
    saved: "保存済み",
    memories: "思い出",
    resultPick: "今夜はこれ",
    time: "時間",
    cost: "予算",
    place: "場所",
    indoor: "屋内",
    flexible: "自由",
    another: "別の案を見る",
    start: "これにする",
    resultPreview: "結果プレビュー",
    resultEmptyTitle: "デート案はここに表示される。",
    resultEmptyCopy: "共有コンテンツが追加されると、この画面に自動で表示される。",
    backHome: "ホームへ戻る",
    adventureMode: "デート中",
    adventureTitle: "もう始まってる。",
    adventureCopy: "一緒にいる間は app を静かにして、デートが終わったら戻ってこよう。",
    currentDate: "今のデート",
    selectedActivity: "選んだアクティビティ",
    reminder: "小さなリマインダー",
    beHere: "app ではなく、今ここに。",
    noChecklist: "チェックリストも点数もなし。二人で選んだ時間をそのまま楽しもう。",
    finished: "終わった",
    dateComplete: "デート完了",
    keepPiece: "今日の一部を少しだけ残そう。",
    noFaces: "顔は写さなくても大丈夫。小さなディテールだけでも今日を思い出せる。",
    photoIdea: "写真アイデア",
    memoryWithoutPosing: "ポーズしない思い出",
    genericPhoto: "二人の小さな痕跡が一緒に写る写真を一枚。手、靴、二人で選んだものでもいい。",
    finishedDate: "終わったデート",
    optionalPhoto: "V1 では写真撮影もアップロードも任意。app を埋めることより、デートを終えたことの方が大切。",
    saveMemory: "思い出を保存",
    maybeLater: "あとで",
    duration: { short: "短め", medium: "普通", long: "長め" },
    budget: { free: "無料", low: "低め", medium: "普通", high: "高め" },
  },
} as const;
