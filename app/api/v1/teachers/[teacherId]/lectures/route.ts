import { NextRequest, NextResponse } from 'next/server';

const MOCK_LECTURES = {
  "T001": [
    { title: "Lecture 1: Introduction to Advanced Mathematics", videoUrl: "https://vjs.zencdn.net/v/oceans.mp4", pdfUrl: "#" },
    { title: "Lecture 2: Core Concepts of Calculus", videoUrl: "https://vjs.zencdn.net/v/oceans.mp4", pdfUrl: "#" }
  ],
  "T002": [
    { title: "Lecture 1: Intro to Physics", videoUrl: "https://vjs.zencdn.net/v/oceans.mp4", pdfUrl: "#" },
    { title: "Lecture 2: Quantum Mechanics", videoUrl: "https://vjs.zencdn.net/v/oceans.mp4", pdfUrl: "#" }
  ],
  "T003": [
    { title: "Lecture 1: Programming Basics", videoUrl: "https://vjs.zencdn.net/v/oceans.mp4", pdfUrl: "#" },
    { title: "Lecture 2: Algorithms", videoUrl: "https://vjs.zencdn.net/v/oceans.mp4", pdfUrl: "#" }
  ],
  "T004": [
    { title: "Lecture 1: Chemical Bonds", videoUrl: "https://vjs.zencdn.net/v/oceans.mp4", pdfUrl: "#" },
    { title: "Lecture 2: Molecular Structures", videoUrl: "https://vjs.zencdn.net/v/oceans.mp4", pdfUrl: "#" }
  ]
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ teacherId: string }> }
) {
  const resolvedParams = await params;
  const teacherId = resolvedParams.teacherId;
  
  const lectures = MOCK_LECTURES[teacherId as keyof typeof MOCK_LECTURES];

  if (!lectures) {
    return NextResponse.json({
      success: false,
      error: "No lectures found for this teacher."
    }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    data: lectures
  });
}
