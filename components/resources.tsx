"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ExternalLink } from "lucide-react"

import { getAllResourceCategories, iconMap } from "@/lib/resources"

export function ResourceCenter() {
  const [searchTerm, setSearchTerm] = useState("")
  const allCategories = getAllResourceCategories()

  // Filter categories and resources based on search term
  const filteredCategories = allCategories
    .map((category) => {
      const filteredResources = category.resources.filter((resource) =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
      return { ...category, resources: filteredResources }
    })
    .filter(category => category.resources.length > 0)

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
          {filteredCategories.map((category) => {
            const Icon = iconMap[category.icon] || Search // fallback icon
            return (
              <Card key={category.title}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Icon className={`h-6 w-6 ${category.color}`} />
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
            )
          })}
        </div>
      </div>
    </div>
  )
}
