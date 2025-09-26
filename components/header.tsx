"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export function Header() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo />

          <nav className="hidden md:flex items-center space-x-6">
            {/* Hover dropdown */}
            <div className="relative group">
              <Button
                variant="ghost"
                className="text-foreground hover:bg-muted hover:text-primary transition-colors text-md"
              >
                Providers
              </Button>

              {/* Dropdown appears on hover */}
              <div className="absolute mt-2 right-0 w-56 bg-card border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link href="/providers" className="block px-4 py-2 hover:bg-muted">
                  All Providers
                </Link>
                <Link href="/pediatricians" className="block px-4 py-2 hover:bg-muted">
                  Pediatricians
                </Link>
                <Link href="/nannies" className="block px-4 py-2 hover:bg-muted">
                  Nannies
                </Link>
                <Link href="/pelvic-floor-therapists" className="block px-4 py-2 hover:bg-muted">
                  Pelvic Floor Therapists
                </Link>
              </div>
            </div>
            <Link href="/resources" className="text-foreground hover:text-primary transition-colors">
              Resources
            </Link>
            <Link href="/contribute" className="text-foreground hover:text-primary transition-colors">
              Contribute
            </Link>
            <Link href="/feedback" className="text-foreground hover:text-primary transition-colors">
              Feedback
            </Link>
            
          </nav>

          <Button variant="outline" className="md:hidden bg-transparent">
            Menu
          </Button>
        </div>
      </div>
    </header>
  );
}
