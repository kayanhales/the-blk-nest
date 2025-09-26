import { Heart, Users, Shield } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"


export function Categories() {
  return ( 
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse by Category</h2>
            <p className="text-lg text-muted-foreground">Find specialized care for your family's needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/pediatricians" className="group">
              <div className="bg-card border border-border rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:border-primary/50">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Pediatricians</h3>
                <p className="text-muted-foreground mb-4">Board-certified doctors specializing in children's health</p>
                <Badge variant="secondary">2+ providers</Badge>
              </div>
            </Link>

            <Link href="/nannies" className="group">
              <div className="bg-card border border-border rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:border-secondary/50">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
                  <Users className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Doulas</h3>
                <p className="text-muted-foreground mb-4">Experienced  birth doulas for mom.</p>
                <Badge variant="secondary">1+ providers</Badge>
              </div>
            </Link>

            <Link href="/pelvic-floor-therapists" className="group">
              <div className="bg-card border border-border rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:border-accent/50">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                  <Shield className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">Pelvic Floor Therapists</h3>
                <p className="text-muted-foreground mb-4">Specialized care for women's health and recovery</p>
                <Badge variant="secondary">1+ providers</Badge>
              </div>
            </Link>
          </div>
        </div>
      </section>
  )
}