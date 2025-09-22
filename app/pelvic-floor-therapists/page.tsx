import { Header } from "@/components/header"
import { ProviderCard } from "@/components/provider-card"
import { getPelvicFloorTherapists } from "@/lib/providers"
import { Shield } from "lucide-react"
import { Footer } from "@/components/footer"

export default function PelvicFloorTherapistsPage() {
  const therapists = getPelvicFloorTherapists()

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Pelvic Floor Therapists</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Specialized Black therapists providing culturally sensitive care for women's health and recovery
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold">Available Therapists ({therapists.length})</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {therapists.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
