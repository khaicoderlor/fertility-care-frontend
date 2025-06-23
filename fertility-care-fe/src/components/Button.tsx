interface ButtonActionProps {
  label: string;
  href?: string;
  variant?: "solid" | "outline";
  color?: "purple" | "primary";
  size?: "md" | "lg";
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonActionProps> = ({
  label,
  href,
  variant = "solid",
  size = "md",
  icon,
}) => {
  const base =
    "inline-flex items-center justify-center font-medium rounded-full transition duration-200";
  const sizes = {
    md: "px-6 py-2 text-base",
    lg: "px-8 py-4 text-lg",
  };
  const variants = {
    solid:
      "bg-gradient-to-r from-[#7F51B4] to-[#4E7FCD] text-white border-none shadow-lg hover:shadow-xl",
    outline:
      "bg-white border-2 border-purple-500 text-purple-600 hover:bg-purple-50",
  };

  const className = [
    base,
    sizes[size],
    variants[variant],
    "hover:scale-105",
  ].join(" ");

  if (href)
    return (
      <a href={href} className={className}>
        {icon}
        {label}
      </a>
    );
  return (
    <button className={className}>
      {icon}
      {label}
    </button>
  );
};

export default Button;
