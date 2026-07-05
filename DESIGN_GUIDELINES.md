# ミライアシスト — デザインガイドライン v1.0

「WEB3.0時代の最先端をリードする ITソリューション × AI × 美容企業」としてのブランドを、
サイト全体で一貫して表現するための設計指針。参考基準: Apple / OpenAI / Stripe / Linear / Notion / Vercel。

---

## 1. ブランドパーソナリティ

| キーワード | デザインでの表現 |
|---|---|
| 先進性 | ダークUI、グラデーション、AI/Web3.0の語彙、未来的なオーブ背景 |
| 信頼感 | 整ったグリッド、十分な余白、数値による実績提示 |
| 高級感 | 低彩度の深いネイビー、ガラスモーフィズム、繊細な罫線(白8%) |
| スピード感 | 軽量な実装、素早いマイクロインタラクション、簡潔なコピー |
| 未来感 | 浮遊オーブ、グラデーションテキスト、グロー付きタイムライン |
| グローバル感 | 英語セクションラベル(Mission / Service / Works…)、Inter書体 |

---

## 2. カラーパレット

CSSカスタムプロパティ([css/style.css](css/style.css))と Tailwind config の両方で定義。

### ベース
| 名前 | 値 | 用途 |
|---|---|---|
| `ink` | `#05070F` | ページ背景(ほぼ黒のネイビー) |
| `surface` | `#0B1020` | セクション・カード下地 |
| `line` | `rgba(255,255,255,0.08)` | 罫線・カード境界 |
| text | `#F8FAFC` | 見出し・本文強調 |
| `sub` | `#94A3B8` | 本文・補足 |

### アクセント
| 名前 | 値 | 用途 |
|---|---|---|
| `accent` | `#3B82F6` | プライマリブルー |
| `accent-cyan` | `#22D3EE` | リンクホバー・強調 |
| `accent-violet` | `#8B5CF6` | AI領域の未来感 |
| `accent-rose` / `accent-gold` | `#FB7185` / `#FBBF24` | 美容事業専用(高級感) |

### グラデーション
- メイン: `120deg, #3B82F6 → #22D3EE → #8B5CF6`(`.text-gradient`, `.btn-primary`)
- 美容: `120deg, #FB7185 → #F0ABFC → #FBBF24`(`.text-gradient-beauty`)

**運用ルール**: アクセント色は1画面に2系統まで。美容系グラデーションは美容事業の文脈でのみ使用し、混色しない。

---

## 3. タイポグラフィ

| 用途 | 書体 | ウェイト | サイズ目安 |
|---|---|---|---|
| 英語見出し・数値 | Inter | 700–800 | — |
| 日本語全般 | Noto Sans JP | 400 / 500 / 700 / 900 | — |
| H1(ヒーロー) | — | 900 | 36–72px(`text-4xl`〜`text-7xl`) |
| H2(セクション) | — | 900 | 30–36px |
| H3(カード) | — | 700 | 18–20px |
| 本文 | — | 400 | 14–16px、行間 `leading-7`〜`leading-8` |
| セクションラベル | Inter | 600 | 11.5px、`letter-spacing: 0.35em`、大文字 |

- 日本語は `font-feature-settings: "palt"`(プロポーショナルメトリクス)で詰める。
- 数値は `font-variant-numeric: tabular-nums` でカウントアップ時のガタつきを防止。

---

## 4. 余白・レイアウト

- コンテンツ最大幅: `72rem`(1152px)。左右パディング: モバイル `20px` / PC `32px`。
- セクション上下: モバイル `96px`(`py-24`)/ PC `128–144px`(`lg:py-32`〜`lg:py-36`)。
- カード内パディング: `24–32px`。カード角丸: `16px`(`rounded-2xl`)。
- グリッド間隔: `16–24px`。**詰めるより空ける**。迷ったら1段階広い余白を選ぶ。

---

## 5. コンポーネント

| クラス | 役割 |
|---|---|
| `.glass` / `.glass-strong` | ガラスモーフィズム(blur 16–20px、白4%背景、白8%罫線) |
| `.card-hover` | ホバーで浮上(-6px)+青グロー |
| `.btn-primary` / `.btn-ghost` | 主/副CTA。ピル型、ホバーでグラデーション移動 |
| `.orb-*` | 浮遊グラデーションオーブ(blur 90px、opacity 0.2–0.35) |
| `.bg-grid` | ヒーロー用グリッド(radial maskでフェード) |
| `.timeline` / `.timeline-dot` | 制作フロー用タイムライン(グロー付き) |
| `.section-index` | 「01 — Mission」形式のセクション番号 |
| `.form-input` | フォーム入力(フォーカスで青リング) |

