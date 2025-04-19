import Link from "next/link"
import { Button } from "@/components/ui/button"
// import { HandDrawnArrow } from "@/components/hand-drawn-arrow"

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      <div className="container px-4 py-24 mx-auto max-w-5xl">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-7xl font-handwriting text-slate-800 mb-6">Smart Resume Builder</h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mb-12 font-sans">
            Create an ATS-friendly resume with a personal touch. Stand out from the crowd with a resume that feels
            uniquely yours.
          </p>
          <div className="relative">
            <Button
              asChild
              className="text-lg px-8 py-6 bg-teal-600 hover:bg-teal-700 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Link href="/builder">Start Building Your Resume</Link>
            </Button>
            {/* <HandDrawnArrow className="absolute -right-24 top-0 w-24 h-24 text-slate-700 hidden md:block" /> */}
          </div>

          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Human-Centric Design"
              description="A uniquely crafted experience that feels personal and engaging."
              icon="Palette"
            />
            <FeatureCard
              title="ATS-Friendly"
              description="Ensure your resume passes through Applicant Tracking Systems with ease."
              icon="CheckCircle"
            />
            <FeatureCard
              title="PDF Download"
              description="Get your professional resume in a downloadable format ready to share."
              icon="FileDown"
            />
          </div>
        </div>
      </div>
    </main>
  )
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  const icons = {
    Palette: <Palette className="w-10 h-10 mb-4 text-teal-600" />,
    CheckCircle: <CheckCircle className="w-10 h-10 mb-4 text-teal-600" />,
    FileDown: <FileDown className="w-10 h-10 mb-4 text-teal-600" />,
  }

  return (
    <div className="p-6 bg-white rounded-lg border-2 border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
      {icons[icon as keyof typeof icons]}
      <h3 className="text-xl font-bold mb-2 text-slate-800">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  )
}

import { Palette, CheckCircle, FileDown } from "lucide-react"
