"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface SkillsFormProps {
  data: string[]
  updateData: (data: string[]) => void
}

export function SkillsForm({ data, updateData }: SkillsFormProps) {
  const [skills, setSkills] = useState<string[]>(data || [])
  const [newSkill, setNewSkill] = useState("")

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updatedSkills = [...skills, newSkill.trim()]
      setSkills(updatedSkills)
      updateData(updatedSkills)
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove)
    setSkills(updatedSkills)
    updateData(updatedSkills)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill()
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-handwriting text-slate-800">Your Skills</h2>
        <p className="text-slate-600 mt-2">Add your technical and soft skills</p>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="new-skill" className="sr-only">
                  Add Skill
                </Label>
                <Input
                  id="new-skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Add a skill (e.g., JavaScript, Project Management)"
                  className="border-slate-300 focus:border-teal-500 focus:ring-teal-500"
                />
              </div>
              <Button onClick={addSkill} className="bg-teal-600 hover:bg-teal-700">
                Add
              </Button>
            </div>

            <div className="mt-6">
              <Label className="text-slate-700 mb-2 block">Your Skills:</Label>
              <div className="flex flex-wrap gap-2 mt-2 min-h-[100px]">
                <AnimatePresence>
                  {skills.length > 0 ? (
                    skills.map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-200 px-3 py-1.5 text-sm font-medium">
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="ml-2 text-teal-600 hover:text-teal-800 focus:outline-none"
                          >
                            <X className="w-3 h-3" />
                            <span className="sr-only">Remove {skill}</span>
                          </button>
                        </Badge>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-slate-500 italic">
                      No skills added yet. Add some skills to showcase your expertise.
                    </p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800">
        <h3 className="font-medium mb-2">Tips for adding skills:</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Include a mix of technical and soft skills</li>
          <li>Be specific with technical skills (e.g., "React.js" instead of just "JavaScript")</li>
          <li>Include relevant tools and software you're proficient with</li>
          <li>Consider adding skills that match the job descriptions you're targeting</li>
        </ul>
      </div>
    </div>
  )
}
