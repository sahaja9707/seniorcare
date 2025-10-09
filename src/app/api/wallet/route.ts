import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import { 
  validateAmount, 
  calculateNewBalance, 
  createTransaction 
} from '@/lib/wallet';

// GET - Check wallet balance
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

    const userDoc = await adminDb.collection('users').doc(userId).get();
    
    if (!userDoc.exists) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const userData = userDoc.data();
    const balance = userData?.wallet || 0;

    return NextResponse.json({
      success: true,
      userId,
      balance,
      formatted: `₹${balance.toFixed(2)}`
    });
  } catch (error) {
    console.error('Error checking balance:', error);
    return NextResponse.json(
      { error: 'Failed to check balance' },
      { status: 500 }
    );
  }
}

// POST - Deposit money
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, amount, description } = body;

    if (!userId || amount === undefined) {
      return NextResponse.json(
        { error: 'User ID and amount are required' },
        { status: 400 }
      );
    }

    if (!validateAmount(amount)) {
      return NextResponse.json(
        { error: 'Invalid amount. Must be a positive number.' },
        { status: 400 }
      );
    }

    // Get current balance
    const userDoc = await adminDb.collection('users').doc(userId).get();
    
    if (!userDoc.exists) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const userData = userDoc.data();
    const currentBalance = userData?.wallet || 0;

    // Calculate new balance
    const newBalance = calculateNewBalance(currentBalance, amount, 'deposit');

    // Update wallet
    await adminDb.collection('users').doc(userId).update({
      wallet: newBalance
    });

    // Create transaction record
    const transaction = createTransaction(
      userId,
      amount,
      'deposit',
      description || 'Wallet deposit'
    );

    await adminDb.collection('transactions').add(transaction);

    return NextResponse.json({
      success: true,
      message: 'Deposit successful',
      previousBalance: currentBalance,
      depositAmount: amount,
      newBalance
    });
  } catch (error: any) {
    console.error('Error depositing money:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to deposit money' },
      { status: 500 }
    );
  }
}

// PUT - Withdraw money
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, amount, description } = body;

    if (!userId || amount === undefined) {
      return NextResponse.json(
        { error: 'User ID and amount are required' },
        { status: 400 }
      );
    }

    if (!validateAmount(amount)) {
      return NextResponse.json(
        { error: 'Invalid amount. Must be a positive number.' },
        { status: 400 }
      );
    }

    // Get current balance
    const userDoc = await adminDb.collection('users').doc(userId).get();
    
    if (!userDoc.exists) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const userData = userDoc.data();
    const currentBalance = userData?.wallet || 0;

    // Calculate new balance (will throw error if insufficient)
    const newBalance = calculateNewBalance(currentBalance, amount, 'withdrawal');

    // Update wallet
    await adminDb.collection('users').doc(userId).update({
      wallet: newBalance
    });

    // Create transaction record
    const transaction = createTransaction(
      userId,
      amount,
      'withdrawal',
      description || 'Wallet withdrawal'
    );

    await adminDb.collection('transactions').add(transaction);

    return NextResponse.json({
      success: true,
      message: 'Withdrawal successful',
      previousBalance: currentBalance,
      withdrawalAmount: amount,
      newBalance
    });
  } catch (error: any) {
    console.error('Error withdrawing money:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to withdraw money' },
      { status: 500 }
    );
  }
}
