import { readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const docsRoot = join(root, 'docs')

const required = [
  'README.md',
  'LICENSE',
  'CONTRIBUTING.md',
  'CODE_OF_CONDUCT.md',
  'docs/index.md',
  'docs/about.md',
  'docs/contributing.md',
  'docs/guide/index.md',
  'docs/guide/roadmap.md',
  'docs/guide/self-check.md',
  ...Array.from({ length: 10 }, (_, i) => {
    const names = [
      '01-what-is-fde',
      '02-why-now',
      '03-day-in-the-life',
      '04-tech-foundations',
      '05-business-and-data',
      '06-delivery-lifecycle',
      '07-first-deployment',
      '08-production-and-evals',
      '09-career-and-interview',
      '10-china-context'
    ]
    return `docs/guide/${names[i]}.md`
  }),
  'docs/labs/index.md',
  'docs/labs/lab-a-ticket-triage.md',
  'docs/labs/lab-b-contract-review.md',
  'docs/labs/lab-c-knowledge-copilot.md',
  'docs/cases/index.md',
  'docs/cases/palantir.md',
  'docs/cases/ai-native.md',
  'docs/cases/enterprise.md',
  'docs/cases/china.md',
  'docs/appendices/glossary.md',
  'docs/appendices/templates.md',
  'docs/appendices/sources.md',
  'docs/appendices/faq.md',
  'docs/appendices/reading-list.md'
]

const errors = []
const warnings = []
const rows = []

const requiredChapterSections = ['## 本章小结', '## 练习']
const chapterPattern = /^docs\/guide\/(0[1-9]|10)-[^/]+\.md$/

function walk(dir) {
  const out = []
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === '.vitepress' || entry === 'public') continue
    const full = join(dir, entry)
    const st = statSync(full)
    if (st.isDirectory()) out.push(...walk(full))
    else if (entry.endsWith('.md')) out.push(full)
  }
  return out
}

function hanCount(text) {
  return (text.match(/[\u4e00-\u9fff]/g) || []).length
}

function readFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return null
  const data = {}
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (kv) data[kv[1]] = kv[2].replace(/^["']|["']$/g, '')
  }
  return data
}

function stripCode(text) {
  return text.replace(/```[\s\S]*?```/g, '').replace(/`[^`]*`/g, '')
}

function fileExistsForLink(candidate) {
  const variants = [candidate, `${candidate}.md`, `${candidate}.html`, join(candidate, 'index.md')]
  return variants.some((v) => {
    try {
      return statSync(v).isFile()
    } catch {
      return false
    }
  })
}

function checkLink(link, file, text) {
  if (!link) return
  if (/^(https?:|mailto:|tel:|#)/.test(link)) return
  const clean = link.split('#')[0].split('?')[0]
  if (!clean) return

  let candidate
  if (clean.startsWith('/fde/')) {
    candidate = join(docsRoot, clean.replace(/^\/fde\//, ''))
  } else if (clean.startsWith('/')) {
    candidate = join(docsRoot, clean.replace(/^\//, ''))
  } else {
    candidate = resolve(dirname(file), clean)
  }

  if (!fileExistsForLink(candidate)) {
    const rel = relative(root, file)
    errors.push(`断链：${rel} -> ${link}`)
  }
}

for (const item of required) {
  try {
    const st = statSync(join(root, item))
    if (!st.isFile()) errors.push(`缺少文件（不是文件）：${item}`)
  } catch {
    errors.push(`缺少文件：${item}`)
  }
}

const files = walk(docsRoot).filter((f) => f.endsWith('.md'))
for (const file of files) {
  const rel = relative(root, file)
  const raw = readFileSync(file, 'utf8')
  const text = stripCode(raw)
  const fm = readFrontmatter(raw)
  const h1s = text.match(/^# .+$/gm) || []
  const tables = (text.match(/^\|.+\|$/gm) || []).length
  const chars = hanCount(raw)

  rows.push({ file: rel, chars, tables })

  if (!fm) errors.push(`${rel}: 缺少 frontmatter`)
  else {
    if (!fm.title) errors.push(`${rel}: frontmatter 缺少 title`)
    if (!fm.description && rel !== 'docs/index.md') {
      warnings.push(`${rel}: frontmatter 缺少 description（建议补）`)
    }
  }

  if (rel !== 'docs/index.md' && h1s.length !== 1) {
    errors.push(`${rel}: 期望 1 个 H1，实际 ${h1s.length} 个`)
  }

  if (/\bTODO\b|\bTBD\b|\bFIXME\b|Lorem ipsum|占位符/.test(text)) {
    errors.push(`${rel}: 含 TODO/TBD/FIXME/Lorem/占位符`)
  }

  if (chapterPattern.test(rel)) {
    for (const section of requiredChapterSections) {
      if (!text.includes(section)) errors.push(`${rel}: 缺少「${section}」`)
    }
    if (!text.includes('source-note')) errors.push(`${rel}: 缺少 source-note 资料来源`)
    if (tables < 4) warnings.push(`${rel}: 表格行偏少（${tables} 行）`)
    if (chars < 3000) errors.push(`${rel}: 中文字数 ${chars}，低于 3000 下限`)
    else if (chars < 4000) warnings.push(`${rel}: 中文字数 ${chars}，低于建议的 4000`)
  } else if (rel.startsWith('docs/labs/')) {
    if (chars < 1800) errors.push(`${rel}: 中文字数 ${chars}，低于 1800 下限`)
  } else if (rel.startsWith('docs/cases/')) {
    if (chars < 1500) errors.push(`${rel}: 中文字数 ${chars}，低于 1500 下限`)
  }

  const links = new Set()
  const mdLinkRe = /\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g
  for (const m of text.matchAll(mdLinkRe)) links.add(m[1])
  const hrefRe = /href="([^"]+)"/g
  for (const m of text.matchAll(hrefRe)) links.add(m[1])

  for (const link of links) checkLink(link, file, text)
}

for (const [i, row] of rows.entries()) {
  const pad = row.file.padEnd(42)
  console.log(`${String(i + 1).padStart(2, '0')}  ${pad} ${String(row.chars).padStart(5)} 字  ${row.tables} 行表格`)
}

console.log('')
console.log(`共检查 ${rows.length} 个 Markdown 页面，${rows.reduce((s, r) => s + r.chars, 0)} 个中文字符。`)

if (warnings.length) {
  console.log('')
  console.log(`⚠️  警告 ${warnings.length} 条：`)
  for (const w of warnings) console.log(`  - ${w}`)
}

if (errors.length) {
  console.log('')
  console.log(`❌ 错误 ${errors.length} 条：`)
  for (const e of errors) console.log(`  - ${e}`)
  process.exit(1)
}

console.log('')
console.log('✅ 内容结构检查通过。')
