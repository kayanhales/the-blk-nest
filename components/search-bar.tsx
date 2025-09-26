"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

interface SearchBarProps {
  onSearch: (query: string, specialty: string) => void
  placeholder?: string
}

export function SearchBar({ onSearch, placeholder = "Search providers, services, or locations..." }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [specialty, setSpecialty] = useState("all")

  const handleSearch = () => {
    onSearch(query, specialty)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4 p-6 bg-card rounded-xl border border-border shadow-sm">
        <div className="flex-1">
          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="h-12 text-base bg-input border-border"
          />
        </div>

        <Select value={specialty} onValueChange={setSpecialty}>
          <SelectTrigger className="w-full md:w-48 h-12 bg-input border-border">
            <SelectValue placeholder="All Specialties" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Specialties</SelectItem>
            <SelectItem value="pediatrician">Pediatricians</SelectItem>
            <SelectItem value="doula">Doulas</SelectItem>
            <SelectItem value="pelvic floor therapist">Pelvic Floor Therapists</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handleSearch} className="h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90">
          <Search className="w-5 h-5 mr-2" />
          Search
        </Button>
      </div>
    </div>
  )
}
