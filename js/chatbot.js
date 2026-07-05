/* ============================================================
   ミライアシスト — AI Assistant Chatbot (client-side / rule-based)
   全ページ共通のフローティングチャットウィジェット。
   外部APIなしで動作し、サービス案内と無料相談への導線を担う。
   ============================================================ */
(() => {
  "use strict";

  /* services/ 配下でも正しいリンクを張るためのプレフィックス */
  const ROOT = /\/services\//.test(location.pathname) ? "../" : "";

  const QUICK_REPLIES = [
    "サービスについて",
    "料金について",
    "納期について",
    "AI導入の相談",
    "美容事業について",
    "無料相談したい"
  ];

  const CONTACT_LINK = `<a href="${ROOT}contact.html" class="cb-link">お問い合わせ / 無料相談フォーム →</a>`;

  /* ---- 応答ルール(上から順にマッチ) ---- */
  const RULES = [
    {
      match: /こんにちは|こんばんは|おはよう|はじめまして|hello|hi/i,
      reply: () => "こんにちは!マスコットのYUKI(ユキ)です 👋<br>Web制作・AI開発・マーケティング・美容DXについて、なんでもお気軽にご質問ください。"
    },
    {
      match: /料金|費用|価格|予算|いくら|相場|プラン/,
      reply: () => `ご予算はプロジェクトの内容・規模により異なりますが、目安は以下の通りです。<br><br>・LP制作:30万円〜<br>・コーポレートサイト:80万円〜<br>・ECサイト / システム開発:150万円〜<br>・AI導入(PoC):50万円〜<br>・SNS運用:月15万円〜<br><br>詳細は無料相談で最適なプランをご提案します。<br>${CONTACT_LINK}`
    },
    {
      match: /納期|期間|どのくらい|何ヶ月|いつまで|スケジュール/,
      reply: () => `納期の目安です。<br><br>・LP制作:2〜4週間<br>・コーポレートサイト:1.5〜3ヶ月<br>・ECサイト / システム開発:2〜4ヶ月<br>・AIチャットボット導入:3週間〜<br><br>お急ぎの案件も、AI駆動の高速開発で柔軟に対応可能です。まずはご相談ください。<br>${CONTACT_LINK}`
    },
    {
      match: /チャットボット|rag|エージェント|自動化|生成ai|openai|claude|gemini|gpt|llm|\bai\b|AI導入|AI開発/i,
      reply: () => `AI開発事業のご案内です 🤖<br><br>・生成AI導入コンサルティング<br>・AIチャットボット構築(いままさに私のような!)<br>・RAG構築 / AIエージェント開発<br>・AI業務自動化(OpenAI / Claude / Gemini API)<br><br>PoC(検証)から本番導入・運用改善まで一気通貫で支援します。<br><a href="${ROOT}services/ai.html" class="cb-link">AI開発事業の詳細 →</a>`
    },
    {
      match: /美容|サロン|ビューティ|beauty|コスメ|エステ/i,
      reply: () => `美容事業(Beauty DX)のご案内です ✨<br><br>・美容サロン運営 / コンサルティング<br>・美容ブランドプロデュース<br>・AI美容診断 / 美容マーケティング<br><br>IT企業だから実現できる、テクノロジー×美意識の美容DXをご提供します。<br><a href="${ROOT}services/beauty.html" class="cb-link">美容事業の詳細 →</a>`
    },
    {
      match: /seo|llmo|meo|集客|アクセス|検索|コンサル|改善|分析|マーケティング/i,
      reply: () => `Webコンサルティング事業のご案内です 📈<br><br>・SEO / LLMO(生成AI検索最適化)/ MEO<br>・CV改善 / アクセス解析 / UI・UX改善<br>・競合分析 / DX支援<br><br>データに基づく成果重視のコンサルティングで、Webを利益を生む装置へ変えます。<br><a href="${ROOT}services/consulting.html" class="cb-link">コンサルティング事業の詳細 →</a>`
    },
    {
      match: /sns|インスタ|instagram|tiktok|youtube|line|広告|動画|インフルエンサー|フォロワー/i,
      reply: () => `SNSマーケティング事業のご案内です 📱<br><br>・Instagram / TikTok / YouTube / LINE公式の運用<br>・広告運用 / 動画マーケティング<br>・インフルエンサー施策 / SNSブランディング<br><br>「バズは運ではなく、設計である。」数字で語れるSNSグロースを実現します。<br><a href="${ROOT}services/sns.html" class="cb-link">SNSマーケティング事業の詳細 →</a>`
    },
    {
      match: /ホームページ|web制作|サイト制作|lp|ランディング|ec|通販|予約|会員|cms|システム|リニューアル|制作/i,
      reply: () => `Web構築事業のご案内です 💻<br><br>・コーポレートサイト / ブランドサイト / LP制作<br>・ECサイト / 予約システム / 会員サイト / CMS構築<br><br>SEO・LLMO標準対応、Core Web Vitals基準の高速実装で「資産になるWeb」を構築します。<br><a href="${ROOT}services/web.html" class="cb-link">Web構築事業の詳細 →</a>`
    },
    {
      match: /サービス|事業|できること|メニュー|何が/,
      reply: () => `ミライアシストは5つの事業をワンストップで提供しています。<br><br>1️⃣ Web構築(サイト・EC・システム)<br>2️⃣ Webコンサルティング(SEO・LLMO・CV改善)<br>3️⃣ AI開発(生成AI・チャットボット・RAG)<br>4️⃣ SNSマーケティング(Instagram・TikTok等)<br>5️⃣ 美容事業(Beauty DX)<br><br>気になる事業名を送っていただければ、詳しくご案内します!`
    },
    {
      match: /会社|概要|どこ|所在地|アクセス|代表|沿革/,
      reply: () => `ミライアシストは、AI × Web × Marketing × Beauty を融合した次世代DXカンパニーです(茨城県取手市)。<br><a href="${ROOT}company.html" class="cb-link">会社概要を見る →</a>`
    },
    {
      match: /採用|求人|リクルート|働き|転職|入社/,
      reply: () => `採用情報のご案内です 🚀<br>Webディレクター / フロントエンドエンジニア / AIエンジニア / SNSマーケター / 美容コンサルタントを募集中です。<br><a href="${ROOT}recruit.html" class="cb-link">採用情報を見る →</a>`
    },
    {
      match: /実績|事例|ポートフォリオ|成果/,
      reply: () => `プロジェクト実績300+、継続率97.2%、AI導入支援80社+、SNS総リーチ5,000万+。<br>問い合わせ3.2倍、工数月120時間削減など、数字で語れる事例を多数掲載しています。<br><a href="${ROOT}works.html" class="cb-link">実績一覧を見る →</a>`
    },
    {
      match: /相談|問い合わせ|問合せ|連絡|コンタクト|依頼|見積|申し込み|お願いしたい/,
      reply: () => `ありがとうございます!無料相談は下記フォームから受け付けています。<br>最短1営業日以内にご返信します。<br>${CONTACT_LINK}`
    },
    {
      match: /ありがとう|thanks|助かった/i,
      reply: () => "どういたしまして!😊 ほかにもご質問があれば、いつでもお声がけください。"
    }
  ];

  const FALLBACK = () =>
    `ご質問ありがとうございます。より詳しくご案内するため、下のメニューからお選びいただくか、無料相談をご利用ください。<br>${CONTACT_LINK}`;

  /* ---- DOM構築 ---- */
  const root = document.createElement("div");
  root.id = "yk-chatbot";
  root.innerHTML = `
    <button type="button" class="cb-fab" aria-label="チャットで相談する" aria-expanded="false" aria-controls="cb-panel">
      <svg class="cb-fab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M21 12a8 8 0 0 1-8 8H5l-2 2V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8Z"/>
        <path d="M9 11h.01M13 11h.01M17 11h.01"/>
      </svg>
      <span class="cb-fab-badge" aria-hidden="true"></span>
    </button>
    <div id="cb-panel" class="cb-panel" role="dialog" aria-label="ミライアシスト AIアシスタント" hidden>
      <div class="cb-header">
        <img class="cb-avatar" src="${ROOT}images/yuki-idea.png?v=2" alt="" width="40" height="40" aria-hidden="true">
        <div>
          <p class="cb-header-title">YUKI<span class="cb-header-role">ミライアシスト AIアシスタント</span></p>
          <p class="cb-header-sub"><span class="cb-header-dot" aria-hidden="true"></span>オンライン・すぐに応答します</p>
        </div>
        <button type="button" class="cb-close" aria-label="チャットを閉じる">✕</button>
      </div>
      <div class="cb-messages" aria-live="polite"></div>
      <div class="cb-quick" role="group" aria-label="よくある質問"></div>
      <form class="cb-form">
        <label class="sr-only" for="cb-input">メッセージを入力</label>
        <input id="cb-input" class="cb-input" type="text" placeholder="メッセージを入力…" autocomplete="off" maxlength="200">
        <button type="submit" class="cb-send" aria-label="送信">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z"/></svg>
        </button>
      </form>
    </div>`;
  document.body.appendChild(root);

  const fab = root.querySelector(".cb-fab");
  const panel = root.querySelector(".cb-panel");
  const closeBtn = root.querySelector(".cb-close");
  const messages = root.querySelector(".cb-messages");
  const quick = root.querySelector(".cb-quick");
  const form = root.querySelector(".cb-form");
  const input = root.querySelector(".cb-input");

  QUICK_REPLIES.forEach((q) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "cb-chip";
    b.textContent = q;
    b.addEventListener("click", () => send(q));
    quick.appendChild(b);
  });

  let opened = false;
  const toggle = (open) => {
    panel.hidden = !open;
    fab.setAttribute("aria-expanded", String(open));
    fab.classList.toggle("is-open", open);
    if (open) {
      if (!opened) {
        opened = true;
        setTimeout(() => addBot(
          "こんにちは!ミライアシストのマスコット、AIアシスタントの<strong>YUKI(ユキ)</strong>です 👋<br>サービス・料金・納期など、お気軽にご質問ください!"
        ), 350);
      }
      input.focus();
    }
  };
  fab.addEventListener("click", () => toggle(panel.hidden));
  closeBtn.addEventListener("click", () => toggle(false));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !panel.hidden) toggle(false);
  });

  const scrollBottom = () => { messages.scrollTop = messages.scrollHeight; };

  const addUser = (text) => {
    const el = document.createElement("div");
    el.className = "cb-msg cb-msg-user";
    el.textContent = text;
    messages.appendChild(el);
    scrollBottom();
  };

  const addBot = (html) => {
    const typing = document.createElement("div");
    typing.className = "cb-msg cb-msg-bot cb-typing";
    typing.innerHTML = "<span></span><span></span><span></span>";
    messages.appendChild(typing);
    scrollBottom();
    setTimeout(() => {
      typing.classList.remove("cb-typing");
      typing.innerHTML = html;
      scrollBottom();
    }, 650);
  };

  const respond = (text) => {
    const rule = RULES.find((r) => r.match.test(text));
    addBot(rule ? rule.reply() : FALLBACK());
  };

  const send = (text) => {
    const t = text.trim();
    if (!t) return;
    addUser(t);
    respond(t);
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    send(input.value);
    input.value = "";
    input.focus();
  });
})();
