import cultural from "@/data/resources/cultural-community.json"
import education from "@/data/resources/education-development.json"
import financial from "@/data/resources/financial.json"
import health from "@/data/resources/health-wellness.json"
import legal from "@/data/resources/legal-support.json"
import parenting from "@/data/resources/parenting-family.json"

import { Heart, BookOpen, DollarSign, Scale, Baby, GraduationCap } from "lucide-react"

export interface Resource {
  title: string
  description: string
  url: string
  type: string
}

export interface ResourceCategory {
  title: string
  icon: string // stored in JSON as a string (e.g., "Heart")
  color: string
  resources: Resource[]
}

// --- Map icon strings → Lucide components ---
export const iconMap: Record<string, React.ElementType> = {
  Heart,
  BookOpen,
  DollarSign,
  Scale,
  Baby,
  GraduationCap,
}

// --- Load all categories ---
const allCategories: ResourceCategory[] = [
  cultural,
  education,
  financial,
  health,
  legal,
  parenting,
]

export const getAllResourceCategories = (): ResourceCategory[] => allCategories

export const getResourcesByCategory = (categoryTitle: string): Resource[] => {
  const category = allCategories.find(
    (cat) => cat.title.toLowerCase() === categoryTitle.toLowerCase()
  )
  return category ? category.resources : []
}

export const searchResources = (query: string, categoryTitle?: string): Resource[] => {
  let resources: Resource[] = []

  if (categoryTitle && categoryTitle.toLowerCase() !== "all") {
    resources = getResourcesByCategory(categoryTitle)
  } else {
    resources = allCategories.flatMap((cat) => cat.resources)
  }

  if (query.trim()) {
    const searchTerm = query.toLowerCase()
    resources = resources.filter(
      (resource) =>
        resource.title.toLowerCase().includes(searchTerm) ||
        resource.description.toLowerCase().includes(searchTerm) ||
        resource.type.toLowerCase().includes(searchTerm)
    )
  }

  return resources
}
