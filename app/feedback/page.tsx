import { FeedbackForm } from "@/components/feedback-form"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function FeedbackPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Your Voice Matters</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Help us make The BLK Nest better for our community. Share your thoughts, suggestions, or report any issues.
          </p>
        </div>

        <FeedbackForm />

        <div className="mt-12 text-center">
          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold text-foreground mb-3">Building Together</h2>
            <p className="text-muted-foreground text-pretty">
              The BLK Nest is a community-driven platform. Your feedback helps us create a better experience for Black
              families seeking trusted providers and resources.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
