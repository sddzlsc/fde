<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

type Dimension = '工程力' | '业务力' | '产品力' | '现场力'

interface Question {
  dim: Dimension
  text: string
}

const dimensions: Dimension[] = ['工程力', '业务力', '产品力', '现场力']

const questions: Question[] = [
  { dim: '工程力', text: '我能用命令行完成文件操作、运行脚本、查看日志。' },
  { dim: '工程力', text: '我能读懂一段 HTTP 请求/响应，并用 curl 或 Postman 调通 API。' },
  { dim: '工程力', text: '我能写 SQL 完成多表关联、聚合和去重。' },
  { dim: '工程力', text: '我能用 Git 管理代码，处理分支和冲突。' },
  { dim: '工程力', text: '我能在陌生系统里定位一个报错：看日志、复现、缩小范围、验证修复。' },
  { dim: '业务力', text: '我能说清一个业务岗位的日常流程、输入输出和考核指标。' },
  { dim: '业务力', text: '我能通过访谈找到「用户说的问题」背后的真实痛点。' },
  { dim: '业务力', text: '我能为一个 AI 项目算出基线、目标和 ROI。' },
  { dim: '业务力', text: '我能画出数据从源系统到使用现场的路径，并识别权限/质量问题。' },
  { dim: '业务力', text: '我能判断一个场景值不值得做，并说出不做的理由。' },
  { dim: '产品力', text: '我能把一个模糊需求拆成可验证的用户故事和验收标准。' },
  { dim: '产品力', text: '我能设计一个最小可用原型，而不是一次性做完整产品。' },
  { dim: '产品力', text: '我能设计评测集，并用数据判断效果是否真的变好。' },
  { dim: '产品力', text: '我能把现场反复出现的需求抽象成可复用能力。' },
  { dim: '产品力', text: '我能写清楚一份交接文档，让没参与项目的人接手。' },
  { dim: '现场力', text: '我能在客户/业务方面前把技术问题讲清楚，不堆术语。' },
  { dim: '现场力', text: '我能在信息不全、目标变化时推进项目，而不是等指令。' },
  { dim: '现场力', text: '我能处理干系人冲突，找到真正的决策者。' },
  { dim: '现场力', text: '我能在出事故时先止损、再沟通、再复盘。' },
  { dim: '现场力', text: '我能持续记录现场发现，并主动反哺产品或团队。' }
]

const options = [
  { value: 0, label: '没做过' },
  { value: 1, label: '知道概念' },
  { value: 2, label: '指导下做过' },
  { value: 3, label: '独立做过' },
  { value: 4, label: '能教别人' }
]

const STORAGE_KEY = 'fde-self-check-v1'

const answers = ref<number[]>(Array(questions.length).fill(-1))
const ready = ref(false)

onMounted(() => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length === questions.length) {
        answers.value = parsed.map((v) => (typeof v === 'number' && v >= 0 && v <= 4 ? v : -1))
      }
    }
  } catch {
    // localStorage 不可用时静默降级
  }
  ready.value = true
})

watch(
  answers,
  (value) => {
    if (!ready.value) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    } catch {
      // 忽略写入失败
    }
  },
  { deep: true }
)

const answered = computed(() => answers.value.filter((v) => v >= 0).length)
const total = computed(() => answers.value.reduce((sum, v) => sum + Math.max(v, 0), 0))

const dimScores = computed(() =>
  dimensions.map((dim) => {
    const idx = questions.map((q, i) => (q.dim === dim ? i : -1)).filter((i) => i >= 0)
    const score = idx.reduce((sum, i) => sum + Math.max(answers.value[i], 0), 0)
    return { dim, score, max: idx.length * 4 }
  })
)

