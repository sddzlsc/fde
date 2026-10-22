import { defineConfig } from 'vitepress'

const SITE = 'https://sddzlsc.github.io/fde/'
const BASE = '/fde/'

export default defineConfig({
  lang: 'zh-CN',
  title: 'FDE 入门指南',
  description:
    '一份写给零基础读者的开源 FDE（前沿部署工程师）入门指南：从概念、能力地图、交付方法，到第一个真实项目。',
  base: BASE,
  cleanUrls: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${BASE}logo.svg` }],
    ['meta', { name: 'theme-color', content: '#0b1220' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'FDE 入门指南' }],
    [
      'meta',
      {
        property: 'og:description',
        content:
          '从零理解前沿部署工程师：概念、能力、六阶段交付法、实战 Lab、案例库与可复用模板。'
      }
    ],
    ['meta', { property: 'og:image', content: `${SITE}banner.svg` }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }]
  ],
  sitemap: {
    hostname: SITE
  },
  markdown: {
    theme: { light: 'github-light', dark: 'github-dark' },
    image: { lazyLoading: true },
    lineNumbers: false
  },
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'FDE 入门指南',
    nav: [
      { text: '指南', link: '/guide/', activeMatch: '^/guide/' },
      { text: '实战 Lab', link: '/labs/', activeMatch: '^/labs/' },
      { text: '案例库', link: '/cases/', activeMatch: '^/cases/' },
      { text: '资料', link: '/appendices/sources', activeMatch: '^/appendices/' },
      { text: '关于', link: '/about' }
    ],
    sidebar: [
      {
        text: '开始',
        items: [
          { text: '为什么读这本指南', link: '/guide/' },
          { text: '学习路线：从零到第一个项目', link: '/guide/roadmap' },
          { text: 'FDE 自评：你现在在哪一格', link: '/guide/self-check' }
        ]
      },
      {
        text: '第一部分 · 认识 FDE',
        items: [
          { text: '01  FDE 到底是什么', link: '/guide/01-what-is-fde' },
          { text: '02  为什么是现在', link: '/guide/02-why-now' },
          { text: '03  FDE 的一天与一个项目', link: '/guide/03-day-in-the-life' }
        ]
      },
      {
        text: '第二部分 · 建立能力',
        items: [
          { text: '04  零基础技术底座', link: '/guide/04-tech-foundations' },
          { text: '05  业务、数据与价值', link: '/guide/05-business-and-data' },
          { text: '06  六阶段交付法', link: '/guide/06-delivery-lifecycle' }
        ]
      },
      {
        text: '第三部分 · 走进现场',
        items: [
          { text: '07  你的第一个部署', link: '/guide/07-first-deployment' },
          { text: '08  生产化、评测与安全', link: '/guide/08-production-and-evals' },
          { text: '实战 Lab 总览', link: '/labs/' },
          { text: 'Lab A · 客服工单分流', link: '/labs/lab-a-ticket-triage' },
          { text: 'Lab B · 合同条款审查', link: '/labs/lab-b-contract-review' },
          { text: 'Lab C · 企业知识助手', link: '/labs/lab-c-knowledge-copilot' }
        ]
      },
      {
        text: '第四部分 · 成为 FDE',
        items: [
          { text: '09  职业路径与面试', link: '/guide/09-career-and-interview' },
          { text: '10  中国现场', link: '/guide/10-china-context' }
        ]
      },
      {
        text: '案例库',
        collapsed: false,
        items: [
          { text: '怎么读案例', link: '/cases/' },
          { text: 'Palantir：FDE 的原点', link: '/cases/palantir' },
          { text: 'AI 原生公司：Harvey / Sierra / Decagon', link: '/cases/ai-native' },
          { text: '大企业现场：John Deere / BBVA / 美国海军', link: '/cases/enterprise' },
          { text: '中国现场：火山引擎 / 安永 / 启盟 / 钱拓', link: '/cases/china' }
        ]
      },
      {
        text: '附录',
        collapsed: true,
        items: [
          { text: 'A · 术语表', link: '/appendices/glossary' },
          { text: 'B · 模板工具箱', link: '/appendices/templates' },
          { text: 'C · 案例与资料来源', link: '/appendices/sources' },
          { text: 'D · 常见问题', link: '/appendices/faq' },
          { text: 'E · 延伸阅读', link: '/appendices/reading-list' }
        ]
      },
      {
        text: '项目',
        collapsed: true,
        items: [
          { text: '关于这本指南', link: '/about' },
          { text: '如何贡献', link: '/contributing' }
        ]
      }
    ],
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索'
          },
          modal: {
            displayDetails: '显示详情',
            resetButtonTitle: '清除查询',
            backButtonTitle: '关闭搜索',
            noResultsText: '没有找到结果',
            footer: {
              selectText: '选择',
              selectKeyAriaLabel: '回车',
              navigateText: '导航',
              navigateUpKeyAriaLabel: '上箭头',
              navigateDownKeyAriaLabel: '下箭头',
              closeText: '关闭',
              closeKeyAriaLabel: 'Esc'
            }
          }
        }
      }
    },
    outline: {
      level: [2, 3],
      label: '本页目录'
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    langMenuLabel: '语言',
    lastUpdated: {
      text: '最后更新',
      formatOptions: {
        dateStyle: 'medium'
      }
    },
    editLink: {
      pattern: 'https://github.com/sddzlsc/fde/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },
    footer: {
      message: '用现场换理解，用交付换信任。',
      copyright: '以 MIT 许可证开源 · 欢迎贡献案例与纠错'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/sddzlsc/fde' }
    ]
  }
})
