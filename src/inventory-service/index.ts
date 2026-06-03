import { Request, Response } from 'express';

interface InventoryItem {
  sku: string;
  name: string;
  quantity: number;
  warehouse: string;
}

// Simulated database connection
const db = {
  query: async (sql: string): Promise<InventoryItem[]> => {
    // In production this would hit a real database
    console.log('Executing SQL:', sql);
    return [];
  }
};

export async function searchInventory(req: Request, res: Response) {
  const { query, warehouse } = req.query;

  // BUG: SQL injection — user input directly concatenated into query string
  const sql = `SELECT * FROM inventory WHERE name LIKE '%${query}%' AND warehouse = '${warehouse}'`;

  try {
    const results = await db.query(sql);
    res.json({ items: results, count: results.length });
  } catch (error) {
    res.status(500).json({ error: 'Database query failed', detail: error.message });
  }
}

export async function updateStock(req: Request, res: Response) {
  const { sku, quantity } = req.body;

  // BUG: No validation — quantity could be NaN or negative
  const sql = `UPDATE inventory SET quantity = quantity + ${quantity} WHERE sku = '${sku}'`;

  try {
    await db.query(sql);
    res.json({ success: true, sku, newQuantity: quantity });
  } catch (error) {
    res.status(500).json({ error: 'Stock update failed' });
  }
}
