'use client'
import React from 'react'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer'
import type { ResumeData } from '@/lib/types'

// Define styles for PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
})

// The ResumePDF component
export const ResumePDF = ({ data }: { data: ResumeData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>{data.personal.name}</Text>
        <Text>{data.personal.email}</Text>
        <Text>{data.personal.phone}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Experience</Text>
        {data.experience.map((job, idx) => (
          <View key={idx}>
            {/* <Text>{job.title} at {job.company}</Text> */}
            {/* <Text>{job.duration}</Text> */}
            <Text>{job.description}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Education</Text>
        {data.education.map((edu, idx) => (
          <View key={idx}>
            <Text>{edu.degree} - {edu.institution}</Text>
            {/* <Text>{edu.year}</Text> */}
          </View>
        ))}
      </View>
    </Page>
  </Document>
)
