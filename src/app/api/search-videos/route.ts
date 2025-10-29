import { NextResponse } from "next/server";
import { YouTube } from "youtube-sr";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const booking = searchParams.get("booking");

  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  try {
    const results = await YouTube.search(query, { limit: 30, type: "video" });
    if (!results.length) {
      return NextResponse.json({ error: "No video found" }, { status: 404 });
    }

    const videos = results.map((v) => ({
      video_id: v.id,
      title: v.title,
      duration: v.duration / 1000, // convert ms → seconds
      url: `https://youtube.com/watch?v=${v.id}`,
      thumbnail: v.thumbnail?.url,
      author: v.channel?.name,
      booking_code: booking || null, // Thêm mã booking nếu có
    }));

    const data = {
      videos,
      total: videos.length,
      query,
      booking_code: booking || null,
    };

    // Optional: set cache header (10 phút)
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=600",
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}
