import { ImageIcon } from 'lucide-react'

interface ImagePlaceholderProps {
  label?: string
  className?: string
  src?: string
  alt?: string
}

export default function ImagePlaceholder({ label = 'Afbeelding', className = '', src, alt }: ImagePlaceholderProps) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <img
          src={src}
          alt={alt || label}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    )
  }
  return (
    <div className={`bg-floren-card-alt border border-dashed border-floren-border flex items-center justify-center text-floren-text-muted text-sm ${className}`}>
      <ImageIcon className="w-4 h-4 mr-2 opacity-60" />
      {label}
    </div>
  )
}
