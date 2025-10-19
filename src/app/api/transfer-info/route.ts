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

    const transferInfo = await prisma.transferInfo.findUnique({
      where: { businessId }
    })

    return NextResponse.json(transferInfo)
  } catch (error) {
    console.error('Error fetching transfer info:', error)
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
    const businessId = formData.get('businessId') as string
    const message = formData.get('message') as string

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

    // Handle image upload
    let image = null
    const imageFile = formData.get('image') as File
    if (imageFile && imageFile.size > 0) {
      image = await handleFileUpload(request, 'image')
    }

    const transferInfo = await prisma.transferInfo.upsert({
      where: { businessId },
      update: {
        image,
        message,
      },
      create: {
        businessId,
        image,
        message,
      }
    })

    return NextResponse.json(transferInfo)
  } catch (error) {
    console.error('Error creating/updating transfer info:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
