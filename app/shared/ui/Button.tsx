interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

export default function Button({ className, children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`font-bold font-inter rounded-sm px-3 h-9 cursor-pointer ${className}`}
    >
      <div className="flex items-center gap-1.5">
        {children}
      </div>
    </button>
  );
}
