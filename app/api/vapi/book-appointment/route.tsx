import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axios from 'axios';

const bearerToken = process.env.CAL_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const {
      datetime,
      eventTypeId,
      title,
      description,
      timeZone,
      language,
      recurringEventId,
      seatsPerTimeSlot,
      seatsShowAttendees,
      seatsShowAvailabilityCount,
      smsReminderNumber
    } = await request.json();

    const response = await axios.post('https://api.cal.com/v1/appointments', {
      start_time: datetime,
      end_time: new Date(new Date(datetime).getTime() + 30 * 60000).toISOString(),
      title: title || "Scheduled Appointment",
      eventTypeId: eventTypeId,
      description: description || "",
      timeZone: timeZone,
      language: language || "en",
      recurringEventId: recurringEventId || null,
      seatsPerTimeSlot: seatsPerTimeSlot || 1,
      seatsShowAttendees: seatsShowAttendees || false,
      seatsShowAvailabilityCount: seatsShowAvailabilityCount || false,
      smsReminderNumber: smsReminderNumber || null
    }, {
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json'
      }
    });

    return NextResponse.json({ result: "The appointment was booked successfully.", response: response }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: JSON.stringify(error) }, { status: 500 });
  }
}
