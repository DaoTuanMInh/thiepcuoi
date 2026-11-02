import { NextResponse } from 'next/server';
import { connection } from 'next/server';
import clientPromise from '@/lib/mongodb';

export const instant = false;

export async function GET() {
  await connection();
  try {
    const client = await clientPromise;
    if (!client) {
      return NextResponse.json(
        { success: true, wishes: [] },
        { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } }
      );
    }

    const db = client.db('wedding_db');
    const dbWishes = await db
      .collection('wishes')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    // Map _id to string and ensure ISO date
    const formatted = dbWishes.map((w) => ({
      _id: w._id.toString(),
      name: w.name,
      message: w.message || '',
      attendance: w.attendance || 'Xác nhận tham dự',
      createdAt:
        w.createdAt instanceof Date
          ? w.createdAt.toISOString()
          : typeof w.createdAt === 'string'
          ? w.createdAt
          : new Date().toISOString(),
    }));

    return NextResponse.json(
      {
        success: true,
        wishes: formatted,
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      }
    );
  } catch (error: any) {
    console.warn('Wishes GET error:', error?.message);
    return NextResponse.json(
      { success: true, wishes: [] },
      { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } }
    );
  }
}

export async function POST(req: Request) {
  await connection();
  try {
    const body = await req.json();
    const { name, message, attendance } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, error: 'Vui lòng nhập tên của Quý Khách.' },
        { status: 400 }
      );
    }

    const newWish = {
      name: name.trim(),
      message: (message || '').trim(),
      attendance: attendance || 'Xác nhận tham dự',
      createdAt: new Date(),
    };

    const client = await clientPromise;
    if (client) {
      const db = client.db('wedding_db');
      const res = await db.collection('wishes').insertOne(newWish);
      return NextResponse.json({
        success: true,
        wish: {
          ...newWish,
          _id: res.insertedId.toString(),
          createdAt: newWish.createdAt.toISOString(),
        },
      });
    }

    return NextResponse.json({
      success: true,
      wish: {
        ...newWish,
        _id: `local-${Date.now()}`,
        createdAt: newWish.createdAt.toISOString(),
      },
    });
  } catch (error: any) {
    console.error('Error saving wish to database:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Có lỗi xảy ra khi gửi lời chúc.' },
      { status: 500 }
    );
  }
}
