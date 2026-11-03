import { config as cfg } from '@/config'

export const backends = (process.env.NEXT_PUBLIC_BACKENDS ?? "http://127.0.0.1:25500/sub?").split('|').filter(Boolean)

export const emptySubForm: SubForm = {
    url: '',
    target: '',
    backend: backends[0] ?? '',
    config: '',
    include: '',
    exclude: '',
    tfo: false,
    udp: false,
    scv: false,
    append_type: false,
    emoji: false,
    list: false,
}

export const validateSubForm = (form: SubForm): SubFormErrors => {
    const errors: SubFormErrors = {}
    if (!form.url.trim()) errors.url = '请输入订阅链接'
    if (!form.target) errors.target = '请选择客户端'
    return errors
}

export const createSub = (form: SubForm) => {
    const { url, target, backend, config, include, exclude } = form

    const links = url.split(/[\n|]/).map(link => link.trim()).filter(Boolean).join('|')
    const flow = [
        backend || backends[0],
        `target=${cfg.clients[target]}`,
        `&url=${encodeURIComponent(links)}`,
        '&insert=false',
    ]

    const configItem = cfg.remoteConfig.flatMap(category => category.items).find(item => item.label === config)
    const configValue = configItem ? configItem.value : config

    if (config) flow.push(`&config=${encodeURIComponent(configValue)}`)
    if (include) flow.push(`&include=${encodeURIComponent(include)}`)
    if (exclude) flow.push(`&exclude=${encodeURIComponent(exclude)}`)
    cfg.switchCells.forEach(({ key }) => {
        if (form[key]) flow.push(`&${key}=true`)
    })

    return flow.join('')
}
