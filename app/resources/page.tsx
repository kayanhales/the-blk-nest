"use client"

import { ContributionForm } from "@/components/contribution-form"
import { Button } from "@/components/ui/button"
import { Code, GitBranch, FileText } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ResourceCenter } from "@/components/resources"

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <Header />
      <ResourceCenter/>
      <Footer/>
      </div>
  )
}