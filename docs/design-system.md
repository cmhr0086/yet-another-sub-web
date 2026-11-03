# 设计系统

界面遵循 Material Design 2，配色和层级与 [vmnox.com](https://vmnox.com) 保持一致。需要新颜色或新层级时，先加令牌，不要在组件里写死。

## 令牌

颜色和字体定义在 `app/globals.css`，浅色和深色各一套，再由 `tailwind.config.ts` 映射成 Tailwind 类名。

| 类别 | 令牌 | 用途 |
| --- | --- | --- |
| 背景 | `surface`、`panel`、`container`、`container-hover` | 页面、面板、文本框 |
| 文字 | `on`、`muted` | 正文；说明文字 |
| 主色 | `primary`、`primary-hover`、`on-primary` | 主操作、选中、聚焦 |
| 顶栏 | `app-bar`、`on-app-bar` | 顶栏 |
| 语义 | `error`、`warning`、`on-warning` | 错误；过期提示 |
| 提示条 | `snackbar`、`on-snackbar`、`snackbar-action` | Snackbar，与当前主题明暗相反 |
| 开关 | `switch-off`、`switch-thumb-off`、`switch-on` | Switch |
| 图标底色 | `tonal-*`、`on-tonal-*`（blue、cyan、indigo、slate、teal） | 列表行的圆形图标 |
| 分隔线 | `outline` | 面板内分隔线 |
| 层级 | `shadow-e1`、`e2`、`e4`、`e6`、`e8` | 面板、按钮、顶栏、Snackbar、菜单 |
| 圆角 | `rounded`（4px）、`rounded-lg`（8px） | 控件；面板 |
| 字体 | `font-sans`、`font-mono` | 系统字体；链接 |

## 组件

组件在 `components/ui/`。

| 组件 | 用途 | 说明 |
| --- | --- | --- |
| `Button` | 操作按钮 | `contained` 每个面板最多一个，其余用 `text`；支持 `isLoading` |
| `Field`、`TextField`、`TextareaField` | Filled 文本框 | 聚焦或出错时底线为 2px；`error` 会替换 `hint` |
| `Combobox` | 可搜索的下拉框 | `allowCustom` 允许输入列表外的值，否则失焦时还原 |
| `SwitchRow` | 带说明的开关 | 标题说功能，说明写影响或风险 |
| `ListRow` | 图标、标题、说明和行尾操作 | 结果项都用它；`isStale` 表示内容已过期 |
| `TonalIcon` | 圆形图标 | 只用 `tonal-*` 令牌 |
| `CopyButton` | 复制按钮 | 复制后短暂显示对勾 |
| `ThemeSwitch` | 顶栏的三段式主题切换 | 浅色、深色、跟随系统 |
| `Snackbar` | 全局提示 | 通过 `lib/notify.ts` 调用，出错时可带“重试” |

## 约定

- 主要操作和表单控件的触控目标不小于 44px，图标按钮必须有 `aria-label`，装饰图标加 `aria-hidden`。
- 字段错误显示在字段下方，并把焦点移到第一个出错的字段。操作结果和网络错误用 Snackbar。
- 不禁止页面缩放。
