import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { Medicine, loadMedicinesIntoQueue, formatReminderTime } from '@/lib/dataStructures/MedicineQueue';

// GET - Get next medicine reminder
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Fetch all medicines
    const medicinesRef = adminDb
      .collection('users')
      .doc(userId)
      .collection('medicines');
    
    const snapshot = await medicinesRef.get();
    
    const medicines: Medicine[] = [];
    snapshot.forEach(doc => {
      medicines.push({
        id: doc.id,
        ...doc.data()
      } as Medicine);
    });

    if (medicines.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No medicines found',
        reminders: []
      });
    }

    // Load into priority queue
    const queue = loadMedicinesIntoQueue(medicines);

    // Get upcoming reminders
    const upcomingReminders = queue.getAllSorted().slice(0, limit);

    // Format reminders for response
    const formattedReminders = upcomingReminders.map(reminder => ({
      medicineName: reminder.medicineName,
      dosage: reminder.dosage,
      medicineId: reminder.medicineId,
      nextReminderTime: reminder.nextReminderTime.toISOString(),
      formattedTime: formatReminderTime(reminder.nextReminderTime),
      timeUntil: getTimeUntil(reminder.nextReminderTime)
    }));

    // Get the very next reminder
    const nextReminder = upcomingReminders.length > 0 ? formattedReminders[0] : null;

    return NextResponse.json({
      success: true,
      nextReminder,
      upcomingReminders: formattedReminders,
      totalMedicines: medicines.length,
      totalReminders: queue.size()
    });
  } catch (error: any) {
    console.error('Error getting next reminder:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get next reminder' },
      { status: 500 }
    );
  }
}

/**
 * Calculate time until reminder in human-readable format
 */
function getTimeUntil(reminderTime: Date): string {
  const now = new Date();
  const diff = reminderTime.getTime() - now.getTime();
  
  if (diff < 0) return 'Overdue';
  
  const minutes = Math.floor(diff / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `In ${days} day${days > 1 ? 's' : ''}`;
  if (hours > 0) return `In ${hours} hour${hours > 1 ? 's' : ''}`;
  if (minutes > 0) return `In ${minutes} minute${minutes > 1 ? 's' : ''}`;
  return 'Now';
}
