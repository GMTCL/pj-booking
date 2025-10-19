import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { handleFileUpload } from '@/lib/upload'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const business = await prisma.business.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
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

    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 })
    }

    return NextResponse.json(business)
  } catch (error) {
    console.error('Error fetching business:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const shopColor = formData.get('shopColor') as string
    const currency = formData.get('currency') as string
    const website = formData.get('website') as string
    const lineOA = formData.get('lineOA') as string
    const address = formData.get('address') as string

    // Handle profile image upload
    let profileImage = undefined
    const profileFile = formData.get('profileImage') as File
    if (profileFile && profileFile.size > 0) {
      profileImage = await handleFileUpload(request, 'profileImage')
    }

    // Handle cover image upload
    let coverImage = undefined
    const coverFile = formData.get('coverImage') as File
    if (coverFile && coverFile.size > 0) {
      coverImage = await handleFileUpload(request, 'coverImage')
    }

    const updateData: any = {
      name,
      description,
      shopColor,
      currency,
      website,
      lineOA,
      address,
    }

    if (profileImage) updateData.profileImage = profileImage
    if (coverImage) updateData.coverImage = coverImage

    const business = await prisma.business.update({
      where: {
        id: params.id,
        userId: session.user.id,
      },
      data: updateData,
      include: {
        services: true,
        bankAccounts: true,
        transferInfo: true,
      }
    })

    return NextResponse.json(business)
  } catch (error) {
    console.error('Error updating business:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.business.delete({
      where: {
        id: params.id,
        userId: session.user.id,
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting business:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
