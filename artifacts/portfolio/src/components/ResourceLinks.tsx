import type { T, TranslationKey } from '../i18n/translations';
import { publicAssetUrl } from '../lib/assets';

type Resource = { label: TranslationKey; href?: string | null; file?: boolean };

export function ResourceLinks({ resources, context, t }: { resources: Resource[]; context: string; t: T }) {
  const available = resources.filter((resource) => resource.href);
  if (!available.length) return null;
  return (
    <div className="resource-links">
      {available.map(({ label, href, file }) => (
        <a key={`${label}-${href}`} href={file ? publicAssetUrl(href!) : href!}
          {...(file ? { download: true } : { target: '_blank', rel: 'noopener noreferrer' })}>
          {t(label)}<span className="sr-only"> — <bdi dir="auto">{context}</bdi>{!file && ` ${t('opensNewTab')}`}</span>
        </a>
      ))}
    </div>
  );
}
