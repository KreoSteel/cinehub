
interface UserAvatarProps {
  className?: string
}

export default function UserAvatar({ className }: UserAvatarProps) {
  return (
    <div className={`${className} rounded-lg h-9 w-9 border border-amber bg-amber-soft font-inter flex items-center justify-center text-xs`}>
      <p>KS</p>
    </div>
  );
}