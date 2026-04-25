interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeader({ title, subtitle, centered = false }: SectionHeaderProps) {
  return (
    <div className={`mb-8 ${centered ? "text-center" : ""}`}>
      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--primary)]">{title}</h2>
      <div className={`flex items-center gap-3 mt-2 ${centered ? "justify-center" : ""}`}>
        <div className="h-0.5 w-12 bg-[var(--gold)]" />
        {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
      </div>
    </div>
  );
}
