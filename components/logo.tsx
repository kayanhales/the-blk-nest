import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Bird } from "lucide-react"

export function Logo() {
  return ( 
  <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg"><Bird/></span>
            </div>
            <span className="text-xl font-bold text-foreground">The BLK Nest </span>  <span>[Metro Detroit]</span>
          </Link>
  )
}