---

## 6. アニメーション方針

**原則: 遅延は装飾、情報は即時。** 動きは「上質さの演出」であり、閲覧を妨げない。

| 種類 | 実装 | パラメータ |
|---|---|---|
| ヒーロー登場 | `.hero-in-1〜4` | 1s、easeOutQuint系、100ms間隔の段差 |
| スクロールリビール | `.reveal` + IntersectionObserver | 0.8s、translateY 28px→0、遅延0.1s刻み |
| 数値カウントアップ | `data-count` 属性 | 1.6s、cubic ease-out |
| ホバー | `.card-hover` 等 | 0.3–0.5s、`cubic-bezier(0.22,1,0.36,1)` |
| オーブ浮遊 | `orb-float` | 14s 無限往復(GPU: translate3d) |
| マーキー | `.marquee-track` | 32s 線形無限 |

- **`prefers-reduced-motion: reduce` で全アニメーション停止**(CSS・JS両対応済み)。
- transform / opacity のみ動かす(レイアウトを揺らさない = CLS対策)。

---

## 7. アクセシビリティ

- スキップリンク、`aria-label` 付きナビ、`aria-expanded` 付きモバイルメニュー。
- フォーカスリング: シアン2px(`:focus-visible`)。
- 装飾要素は `aria-hidden="true"`。フォームは `label` 必須・`required` 属性。
- コントラスト: 本文 `#94A3B8` on `#05070F` ≒ 7:1(AA以上)。

---

## 8. SEO / LLMO

- 各ページ: 固有の `title` / `meta description` / `canonical` / OGP。
- 見出し階層: h1は1ページ1つ。セクションは `aria-labelledby` で結合。
- Schema.org(JSON-LD): `Organization` / `WebSite` / `Service` / `BreadcrumbList` / `FAQPage` / `ContactPage`。
- LLMO: 生成AIが引用しやすいよう「定義→提供内容→成果数値」の順で明文化。事業内容は箇条書き+説明文の併記。
- Core Web Vitals: 画像レス設計(SVG/CSS描画)、フォント `display=swap`、JS `defer`、transformのみのアニメーション。

**本番公開時の推奨**: Tailwind Play CDN(開発用)を Tailwind CLI のビルド版CSSに差し替えると、初回表示がさらに高速化します。
`npx tailwindcss -i css/tailwind-src.css -o css/tailwind.min.css --minify`

---

## 9. サイトマップ

```
/                       トップ(Hero / Mission / Service / Strengths / Works / Flow / News / CTA)
├─ services/
│   ├─ web.html         Web構築事業
│   ├─ consulting.html  Webコンサルティング事業
│   ├─ ai.html          AI開発事業
│   ├─ sns.html         SNSマーケティング事業
│   └─ beauty.html      美容事業(Beauty DX)
├─ works.html           実績一覧
├─ company.html         会社概要(Mission/Vision/Value・代表挨拶・沿革)
├─ news.html            ニュース一覧
├─ recruit.html         採用情報
├─ contact.html         お問い合わせ / 無料相談(FAQ付き)
└─ privacy.html         プライバシーポリシー
```

---

## 10. 多言語展開(将来対応)

- URL設計: `https://mirai-assist.co.jp/en/` のサブディレクトリ方式を想定。現構造をそのまま `en/` 配下に複製可能。
- 対応手順: ① `<html lang>` 切替 ② `hreflang` 相互リンク ③ JSON-LD `inLanguage` 切替 ④ ヘッダーに言語スイッチャー追加。
- 英語ラベル(Mission / Service / Works / Flow / News)は既に全セクションに併記済みのため、翻訳時もレイアウトが崩れない。
- 日本語固有の詰め(palt)は `:lang(ja)` スコープに限定する。

---

## 11. トーン&マナー(コピーライティング)

- 一文は短く、断定で終える。「〜します。」「〜へ。」
- 抽象語(DX・AI)には必ず具体(数値・事例・手段)を添える。
- 見出し=ベネフィット、本文=根拠、CTA=行動、の3層構造。
- 美容事業のみ、ややエモーショナルで上品な語彙(美意識・体験・プロデュース)を許容。
