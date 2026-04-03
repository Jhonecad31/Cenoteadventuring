import { Link, Button } from "@heroui/react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: React.ElementType; 
  size?: "lg" | "sm";
  text: string;
    url: string;
    color?: "primary" | "secondary" | "tertiary";
}

export default function BtnLinkCustom({ text, url, color}: ButtonProps) {

    const colors = {
        primary: "bg-linear-to-br from-sky-700 via-sky-400 to-cyan-500 text-white font-semibold text-base",
        secondary: "bg-white text-black font-semibold text-base",
        tertiary: "bg-amber-500 text-black text-base",
    }

    return (
        <Button
            as={Link}
            size="lg"
            className={`${color ? colors[color] : colors.primary}`}
            href={url}
            radius="full"
        >
            {text}
        </Button>
    );
}