"use client"

import type { ResumeData } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Calendar, Link2 } from "lucide-react"

interface ResumePreviewProps {
  data: ResumeData
}

export function ResumePreview({ data }: ResumePreviewProps) {
  return (
    <Card className="border-2 border-slate-200 shadow-md rounded-xl overflow-hidden">
      <CardContent className="p-6 bg-white">
        <div className="space-y-6 text-sm">
          {/* Header */}
          <div className="text-center border-b pb-4">
            <h1 className="text-2xl font-bold text-slate-800">{data.personal.name || "Your Name"}</h1>
            {data.personal.title && <p className="text-lg text-slate-600 mt-1">{data.personal.title}</p>}

            <div className="flex flex-wrap justify-center gap-3 mt-3 text-sm text-slate-600">
              {data.personal.email && (
                <div className="flex items-center">
                  <Mail className="w-3.5 h-3.5 mr-1" />
                  <span>{data.personal.email}</span>
                </div>
              )}

              {data.personal.phone && (
                <div className="flex items-center">
                  <Phone className="w-3.5 h-3.5 mr-1" />
                  <span>{data.personal.phone}</span>
                </div>
              )}

              {data.personal.location && (
                <div className="flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1" />
                  <span>{data.personal.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Summary */}
          {data.personal.summary && (
            <div>
              <h2 className="text-md font-bold text-slate-800 border-b pb-1 mb-2">SUMMARY</h2>
              <p className="text-slate-600">{data.personal.summary}</p>
            </div>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <div>
              <h2 className="text-md font-bold text-slate-800 border-b pb-1 mb-2">EXPERIENCE</h2>
              <div className="space-y-4">
                {data.experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-bold text-slate-800">{exp.position}</h3>
                        <p className="text-slate-600">
                          {exp.company}
                          {exp.location ? `, ${exp.location}` : ""}
                        </p>
                      </div>
                      {(exp.startDate || exp.endDate) && (
                        <div className="flex items-center text-slate-600 whitespace-nowrap">
                          <Calendar className="w-3.5 h-3.5 mr-1" />
                          <span>
                            {exp.startDate} - {exp.endDate || "Present"}
                          </span>
                        </div>
                      )}
                    </div>
                    {exp.description && <p className="mt-1 text-slate-600">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div>
              <h2 className="text-md font-bold text-slate-800 border-b pb-1 mb-2">EDUCATION</h2>
              <div className="space-y-4">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-bold text-slate-800">
                          {edu.degree}
                          {edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}
                        </h3>
                        <p className="text-slate-600">{edu.institution}</p>
                      </div>
                      {(edu.startDate || edu.endDate) && (
                        <div className="flex items-center text-slate-600 whitespace-nowrap">
                          <Calendar className="w-3.5 h-3.5 mr-1" />
                          <span>
                            {edu.startDate} - {edu.endDate || "Present"}
                          </span>
                        </div>
                      )}
                    </div>
                    {edu.description && <p className="mt-1 text-slate-600">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-md font-bold text-slate-800 border-b pb-1 mb-2">SKILLS</h2>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.map((skill, index) => (
                  <span key={index} className="bg-slate-100 px-2 py-1 rounded text-slate-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <div>
              <h2 className="text-md font-bold text-slate-800 border-b pb-1 mb-2">PROJECTS</h2>
              <div className="space-y-4">
                {data.projects.map((project, index) => (
                  <div key={index}>
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-bold text-slate-800">{project.name}</h3>
                        {project.technologies && <p className="text-slate-600 italic">{project.technologies}</p>}
                      </div>
                      {(project.startDate || project.endDate) && (
                        <div className="flex items-center text-slate-600 whitespace-nowrap">
                          <Calendar className="w-3.5 h-3.5 mr-1" />
                          <span>
                            {project.startDate} - {project.endDate || "Present"}
                          </span>
                        </div>
                      )}
                    </div>
                    {project.description && <p className="mt-1 text-slate-600">{project.description}</p>}
                    {project.url && (
                      <div className="flex items-center mt-1 text-teal-600">
                        <Link2 className="w-3.5 h-3.5 mr-1" />
                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {project.url.replace(/^https?:\/\//, "")}
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
