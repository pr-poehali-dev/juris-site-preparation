interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "lime" | "outline" | "dark";
  className?: string;
}

export default function Tag({ children, variant = "default", className = "" }: TagProps) {
  const styles = {
    default: "bg-paper-200 text-graphite-800 border border-graphite-300/60",
    lime: "bg-lime text-graphite-900 border border-graphite-900",
    outline: "bg-transparent text-graphite-800 border border-graphite-900",
    dark: "bg-graphite-900 text-paper-50 border border-graphite-900",
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-golos uppercase tracking-[0.15em] font-medium ${styles} ${className}`}
    >
      {children}
    </span>
  );
}
