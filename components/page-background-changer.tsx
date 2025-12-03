"use client"

import { useRef } from "react"
import { useToast } from "@/hooks/use-toast"
import { MAX_IMAGE_SIZE, ACCEPTED_IMAGE_TYPES } from "@/lib/constants"
import imageCompression from "browser-image-compression"

interface PageBackgroundChangerProps {
  onBackgroundChange: (background: string) => void
}

export function PageBackgroundChanger({ onBackgroundChange }: PageBackgroundChangerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please select a valid image file (JPEG, PNG, GIF, or WebP)",
        variant: "destructive",
      })
      return
    }

    // Validate file size
    if (file.size > MAX_IMAGE_SIZE) {
      toast({
        title: "File too large",
        description: "Image size must be less than 5MB",
        variant: "destructive",
      })
      return
    }

    try {
      // Compress image if larger than 1MB
      let processedFile = file
      if (file.size > 1024 * 1024) {
        processedFile = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        })

        toast({
          title: "Image optimized",
          description: `Compressed from ${(file.size / 1024 / 1024).toFixed(2)}MB to ${(processedFile.size / 1024 / 1024).toFixed(2)}MB`,
        })
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        onBackgroundChange(result)
        toast({
          title: "Success",
          description: "Page background updated successfully",
        })
      }

      reader.onerror = () => {
        toast({
          title: "Error",
          description: "Failed to read image file",
          variant: "destructive",
        })
      }

      reader.readAsDataURL(processedFile)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process image",
        variant: "destructive",
      })
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES.join(",")}
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload page background image"
      />

      <button
        onClick={handleButtonClick}
        className="w-full bg-[#8B6BA3]/40 hover:bg-[#8B6BA3]/60 backdrop-blur-sm border border-white/10 rounded-2xl py-3 px-6 transition-all shadow-lg flex items-center justify-center gap-2 text-white font-medium cursor-pointer"
      >
        <span className="text-2xl">🖼️</span>
        <span>Change background</span>
      </button>
    </>
  )
}
