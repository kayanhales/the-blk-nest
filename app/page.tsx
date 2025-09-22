"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { SearchBar } from "@/components/search-bar"
import { ProviderCard } from "@/components/provider-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { searchProviders, getAllProviders, type Provider } from "@/lib/providers"
import { Heart, Users, Shield } from "lucide-react"
import Link from "next/link"
import { Hero } from "@/components/hero"
import { Categories } from "@/components/categories"
import { Footer } from "@/components/footer"

export default function HomePage() {
  const [searchResults, setSearchResults] = useState<Provider[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const featuredProviders = getAllProviders().slice(0, 3)

  const handleSearch = (query: string, specialty: string) => {
    const results = searchProviders(query, specialty)
    setSearchResults(results)
    setHasSearched(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />

      {/* Search Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              Find the Right Provider for Your Family
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Search our directory of trusted Black professionals across various services
            </p>
          </div>

          <SearchBar onSearch={handleSearch} />

          {/* Search Results */}
          {hasSearched && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6">Search Results ({searchResults.length} found)</h3>
              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map((provider) => (
                    <ProviderCard key={provider.id} provider={provider} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">
                    No providers found matching your search. Try different keywords or browse all providers.
                  </p>
                  <Link href="/providers">
                    <Button className="mt-4">View All Providers</Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Categories/>

      {/* Featured Providers 
      <section className="py-16 px-4 bg-muted/30 geometric-pattern">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Providers</h2>
            <p className="text-lg text-muted-foreground">Trusted professionals recommended by our community</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProviders.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/providers">
              <Button size="lg" variant="outline">
                View All Providers
              </Button>
            </Link>
          </div>
        </div>
      </section>*/}

      <Footer />
    </div>
      
  )
}
