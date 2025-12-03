"use client"

import type React from "react"

import { useRef, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { MAX_IMAGE_SIZE, ACCEPTED_IMAGE_TYPES } from "@/lib/constants"
import imageCompression from "browser-image-compression"

interface EventInvitationPreviewProps {
  backgroundImage: string
  onBackgroundChange: (image: string) => void
}

export function EventInvitationPreview({ backgroundImage, onBackgroundChange }: EventInvitationPreviewProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const [isCompressing, setIsCompressing] = useState(false)

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

    setIsCompressing(true)

    try {
      // Compress image if it's larger than 1MB
      let processedFile = file
      if (file.size > 1024 * 1024) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        }
        processedFile = await imageCompression(file, options)

        toast({
          title: "Image optimized",
          description: `Compressed from ${(file.size / 1024 / 1024).toFixed(2)}MB to ${(processedFile.size / 1024 / 1024).toFixed(2)}MB`,
        })
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result
        if (typeof result === "string") {
          onBackgroundChange(result)
          toast({
            title: "Success",
            description: "Background image updated successfully",
          })
        }
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
    } finally {
      setIsCompressing(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      
      <div
        className="relative w-full aspect-square rounded-3xl overflow-hidden  flex items-center justify-center"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-rgba(0, 0, 0, 0.3)"></div>

        
        
        <button className="absolute bottom-6 right-6 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors backdrop-blur-sm border border-white/30">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </button>
      </div>

      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={isCompressing}
        className="w-full bg-[#8B6BA3]/40 hover:bg-[#8B6BA3]/60 text-white py-3 px-4 rounded-xl font-medium transition-all backdrop-blur-sm border border-white/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>{isCompressing ? "⏳" : "🖼️"}</span>
        <span>{isCompressing ? "Processing..." : "Change background"}</span>
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload background image"
      />
    </div>
  )
}
