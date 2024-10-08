import { NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'

export async function GET() {
  const tasks = await prisma.task.findMany()
  return NextResponse.json({ tasks: tasks })
}

export async function POST(req) {
  const data = await req.json()
  console.log(data)
  const newTask = await prisma.task.create({ data: data })
  return NextResponse.json(newTask)
}
