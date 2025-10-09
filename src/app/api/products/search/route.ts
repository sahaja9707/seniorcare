import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { buildBSTFromProducts, search } from '@/lib/bst';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const productName = searchParams.get('name');

    if (!productName) {
      return NextResponse.json(
        { error: 'Product name is required' },
        { status: 400 }
      );
    }

    // Load all products from Firestore
    const snapshot = await adminDb.collection('groceries').get();
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Build BST from products
    const root = buildBSTFromProducts(products);

    // Search for product
    const result = search(root, productName.toLowerCase().trim());

    if (result && result.data) {
      return NextResponse.json({
        success: true,
        product: result.data
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error searching product:', error);
    return NextResponse.json(
      { error: 'Failed to search product' },
      { status: 500 }
    );
  }
}
