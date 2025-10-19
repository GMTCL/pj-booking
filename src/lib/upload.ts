import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { NextRequest } from 'next/server'

export async function uploadFile(file: File, folder: string = 'uploads'): Promise<string> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  
  // Create uploads directory if it doesn't exist
  const uploadsDir = join(process.cwd(), 'public', folder)
  await mkdir(uploadsDir, { recursive: true })
  
  // Generate unique filename
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 15)
  const extension = file.name.split('.').pop()
  const filename = `${timestamp}-${randomString}.${extension}`
  
  // Save file
  const filepath = join(uploadsDir, filename)
  await writeFile(filepath, buffer)
  
  // Return public URL
  return `/${folder}/${filename}`
}

export async function handleFileUpload(request: NextRequest, fieldName: string = 'file'): Promise<string | null> {
  try {
    const formData = await request.formData()
    const file = formData.get(fieldName) as File
    
    if (!file) {
      return null
    }
    
    return await uploadFile(file)
  } catch (error) {
    console.error('File upload error:', error)
    return null
  }
}
