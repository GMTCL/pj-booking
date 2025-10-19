import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { handleFileUpload } from '@/lib/upload'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const businessId = searchParams.get('businessId')

    if (!businessId) {
      return NextResponse.json({ error: 'Business ID is required' }, { status: 400 })
    }

    // Verify business ownership
    const business = await prisma.business.findFirst({
      where: {
        id: businessId,
        userId: session.user.id,
      }
    })

    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 })
    }

    const services = await prisma.service.findMany({
      where: { businessId },
      include: {
        subServices: true,
        operatingHours: true,
        bookingSettings: true,
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(services)
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const price = parseFloat(formData.get('price') as string)
    const discountedPrice = formData.get('discountedPrice') ? parseFloat(formData.get('discountedPrice') as string) : null
    const businessId = formData.get('businessId') as string

    if (!name || !price || !businessId) {
      return NextResponse.json({ error: 'Name, price, and business ID are required' }, { status: 400 })
    }

    // Verify business ownership
    const business = await prisma.business.findFirst({
      where: {
        id: businessId,
        userId: session.user.id,
      }
    })

    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 })
    }

    // Handle image upload
    let image = null
    const imageFile = formData.get('image') as File
    if (imageFile && imageFile.size > 0) {
      image = await handleFileUpload(request, 'image')
    }

    const service = await prisma.service.create({
      data: {
        name,
        description,
        image,
        price,
        discountedPrice,
        businessId,
      },
      include: {
        subServices: true,
        operatingHours: true,
        bookingSettings: true,
      }
    })

    return NextResponse.json(service)
  } catch (error) {
    console.error('Error creating service:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
