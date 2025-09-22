import type { Provider } from "@/lib/providers"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Phone, Mail, MapPin, Link as LinkIcon } from "lucide-react"
import Image from "next/image"

interface ProviderCardProps {
  provider: Provider
}

export function ProviderCard({ provider }: ProviderCardProps) {
  const phoneHref = provider.phone ? `tel:${provider.phone}` : "tel:0000000000"
  const emailHref = provider.email ? `mailto:${provider.email}` : "mailto:noEmailProvided@mail.com"
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-card border-border">
      <CardHeader className="p-0">
        {provider.image && (<div className="relative h-48 w-full">
          <Image src={provider.image || "/placeholder.svg"} alt={provider.name} fill className="object-contain object-top" />
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
              {provider.specialty}
            </Badge>
          </div>
        </div>)}
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-card-foreground mb-2">{provider.name}</h3>
            <div className="flex items-center space-x-1 mb-2">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="text-sm font-medium text-card-foreground">{provider.rating}</span>
            </div>
            <div className="flex items-center text-muted-foreground text-sm mb-3">
              <MapPin className="w-4 h-4 mr-1" />
              {provider.location}
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-3">{provider.bio}</p>

          <div className="space-y-2">
            <div className="flex flex-wrap gap-1">
              {provider.languages.map((language) => (
                <Badge key={language} variant="outline" className="text-xs">
                  {language}
                </Badge>
              ))}
            </div>

            {provider.acceptsInsurance && (
              <Badge variant="outline" className="text-xs bg-accent/10 text-accent border-accent/20">
                Accepts Insurance
              </Badge>
            )}
          </div>

          <div className="flex space-x-2 pt-4">
            {provider.phone && (<Button asChild size="sm" variant="outline" className="flex-1 bg-transparent">
              
              <a href={phoneHref} className="flex items-center"><Phone className="w-4 h-4 mr-2" /> Call</a>
            </Button>)}
            {provider.email && (<Button asChild size="sm" variant="outline" className="flex-1 bg-transparent">
              
              <a href={emailHref} className="flex items-center"><Mail className="w-4 h-4 mr-2" /> Email</a>
            </Button>)}

            {provider.website && (
              <Button
                asChild
                size="sm"
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <a
                  href={provider.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <LinkIcon className="w-4 h-4 mr-2" /> Website
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
