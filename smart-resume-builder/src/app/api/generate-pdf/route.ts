import { type NextRequest, NextResponse } from "next/server"
import type { ResumeData } from "@/lib/types"
import ReactPDF from "@react-pdf/renderer"
import { ResumePDF } from "@/components/resume-pdf"

export async function POST(request: NextRequest) {
  try {
    const resumeData: ResumeData = await request.json()

    // Generate PDF using React PDF renderer
    const pdfBuffer = await ReactPDF.renderToBuffer(<ResumePDF data={resumeData} />)

    // Return the PDF as a response
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${resumeData.personal.name.replace(/\s+/g, "_")}_resume.pdf"`,
      },
    })
  } catch (error) {
    console.error("Error generating PDF:", error)
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 })
  }
}
