import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const budget = await prisma.budget.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(budget);
  } catch (error) {
    console.error("Error fetching budget:", error);
    return NextResponse.json(
      { error: "Failed to fetch budget" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { monthlyIncome, weeklyLimit } = body;

    const budget = await prisma.budget.create({
      data: {
        monthlyIncome: Number(monthlyIncome),
        weeklyLimit: Number(weeklyLimit),
      },
    });

    return NextResponse.json(budget, { status: 201 });
  } catch (error) {
    console.error("Error creating budget:", error);
    return NextResponse.json(
      { error: "Failed to create budget" },
      { status: 500 }
    );
  }
}