const level = computed(() => {
  if (total.value <= 20) {
    return {
      name: '起点：先建立地图',
      desc: '你不需要立刻成为工程师。先把第 1、2 章读完，完成第 4 章的自测动作，再选一个 Lab 做最小版本。'
    }
  }
  if (total.value <= 40) {
    return {
      name: '探索者：用项目驱动',
      desc: '你已经有一定基础。建议先做 Lab A，把「发现 → 定义 → 原型 → 评测」跑一遍，再补第 5、6 章的方法。'
    }
  }
  if (total.value <= 60) {
    return {
      name: '准 FDE：补短板',
      desc: '你具备独立交付的雏形。重点补最弱的一维，完成一个可展示的作品集项目，并开始模拟面试。'
    }
  }
  return {
    name: '现场型：从作品到机会',
    desc: '你已经能独立负责部署。现在缺的不是知识，而是一个真实场景、一个愿意为你背书的人，以及更系统的复盘。'
  }
})

const weakest = computed(() => {
  const answeredDims = dimScores.value.filter((d) =>
    answers.value.some((v, i) => v >= 0 && questions[i].dim === d.dim)
  )
  if (answeredDims.length < 4) return ''
  const sorted = [...answeredDims].sort((a, b) => a.score / a.max - b.score / b.max)
  const min = sorted[0]
  const max = sorted[sorted.length - 1]
  // 四维同分时不强行制造“最弱项”
  if (min.score / min.max >= max.score / max.max) return ''
  return min.dim
})

function choose(index: number, value: number) {
  answers.value[index] = value
}

function reset() {
  answers.value = Array(questions.length).fill(-1)
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // 忽略
  }
}
</script>

<template>
  <div class="self-check">
    <div class="self-check__head">
      <h3>FDE 能力自评 · 20 题</h3>
      <span class="self-check__progress">已完成 {{ answered }} / {{ questions.length }}</span>
    </div>

    <div v-for="(q, index) in questions" :key="index" class="self-check__item">
      <div class="self-check__q">
        <span class="dim">{{ q.dim }}</span>{{ index + 1 }}. {{ q.text }}
      </div>
      <div class="self-check__opts">
        <button
          v-for="opt in options"
          :key="opt.value"
          type="button"
          :class="{ active: answers[index] === opt.value }"
          @click="choose(index, opt.value)"
        >
          {{ opt.label }}
        </button>
      </div>
    </div>

    <div class="self-check__result">
      <div class="self-check__score">{{ total }} <span style="font-size: 14px; font-weight: 500">/ 80</span></div>
      <div class="self-check__level">{{ level.name }}</div>
      <p class="self-check__desc">{{ level.desc }}</p>
      <p v-if="answered > 0 && answered < questions.length" class="self-check__desc" style="margin-top: 8px">
        还有 {{ questions.length - answered }} 题未作答，当前分数只是阶段性结果。
      </p>
      <p v-if="weakest && answered >= 10" class="self-check__desc" style="margin-top: 8px">
        当前相对最弱的一维是 <strong>{{ weakest }}</strong>，建议优先补它。
      </p>
      <p v-else-if="answered === questions.length" class="self-check__desc" style="margin-top: 8px">
        四维目前比较均衡。下一步不是继续刷分，而是去做一个真实项目，让分数接受现场检验。
      </p>

      <div class="self-check__bars">
        <div v-for="d in dimScores" :key="d.dim" class="self-check__bar">
          <span>{{ d.dim }}</span>
          <i><b :style="{ width: `${(d.score / d.max) * 100}%` }" /></i>
          <span>{{ d.score }}/{{ d.max }}</span>
        </div>
      </div>

      <div style="display: flex; gap: 10px; align-items: center; margin-top: 16px; flex-wrap: wrap">
        <button
          type="button"
          style="padding: 6px 14px; border: 1px solid var(--vp-c-divider); border-radius: 999px; background: var(--vp-c-bg); color: var(--vp-c-text-2); font-size: 12.5px; cursor: pointer"
          @click="reset"
        >
          重新开始
        </button>
        <span style="font-size: 12px; color: var(--vp-c-text-3)">结果只保存在你的浏览器，不会上传。</span>
      </div>
    </div>
  </div>
</template>
