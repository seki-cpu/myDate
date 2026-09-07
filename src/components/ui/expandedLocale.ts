import type { DateIdea } from "../../types/domain";
import type { Locale } from "./locale";
import { localizeIdea, localizePhotoPrompt } from "./locale";

type LocalizedCard = Pick<DateIdea, "title" | "description">;

const expandedCardCopy: Record<string, Record<Locale, LocalizedCard>> = {
  "pottery-for-two": {
    zh: { title: "一起做陶艺", description: "预约一次陶艺体验，一起做点实用、可爱，或者歪歪扭扭也没关系的东西。" },
    en: { title: "Pottery for Two", description: "Book a pottery session and make something useful, silly, or slightly crooked together." },
    ja: { title: "二人で陶芸", description: "陶芸体験を予約して、実用的でも、かわいくても、少しくらい歪んでいてもいいものを一緒に作る。" },
  },
  "live-music-night": {
    zh: { title: "一起去听现场音乐", description: "挑一场小型演出或音乐会，让音乐替你们填满一会儿沉默。" },
    en: { title: "Live Music Night", description: "Pick a small live show or concert and let the music carry the conversation for a while." },
    ja: { title: "ライブ音楽の夜", description: "小さなライブやコンサートを選んで、しばらく音楽に会話を任せてみる。" },
  },
  "aquarium-walk": {
    zh: { title: "水族馆慢慢走", description: "不赶路线地逛水族馆，哪只生物吸引你们，就在那里多停一会儿。" },
    en: { title: "Aquarium Walk", description: "Walk slowly through an aquarium and spend too long watching whichever creature catches your eye." },
    ja: { title: "水族館をゆっくり歩く", description: "急がずに水族館を回って、気になった生き物の前では好きなだけ立ち止まる。" },
  },
  "breakfast-date": {
    zh: { title: "一起去吃早餐", description: "比平时早一点见面，在一天还没真正开始前一起吃顿早餐。" },
    en: { title: "Breakfast Date", description: "Meet earlier than usual and share breakfast while the day still feels new." },
    ja: { title: "朝ごはんデート", description: "いつもより少し早く会って、一日が本格的に始まる前に朝ごはんを一緒に食べる。" },
  },
  "bike-and-breeze": {
    zh: { title: "骑车去吹风", description: "骑车去一个视野开阔的地方，不追速度，找到喜欢的景色就停下来。" },
    en: { title: "Bike and Breeze", description: "Rent bikes or use your own and ride somewhere with an open view, then stop when you find a good spot." },
    ja: { title: "自転車で風にあたる", description: "自転車で景色の開けた場所へ。速さは気にせず、いい場所を見つけたら止まる。" },
  },
  "dessert-split": {
    zh: { title: "一起分两份甜点", description: "挑两样你们都没吃过的甜点，不点惯常款，一人一半交换着吃。" },
    en: { title: "Dessert Split", description: "Choose two desserts neither of you has tried and share both instead of ordering your usual favorites." },
    ja: { title: "デザートを二つシェア", description: "二人とも食べたことのないデザートを二つ選んで、いつもの定番ではなく半分ずつシェアする。" },
  },
  "market-wander": {
    zh: { title: "随便逛逛市集", description: "不列购物清单，闻到香的、看到有趣的、听到热闹的就过去看看。" },
    en: { title: "Market Wander", description: "Browse a market or street fair with no shopping list and follow whatever smells, looks, or sounds interesting." },
    ja: { title: "マーケットをぶらぶら", description: "買い物リストは作らず、いい匂い、面白いもの、楽しそうな音のする方へ寄ってみる。" },
  },
  "museum-pick": {
    zh: { title: "美术馆选一件带回家", description: "去看展，各自挑一件“如果可以，最想放进自己房间”的作品。" },
    en: { title: "Museum Pick", description: "Visit a museum or gallery and each choose one piece you would happily take home if you could." },
    ja: { title: "美術館で一つ選ぶ", description: "美術館やギャラリーで、もし持ち帰れるなら自分の部屋に置きたい作品を一つずつ選ぶ。" },
  },
  "mini-road-trip": {
    zh: { title: "小小一日公路旅行", description: "选一个当天能往返的地方，共同做一张歌单，把路上也算进约会里。" },
    en: { title: "Mini Road Trip", description: "Choose somewhere close enough for a day trip, make one playlist, and let the ride be part of the date." },
    ja: { title: "小さな日帰りドライブ", description: "日帰りできる場所を選び、一つのプレイリストを作って、移動時間もデートの一部にする。" },
  },
  "rainy-day-walk": {
    zh: { title: "雨天散步", description: "带上伞走一小段熟悉的路，看看下雨以后平时的街道会变成什么样。" },
    en: { title: "Rainy Day Walk", description: "Take umbrellas, pick a short route, and enjoy how familiar streets feel different in the rain." },
    ja: { title: "雨の日散歩", description: "傘を持って短い道を歩き、いつもの街が雨でどう変わるか楽しむ。" },
  },
  "bowling-date": {
    zh: { title: "一起去打保龄球", description: "随便打几局，好球就庆祝，歪到隔壁道也不用太认真。" },
    en: { title: "Bowling Date", description: "Play a few relaxed rounds, celebrate lucky shots, and let bad throws be part of the fun." },
    ja: { title: "ボウリングデート", description: "気楽に数ゲーム。ラッキーな一投は喜んで、失敗もそのまま楽しむ。" },
  },
  "grocery-surprise": {
    zh: { title: "超市随机食材挑战", description: "一起买菜，每个人偷偷选一种食材，之后想办法把它放进同一道菜里。" },
    en: { title: "Grocery Surprise", description: "Go grocery shopping together and each pick one ingredient the other person has to use somehow." },
    ja: { title: "スーパーで食材サプライズ", description: "一緒に買い物をして、お互いに一つずつ食材を選び、どうにか同じ料理に使ってみる。" },
  },
  "flower-shop-stop": {
    zh: { title: "一起逛花店", description: "随便走进一家花店，各自挑一枝真的喜欢的花，不需要送给谁。" },
    en: { title: "Flower Shop Stop", description: "Browse a flower shop and each choose one stem or small bloom you genuinely like." },
    ja: { title: "花屋に寄り道", description: "花屋をのぞいて、本当に好きだと思う花を一輪ずつ選ぶ。誰かに贈らなくてもいい。" },
  },
  "photo-booth-date": {
    zh: { title: "拍一组大头贴", description: "找一台拍照机器，不用研究完美姿势，随便拍一组属于今天的照片。" },
    en: { title: "Photo Booth Date", description: "Find a photo booth and take a set of pictures without overthinking poses or trying to look perfect." },
    ja: { title: "プリクラ・フォトブースデート", description: "フォトブースを見つけて、完璧なポーズを考えずに今日の写真を一組撮る。" },
  },
  "board-game-picnic": {
    zh: { title: "野餐加一局桌游", description: "带一个规则很简单的游戏和一点吃的，找个能慢慢坐着的户外地方。" },
    en: { title: "Board Game Picnic", description: "Bring one easy game outside with snacks and play somewhere you can stay as long as you like." },
    ja: { title: "ボードゲームピクニック", description: "簡単なゲームとおやつを持って、ゆっくり座れる屋外の場所で遊ぶ。" },
  },
  "karaoke-for-two": {
    zh: { title: "两个人去唱K", description: "开个小包间，把真正喜欢的歌加进去，唱得好不好完全不重要。" },
    en: { title: "Karaoke for Two", description: "Book a small room, queue songs you actually love, and sing badly if that is what happens." },
    ja: { title: "二人カラオケ", description: "小さな部屋を取って、本当に好きな曲を入れる。上手に歌えるかは気にしない。" },
  },
  "sunrise-date": {
    zh: { title: "一起去看日出", description: "偶尔早起一次，找一个视野好的地方，看天空慢慢亮起来。" },
    en: { title: "Sunrise Date", description: "Wake up unusually early and watch the sky change somewhere with a clear view." },
    ja: { title: "日の出デート", description: "たまには早起きして、見晴らしのいい場所で空が明るくなるのを見る。" },
  },
  "room-dreaming": {
    zh: { title: "逛家居店幻想房间", description: "一起逛家具或家居店，各自指出如果是自己的理想房间会选什么。" },
    en: { title: "Dream Room Browsing", description: "Walk through a furniture or home store and point out what you would choose for your own ideal spaces." },
    ja: { title: "理想の部屋を妄想する", description: "家具やインテリアショップを歩きながら、自分の理想の部屋なら何を置くか話してみる。" },
  },
  "try-each-others-drink": {
    zh: { title: "替对方点一杯喝的", description: "去咖啡店或茶饮店，不问对方想喝什么，凭感觉替 TA 选一杯。" },
    en: { title: "Pick Each Other's Drink", description: "At a café or tea shop, choose a drink for the other person based only on what you think they might enjoy." },
    ja: { title: "相手の飲み物を選ぶ", description: "カフェやティーショップで、相手に聞かず「好きそう」と思う一杯を選ぶ。" },
  },
  "short-hike": {
    zh: { title: "轻松短途徒步", description: "选一条难度低又有风景的路线，带好水，用还能聊天的速度慢慢走。" },
    en: { title: "Short Hike", description: "Choose an easy route with a view, bring water, and keep the pace comfortable enough to talk." },
    ja: { title: "ゆるいショートハイク", description: "景色のいい簡単なコースを選び、水を持って、話せるくらいのペースで歩く。" },
  },
  "make-a-playlist": {
    zh: { title: "一起做一张歌单", description: "轮流往同一个歌单里加歌，做成属于今天、这次旅行或这个季节的声音。" },
    en: { title: "Make One Playlist", description: "Take turns adding songs until you have one shared playlist for the day, trip, or season." },
    ja: { title: "一緒にプレイリストを作る", description: "交互に曲を追加して、今日や旅行、季節のための一つのプレイリストを作る。" },
  },
  "night-view-stop": {
    zh: { title: "找个地方看夜景", description: "找一个安全的高处、桥边或开阔地方，待到你们真的注意到城市慢慢安静下来。" },
    en: { title: "Night View Stop", description: "Find a safe viewpoint, bridge, rooftop, or open space and stay long enough to notice the city getting quieter." },
    ja: { title: "夜景を見に行く", description: "安全な展望台や橋、開けた場所で、街が少しずつ静かになるまで過ごす。" },
  },
  "bakery-breakfast-pick": {
    zh: { title: "面包店早餐交换", description: "去一家面包店，每个人给自己选一样，再替对方选一样想让 TA 尝试的。" },
    en: { title: "Bakery Breakfast Pick", description: "Visit a bakery and each choose one thing for yourself and one thing you think the other person should try." },
    ja: { title: "パン屋で朝ごはん交換", description: "パン屋で自分用を一つ、相手に食べてほしいものを一つずつ選ぶ。" },
  },
  "tiny-time-capsule": {
    zh: { title: "做一个迷你时间胶囊", description: "把今天留下的小东西放在一起：票根、收据、便签或照片都可以。" },
    en: { title: "Tiny Time Capsule", description: "Save a few small things from today—a receipt, ticket, note, or photo—and keep them together somewhere safe." },
    ja: { title: "小さなタイムカプセル", description: "今日のレシート、チケット、メモ、写真など、小さなものをいくつかまとめて残す。" },
  },
};

