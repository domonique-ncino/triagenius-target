const MAX_RECURSION_DEPTH = 100;

export function calculateStock(
  item: InventoryItem,
  items: InventoryItem[],
  visited: Set<string> = new Set(),
  depth: number = 0
): number {
  if (depth > MAX_RECURSION_DEPTH) {
    throw new Error(`Max recursion depth exceeded when calculating stock for item ${item.id}`);
  }

  if (visited.has(item.id)) {
    return 0;
  }

  visited.add(item.id);

        total += calculateStock(subItem, items, visited, depth + 1);