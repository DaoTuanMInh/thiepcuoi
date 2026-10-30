import { NextResponse } from 'next/server';
import { connection } from 'next/server';
import clientPromise from '@/lib/mongodb';
import crypto from 'crypto';

export const instant = false;

function generateToken() {
  return crypto.randomBytes(4).toString('hex'); // 8 characters, like 'a8Kp3mQx'
}

function formatMongoError(error: any): string {
  const msg = error?.message || String(error || '');
  if (msg.includes('SSL alert number 80') || msg.includes('tlsv1 alert internal error')) {
    return 'Lỗi kết nối MongoDB Atlas (SSL Alert 80): Địa chỉ IP mạng hiện tại của bạn chưa được cấp quyền (whitelist) trong mục Network Access của MongoDB Atlas. Vui lòng vào MongoDB Atlas > Network Access và bấm "Add Current IP Address" (hoặc nhập 0.0.0.0/0).';
  }
  if (msg.includes('MongoServerSelectionError')) {
    return 'Không thể kết nối đến máy chủ cơ sở dữ liệu MongoDB Atlas. Vui lòng kiểm tra lại kết nối Internet và quyền IP Access trên MongoDB Atlas.';
  }
  return msg;
}

export async function GET() {
  await connection();
  try {
    const client = await clientPromise;
    const db = client.db('wedding_db');
    
    const guests = await db.collection('guests').find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json({ success: true, guests });
  } catch (error: any) {
    const formattedMsg = formatMongoError(error);
    return NextResponse.json({ success: false, error: formattedMsg, rawError: error?.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await connection();
  try {
    const { names } = await req.json();
    if (!names || !Array.isArray(names)) {
      return NextResponse.json({ success: false, error: 'Dữ liệu không đúng định dạng.' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('wedding_db');

    const newGuests = names.map((name: string) => ({
      name: name.trim(),
      token: generateToken(),
      createdAt: new Date(),
    })).filter((guest: any) => guest.name.length > 0);

    if (newGuests.length === 0) {
      return NextResponse.json({ success: false, error: 'Vui lòng nhập ít nhất một tên khách mời.' }, { status: 400 });
    }

    const result = await db.collection('guests').insertMany(newGuests);
    return NextResponse.json({ success: true, insertedCount: result.insertedCount });
  } catch (error: any) {
    const formattedMsg = formatMongoError(error);
    return NextResponse.json({ success: false, error: formattedMsg, rawError: error?.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  await connection();
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    const client = await clientPromise;
    const db = client.db('wedding_db');

    if (id) {
      const { ObjectId } = require('mongodb');
      await db.collection('guests').deleteOne({ _id: new ObjectId(id) });
    } else {
      // delete all
      await db.collection('guests').deleteMany({});
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    const formattedMsg = formatMongoError(error);
    return NextResponse.json({ success: false, error: formattedMsg, rawError: error?.message }, { status: 500 });
  }
}
