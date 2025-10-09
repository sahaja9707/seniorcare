import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { 
  addToCart, 
  calculateTotal, 
  generateBill, 
  checkStockAvailability 
} from '@/lib/cart';

// GET - Get cart items and calculate total
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

    // Get user's cart from Firestore
    const userDoc = await adminDb.collection('users').doc(userId).get();
    const userData = userDoc.data();
    const cart = userData?.cart || {};

    // Get all products for price calculation
    const snapshot = await adminDb.collection('groceries').get();
    const products = snapshot.docs.map(doc => ({
      Product_Name: doc.data().Product_Name,
      Unit_Price: parseFloat(doc.data().Unit_Price?.toString().replace('₹', '').replace(',', '') || '0'),
      Stock_Quantity: doc.data().Stock_Quantity || 0
    }));

    const bill = generateBill(cart, products);

    return NextResponse.json({
      success: true,
      cart,
      bill
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    );
  }
}

// POST - Add item to cart
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, productName, quantity } = body;

    if (!userId || !productName || !quantity) {
      return NextResponse.json(
        { error: 'User ID, product name, and quantity are required' },
        { status: 400 }
      );
    }

    // Check if product exists
    const productsSnapshot = await adminDb
      .collection('groceries')
      .where('Product_Name', '==', productName)
      .get();

    if (productsSnapshot.empty) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Get current cart
    const userDoc = await adminDb.collection('users').doc(userId).get();
    const userData = userDoc.data();
    const currentCart = userData?.cart || {};

    // Add to cart
    const updatedCart = addToCart(currentCart, productName, quantity);

    // Update in Firestore
    await adminDb.collection('users').doc(userId).update({
      cart: updatedCart
    });

    return NextResponse.json({
      success: true,
      message: 'Item added to cart',
      cart: updatedCart
    });
  } catch (error: any) {
    console.error('Error adding to cart:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to add to cart' },
      { status: 500 }
    );
  }
}

// PUT - Update cart item quantity
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, productName, quantity } = body;

    if (!userId || !productName || quantity === undefined) {
      return NextResponse.json(
        { error: 'User ID, product name, and quantity are required' },
        { status: 400 }
      );
    }

    // Get current cart
    const userDoc = await adminDb.collection('users').doc(userId).get();
    const userData = userDoc.data();
    const currentCart = userData?.cart || {};

    if (quantity === 0) {
      // Remove item if quantity is 0
      delete currentCart[productName];
    } else {
      currentCart[productName] = quantity;
    }

    // Update in Firestore
    await adminDb.collection('users').doc(userId).update({
      cart: currentCart
    });

    return NextResponse.json({
      success: true,
      message: 'Cart updated',
      cart: currentCart
    });
  } catch (error: any) {
    console.error('Error updating cart:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update cart' },
      { status: 500 }
    );
  }
}

// DELETE - Clear cart or remove item
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const productName = searchParams.get('productName');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const userDoc = await adminDb.collection('users').doc(userId).get();
    const userData = userDoc.data();
    const currentCart = userData?.cart || {};

    if (productName) {
      // Remove specific item
      delete currentCart[productName];
    } else {
      // Clear entire cart
      Object.keys(currentCart).forEach(key => delete currentCart[key]);
    }

    await adminDb.collection('users').doc(userId).update({
      cart: currentCart
    });

    return NextResponse.json({
      success: true,
      message: productName ? 'Item removed from cart' : 'Cart cleared',
      cart: currentCart
    });
  } catch (error) {
    console.error('Error deleting from cart:', error);
    return NextResponse.json(
      { error: 'Failed to delete from cart' },
      { status: 500 }
    );
  }
}
