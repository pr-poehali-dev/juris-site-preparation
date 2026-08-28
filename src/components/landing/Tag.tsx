interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "lime" | "outline" | "dark" | "sky" | "bordo";
  className?: string;
}

export default function Tag({ children, variant = "default", className = "" }: TagProps) {
  const styles = {
    default: "bg-paper-100 text-graphite-800 border border-graphite-300/70",
    lime: "bg-sky text-graphite-900 border border-sky",
    sky: "bg-sky text-graphite-900 border border-sky",
    outline: "bg-transparent text-bordo border border-bordo/40",
    dark: "bg-bordo text-white border border-bordo",
    bordo: "bg-bordo text-white border border-bordo",
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-golos uppercase tracking-[0.18em] font-bold ${styles} ${className}`}
    >
      {children}
    </span>
  );
}

