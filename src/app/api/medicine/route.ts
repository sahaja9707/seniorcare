import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { validateMedicine, createMedicine } from '@/lib/medicine';
import { Medicine } from '@/lib/dataStructures/MedicineQueue';

// GET - Get all medicines for a user
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

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

    return NextResponse.json({
      success: true,
      medicines,
      count: medicines.length
    });
  } catch (error: any) {
    console.error('Error fetching medicines:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch medicines' },
      { status: 500 }
    );
  }
}

// POST - Add new medicine
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, name, dosage, frequency, times, expiryDate } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Create medicine object
    const medicine = createMedicine(name, dosage, frequency, times, expiryDate);

    // Validate
    const validation = validateMedicine(medicine);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Add to Firestore
    const medicinesRef = adminDb
      .collection('users')
      .doc(userId)
      .collection('medicines');
    
    const docRef = await medicinesRef.add({
      ...medicine,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      message: 'Medicine added successfully',
      medicineId: docRef.id,
      medicine: {
        id: docRef.id,
        ...medicine
      }
    });
  } catch (error: any) {
    console.error('Error adding medicine:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to add medicine' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a medicine
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const medicineId = searchParams.get('medicineId');

    if (!userId || !medicineId) {
      return NextResponse.json(
        { error: 'User ID and Medicine ID are required' },
        { status: 400 }
      );
    }

    const medicineRef = adminDb
      .collection('users')
      .doc(userId)
      .collection('medicines')
      .doc(medicineId);

    const doc = await medicineRef.get();
    if (!doc.exists) {
      return NextResponse.json(
        { error: 'Medicine not found' },
        { status: 404 }
      );
    }

    await medicineRef.delete();

    return NextResponse.json({
      success: true,
      message: 'Medicine deleted successfully',
      medicineId
    });
  } catch (error: any) {
    console.error('Error deleting medicine:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete medicine' },
      { status: 500 }
    );
  }
}

// PUT - Update a medicine
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, medicineId, name, dosage, frequency, times, expiryDate } = body;

    if (!userId || !medicineId) {
      return NextResponse.json(
        { error: 'User ID and Medicine ID are required' },
        { status: 400 }
      );
    }

    // Create medicine object
    const medicine = createMedicine(name, dosage, frequency, times, expiryDate);

    // Validate
    const validation = validateMedicine(medicine);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const medicineRef = adminDb
      .collection('users')
      .doc(userId)
      .collection('medicines')
      .doc(medicineId);

    const doc = await medicineRef.get();
    if (!doc.exists) {
      return NextResponse.json(
        { error: 'Medicine not found' },
        { status: 404 }
      );
    }

    await medicineRef.update({
      ...medicine,
      updatedAt: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      message: 'Medicine updated successfully',
      medicine: {
        id: medicineId,
        ...medicine
      }
    });
  } catch (error: any) {
    console.error('Error updating medicine:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update medicine' },
      { status: 500 }
    );
  }
}
