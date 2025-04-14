import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer"
import type { ResumeData } from "@/lib/types"

// Register fonts
Font.register({
  family: "Inter",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ.ttf",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiJ.ttf",
      fontWeight: 700,
    },
  ],
})

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Inter",
    fontSize: 10,
    color: "#334155",
  },
  section: {
    marginBottom: 10,
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
    borderBottom: "1px solid #CBD5E1",
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 700,
    color: "#1E293B",
  },
  title: {
    fontSize: 14,
    marginTop: 4,
    color: "#475569",
  },
  contactInfo: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 8,
    gap: 10,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: "#1E293B",
    borderBottom: "1px solid #CBD5E1",
    paddingBottom: 2,
    marginBottom: 6,
  },
  itemTitle: {
    fontWeight: 700,
    color: "#1E293B",
  },
  itemSubtitle: {
    marginTop: 2,
  },
  dateRange: {
    marginTop: 2,
    fontStyle: "italic",
  },
  description: {
    marginTop: 4,
    lineHeight: 1.4,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  skillItem: {
    backgroundColor: "#F1F5F9",
    padding: "3 6",
    borderRadius: 4,
  },
  projectUrl: {
    color: "#0D9488",
    marginTop: 2,
    textDecoration: "underline",
  },
})

export function ResumePDF({ data }: { data: ResumeData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.personal.name || "Your Name"}</Text>
          {data.personal.title && <Text style={styles.title}>{data.personal.title}</Text>}

          <View style={styles.contactInfo}>
            {data.personal.email && (
              <View style={styles.contactItem}>
                <Text>{data.personal.email}</Text>
              </View>
            )}

            {data.personal.phone && (
              <View style={styles.contactItem}>
                <Text>{data.personal.phone}</Text>
              </View>
            )}

            {data.personal.location && (
              <View style={styles.contactItem}>
                <Text>{data.personal.location}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Summary */}
        {data.personal.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>SUMMARY</Text>
            <Text style={styles.description}>{data.personal.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EXPERIENCE</Text>
            {data.experience.map((exp, index) => (
              <View key={`exp-${index}`} style={{ marginBottom: 8 }}>
                <Text style={styles.itemTitle}>{exp.position}</Text>
                <Text style={styles.itemSubtitle}>
                  {exp.company}
                  {exp.location ? `, ${exp.location}` : ""}
                </Text>
                {(exp.startDate || exp.endDate) && (
                  <Text style={styles.dateRange}>
                    {exp.startDate} - {exp.endDate || "Present"}
                  </Text>
                )}
                {exp.description && <Text style={styles.description}>{exp.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EDUCATION</Text>
            {data.education.map((edu, index) => (
              <View key={`edu-${index}`} style={{ marginBottom: 8 }}>
                <Text style={styles.itemTitle}>
                  {edu.degree}
                  {edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}
                </Text>
                <Text style={styles.itemSubtitle}>{edu.institution}</Text>
                {(edu.startDate || edu.endDate) && (
                  <Text style={styles.dateRange}>
                    {edu.startDate} - {edu.endDate || "Present"}
                  </Text>
                )}
                {edu.description && <Text style={styles.description}>{edu.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>SKILLS</Text>
            <View style={styles.skillsContainer}>
              {data.skills.map((skill, index) => (
                <View key={`skill-${index}`} style={styles.skillItem}>
                  <Text>{skill}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PROJECTS</Text>
            {data.projects.map((project, index) => (
              <View key={`project-${index}`} style={{ marginBottom: 8 }}>
                <Text style={styles.itemTitle}>{project.name}</Text>
                {project.technologies && <Text style={{ fontStyle: "italic" }}>{project.technologies}</Text>}
                {(project.startDate || project.endDate) && (
                  <Text style={styles.dateRange}>
                    {project.startDate} - {project.endDate || "Present"}
                  </Text>
                )}
                {project.description && <Text style={styles.description}>{project.description}</Text>}
                {project.url && <Text style={styles.projectUrl}>{project.url}</Text>}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  )
}
