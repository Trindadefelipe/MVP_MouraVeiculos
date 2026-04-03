interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionTitle({ title, subtitle, centered = true }: SectionTitleProps) {
  return (
    <div className={`mb-10 ${centered ? 'text-center' : ''}`}>
      <h2 className="text-2xl font-bold text-primary sm:text-3xl">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}
