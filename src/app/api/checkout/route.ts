import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { checkStockAvailability, generateBill } from '@/lib/cart';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Get user's cart
    const userDoc = await adminDb.collection('users').doc(userId).get();
    const userData = userDoc.data();
    const cart = userData?.cart || {};

    if (Object.keys(cart).length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }

    // Get all products
    const snapshot = await adminDb.collection('groceries').get();
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      Product_Name: doc.data().Product_Name,
      Unit_Price: parseFloat(doc.data().Unit_Price?.toString().replace('₹', '').replace(',', '') || '0'),
      Stock_Quantity: doc.data().Stock_Quantity || 0
    }));

    // Check stock availability
    const stockCheck = checkStockAvailability(cart, products);
    if (!stockCheck.available) {
      return NextResponse.json(
        { 
          error: 'Insufficient stock for some items',
          insufficientItems: stockCheck.insufficientItems
        },
        { status: 400 }
      );
    }

    // Generate bill
    const bill = generateBill(cart, products);

    // Check user wallet balance
    const userWallet = userData?.wallet || 0;
    if (userWallet < bill.totals.total) {
      return NextResponse.json(
        { 
          error: 'Insufficient wallet balance',
          required: bill.totals.total,
          available: userWallet
        },
        { status: 400 }
      );
    }

    // Update stock for each item
    const batch = adminDb.batch();
    for (const [productName, quantity] of Object.entries(cart)) {
      const product = products.find(p => p.Product_Name === productName);
      if (product) {
        const productRef = adminDb.collection('groceries').doc(product.id);
        const qty = typeof quantity === 'number' ? quantity : parseInt(quantity as string);
        const newStock = product.Stock_Quantity - qty;
        batch.update(productRef, { Stock_Quantity: newStock });
      }
    }

    // Deduct from wallet
    const newWalletBalance = userWallet - bill.totals.total;
    const userRef = adminDb.collection('users').doc(userId);
    batch.update(userRef, {
      wallet: newWalletBalance,
      cart: {} // Clear cart after checkout
    });

    // Add transaction history
    const transactionRef = adminDb.collection('transactions').doc();
    batch.set(transactionRef, {
      userId,
      items: bill.items,
      subtotal: bill.totals.subtotal,
      gst: bill.totals.gst,
      total: bill.totals.total,
      timestamp: new Date().toISOString(),
      type: 'purchase'
    });

    // Commit all changes
    await batch.commit();

    return NextResponse.json({
      success: true,
      message: 'Checkout completed successfully',
      bill,
      newWalletBalance
    });
  } catch (error: any) {
    console.error('Error during checkout:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to complete checkout' },
      { status: 500 }
    );
  }
}
