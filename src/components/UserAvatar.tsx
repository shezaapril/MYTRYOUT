import React, { useRef } from 'react';
import { Camera, User, Trash2 } from 'lucide-react';

interface UserAvatarProps {
  name: string;
  avatarUrl?: string | null;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  editable?: boolean;
  onAvatarChange?: (newUrl: string | null) => void;
  className?: string;
  onClick?: () => void;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  name,
  avatarUrl,
  size = 'md',
  editable = false,
  onAvatarChange,
  className = '',
  onClick
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Compute initials (e.g. "Sheiza Aprillia" -> "SA")
  const getInitials = (fullName: string) => {
    if (!fullName) return 'U';
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg',
    xl: 'w-20 h-20 text-2xl',
    '2xl': 'w-24 h-24 sm:w-28 sm:h-28 text-3xl'
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onAvatarChange) {
      // Validate file is image
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        onAvatarChange(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`relative inline-block select-none ${className}`}>
      <div
        onClick={onClick}
        className={`${sizeClasses[size]} rounded-full overflow-hidden flex items-center justify-center font-bold text-white shadow-sm ring-2 ring-white/80 dark:ring-slate-800 shrink-0 ${
          avatarUrl ? 'bg-slate-200 dark:bg-slate-700' : 'bg-gradient-palette'
        } ${onClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}`}
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name || 'Foto Profil'}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{getInitials(name)}</span>
        )}
      </div>

      {editable && onAvatarChange && (
        <div className="absolute -bottom-1 -right-1 flex items-center gap-1 z-10">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            title="Ganti Foto Profil"
            className="p-1.5 bg-[#F2619C] hover:bg-[#d84581] text-white rounded-full shadow-md transition-transform hover:scale-110 cursor-pointer border-2 border-white dark:border-slate-900"
          >
            <Camera className="w-3.5 h-3.5" />
          </button>

          {avatarUrl && (
            <button
              type="button"
              onClick={() => onAvatarChange(null)}
              title="Hapus Foto Profil"
              className="p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-full shadow-md transition-transform hover:scale-110 cursor-pointer border-2 border-white dark:border-slate-900"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>
      )}
    </div>
  );
};
