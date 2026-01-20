import { addMinutes, format, isAfter, isBefore, parse, setHours, setMinutes } from 'date-fns';

// Types relative to Booking Logic
export interface TimeSlot {
    time: string; // "09:00"
    available: boolean;
}

export interface ExistingBooking {
    start_time: string; // ISO string
    end_time: string;   // ISO string
}

const SHOP_OPEN_HOUR = 9;
const SHOP_CLOSE_HOUR = 17; // 5 PM
const SLOT_INTERVAL_MINUTES = 15;

/**
 * Generates available time slots for a given date, service duration, and existing bookings.
 * 
 * @param date - The selected date (Date object)
 * @param serviceDurationMin - Duration of the service in minutes
 * @param existingBookings - Array of booking objects with start_time and end_time
 * @returns Array of TimeSlot objects
 */
export function getAvailableSlots(
    date: Date,
    serviceDurationMin: number,
    existingBookings: ExistingBooking[]
): TimeSlot[] {
    const slots: TimeSlot[] = [];

    // Set start and end range for the day
    let currentSlot = setMinutes(setHours(date, SHOP_OPEN_HOUR), 0);
    const closingTime = setMinutes(setHours(date, SHOP_CLOSE_HOUR), 0);

    // Generate all possible slots
    while (isBefore(currentSlot, closingTime)) {
        const slotEnd = addMinutes(currentSlot, serviceDurationMin);

        // If the service exceeds closing time, break
        if (isAfter(slotEnd, closingTime)) {
            break;
        }

        // Check for collision with existing bookings
        const isOverlapping = existingBookings.some((booking) => {
            const bookingStart = new Date(booking.start_time);
            const bookingEnd = new Date(booking.end_time);

            // Overlap condition: 
            // (SlotStart < BookingEnd) AND (SlotEnd > BookingStart)
            return isBefore(currentSlot, bookingEnd) && isAfter(slotEnd, bookingStart);
        });

        slots.push({
            time: format(currentSlot, 'HH:mm'),
            available: !isOverlapping,
        });

        // Move to next interval
        currentSlot = addMinutes(currentSlot, SLOT_INTERVAL_MINUTES);
    }

    return slots;
}
