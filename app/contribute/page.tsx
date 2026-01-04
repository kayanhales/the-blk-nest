"use client"

import { ContributionForm } from "@/components/contribution-form"
import {ResourceContributionForm} from "@/components/resource-contribution-form"
import { Button } from "@/components/ui/button"
import { Code, GitBranch, FileText } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ContributePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Grow Our Village</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Know a Black provider who should be in our directory? Help other families by adding them to The BLK Nest.
          </p>
        </div>

        <div className="mb-12">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Provider - Quick Submission</h2>
              </div>
              <p className="text-muted-foreground mb-4 text-pretty">
                Use our form to quickly submit a provider. Perfect for non-technical users.
              </p>
              <Button
                className="w-full"
                onClick={() => document.getElementById("provider-contribution-form")?.scrollIntoView({ behavior: "smooth" })}
              >
                Use Form Below
              </Button>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Resource - Quick Submission</h2>
              </div>
              <p className="text-muted-foreground mb-4 text-pretty">
                Use our form to quickly submit a resource. Perfect for non-technical users.
              </p>
              <Button
                className="w-full"
                onClick={() => document.getElementById("resource-contribution-form")?.scrollIntoView({ behavior: "smooth" })}
              >
                Use Form Below
              </Button>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <GitBranch className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">GitHub Contribution</h2>
              </div>
              <p className="text-muted-foreground mb-4 text-pretty">
                Technical users can contribute directly via GitHub pull requests.
              </p>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <a href="#github-guide">View GitHub Guide</a>
              </Button>
            </div>
          </div>
        </div>

        <div id="provider-contribution-form">
          <ContributionForm />
        </div><br />

        <div id="resource-contribution-form">
          <ResourceContributionForm />
        </div>

        <div id="github-guide" className="mt-16">
          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-8 max-w-4xl mx-auto border border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <Code className="h-7 w-7 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">GitHub Contribution Guide</h2>
            </div>

            <div className="space-y-6 text-muted-foreground">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">For Developers</h3>
                <p className="text-pretty">
                  The BLK Nest is built as an open-source project. Technical contributors can add providers and resources directly by
                  editing our JSON files and submitting pull requests.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">JSON File Structure for Providers</h3>
                <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <pre>{`{
                    "id": "unique-provider-id",
                    "name": "Dr. Jane Smith",
                    "specialty": "Pediatrics",
                    "location": "Detroit, MI",
                    "phone": "(555) 123-4567",
                    "email": "contact@example.com",
                    "website": "https://example.com",
                    "description": "Board-certified pediatrician...",
                    "services": ["Well-child visits", "Immunizations"],
                    "acceptsInsurance": true,
                    "languages": ["English", "Spanish"],
                    "yearsExperience": 10
                  }`}</pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">JSON File Structure for Resources</h3>
                <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <pre>{`{
                    "id": "unique-provider-id",
                    "resourceType": "Financial",
                    "url": "https://example.com",
                    "description": "Board-certified pediatrician...",
                    "type": "Education, Seminar, Facilty",
                    "acceptsInsurance": true
                  }`}</pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">How to Contribute</h3>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Fork the repository on GitHub</li>
                  <li>
                    Add providers or resources to the appropriate JSON file in the{" "}
                    <code className="bg-muted px-1 rounded">/data</code> directory
                  </li>
                  <li>Follow the existing JSON structure exactly</li>
                  <li>Ensure all required fields are included</li>
                  <li>Submit a pull request with a clear description</li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Files to Edit</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <code className="bg-muted px-1 rounded">data/pediatricians.json</code> - For pediatricians
                  </li>
                  <li>
                    <code className="bg-muted px-1 rounded">data/nannies.json</code> - For nannies and childcare
                    providers
                  </li>
                  <li>
                    <code className="bg-muted px-1 rounded">data/pelvic-floor-therapists.json</code> - For pelvic floor
                    therapists
                  </li>
                </ul>
              </div>

              <div className="pt-4">
                <Button asChild className="w-full md:w-auto">
                  <a href="https://github.com/kayanhales/the-blk-nest" target="_blank" rel="noopener noreferrer">
                    View on GitHub
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold text-foreground mb-3">Why Contribute?</h2>
            <p className="text-muted-foreground text-pretty">
              Every provider and/or resource you add helps another Black family find the care and support they need. Together, we're
              building a stronger, more connected community where Black families can thrive.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
