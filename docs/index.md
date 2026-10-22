---
layout: home
title: FDE 入门指南
description: 一本写给零基础读者的开源 FDE（前沿部署工程师）入门指南：概念、能力地图、六阶段交付法、实战 Lab、案例库与模板。
titleTemplate: 从零理解前沿部署工程师

hero:
  name: FDE 入门指南
  text: 从零理解前沿部署工程师
  tagline: 一本写给零基础读者的开源指南。从概念、能力地图、六阶段交付法，到你的第一个真实项目。不贩卖速成神话，只讲可验证的动作。
  image:
    src: /cover.svg
    alt: FDE 部署飞轮示意
  actions:
    - theme: brand
      text: 开始阅读
      link: /guide/
    - theme: alt
      text: 做一次能力自评
      link: /guide/self-check
    - theme: alt
      text: 直接看实战 Lab
      link: /labs/

features:
  - icon: 🧭
    title: 先建立地图
    details: 用 3 章讲清 FDE 是什么、为什么现在火、真实工作长什么样，以及它和咨询、售前、实施、外包的区别。
  - icon: 🛠️
    title: 再补能力
    details: 一张零基础技术地图、一套业务与数据方法、一个可复用的六阶段交付流程，告诉你「够用就好」的边界。
  - icon: 🧪
    title: 然后动手
    details: 3 个从 0 到 1 的 Lab：客服工单分流、合同条款审查、企业知识助手，每个都有指标、评测和交付清单。
  - icon: 🎯
    title: 最后证明
    details: 评测、可观测性、安全、灰度发布、防漂移，以及如何把一次项目变成作品集和下一份机会。
---

<div class="home-section">
  <div class="section-kicker">Why this book</div>
  <h2 class="section-title">你可能正在这些问题里打转</h2>
  <p class="section-desc">市面上不缺 FDE 的传说，缺的是「从今天开始，我该做什么」。这本指南按一个零基础读者真正会遇到的顺序组织。</p>
  <div class="home-grid">
    <div class="home-card">
      <span class="num">01 / 概念</span>
      <h3>FDE 到底做什么？</h3>
      <p>不是驻场外包，也不是售前。它是在客户现场，把还不存在的系统真正跑起来，并把经验反哺产品的人。</p>
      <span class="arrow">第 1 章 →</span>
    </div>
    <div class="home-card">
      <span class="num">02 / 能力</span>
      <h3>我不会写代码，能行吗？</h3>
      <p>可以，但你要补到「能独立做出原型、能判断技术方案」的程度。第 4 章给你一张够用就好的技术地图。</p>
      <span class="arrow">第 4 章 →</span>
    </div>
    <div class="home-card">
      <span class="num">03 / 实战</span>
      <h3>怎么证明我真的会？</h3>
      <p>做一个有真实指标、有评测、有失败分析的 Lab，比十张证书更有说服力。第 7 章和第 8 章带你做。</p>
      <span class="arrow">Lab A →</span>
    </div>
  </div>
</div>

<div class="home-section">
  <div class="home-split">
    <div class="home-panel">
      <div class="section-kicker">Read this if</div>
      <h3>这本指南写给你</h3>
      <ul class="audience-list">
        <li><span class="dot"></span><span><strong>想转岗的开发者</strong>：会写代码，但不知道如何面对客户、定义问题、把 demo 送上生产。</span></li>
        <li><span class="dot"></span><span><strong>咨询 / 实施 / 售前</strong>：懂业务和客户，但技术深度不够，想从「提建议」走向「交结果」。</span></li>
        <li><span class="dot"></span><span><strong>产品经理 / 业务负责人</strong>：正在负责 AI 落地，需要理解 FDE 的工作方式与协作接口。</span></li>
        <li><span class="dot"></span><span><strong>在校学生 / 自学者</strong>：想进入 AI 应用赛道，但缺少一张从基础到实战的路线图。</span></li>
        <li><span class="dot"></span><span><strong>企业 AI 团队</strong>：想建立内部 FDE 机制，或判断一个场景是否值得投入。</span></li>
      </ul>
      <div class="cta-row">
        <a class="primary" href="/fde/guide/">从导读开始 →</a>
        <a href="/fde/guide/roadmap">12 周学习路线</a>
      </div>
    </div>
    <div class="home-panel dark-panel">
      <div class="section-kicker" style="color: #ff9c72">The deployment loop</div>
      <h3>FDE 部署飞轮</h3>
      <ol class="manifesto">
        <li>到现场去，看真实流程、真实数据、真实的人。</li>
        <li>把模糊问题收窄成一个可验证的窄场景。</li>
        <li>用真实数据做最小版本，让业务方每天用。</li>
        <li>用评测和指标证明有效，而不是「感觉不错」。</li>
        <li>把系统送上生产，处理权限、安全、监控、回滚。</li>
        <li>把反复出现的模式反哺产品，让下一次更快。</li>
      </ol>
      <div class="cta-row">
        <a href="/fde/guide/06-delivery-lifecycle" style="background: transparent; color: #fff !important; border-color: rgba(255,255,255,.3)">看六阶段交付法 →</a>
      </div>
    </div>
  </div>
