import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(skills)
  } catch (error) {
    console.error('Error fetching skills:', error)
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, category, logo, logoType } = body

    if (!name || !category) {
      return NextResponse.json({ error: 'Name and category are required' }, { status: 400 })
    }

    // Check if skill already exists (case insensitive)
    const allSkills = await prisma.skill.findMany()
    const existingSkill = allSkills.find(skill => 
      skill.name.toLowerCase() === name.toLowerCase()
    )

    if (existingSkill) {
      return NextResponse.json({ error: 'Skill already exists' }, { status: 409 })
    }

    const skill = await prisma.skill.create({
      data: {
        name,
        category,
        logo: logo || '💻',
        logoType: logoType || 'emoji'
      }
    })

    return NextResponse.json(skill, { status: 201 })
  } catch (error) {
    console.error('Error creating skill:', error)
    return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 })
  }
}