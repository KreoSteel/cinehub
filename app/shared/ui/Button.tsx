interface ButtonProps {
  onClick?: () => void;
  className?: string;
  Icon?: React.ElementType;
  text: React.ReactNode;
}

export default function Button({ className, text, Icon, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`font-bold font-inter rounded-full px-6 h-12 cursor-pointer ${className}`}
    >
      <div className="flex gap-2">
        {Icon && <Icon />}
        {text}
      </div>
    </button>
  );
}
