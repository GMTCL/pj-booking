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

    const businesses = await prisma.business.findMany({
      where: { userId: session.user.id },
      include: {
        services: {
          include: {
            subServices: true,
            operatingHours: true,
            bookingSettings: true,
          }
        },
        bankAccounts: true,
        transferInfo: true,
      }
    })

    return NextResponse.json(businesses)
  } catch (error) {
    console.error('Error fetching businesses:', error)
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
    const shopColor = formData.get('shopColor') as string || '#FF0FE3'
    const currency = formData.get('currency') as string || 'THB'
    const website = formData.get('website') as string
    const lineOA = formData.get('lineOA') as string
    const address = formData.get('address') as string

    // Handle profile image upload
    let profileImage = null
    const profileFile = formData.get('profileImage') as File
    if (profileFile && profileFile.size > 0) {
      profileImage = await handleFileUpload(request, 'profileImage')
    }

    // Handle cover image upload
    let coverImage = null
    const coverFile = formData.get('coverImage') as File
    if (coverFile && coverFile.size > 0) {
      coverImage = await handleFileUpload(request, 'coverImage')
    }

    const business = await prisma.business.create({
      data: {
        name,
        description,
        profileImage,
        coverImage,
        shopColor,
        currency,
        website,
        lineOA,
        address,
        userId: session.user.id,
      },
      include: {
        services: true,
        bankAccounts: true,
        transferInfo: true,
      }
    })

    return NextResponse.json(business)
  } catch (error) {
    console.error('Error creating business:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
