
export const translations = {
  zh: {
    nav: { home: '首页', docs: '文档', components: '组件库', designs: '设计规范', management: '管理后台' },
    home: {
      hero: { 
        title: '汇聚全球代码艺术', 
        subtitle: 'DevFront 是全球前端开发者的代码圣殿。我们分享不仅仅是组件，更是对设计的敬畏与对代码的极致追求。' 
      },
      btn: { browse: '探索艺术馆', join: '加入全球阵营', sandbox: '启动在线实验室' },
      pulse: { title: '实时代码动脉', joined: '刚刚加入', contributed: '贡献了' },
      sections: {
        categories: { title: '灵感魔方', subtitle: '按维度探索卓越的设计实现' },
        challenge: { title: '本周工艺挑战', subtitle: '与全球顶尖高手角逐设计之巅', join: '参与挑战' }
      },
      monitor: {
        personal: '个人贡献看板',
        team: '全球洞察',
        realtime: '实时统计',
        codeLines: '代码行数',
        components: '贡献组件',
        points: '个人积分',
        downloads: '被引用次数',
        totalComps: '已验证艺术品',
        trending: '本周热门',
        topRated: '最高评价',
        contribute: '贡献你的艺术代码 →',
        uses: '次引用'
      }
    },
    designs: {
      manifesto: {
        title: '代码即艺术',
        subtitle: 'DevFront 设计规范旨在消除工程与美学之间的隔阂。我们通过严格的原子化标准，确保每一项数字资产都具有永恒的生命力。'
      },
      dna: {
        title: '资产基因 (Asset DNA)',
        atomic: '原子化架构',
        atomic_desc: '组件必须遵循单一职责原则，最小化逻辑耦合。',
        performant: '性能至上',
        performant_desc: '首屏零延迟感，复杂的动效必须经过 GPU 加速。',
        accessible: '无障碍兼容',
        accessible_desc: '支持屏幕阅读器与键盘导航，消除数字鸿沟。',
        resilient: '工程健壮性',
        resilient_desc: '能够优雅地处理边界数据与异步异常。'
      },
      tech: {
        title: '工程技术标准 (Engineering Standards)',
        naming: '语义化命名',
        naming_desc: '名称应遵循 [行业]+[功能] 模式，如 "医疗-生命体征看板"。',
        tailwind: 'Tailwind 优先',
        tailwind_desc: '禁止内联样式，所有布局与原子装饰必须使用 Tailwind 类名。',
        iconify: 'Iconify 图标体系',
        iconify_desc: '首选 Phosphor (ph:) 与 Tabler (tabler:) 字符集，保持图标语言统一。',
        element: 'UI 框架集成',
        element_desc: '实验室环境支持 Element Plus，但应仅作为复杂交互组件的补充。',
        assets: '重资产加载协议',
        assets_desc: '超过 1MB 的大文件（如 3D 模型）必须使用 CDN 或对象存储，并实现分片加载。'
      },
      foundations: {
        title: '设计基石 (Foundations)',
        colors: '色彩系统',
        typography: '排版体系',
        spacing: '空间与比例',
        elevation: '光影与层级'
      }
    },
    settings: {
      title: '个性化设置',
      lang: '语言切换',
      theme: '主题色',
      mourning: '哀悼模式',
      on: '已开启',
      off: '已关闭'
    }
  },
  en: {
    nav: { home: 'Home', docs: 'Docs', components: 'Components', designs: 'Designs', management: 'Management' },
    home: {
      hero: { 
        title: 'Crafting the Future Together', 
        subtitle: 'DevFront is the sanctuary for frontend artisans worldwide. We don\'t just share code; we share the passion for design and coding excellence.' 
      },
      btn: { browse: 'Explore Gallery', join: 'Join Global Network', sandbox: 'Launch Sandbox' },
      pulse: { title: 'Live Code Pulse', joined: 'joined just now', contributed: 'contributed' },
      sections: {
        categories: { title: 'Inspiration Matrix', subtitle: 'Explore excellence by sensory dimensions' },
        challenge: { title: 'Weekly Craft Challenge', subtitle: 'Compete with the world\'s best on specific themes', join: 'Enter Arena' }
      },
      monitor: {
        personal: 'Personal Dashboard',
        team: 'Global Insights',
        realtime: 'Real-time Stats',
        codeLines: 'Code Lines',
        components: 'Artifacts',
        points: 'Rank Points',
        downloads: 'Citations',
        totalComps: 'Verified Artifacts',
        trending: 'Trending This Week',
        topRated: 'Highest Rated',
        contribute: 'Contribute your art →',
        uses: 'citations'
      }
    },
    designs: {
      manifesto: {
        title: 'Code is Art',
        subtitle: 'The DevFront Design System aims to bridge the gap between engineering and aesthetics. We ensure every digital asset possesses timeless vitality through strict atomic standards.'
      },
      dna: {
        title: 'Asset DNA',
        atomic: 'Atomic Architecture',
        atomic_desc: 'Components must follow the single responsibility principle, minimizing logical coupling.',
        performant: 'Performance First',
        performant_desc: 'Zero-latency feel; complex motions must be GPU-accelerated.',
        accessible: 'Accessibility',
        accessible_desc: 'Support for screen readers and keyboard navigation to eliminate the digital divide.',
        resilient: 'Engineering Resilience',
        resilient_desc: 'Gracefully handles edge-case data and asynchronous exceptions.'
      },
      tech: {
        title: 'Engineering Standards',
        naming: 'Semantic Naming',
        naming_desc: 'Follow the [Industry]+[Function] pattern, e.g., "Medical - Vital Signs Dashboard".',
        tailwind: 'Tailwind-First',
        tailwind_desc: 'Avoid inline styles; all layouts and atomic decorations must use Tailwind classes.',
        iconify: 'Iconify System',
        iconify_desc: 'Prefer Phosphor (ph:) and Tabler (tabler:) icon sets for language consistency.',
        element: 'UI Framework Integration',
        element_desc: 'Element Plus is supported in Labs but should only supplement complex interactive components.',
        assets: 'Large Asset Protocol',
        assets_desc: 'Files >1MB (e.g., 3D models) must use CDN storage and implement fragment loading.'
      },
      foundations: {
        title: 'Foundations',
        colors: 'Color System',
        typography: 'Typography',
        spacing: 'Spacing & Scale',
        elevation: 'Light & Depth'
      }
    },
    settings: {
      title: 'Settings',
      lang: 'Language',
      theme: 'Theme Color',
      mourning: 'Mourning Mode',
      on: 'Enabled',
      off: 'Disabled'
    }
  }
};
