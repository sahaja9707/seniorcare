import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { buildBSTFromProducts, search, searchPartial } from '@/lib/bst';

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

    // Search for products with partial key match
    const results = searchPartial(root, productName.toLowerCase().trim());

    if (results.length > 0) {
      return NextResponse.json({
        success: true,
        products: results.map(node => node.data),
        count: results.length
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'No products found', products: [] },
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
