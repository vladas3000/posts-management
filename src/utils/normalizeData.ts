export const normalizeData = <T extends { id: number }>(data: T[]) => {
  return data.reduce<{ byId: Record<number, T>; ids: number[] }>(
    (acc, item) => {
      acc.byId[item.id] = item
      acc.ids.push(item.id)
      return acc
    },
    { byId: {}, ids: [] },
  )
}
