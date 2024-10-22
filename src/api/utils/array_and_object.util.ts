export function hasDuplicateKey (arr: any[], key: string) {
    const valuesSet = new Set();
  
    for (const obj of arr) {
      const value = obj[key];
  
      if (valuesSet.has(value)) return true;
  
      valuesSet.add(value);
    }
  
    return false;
};

// Function to get the score sum of all tasks for power point calculation
export function getTotal(arr: any[], field?: string) {
  if(field) return arr.reduce((sum: number, item: any) => sum + item[field], 0)

  return arr.reduce((sum: number, item: any) => sum + item, 0)
}