"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import type { Education } from "@/lib/types"
import { Plus, Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface EducationFormProps {
  data: Education[]
  updateData: (data: Education[]) => void
}

export function EducationForm({ data, updateData }: EducationFormProps) {
  const [educations, setEducations] = useState<Education[]>(
    data.length
      ? data
      : [
          {
            institution: "",
            degree: "",
            fieldOfStudy: "",
            startDate: "",
            endDate: "",
            description: "",
          },
        ],
  )

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const newEducations = [...educations]
    newEducations[index] = {
      ...newEducations[index],
      [name]: value,
    }
    setEducations(newEducations)
    updateData(newEducations)
  }

  const addEducation = () => {
    const newEducations = [
      ...educations,
      {
        institution: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]
    setEducations(newEducations)
    updateData(newEducations)
  }

  const removeEducation = (index: number) => {
    const newEducations = educations.filter((_, i) => i !== index)
    setEducations(newEducations)
    updateData(newEducations)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-handwriting text-slate-800">Your Education</h2>
        <p className="text-slate-600 mt-2">Add your educational background</p>
      </div>

      <AnimatePresence>
        {educations.map((education, index) => (
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
                    {education.institution || `Education #${index + 1}`}
                  </h3>
                  {educations.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEducation(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Remove
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`institution-${index}`} className="text-slate-700">
                      Institution
                    </Label>
                    <Input
                      id={`institution-${index}`}
                      name="institution"
                      value={education.institution}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="University of Example"
                      className="border-slate-300 focus:border-teal-500 focus:ring-teal-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`degree-${index}`} className="text-slate-700">
                      Degree
                    </Label>
                    <Input
                      id={`degree-${index}`}
                      name="degree"
                      value={education.degree}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="Bachelor of Science"
                      className="border-slate-300 focus:border-teal-500 focus:ring-teal-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`fieldOfStudy-${index}`} className="text-slate-700">
                      Field of Study
                    </Label>
                    <Input
                      id={`fieldOfStudy-${index}`}
                      name="fieldOfStudy"
                      value={education.fieldOfStudy}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="Computer Science"
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
                        value={education.startDate}
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
                        value={education.endDate}
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
                    value={education.description}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="Relevant coursework, achievements, or activities..."
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
        onClick={addEducation}
        className="w-full border-dashed border-slate-300 hover:border-teal-500 hover:bg-teal-50 text-slate-600 hover:text-teal-600"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Another Education
      </Button>
    </div>
  )
}