</div>

<div class="home-section">
  <div class="section-kicker">The map</div>
  <h2 class="section-title">全书地图</h2>
  <p class="section-desc">四个部分、10 章、3 个 Lab、60+ 案例，按「认识 → 能力 → 现场 → 职业」递进。你可以从头读，也可以按需要跳。</p>
  <div class="home-grid">
    <a class="home-card" href="/fde/guide/01-what-is-fde">
      <span class="num">PART 1</span>
      <h3>认识 FDE</h3>
      <p>定义、边界、起源、为什么现在火，以及一份真实工作的切面。</p>
      <span class="arrow">第 1-3 章 →</span>
    </a>
    <a class="home-card" href="/fde/guide/04-tech-foundations">
      <span class="num">PART 2</span>
      <h3>建立能力</h3>
      <p>技术底座、业务与数据、六阶段交付法。知道自己该学什么、学到什么程度。</p>
      <span class="arrow">第 4-6 章 →</span>
    </a>
    <a class="home-card" href="/fde/labs/">
      <span class="num">PART 3</span>
      <h3>走进现场</h3>
      <p>3 个可独立完成的 Lab，从数据、基线、原型到评测和上线检查。</p>
      <span class="arrow">Lab A/B/C →</span>
    </a>
    <a class="home-card" href="/fde/cases/">
      <span class="num">EVIDENCE</span>
      <h3>案例库</h3>
      <p>Palantir、Harvey、Sierra、John Deere、BBVA、火山引擎……按可信度分级阅读。</p>
      <span class="arrow">60+ 案例 →</span>
    </a>
    <a class="home-card" href="/fde/guide/09-career-and-interview">
      <span class="num">PART 4</span>
      <h3>成为 FDE</h3>
      <p>能力罗盘、作品集、8 类面试题、中国现场的特殊约束。</p>
      <span class="arrow">第 9-10 章 →</span>
    </a>
    <a class="home-card" href="/fde/appendices/templates">
      <span class="num">TOOLKIT</span>
      <h3>模板工具箱</h3>
      <p>发现访谈、价值模型、部署计划、评测集、交接清单、事故复盘等 12 份模板。</p>
      <span class="arrow">直接复制使用 →</span>
    </a>
  </div>
</div>

<div class="home-section">
  <div class="home-panel" style="text-align: center; padding: 36px 24px">
    <div class="section-kicker" style="justify-content: center">Open source</div>
    <h2 class="section-title" style="margin-bottom: 10px">把现场经验，变成公共知识</h2>
    <p class="section-desc" style="margin: 0 auto 18px; text-align: center">这本指南以 MIT 许可证开源。欢迎纠错、补案例、贡献模板。所有数据都标注口径，所有不确定都允许被质疑。</p>
    <div class="cta-row" style="justify-content: center">
      <a class="primary" href="https://github.com/sddzlsc/fde" target="_blank" rel="noreferrer">在 GitHub 上查看 →</a>
      <a href="/fde/about">关于这本指南</a>
      <a href="/fde/contributing">如何贡献</a>
    </div>
  </div>
</div>
