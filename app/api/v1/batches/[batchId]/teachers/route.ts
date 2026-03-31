import { NextRequest, NextResponse } from 'next/server';

const MOCK_TEACHERS = {
  "1": [
    { teacherId: "T001", name: "Prof. Alan Turing", videos: 12, pdfs: 5, photoUrl: "https://i.postimg.cc/zBFfBhtG/IMG-20260324-140610-299.jpg" },
    { teacherId: "T002", name: "Dr. Marie Curie", videos: 8, pdfs: 3, photoUrl: "https://i.postimg.cc/zBFfBhtG/IMG-20260324-140610-299.jpg" }
  ],
  "2": [
    { teacherId: "T002", name: "Dr. Marie Curie", videos: 15, pdfs: 10, photoUrl: "https://i.postimg.cc/zBFfBhtG/IMG-20260324-140610-299.jpg" }
  ],
  "3": [
    { teacherId: "T003", name: "Ada Lovelace", videos: 20, pdfs: 12, photoUrl: "https://i.postimg.cc/zBFfBhtG/IMG-20260324-140610-299.jpg" }
  ],
  "4": [
    { teacherId: "T004", name: "Linus Pauling", videos: 5, pdfs: 2, photoUrl: "https://i.postimg.cc/zBFfBhtG/IMG-20260324-140610-299.jpg" }
  ]
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ batchId: string }> }
) {
  const resolvedParams = await params;
  const batchId = resolvedParams.batchId;
  const teachers = MOCK_TEACHERS[batchId as keyof typeof MOCK_TEACHERS];

  if (!teachers) {
    return NextResponse.json({
      success: false,
      error: "No teachers found for this batch ID."
    }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    data: teachers
  });
}
