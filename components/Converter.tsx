'use client'

import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown, Download, Link2, Scissors, SlidersHorizontal, TriangleAlert } from "lucide-react";
import { useMemo, useState } from "react";

import { config as cfg } from "@/config";
import { copyText } from "@/lib/copyText";
import { backends, createSub, emptySubForm, validateSubForm } from "@/lib/createSub";
import { createShortSub, shortUrlService } from "@/lib/createShortSub";
import { notify } from "@/lib/notify";
import { Button } from "@/components/ui/Button";
import { Combobox } from "@/components/ui/Combobox";
import { CopyButton } from "@/components/ui/CopyButton";
import { TextareaField, TextField } from "@/components/ui/Field";
import { ListRow } from "@/components/ui/ListRow";
import { SwitchRow } from "@/components/ui/SwitchRow";
import { TonalIcon } from "@/components/ui/TonalIcon";

const clashTargets = ["自动识别", "Clash", "ClashR"];

const clientGroups = [{ items: Object.keys(cfg.clients) }];
const backendGroups = [{ items: backends }];
const remoteConfigGroups = cfg.remoteConfig.map(({ category, items }) => ({
  title: category,
  items: items.map(item => item.label),
}));

const shortUrlHost = (() => {
  try {
    return new URL(shortUrlService).host;
  } catch {
    return '';
  }
})();

const panel = "rounded-lg bg-panel shadow-e1";
const groupTitle = "px-4 pb-2 pt-4 text-xs font-medium text-muted";

