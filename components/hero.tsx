import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
          <section className="relative py-20 px-4 hero-pattern">
            <div className="container mx-auto text-center">
              <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-4xl md:text-6xl font-bold text-balance">
                  Welcome to Your <span className="text-primary">Online Village</span>
                </h1>
    
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                  Connect with Metro Detroit Black providers, build community, and find the resources your family needs. Because it takes
                  a village to raise our children, and every family deserves that support.
                </p>
    
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link href='/providers'>Find Providers</Link>
                  </Button>
                   <Button size="lg" variant="outline">
                    <Link href='/resources'>View Resources</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
  )
}