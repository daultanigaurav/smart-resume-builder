"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import type { Project } from "@/lib/types"
import { Plus, Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ProjectsFormProps {
  data: Project[]
  updateData: (data: Project[]) => void
}

export function ProjectsForm({ data, updateData }: ProjectsFormProps) {
  const [projects, setProjects] = useState<Project[]>(
    data.length
      ? data
      : [
          {
            name: "",
            description: "",
            technologies: "",
            url: "",
            startDate: "",
            endDate: "",
          },
        ],
  )

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const newProjects = [...projects]
    newProjects[index] = {
      ...newProjects[index],
      [name]: value,
    }
    setProjects(newProjects)
    updateData(newProjects)
  }

  const addProject = () => {
    const newProjects = [
      ...projects,
      {
        name: "",
        description: "",
        technologies: "",
        url: "",
        startDate: "",
        endDate: "",
      },
    ]
    setProjects(newProjects)
    updateData(newProjects)
  }

  const removeProject = (index: number) => {
    const newProjects = projects.filter((_, i) => i !== index)
    setProjects(newProjects)
    updateData(newProjects)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-handwriting text-slate-800">Your Projects</h2>
        <p className="text-slate-600 mt-2">Add notable projects you've worked on</p>
      </div>

      <AnimatePresence>
        {projects.map((project, index) => (
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
                  <h3 className="text-lg font-medium text-slate-800">{project.name || `Project #${index + 1}`}</h3>
                  {projects.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeProject(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Remove
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`name-${index}`} className="text-slate-700">
                      Project Name
                    </Label>
                    <Input
                      id={`name-${index}`}
                      name="name"
                      value={project.name}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="E-commerce Website"
                      className="border-slate-300 focus:border-teal-500 focus:ring-teal-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`technologies-${index}`} className="text-slate-700">
                      Technologies Used
                    </Label>
                    <Input
                      id={`technologies-${index}`}
                      name="technologies"
                      value={project.technologies}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="React, Node.js, MongoDB"
                      className="border-slate-300 focus:border-teal-500 focus:ring-teal-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`url-${index}`} className="text-slate-700">
                      Project URL (optional)
                    </Label>
                    <Input
                      id={`url-${index}`}
                      name="url"
                      value={project.url}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="https://example.com"
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
                        value={project.startDate}
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
                        value={project.endDate}
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
                    value={project.description}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="Describe the project, your role, and key achievements..."
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
        onClick={addProject}
        className="w-full border-dashed border-slate-300 hover:border-teal-500 hover:bg-teal-50 text-slate-600 hover:text-teal-600"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Another Project
      </Button>
    </div>
  )
}
