import { toast } from "sonner";

// MD2 的 Snackbar 同一时间只显示一条，后一条替换前一条
export const notify = (message: string, action?: { label: string, onClick: () => void }) =>
    toast(message, { id: 'snackbar', action: action ?? { label: '知道了', onClick: () => { } } })
