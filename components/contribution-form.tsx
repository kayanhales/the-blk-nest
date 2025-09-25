"use client"

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
    bio: "",
    languages: "",
    acceptsInsurance: "", // "yes" | "no"
    rating: "",
    image: "",
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
      const id = `${formData.providerType || "provider"}-${randomNum}`
      
      // Convert languages to array before sending
      const submission = {
        id,
        ...formData,
        languages: formData.languages.split(",").map((lang) => lang.trim()),
        acceptsInsurance: formData.acceptsInsurance === "yes",
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
              <Select
                value={formData.providerType}
                onValueChange={(value) => handleChange("providerType", value)}
              >
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
                <Label htmlFor="specialty">Specialty *</Label>
                <Input
                  id="specialty"
                  value={formData.specialty}
                  onChange={(e) => handleChange("specialty", e.target.value)}
                  placeholder="e.g., Newborn care, ADHD specialist"
                  required
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
              <Label htmlFor="bio">Bio *</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                placeholder="Tell us about this provider's services, approach, or what makes them special..."
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="languages">Languages *</Label>
              <Input
                id="languages"
                value={formData.languages}
                onChange={(e) => handleChange("languages", e.target.value)}
                placeholder="e.g., English, Spanish"
                required
              />
            </div>

            <div>
              <Label htmlFor="acceptsInsurance">Accepts Insurance?</Label>
              <Select
                value={formData.acceptsInsurance}
                onValueChange={(value) => handleChange("acceptsInsurance", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="rating">Rating</Label>
              <Input
                id="rating"
                type="number"
                value={formData.rating}
                onChange={(e) => handleChange("rating", e.target.value)}
                placeholder="4.5"
              />
            </div>

            <div>
              <Label htmlFor="image">Link to Picture</Label>
              <Input
                id="image"
                type="url"
                value={formData.image}
                onChange={(e) => handleChange("image", e.target.value)}
                placeholder="https://www.example.com"
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
            Submit Provider
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
