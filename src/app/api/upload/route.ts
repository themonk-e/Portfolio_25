import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function POST(request: NextRequest) {
  try {
    console.log('Upload API called')
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File

    console.log('File received:', file ? file.name : 'null')
    
    if (!file) {
      console.log('No file in form data')
      return NextResponse.json({ error: 'No file received' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['image/png', 'image/jpeg', 'image/svg+xml']
    console.log('File type:', file.type)
    if (!allowedTypes.includes(file.type)) {
      console.log('Invalid file type:', file.type)
      return NextResponse.json({ error: 'Invalid file type. Only PNG, JPG, JPEG, and SVG are allowed' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create unique filename
    const timestamp = Date.now()
    const extension = file.name.split('.').pop()
    const filename = `skill-${timestamp}.${extension}`
    
    // Save to public/skills directory
    const path = join(process.cwd(), 'public/skills', filename)
    console.log('Saving file to:', path)
    await writeFile(path, buffer)
    console.log('File saved successfully')

    // Return the public URL
    const publicUrl = `/skills/${filename}`
    console.log('Returning URL:', publicUrl)
    return NextResponse.json({ url: publicUrl })

  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}