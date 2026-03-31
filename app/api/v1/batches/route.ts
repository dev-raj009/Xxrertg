import { NextResponse } from 'next/server';

const MOCK_BATCHES = [
  { id: "1", name: "Mathematics Advanced", teacher: "Prof. Alan Turing" },
  { id: "2", name: "Physics Masterclass", teacher: "Dr. Marie Curie" },
  { id: "3", name: "Computer Science 101", teacher: "Ada Lovelace" },
  { id: "4", name: "Organic Chemistry", teacher: "Linus Pauling" }
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: MOCK_BATCHES
  });
}
