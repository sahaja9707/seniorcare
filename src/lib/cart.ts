// Cart utility functions for managing customer orders
export interface CartItem {
  productName: string;
  quantity: number;
}

export interface CartTotal {
  subtotal: number;
  gst: number;
  total: number;
}

export interface BillItem {
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export function addToCart(
  cart: Record<string, number>,
  productName: string,
  quantity: number
): Record<string, number> {
  if (quantity <= 0) {
    throw new Error('Invalid quantity. Must be greater than 0.');
  }

  const newCart = { ...cart };
  newCart[productName] = (newCart[productName] || 0) + quantity;
  return newCart;
}

export function removeFromCart(
  cart: Record<string, number>,
  productName: string
): Record<string, number> {
  const newCart = { ...cart };
  delete newCart[productName];
  return newCart;
}

export function updateCartQuantity(
  cart: Record<string, number>,
  productName: string,
  quantity: number
): Record<string, number> {
  if (quantity <= 0) {
    throw new Error('Invalid quantity. Must be greater than 0.');
  }

  const newCart = { ...cart };
  newCart[productName] = quantity;
  return newCart;
}

export function calculateTotal(
  cart: Record<string, number>,
  products: Array<{ Product_Name: string; Unit_Price: number }>
): CartTotal {
  let subtotal = 0;

  for (const [productName, quantity] of Object.entries(cart)) {
    const product = products.find(p => p.Product_Name === productName);
    if (product) {
      subtotal += product.Unit_Price * quantity;
    }
  }

  const gst = subtotal * 0.05; // 5% GST
  const total = Math.ceil(subtotal + gst);

  return { subtotal, gst, total };
}

export function generateBill(
  cart: Record<string, number>,
  products: Array<{ Product_Name: string; Unit_Price: number }>
): { items: BillItem[]; totals: CartTotal } {
  const items: BillItem[] = [];

  for (const [productName, quantity] of Object.entries(cart)) {
    const product = products.find(p => p.Product_Name === productName);
    if (product) {
      items.push({
        productName,
        quantity,
        unitPrice: product.Unit_Price,
        totalPrice: product.Unit_Price * quantity
      });
    }
  }

  const totals = calculateTotal(cart, products);

  return { items, totals };
}

export function checkStockAvailability(
  cart: Record<string, number>,
  products: Array<{ Product_Name: string; Stock_Quantity: number }>
): { available: boolean; insufficientItems: string[] } {
  const insufficientItems: string[] = [];

  for (const [productName, quantity] of Object.entries(cart)) {
    const product = products.find(p => p.Product_Name === productName);
    if (!product) {
      insufficientItems.push(productName);
    } else if (product.Stock_Quantity < quantity) {
      insufficientItems.push(productName);
    }
  }

  return {
    available: insufficientItems.length === 0,
    insufficientItems
  };
}
