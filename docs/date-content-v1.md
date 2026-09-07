# myDate V1 Date Content

This document is the trilingual content source for the first eight Date Cards.

The current `DateIdea` type only supports single-language `title` and `description` fields and has no general `mission` field. The English copy is therefore implemented in `src/data/dateIdeas.ts` for immediate UI rendering. Chinese/Japanese localization and little missions below are ready for UI integration after the architect approves the localization structure.

## 1. Sunset Walk

### zh
- Title: 沿着夕阳散步
- Description: 找一条风景舒服的路线，不设终点，只一起走到想停下来的时候。
- Little mission: 拍一张两个人的鞋或影子同时入镜的照片。

### en
- Title: Sunset Walk
- Description: Pick a scenic route and walk without a destination. Stop whenever the moment feels right.
- Little mission: Take one photo with both of your shoes or shadows in the frame.

### ja
- Title: 夕暮れ散歩
- Description: 景色のいい道を、目的地を決めずに歩く。止まりたくなった場所が今日のゴール。
- Little mission: 二人の靴か影が一緒に写る写真を一枚撮る。

## 2. One Canvas

### zh
- Title: 一起画一幅画
- Description: 不要各画各的。共享一张画布，轮流加入颜色、形状和只有你们懂的东西。
- Little mission: 各自偷偷加入一个代表对方的小细节。

### en
- Title: One Canvas
- Description: Share one canvas and take turns adding colors, shapes, and little things only the two of you understand.
- Little mission: Secretly add one tiny detail inspired by the other person.

### ja
- Title: 二人で一枚の絵
- Description: 別々ではなく、一枚のキャンバスを共有。色や形、二人にしかわからないものを自由に足していく。
- Little mission: 相手をイメージした小さなモチーフを一つこっそり加える。

## 3. Dance Night

### zh
- Title: 一起去跳舞
- Description: 找一家音乐合口味的地方。不玩游戏，不完成挑战，只跟着音乐一起跳。
- Little mission: 选出一首以后听到就会想起今晚的歌。

### en
- Title: Dance Night
- Description: Find a place playing music you both like. No games, no challenges—just dance and enjoy the night.
- Little mission: Choose one song to remember tonight by.

### ja
- Title: 一緒に踊る夜
- Description: 二人とも好きな音楽が流れる場所へ。ゲームも課題もなし。ただ音楽に任せて踊る。
- Little mission: 今日を思い出すための一曲を決める。

## 4. Convenience Store Picnic

### zh
- Title: 便利店野餐
- Description: 各自挑一点零食和饮料，再找一个舒服的公园、河边或长椅坐下来。
- Little mission: 不问对方，偷偷替 TA 挑一样你觉得 TA 会喜欢的东西。

### en
- Title: Convenience Store Picnic
- Description: Pick a few snacks and drinks, then find a park, riverside spot, or quiet bench to share them.
- Little mission: Choose one thing you think the other person will like—without asking.

### ja
- Title: コンビニピクニック
- Description: お菓子と飲み物を少し買って、公園や川辺、気持ちのいいベンチへ。
- Little mission: 聞かずに、相手が好きそうなものを一つ選ぶ。

## 5. Find Five Beautiful Things

### zh
- Title: 寻找五件漂亮的东西
- Description: 没有目的地地逛一会儿，一起找到五样值得停下来看的东西。
- Little mission: 最后一张照片必须同时出现你们两个人的一小部分。

### en
- Title: Find Five Beautiful Things
- Description: Wander without a destination and find five things worth stopping to notice.
- Little mission: Your final photo must include a small part of both of you.

### ja
- Title: きれいなものを5つ探す
- Description: 目的地を決めずに歩きながら、思わず立ち止まりたくなるものを5つ探す。
- Little mission: 最後の写真には、二人の一部分を一緒に入れる。

## 6. Arcade Date

### zh
- Title: 电玩城乱玩一晚
- Description: 赛车、音游、抓娃娃，看到什么好玩就玩什么。输赢都不用太认真。
- Little mission: 带走一个能代表今晚的小战利品。

### en
- Title: Arcade Date
- Description: Race, play rhythm games, try a claw machine—just follow whatever looks fun.
- Little mission: Leave with one tiny souvenir from tonight.

### ja
- Title: ゲームセンターデート
- Description: レース、音ゲー、クレーンゲーム。気になったものを自由に遊んでみる。
- Little mission: 今日を思い出せる小さな戦利品を一つ持ち帰る。

## 7. Cook Something New

### zh
- Title: 一起做一道没做过的菜
- Description: 选一道你们都不会的菜，一边查步骤一边合作。做成功不是重点。
- Little mission: 给最后做出来的东西取一个夸张的餐厅菜名。

### en
- Title: Cook Something New
- Description: Choose a recipe neither of you has made before and figure it out together. Success is optional.
- Little mission: Give the finished dish an unnecessarily fancy restaurant name.

### ja
- Title: 初めての料理を一緒に作る
- Description: 二人とも作ったことのない料理を選んで、一緒に試してみる。成功しなくても大丈夫。
- Little mission: 完成した料理に、ちょっと大げさなレストラン風の名前をつける。

## 8. Quiet Reading Date

### zh
- Title: 安静地一起看书
- Description: 找一家舒服的咖啡馆，各自看自己的书。不需要一直聊天，也是在约会。
- Little mission: 离开前分享一句今天读到的、你喜欢的话或想法。

### en
- Title: Quiet Reading Date
- Description: Find a cozy café and read your own books side by side. You do not have to keep talking to be together.
- Little mission: Before leaving, share one sentence or idea you liked.

### ja
- Title: 静かな読書デート
- Description: 落ち着くカフェで、それぞれ好きな本を読む。ずっと話さなくても、一緒にいる時間になる。
- Little mission: 帰る前に、今日気に入った一文かアイデアを一つ共有する。

## UI handoff notes

- Keep descriptions to roughly two mobile-readable lines where possible.
- Missions are optional and should never block completion.
- Do not display relationship scores or completion scores.
- Do not force physical intimacy.
- Keep `cost`, `duration`, and `category` as canonical enums and localize their display labels in UI rather than changing stored values.
- Do not repurpose `photoPrompt` as a general mission field. It should remain photo-specific.
