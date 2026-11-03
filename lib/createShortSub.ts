import { encode } from 'js-base64';

export const shortUrlService = process.env.NEXT_PUBLIC_SHORTURL ?? ''

export const createShortSub = async (subLink: string): Promise<string> => {
    if (!shortUrlService) throw new Error('未配置短链接服务');

    const formData = new FormData();
    formData.append('longUrl', encode(subLink));

    const res = await fetch(`${shortUrlService}short`, {
        method: 'POST',
        body: formData,
    });
    if (!res.ok) throw new Error(`短链接服务返回错误（${res.status}）`);

    const data = await res.json();
    if (data.Code !== 1) throw new Error(data.Message || '短链接生成失败');
    return data.ShortUrl
}
