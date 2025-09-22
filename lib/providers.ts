import pediatricians from "@/data/pediatricians.json"
import nannies from "@/data/nannies.json"
import pelvicFloorTherapists from "@/data/pelvic-floor-therapists.json"

export interface Provider {
  id: string
  name: string
  specialty: string
  location: string
  website: string
  phone: string
  email: string
  bio: string
  languages: string[]
  acceptsInsurance: boolean
  rating: number | null
  image: string
}

export const getAllProviders = (): Provider[] => {
  return [...pediatricians, ...nannies, ...pelvicFloorTherapists]
}

export const getPediatricians = (): Provider[] => {
  return pediatricians
}

export const getNannies = (): Provider[] => {
  return nannies
}

export const getPelvicFloorTherapists = (): Provider[] => {
  return pelvicFloorTherapists
}

export const searchProviders = (query: string, specialty?: string): Provider[] => {
  let providers = getAllProviders()

  if (specialty && specialty !== "all") {
    providers = providers.filter((provider) => provider.specialty.toLowerCase() === specialty.toLowerCase())
  }

  if (query.trim()) {
    const searchTerm = query.toLowerCase()
    providers = providers.filter(
      (provider) =>
        provider.name.toLowerCase().includes(searchTerm) ||
        provider.specialty.toLowerCase().includes(searchTerm) ||
        provider.location.toLowerCase().includes(searchTerm) ||
        provider.bio.toLowerCase().includes(searchTerm),
    )
  }

  return providers
}
