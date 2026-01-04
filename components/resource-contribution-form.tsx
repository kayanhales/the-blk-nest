"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ResourceContributionForm() {
  const [formData, setFormData] = useState({
    resourceType: "",
    title: "",
    description: "",
    url: "",
    type: "",
    submitterName: "",
    submitterEmail: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const randomNum = Math.floor(Math.random() * 10000)
      const id = `${formData.resourceType || "resource"}-${randomNum}`
      
      // Convert languages to array before sending
      const submission = {
        id,
        ...formData,
      }

      const response = await fetch("/api/submit-resource", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      })

      const data = await response.json()

      if (response.ok) {
        console.log("PR created successfully:", data.prUrl)
        setIsSubmitted(true)
      } else {
        console.error("Failed to create PR:", data.error)
        alert("Oops! Something went wrong. Please try again.")
      }
    } catch (err) {
      console.error("Error submitting form:", err)
      alert("Oops! Something went wrong. Please try again.")
    }
  }

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-primary">Thank You!</CardTitle>
          <CardDescription className="text-lg">
            Your resource submission has been received. We'll review it and add it to our directory soon.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button onClick={() => setIsSubmitted(false)} variant="outline">
            Submit Another Resource
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">Add a resource</CardTitle>
        <CardDescription>Help grow our village by adding a resource you know and trust.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="resourceType">Resource Type *</Label>
              <Select
                value={formData.resourceType}
                onValueChange={(value) => handleChange("resourceType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select resource type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cultural-community">Culture & Community</SelectItem>
                  <SelectItem value="education-development">Education & Development</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                  <SelectItem value="health-wellness">Health & Wellness</SelectItem>
                  <SelectItem value="legal-support">Legal & Support</SelectItem>
                  <SelectItem value="parenting-family">Parenting & Family</SelectItem>
                  <SelectItem value="other">Other - describe in description</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Resource Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Black Young Professionals"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="type">Type *</Label>
              <Input
                id="type"
                value={formData.type}
                onChange={(e) => handleChange("type", e.target.value)}
                placeholder="Event, Facility, Community, Directory etc"
                required
              />
            </div>

            <div>
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                type="url"
                value={formData.url}
                onChange={(e) => handleChange("url", e.target.value)}
                placeholder="https://www.example.com"
              />
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Tell us about this resource, or what makes it special..."
                rows={4}
                required
              />
            </div>
          </div>

          <div className="border-t pt-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Your Information (Optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="submitterName">Your Name</Label>
                <Input
                  id="submitterName"
                  value={formData.submitterName}
                  onChange={(e) => handleChange("submitterName", e.target.value)}
                  placeholder="Your name"
                />
              </div>
              <div>
                <Label htmlFor="submitterEmail">Your Email</Label>
                <Input
                  id="submitterEmail"
                  type="email"
                  value={formData.submitterEmail}
                  onChange={(e) => handleChange("submitterEmail", e.target.value)}
                  placeholder="your@email.com"
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Submit Resource
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
