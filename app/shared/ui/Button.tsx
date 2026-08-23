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
      className={`font-bold font-inter rounded-lg px-7 h-11 cursor-pointer ${className}`}
    >
      <div className="flex items-center gap-1.5">
        {Icon}
        <p>{text}</p>
      </div>
    </button>
  );
}
