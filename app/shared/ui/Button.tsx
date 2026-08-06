interface ButtonProps {
  onClick?: () => void;
  className?: string;
  Icon?: React.ReactNode;
  text: React.ReactNode;
}

export default function Button({ className, text, Icon, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`font-bold font-inter rounded-2xl px-7 h-11 cursor-pointer ${className}`}
    >
      <div className="flex gap-2">
        {Icon}
        {text}
      </div>
    </button>
  );
}
