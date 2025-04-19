"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import type { Experience } from "@/lib/types"
import { Plus, Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ExperienceFormProps {
  data: Experience[]
  updateData: (data: Experience[]) => void
}

export function ExperienceForm({ data, updateData }: ExperienceFormProps) {
  const [experiences, setExperiences] = useState<Experience[]>(
    data.length
      ? data
      : [
          {
            company: "",
            position: "",
            location: "",
            startDate: "",
            endDate: "",
            description: "",
          },
        ],
  )

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const newExperiences = [...experiences]
    newExperiences[index] = {
      ...newExperiences[index],
      [name]: value,
    }
    setExperiences(newExperiences)
    updateData(newExperiences)
  }

  const addExperience = () => {
    const newExperiences = [
      ...experiences,
      {
        company: "",
        position: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]
    setExperiences(newExperiences)
    updateData(newExperiences)
  }

  const removeExperience = (index: number) => {
    const newExperiences = experiences.filter((_, i) => i !== index)
    setExperiences(newExperiences)
    updateData(newExperiences)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-handwriting text-slate-800">Work Experience</h2>
        <p className="text-slate-600 mt-2">Add your professional experience</p>
      </div>

      <AnimatePresence>
        {experiences.map((experience, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mb-6 border-slate-200 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-slate-800">
                    {experience.position || `Experience #${index + 1}`}
                  </h3>
                  {experiences.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExperience(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Remove
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`company-${index}`} className="text-slate-700">
                      Company
                    </Label>
                    <Input
                      id={`company-${index}`}
                      name="company"
                      value={experience.company}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="Example Corp"
                      className="border-slate-300 focus:border-teal-500 focus:ring-teal-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`position-${index}`} className="text-slate-700">
                      Position
                    </Label>
                    <Input
                      id={`position-${index}`}
                      name="position"
                      value={experience.position}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="Senior Developer"
                      className="border-slate-300 focus:border-teal-500 focus:ring-teal-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`location-${index}`} className="text-slate-700">
                      Location
                    </Label>
                    <Input
                      id={`location-${index}`}
                      name="location"
                      value={experience.location}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="New York, NY"
                      className="border-slate-300 focus:border-teal-500 focus:ring-teal-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`startDate-${index}`} className="text-slate-700">
                        Start Date
                      </Label>
                      <Input
                        id={`startDate-${index}`}
                        name="startDate"
                        value={experience.startDate}
                        onChange={(e) => handleChange(index, e)}
                        placeholder="MM/YYYY"
                        className="border-slate-300 focus:border-teal-500 focus:ring-teal-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`endDate-${index}`} className="text-slate-700">
                        End Date
                      </Label>
                      <Input
                        id={`endDate-${index}`}
                        name="endDate"
                        value={experience.endDate}
                        onChange={(e) => handleChange(index, e)}
                        placeholder="MM/YYYY or Present"
                        className="border-slate-300 focus:border-teal-500 focus:ring-teal-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <Label htmlFor={`description-${index}`} className="text-slate-700">
                    Description
                  </Label>
                  <Textarea
                    id={`description-${index}`}
                    name="description"
                    value={experience.description}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="Describe your responsibilities and achievements..."
                    className="border-slate-300 focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      <Button
        type="button"
        variant="outline"
        onClick={addExperience}
        className="w-full border-dashed border-slate-300 hover:border-teal-500 hover:bg-teal-50 text-slate-600 hover:text-teal-600"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Another Experience
      </Button>
    </div>
  )
}
