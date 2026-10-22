type Props = { index: string; id: string; title: string; aside?: string };

export function SectionHead({ index, id, title, aside }: Props) {
  return (
    <header className="section-head">
      <span className="section-num" dir="ltr">{index}</span>
      <h2 id={id}>{title}</h2>
      {aside && <span className="section-aside">{aside}</span>}
    </header>
  );
}
