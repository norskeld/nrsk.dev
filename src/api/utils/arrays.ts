/** Partitions given array into subarrays using provided partition function. */
export function partitionBy<T, K>(xs: Array<T>, fn: (it: T) => K): Array<Array<T>> {
  const map = new Map<K, Array<T>>()

  for (const it of xs) {
    const key = fn(it)

    if (!map.has(key)) {
      map.set(key, [])
    }

    map.get(key)!.push(it)
  }

  return Array.from(map.values())
}
