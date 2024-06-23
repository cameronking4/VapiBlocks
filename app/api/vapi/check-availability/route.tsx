import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axios from 'axios';

const bearerToken = process.env.CAL_API_KEY;
const username = process.env.CAL_USERNAME;
const userId = process.env.CAL_USERID;

export async function POST(request: NextRequest) {
  try {
    const { dateFrom, dateTo } = await request.json();
    console.log(dateFrom, dateTo);
    const response = await axios.get('https://api.cal.com/v1/availability', {
      params: {
        apiKey: bearerToken,
        userId: userId,
        username: username,
        dateFrom: dateFrom,
        dateTo: dateTo,
        eventTypeId: '873076'
      }
      });
    console.log(response);
    return NextResponse.json({ result: response.data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
