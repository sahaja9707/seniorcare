// Binary Search Tree implementation for product search
export class BSTNode {
  key: string;
  data: any;
  left: BSTNode | null;
  right: BSTNode | null;

  constructor(key: string, data: any = null) {
    this.key = key;
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export function insert(root: BSTNode | null, key: string, data: any = null): BSTNode {
  if (root === null) {
    return new BSTNode(key, data);
  }

  if (key < root.key) {
    root.left = insert(root.left, key, data);
  } else if (key > root.key) {
    root.right = insert(root.right, key, data);
  }

  return root;
}

export function search(root: BSTNode | null, key: string): BSTNode | null {
  if (root === null || root.key === key) {
    return root;
  }
  
  if (key < root.key) {
    return search(root.left, key);
  } else {
    return search(root.right, key);
  }
}

export function buildBSTFromProducts(products: any[]): BSTNode | null {
  let root: BSTNode | null = null;
  
  for (const product of products) {
    const productName = product.Product_Name?.toLowerCase() || '';
    root = insert(root, productName, product);
  }
  
  return root;
}
