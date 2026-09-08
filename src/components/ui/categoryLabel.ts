import type { DateCategory } from "../../types/domain";
import type { Locale } from "./locale";

const categoryLabels: Record<Locale, Record<DateCategory, string>> = {
  zh: {
    food: "美食",
    outdoor: "户外",
    indoor: "室内",
    creative: "创意",
    romantic: "浪漫",
    relaxing: "放松",
    adventure: "冒险",
    random: "随机",
  },
  en: {
    food: "Food",
    outdoor: "Outdoor",
    indoor: "Indoor",
    creative: "Creative",
    romantic: "Romantic",
    relaxing: "Relaxing",
    adventure: "Adventure",
    random: "Random",
  },
  ja: {
    food: "食べる",
    outdoor: "屋外",
    indoor: "屋内",
    creative: "クリエイティブ",
    romantic: "ロマンチック",
    relaxing: "リラックス",
    adventure: "アクティブ",
    random: "ランダム",
  },
};

export function getCategoryLabel(category: DateCategory, locale: Locale): string {
  return categoryLabels[locale][category];
}
