import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { accountName, bankName, accountNumber } = await request.json()

    if (!accountName || !bankName || !accountNumber) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    // Verify bank account ownership through business
    const bankAccount = await prisma.bankAccount.findFirst({
      where: {
        id: params.id,
        business: {
          userId: session.user.id,
        }
      }
    })

    if (!bankAccount) {
      return NextResponse.json({ error: 'Bank account not found' }, { status: 404 })
    }

    const updatedBankAccount = await prisma.bankAccount.update({
      where: { id: params.id },
      data: {
        accountName,
        bankName,
        accountNumber,
      }
    })

    return NextResponse.json(updatedBankAccount)
  } catch (error) {
    console.error('Error updating bank account:', error)
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

    // Verify bank account ownership through business
    const bankAccount = await prisma.bankAccount.findFirst({
      where: {
        id: params.id,
        business: {
          userId: session.user.id,
        }
      }
    })

    if (!bankAccount) {
      return NextResponse.json({ error: 'Bank account not found' }, { status: 404 })
    }

    await prisma.bankAccount.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting bank account:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
