import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { name, category, logo, logoType } = body
    const skillId = parseInt(params.id)

    if (!name || !category) {
      return NextResponse.json({ error: 'Name and category are required' }, { status: 400 })
    }

    // Check if another skill with same name exists (case insensitive), excluding current skill
    const allSkills = await prisma.skill.findMany({
      where: { NOT: { id: skillId } }
    })
    const existingSkill = allSkills.find(skill => 
      skill.name.toLowerCase() === name.toLowerCase()
    )

    if (existingSkill) {
      return NextResponse.json({ error: 'Skill name already exists' }, { status: 409 })
    }

    const skill = await prisma.skill.update({
      where: { id: skillId },
      data: {
        name,
        category,
        logo: logo || '💻',
        logoType: logoType || 'emoji'
      }
    })

    return NextResponse.json(skill)
  } catch (error) {
    console.error('Error updating skill:', error)
    return NextResponse.json({ error: 'Failed to update skill' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const skillId = parseInt(params.id)

    await prisma.skill.delete({
      where: { id: skillId }
    })

    return NextResponse.json({ message: 'Skill deleted successfully' })
  } catch (error) {
    console.error('Error deleting skill:', error)
    return NextResponse.json({ error: 'Failed to delete skill' }, { status: 500 })
  }
}