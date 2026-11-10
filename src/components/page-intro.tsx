import { Reveal } from "@/components/motion";

interface PageIntroProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <Reveal className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {description ? <p className="page-lede">{description}</p> : null}
    </Reveal>
  );
}

