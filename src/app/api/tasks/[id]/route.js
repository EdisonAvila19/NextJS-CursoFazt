import { NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'

export async function GET(req, {params}) {
  const task = await prisma.task.findUnique({ 
    where : { id: +params.id } 
  })
  return NextResponse.json(task)
}

export async function PUT(req, {params}) {
  const data = await req.json()
  const taskUpdated = await prisma.task.update({ 
    where: { id: +params.id },
    data: data 
  })
  return NextResponse.json(taskUpdated)
}

export async function DELETE(req, {params}) {
  try {
    const taskDeleted = await prisma.task.delete({ 
      where: { id: +params.id }
    })
    return NextResponse.json(taskDeleted)
  } catch (error) {
    return NextResponse.json(error.message)
  }
}