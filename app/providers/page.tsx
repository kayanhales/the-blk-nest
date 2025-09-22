"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { SearchBar } from "@/components/search-bar"
import { ProviderCard } from "@/components/provider-card"
import { getAllProviders, searchProviders, type Provider } from "@/lib/providers"
import { Footer } from "@/components/footer"

export default function ProvidersPage() {
  const [providers, setProviders] = useState<Provider[]>(getAllProviders())
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = (query: string, specialty: string) => {
    const results = searchProviders(query, specialty)
    setProviders(results)
    setHasSearched(true)
  }

  const resetSearch = () => {
    setProviders(getAllProviders())
    setHasSearched(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">All Providers</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our complete directory of trusted Black professionals
          </p>
        </div>

        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
          {hasSearched && (
            <div className="text-center mt-4">
              <button onClick={resetSearch} className="text-primary hover:underline">
                Clear search and show all providers
              </button>
            </div>
          )}
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold">
            {hasSearched ? `Search Results (${providers.length} found)` : `All Providers (${providers.length})`}
          </h2>
        </div>

        {providers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No providers found matching your search criteria.</p>
            <button onClick={resetSearch} className="mt-4 text-primary hover:underline">
              View all providers
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
