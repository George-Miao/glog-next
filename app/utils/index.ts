export const groupBy = <T, K extends string | number | symbol>(
  array: T[],
  key: (item: T) => K[]
) =>
  array.reduce(
    (acc, item) => {
      const keys = key(item)
      for (const k of keys) {
        if (!acc[k]) {
          acc[k] = []
        }
        acc[k].push(item)
      }
      return acc
    },
    {} as Record<K, T[]>
  )
