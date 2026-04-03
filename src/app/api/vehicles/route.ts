import { type NextRequest } from 'next/server'
import { getVehicles } from '@/lib/api/revendamais'
import type { VehicleFilters } from '@/lib/types'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams

    const filters: VehicleFilters = {}

    const brand = searchParams.get('brand')
    if (brand) filters.brand = brand

    const model = searchParams.get('model')
    if (model) filters.model = model

    const yearMin = searchParams.get('yearMin')
    if (yearMin) filters.yearMin = Number(yearMin)

    const yearMax = searchParams.get('yearMax')
    if (yearMax) filters.yearMax = Number(yearMax)

    const priceMin = searchParams.get('priceMin')
    if (priceMin) filters.priceMin = Number(priceMin)

    const priceMax = searchParams.get('priceMax')
    if (priceMax) filters.priceMax = Number(priceMax)

    const fuel = searchParams.get('fuel')
    if (fuel) filters.fuel = fuel

    const transmission = searchParams.get('transmission')
    if (transmission) filters.transmission = transmission

    const bodyType = searchParams.get('bodyType')
    if (bodyType) filters.bodyType = bodyType

    const sortBy = searchParams.get('sortBy')
    if (sortBy) filters.sortBy = sortBy as VehicleFilters['sortBy']

    const vehicles = await getVehicles(filters)

    return Response.json({ vehicles })
  } catch (error) {
    console.error('[API /vehicles] Error fetching vehicles:', error)
    return Response.json(
      { error: 'Failed to fetch vehicles' },
      { status: 500 },
    )
  }
}
