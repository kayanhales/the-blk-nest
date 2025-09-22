"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ContributionForm() {
  const [formData, setFormData] = useState({
    providerType: "",
    name: "",
    specialty: "",
    location: "",
    phone: "",
    email: "",
    website: "",
    description: "",
    submitterName: "",
    submitterEmail: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // For MVP, we'll just show a success message
    // In production, this would send to a backend or email service
    console.log("Provider submission:", formData)
    setIsSubmitted(true)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-primary">Thank You!</CardTitle>
          <CardDescription className="text-lg">
            Your provider submission has been received. We'll review it and add it to our directory soon.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button onClick={() => setIsSubmitted(false)} variant="outline">
            Submit Another Provider
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">Add a Provider</CardTitle>
        <CardDescription>Help grow our village by adding a Black provider you know and trust.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="providerType">Provider Type *</Label>
              <Select value={formData.providerType} onValueChange={(value) => handleChange("providerType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select provider type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pediatrician">Pediatrician</SelectItem>
                  <SelectItem value="nanny">Nanny</SelectItem>
                  <SelectItem value="pelvic-floor-therapist">Pelvic Floor Therapist</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Provider Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Dr. Jane Smith"
                  required
                />
              </div>
              <div>
                <Label htmlFor="specialty">Specialty</Label>
                <Input
                  id="specialty"
                  value={formData.specialty}
                  onChange={(e) => handleChange("specialty", e.target.value)}
                  placeholder="e.g., Newborn care, ADHD specialist"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="City, State"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="provider@example.com"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => handleChange("website", e.target.value)}
                placeholder="https://www.example.com"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Tell us about this provider's services, approach, or what makes them special..."
                rows={4}
              />
            </div>
          </div>

          <div className="border-t pt-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Your Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="submitterName">Your Name *</Label>
                <Input
                  id="submitterName"
                  value={formData.submitterName}
                  onChange={(e) => handleChange("submitterName", e.target.value)}
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="submitterEmail">Your Email *</Label>
                <Input
                  id="submitterEmail"
                  type="email"
                  value={formData.submitterEmail}
                  onChange={(e) => handleChange("submitterEmail", e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Submit Provider
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
