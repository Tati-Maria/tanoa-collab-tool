import { cn } from "@/lib/utils"

interface TypographyProps {
    text: string;
    variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
    className?: string;
}

const Typography = ({text, variant, className}: TypographyProps) => {
    const TypographyTag = `${variant}` as keyof JSX.IntrinsicElements;

  return (
    <TypographyTag className={cn(className)}>{text}</TypographyTag>
  )
}

export default Typography