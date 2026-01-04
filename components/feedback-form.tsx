"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function FeedbackForm() {
  const [formData, setFormData] = useState({
    type: "",
    subject: "",
    message: "",
    name: "",
    email: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  try {
    const response = await fetch("/api/submit-feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      throw new Error("Failed to submit feedback")
    }

    setIsSubmitted(true)
  } catch (err) {
    console.error(err)
    alert("Oops! Something went wrong. Please try again.")
  }
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
            Your feedback has been received. We appreciate you helping us improve The BLK Nest.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button onClick={() => setIsSubmitted(false)} variant="outline">
            Send More Feedback
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">Share Your Feedback</CardTitle>
        <CardDescription>
          Help us improve The BLK Nest. Your thoughts and suggestions matter to our community.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="type">Feedback Type *</Label>
            <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="What type of feedback?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="suggestion">Suggestion</SelectItem>
                <SelectItem value="bug-report">Bug Report</SelectItem>
                <SelectItem value="feature-request">Feature Request</SelectItem>
                <SelectItem value="general">General Feedback</SelectItem>
                <SelectItem value="provider-issue">Provider Information Issue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
              placeholder="Brief description of your feedback"
              required
            />
          </div>

          <div>
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              placeholder="Please share your detailed feedback, suggestions, or report any issues..."
              rows={6}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Your name (optional)"
              />
            </div>
            <div>
              <Label htmlFor="email">Your Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="your@email.com (optional)"
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Send Feedback
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
