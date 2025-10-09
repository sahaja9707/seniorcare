import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { convertCurrency } from '@/lib/currency';
import { FieldValue } from 'firebase-admin/firestore';

// POST - Perform admin operations (currency conversion, field deletion)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { operation, collection, batchSize = 100 } = body;

    if (!operation || !collection) {
      return NextResponse.json(
        { error: 'Operation and collection are required' },
        { status: 400 }
      );
    }

    let totalUpdated = 0;
    let lastDoc: any = null;

    // Currency Conversion Operation
    if (operation === 'convertCurrency') {
      const { field, conversionRate = 88 } = body;

      if (!field) {
        return NextResponse.json(
          { error: 'Field name is required for currency conversion' },
          { status: 400 }
        );
      }

      while (true) {
        let query = adminDb.collection(collection).limit(batchSize);
        
        if (lastDoc) {
          query = query.startAfter(lastDoc);
        }

        const snapshot = await query.get();
        
        if (snapshot.empty) {
          break;
        }

        const batch = adminDb.batch();

        for (const doc of snapshot.docs) {
          const data = doc.data();
          
          if (data[field]) {
            const value = data[field];
            
            if (typeof value === 'string') {
              try {
                const converted = convertCurrency(value, conversionRate);
                batch.update(doc.ref, { [field]: converted });
                totalUpdated++;
              } catch (error) {
                console.error(`Skipped document ${doc.id}: ${error}`);
              }
            }
          }
        }

        await batch.commit();
        lastDoc = snapshot.docs[snapshot.docs.length - 1];
      }

      return NextResponse.json({
        success: true,
        message: `Currency conversion completed`,
        operation: 'convertCurrency',
        totalUpdated
      });
    }

    // Delete Fields Operation
    if (operation === 'deleteFields') {
      const { fields } = body;

      if (!fields || !Array.isArray(fields) || fields.length === 0) {
        return NextResponse.json(
          { error: 'Fields array is required for deletion' },
          { status: 400 }
        );
      }

      while (true) {
        let query = adminDb.collection(collection).limit(batchSize);
        
        if (lastDoc) {
          query = query.startAfter(lastDoc);
        }

        const snapshot = await query.get();
        
        if (snapshot.empty) {
          break;
        }

        const batch = adminDb.batch();

        for (const doc of snapshot.docs) {
          const updates: any = {};
          
          for (const field of fields) {
            updates[field] = FieldValue.delete();
          }

          batch.update(doc.ref, updates);
          totalUpdated++;
        }

        await batch.commit();
        lastDoc = snapshot.docs[snapshot.docs.length - 1];
      }

      return NextResponse.json({
        success: true,
        message: `Field deletion completed`,
        operation: 'deleteFields',
        totalUpdated,
        fieldsDeleted: fields
      });
    }

    return NextResponse.json(
      { error: 'Invalid operation. Use "convertCurrency" or "deleteFields"' },
      { status: 400 }
    );

  } catch (error: any) {
    console.error('Error performing admin operation:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to perform operation' },
      { status: 500 }
    );
  }
}
