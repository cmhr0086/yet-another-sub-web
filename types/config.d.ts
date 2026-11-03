interface Config {
    clients: Clients
    switchCells: SwitchCell[]
    remoteConfig: RemoteCategory[]
}
interface Clients {
    [key: string]: "clash" | "clashr" | "quan" | "quanx" | "loon" | "mellow" | "ss" | "sssub" | "ssd" | "ssr" | "surfboard" | "surge&ver=2" | "surge&ver=3" | "surge&ver=4" | "trojan" | "v2ray" | "singbox" | "mixed" | "auto"
}
interface SwitchCell {
    title: string
    description: string
    key: SwitchKey
}
type SwitchKey = "tfo" | "udp" | "scv" | "append_type" | "emoji" | "list"
interface RemoteConfigURL {
    label: string
    value: string
}
interface RemoteCategory {
    category: string
    items: RemoteConfigURL[]
}
interface SubForm extends Record<SwitchKey, boolean> {
    url: string;
    target: string;
    backend: string;
    config: string;
    include: string;
    exclude: string;
}
interface SubFormErrors {
    url?: string;
    target?: string;
}