const expandedPhotoPrompt: Partial<Record<string, Record<Locale, string>>> = {
  "rainy-day-walk": {
    zh: "拍一张雨伞、鞋子或水洼倒影的照片。",
    en: "Take one photo of your umbrellas, shoes, or reflections in a puddle.",
    ja: "傘、靴、水たまりの反射のどれかを一枚撮る。",
  },
  "photo-booth-date": {
    zh: "留下一张大头贴或照片，作为今天的回忆。",
    en: "Keep one strip or image from the booth as today's memory.",
    ja: "今日の思い出として、プリクラや写真を一枚残す。",
  },
  "sunrise-date": {
    zh: "太阳升起以后，拍一张两个人影子的照片。",
    en: "Take one photo of your two shadows after the sun comes up.",
    ja: "日が昇ったあと、二人の影を一枚撮る。",
  },
  "tiny-time-capsule": {
    zh: "加入一张今天的照片，让画面里同时留下两个人的一小部分。",
    en: "Add one photo from today that includes a small part of both of you.",
    ja: "今日の写真を一枚加えて、二人の一部分が一緒に写るようにする。",
  },
};

export function localizeExpandedIdea(idea: DateIdea, locale: Locale): DateIdea {
  const localized = expandedCardCopy[idea.id]?.[locale];
  if (localized) return { ...idea, ...localized };
  return localizeIdea(idea, locale);
}

export function localizeExpandedPhotoPrompt(idea: DateIdea, locale: Locale): string | undefined {
  return expandedPhotoPrompt[idea.id]?.[locale] ?? localizePhotoPrompt(idea, locale);
}
