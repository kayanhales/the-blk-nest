"use client";

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, BookOpen, DollarSign, Scale, Baby, GraduationCap, Search, ExternalLink } from "lucide-react"

const resourceCategories = [
  {
    title: "Health & Wellness",
    icon: Heart,
    color: "text-red-500",
    resources: [
      {
        title: "Black Maternal Health Alliance",
        description: "Resources and advocacy for Black maternal health",
        url: "https://blackmaternalhealthalliance.org",
        type: "Organization",
      },
      {
        title: "Mental Health Resources for Black Families",
        description: "Culturally competent mental health support",
        url: "#",
        type: "Guide",
      },
      {
        title: "Sickle Cell Disease Association",
        description: "Support and resources for sickle cell disease",
        url: "#",
        type: "Organization",
      },
    ],
  },
  {
    title: "Education & Development",
    icon: GraduationCap,
    color: "text-blue-500",
    resources: [
      {
        title: "Black History Curriculum Resources",
        description: "Age-appropriate Black history learning materials",
        url: "#",
        type: "Educational",
      },
      {
        title: "STEM Programs for Black Youth",
        description: "Science and technology programs",
        url: "#",
        type: "Programs",
      },
      {
        title: "College Prep for Black Students",
        description: "Scholarship and college readiness resources",
        url: "#",
        type: "Guide",
      },
    ],
  },
  {
    title: "Financial Resources",
    icon: DollarSign,
    color: "text-green-500",
    resources: [
      {
        title: "Black-Owned Banks Directory",
        description: "Support Black-owned financial institutions",
        url: "#",
        type: "Directory",
      },
      {
        title: "Financial Literacy for Families",
        description: "Money management and investment basics",
        url: "#",
        type: "Educational",
      },
      {
        title: "Small Business Resources",
        description: "Support for Black entrepreneurs",
        url: "#",
        type: "Business",
      },
    ],
  },
  {
    title: "Legal Support",
    icon: Scale,
    color: "text-purple-500",
    resources: [
      {
        title: "Know Your Rights Guide",
        description: "Legal rights and protections",
        url: "#",
        type: "Guide",
      },
      {
        title: "Legal Aid Organizations",
        description: "Free and low-cost legal services",
        url: "#",
        type: "Directory",
      },
      {
        title: "Family Law Resources",
        description: "Custody, adoption, and family legal matters",
        url: "#",
        type: "Legal",
      },
    ],
  },
  {
    title: "Parenting & Family",
    icon: Baby,
    color: "text-pink-500",
    resources: [
      {
        title: "Positive Discipline Techniques",
        description: "Culturally affirming parenting approaches",
        url: "#",
        type: "Guide",
      },
      {
        title: "Talking to Kids About Race",
        description: "Age-appropriate conversations about identity",
        url: "#",
        type: "Educational",
      },
      {
        title: "Single Parent Support Groups",
        description: "Community support for single parents",
        url: "#",
        type: "Support",
      },
    ],
  },
  {
    title: "Cultural & Community",
    icon: BookOpen,
    color: "text-orange-500",
    resources: [
      {
        title: "Black Children's Books",
        description: "Diverse literature for young readers",
        url: "#",
        type: "Educational",
      },
      {
        title: "Cultural Events Calendar",
        description: "Black history and cultural celebrations",
        url: "#",
        type: "Events",
      },
      {
        title: "Community Organizations",
        description: "Local Black community groups and nonprofits",
        url: "#",
        type: "Directory",
      },
    ],
  },
]

export function ResourceCenter() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter categories and resources based on search term
  const filteredCategories = resourceCategories
    .map((category) => {
      const filteredResources = category.resources.filter((resource) =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
      return { ...category, resources: filteredResources }
    })
    .filter(category => category.resources.length > 0) // remove categories with no matching resources

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Resource Center</h1>
          <p className="text-muted-foreground mb-6">
            Curated resources to support Black families in health, education, finance, and community building.
          </p>

          {/* Search Input */}
          <div className="max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Resource Cards */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredCategories.map((category) => (
            <Card key={category.title}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <category.icon className={`h-6 w-6 ${category.color}`} />
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.resources.map((resource, index) => (
                    <div key={index} className="border-l-4 border-primary/20 pl-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-1">{resource.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                          <Badge variant="outline" className="text-xs">
                            {resource.type}
                          </Badge>
                        </div>
                        <Button size="sm" variant="ghost" asChild>
                          <a href={resource.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Suggest a Resource Section */}
        <div className="mt-12 text-center">
          <Card className="bg-card">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-card-foreground mb-4">Have a Resource to Share?</h2>
              <p className="text-muted-foreground mb-6">
                Help grow our resource library by suggesting valuable resources for Black families.
              </p>
              <Button asChild size="lg"><a href="/contribute">Suggest a Resource</a></Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
