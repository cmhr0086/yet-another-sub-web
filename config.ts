export const config: Config = {
    clients: {
        自动识别: "auto",
        Clash: "clash",
        ClashR: "clashr",
        Quantumult: "quan",
        QuantumultX: "quanx",
        Loon: "loon",
        Mellow: "mellow",
        Shadowsocks: "ss",
        ShadowsocksSub: "sssub",
        ShadowsocksD: "ssd",
        ShadowsocksR: "ssr",
        Surfboard: "surfboard",
        Surge2: "surge&ver=2",
        Surge3: "surge&ver=3",
        Surge4: "surge&ver=4",
        Trojan: "trojan",
        V2Ray: "v2ray",
        Singbox: "singbox",
        混合订阅: "mixed"
    },
    switchCells: [
        { title: "TCP 快速打开", description: "降低连接延迟，需要节点支持", key: "tfo" },
        { title: "UDP 启用", description: "为节点开启 UDP 转发", key: "udp" },
        { title: "关闭证书检查", description: "跳过 TLS 证书校验，存在安全风险", key: "scv" },
        { title: "显示节点类型", description: "在节点名前加上协议类型", key: "append_type" },
        { title: "显示 Emoji 旗帜", description: "在节点名前加上国旗", key: "emoji" },
        { title: "仅输出为节点", description: "只输出节点，不包含规则和策略组", key: "list" }
    ],
    remoteConfig: [
        {
            category: '通用规则',
            items: [
                {
                    label: "cutethotw 全能规则",
                    value:
                        "https://raw.githubusercontent.com/cutethotw/ClashRule/main/GeneralClashRule.ini"
                }
            ]
        }, {
            category: "ACL4SSR 规则",
            items: [
                {
                    label: "基础规则",
                    value:
                        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online.ini"
                },
                {
                    label: "无测速 基础规则",
                    value:
                        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_NoAuto.ini"
                },
                {
                    label: "去广告 基础规则",
                    value:
                        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_AdblockPlus.ini"
                },
                {
                    label: "精简规则",
                    value:
                        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini.ini"
                },
                {
                    label: "完整规则",
                    value:
                        "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full.ini"
                },
            ]
        }
    ]
}