"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { PersonalInfo } from "@/lib/types"

interface PersonalInfoFormProps {
  data: PersonalInfo
  updateData: (data: PersonalInfo) => void
}

export function PersonalInfoForm({ data, updateData }: PersonalInfoFormProps) {
  const [formData, setFormData] = useState<PersonalInfo>(data)

  useEffect(() => {
    // Only update parent state when form loses focus to avoid too many re-renders
    const handleBlur = () => {
      updateData(formData)
    }

    window.addEventListener("blur", handleBlur)
    return () => {
      window.removeEventListener("blur", handleBlur)
      // Also update when unmounting
      updateData(formData)
    }
  }, [formData, updateData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-handwriting text-slate-800">Tell us about yourself</h2>
        <p className="text-slate-600 mt-2">Let's start with your basic information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-slate-700">
            Full Name
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="border-slate-300 focus:border-teal-500 focus:ring-teal-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="title" className="text-slate-700">
            Professional Title
          </Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Frontend Developer"
            className="border-slate-300 focus:border-teal-500 focus:ring-teal-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-slate-700">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john.doe@example.com"
            className="border-slate-300 focus:border-teal-500 focus:ring-teal-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-slate-700">
            Phone
          </Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(123) 456-7890"
            className="border-slate-300 focus:border-teal-500 focus:ring-teal-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="text-slate-700">
            Location
          </Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="New York, NY"
            className="border-slate-300 focus:border-teal-500 focus:ring-teal-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary" className="text-slate-700">
          Professional Summary
        </Label>
        <Textarea
          id="summary"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          placeholder="Briefly describe your professional background and key strengths..."
          className="border-slate-300 focus:border-teal-500 focus:ring-teal-500 min-h-[120px]"
        />
      </div>
    </div>
  )
}