export const Converter = () => {
  const [form, setForm] = useState(emptySubForm);
  const [errors, setErrors] = useState<SubFormErrors>({});
  const [subLink, setSubLink] = useState('');
  const [shortSubLink, setShortSubLink] = useState('');
  const [shortLoading, setShortLoading] = useState(false);

  const update = <K extends keyof SubForm>(key: K, value: SubForm[K]) => {
    setForm(current => ({ ...current, [key]: value }));
    if (key in errors) setErrors(current => ({ ...current, [key]: undefined }));
  };

  const currentLink = useMemo(
    () => (Object.keys(validateSubForm(form)).length === 0 ? createSub(form) : ''),
    [form],
  );
  const isStale = subLink !== '' && subLink !== currentLink;

  const advancedCount = useMemo(() => {
    const values = [form.config, form.include, form.exclude, form.backend !== emptySubForm.backend];
    return values.filter(Boolean).length + cfg.switchCells.filter(({ key }) => form[key]).length;
  }, [form]);

  const generate = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validateSubForm(form);
    setErrors(nextErrors);
    if (nextErrors.url) return document.getElementById('sub-url')?.focus();
    if (nextErrors.target) return document.getElementById('sub-target')?.focus();

    if (currentLink !== subLink) setShortSubLink('');
    setSubLink(currentLink);
    notify(await copyText(currentLink) ? '定制订阅已复制' : '订阅链接已生成，请手动复制');
  };

  const generateShort = async () => {
    setShortLoading(true);
    try {
      const link = await createShortSub(subLink);
      setShortSubLink(link);
      notify(await copyText(link) ? '短链接已复制' : '短链接已生成，请手动复制');
    } catch (e) {
      notify((e as Error).message, { label: '重试', onClick: generateShort });
    } finally {
      setShortLoading(false);
    }
  };

  const importClash = () => {
    window.location.href = `clash://install-config?url=${encodeURIComponent(shortSubLink || subLink)}`;
  };

  return (
    <>
      <form aria-label="转换配置" onSubmit={generate} noValidate className={panel}>
        <h2 className={groupTitle}>订阅 · 客户端</h2>
        <div className="flex flex-col gap-4 px-4 pb-4 pt-2">
          <TextareaField
            id="sub-url"
            label="订阅链接"
            mono
            value={form.url}
            onValueChange={(value) => update('url', value)}
            placeholder="https://example.com/sub?token=..."
            hint="支持机场订阅或节点链接，多个链接每行一个"
            error={errors.url}
          />
          <Combobox
            id="sub-target"
            label="客户端"
            value={form.target}
            onValueChange={(value) => update('target', value)}
            groups={clientGroups}
            placeholder="选择你使用的客户端"
            error={errors.target}
          />
        </div>

        <Collapsible.Root className="group border-t border-outline">
          <Collapsible.Trigger className="flex min-h-[72px] w-full items-center gap-4 px-4 py-3.5 text-left transition-colors duration-150 hover:bg-on/5">
            <TonalIcon tone="indigo"><SlidersHorizontal className="size-5" /></TonalIcon>
            <span className="min-w-0 flex-1">
              <span className="block text-base font-medium">高级选项</span>
              <span className="mt-0.5 block text-sm text-muted">
                {advancedCount > 0 ? `已设置 ${advancedCount} 项` : '后端、远程配置、节点筛选和开关'}
              </span>
            </span>
            <ChevronDown aria-hidden className="size-5 shrink-0 text-muted transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </Collapsible.Trigger>
          <Collapsible.Content className="flex flex-col gap-4 px-4 pb-2 pt-2">
            <Combobox
              id="sub-backend"
              label="后端地址"
              mono
              allowCustom
              value={form.backend}
              onValueChange={(value) => update('backend', value)}
              groups={backendGroups}
              placeholder="留空则使用默认后端"
            />
            <Combobox
              id="sub-config"
              label="远程配置"
              allowCustom
              value={form.config}
              onValueChange={(value) => update('config', value)}
              groups={remoteConfigGroups}
              placeholder="选择或输入配置地址，留空则不使用"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                id="sub-include"
                label="包含节点"
                value={form.include}
                onValueChange={(value) => update('include', value)}
                placeholder="关键字，支持正则"
              />
              <TextField
                id="sub-exclude"
                label="排除节点"
                value={form.exclude}
                onValueChange={(value) => update('exclude', value)}
                placeholder="关键字，支持正则"
              />
            </div>
            <div>
              {cfg.switchCells.map(({ key, title, description }) => (
                <SwitchRow
                  key={key}
                  id={`sub-${key}`}
                  title={title}
                  description={description}
                  checked={form[key]}
                  onCheckedChange={(checked) => update(key, checked)}
                />
              ))}
            </div>
          </Collapsible.Content>
        </Collapsible.Root>

        <div className="border-t border-outline p-4">
          <Button type="submit" className="w-full">{subLink ? '重新生成' : '生成订阅链接'}</Button>
        </div>
      </form>

      <section aria-labelledby="result-title" className={panel}>
        <h2 id="result-title" className={groupTitle}>结果</h2>
        <div role="status">
          {isStale ? (
            <p className="mx-4 mb-2 flex gap-3 rounded bg-warning p-3 text-sm leading-normal text-on-warning">
              <TriangleAlert aria-hidden className="size-5 shrink-0" />
              配置已修改，当前链接已过期，请重新生成
            </p>
          ) : null}
        </div>
        {subLink ? (
          <>
            <ListRow
              tone="blue"
              icon={<Link2 className="size-5" />}
              title="定制订阅"
              description={subLink}
              mono
              isStale={isStale}
              action={<CopyButton label="定制订阅" value={subLink} disabled={isStale} />}
            />
            <ListRow
              tone="cyan"
              icon={<Scissors className="size-5" />}
              title="订阅短链"
              description={shortSubLink || (shortUrlHost ? `由 ${shortUrlHost} 提供，你的订阅链接会发送给该服务` : '未配置短链接服务')}
              mono={Boolean(shortSubLink)}
              isStale={isStale && Boolean(shortSubLink)}
              action={shortSubLink ? (
                <CopyButton label="订阅短链" value={shortSubLink} disabled={isStale} />
              ) : (
                <Button
                  variant="text"
                  disabled={isStale || !shortUrlService}
                  isLoading={shortLoading}
                  onClick={generateShort}
                >
                  生成
                </Button>
              )}
            />
            {clashTargets.includes(form.target) ? (
              <ListRow
                tone="teal"
                icon={<Download className="size-5" />}
                title="导入至 Clash"
                description="在已安装的 Clash 客户端中打开"
                action={<Button variant="text" disabled={isStale} onClick={importClash}>导入</Button>}
              />
            ) : null}
          </>
        ) : (
          <div className="flex items-center gap-4 px-4 pb-4 pt-1.5">
            <TonalIcon tone="slate"><Link2 className="size-5" /></TonalIcon>
            <p className="text-sm leading-normal text-muted">填写订阅链接并选择客户端后，结果会显示在这里</p>
          </div>
        )}
      </section>
    </>
  );
}
