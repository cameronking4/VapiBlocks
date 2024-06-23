import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axios from 'axios';

const apiKey = process.env.CAL_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const {
      start,
      name,
      email,
      smsReminderNumber
    } = await request.json();

    const startDateTime = new Date(start);
    const endDateTime = new Date(startDateTime.getTime() + 30 * 60000); // Add 30 minutes to start time
    const end = endDateTime.toISOString();

    const response = await axios.post(
      `https://api.cal.com/v1/bookings?apiKey=${apiKey}`,
      {
        eventTypeId: 873076,
        start: start,
        end: end,
        responses: {
          "name": name,
          "email": email,
          "metadata": {},
          "location": "Google Meet"
        },
        timeZone: "America/Los_Angeles",
        language: "en",
        title: "30min Meeting with Cam (Founder of VapiBlocks)",
        description: "Discuss partnership with VapiBlocks or ways to add Voice AI to your app",
        status: "ACCEPTED",
        smsReminderNumber: smsReminderNumber || null,
        metadata: {}
      }
    );

    return NextResponse.json({ result: "The booking was created successfully.", response: response.data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
