import { normalizeData } from "./normalizeData"

interface MockDataItem {
  id: number
  name: string
}

describe("normalizeData", () => {
  test("normalizeData should normalize an array of objects with ids", () => {
    const data: MockDataItem[] = [
      { id: 1, name: "Item One" },
      { id: 2, name: "Item Two" },
      { id: 3, name: "Item Three" },
    ]

    const normalizedData = normalizeData(data)

    expect(normalizedData).toEqual({
      byId: {
        1: { id: 1, name: "Item One" },
        2: { id: 2, name: "Item Two" },
        3: { id: 3, name: "Item Three" },
      },
      ids: [1, 2, 3],
    })
  })

  test("normalizeData should handle an empty array", () => {
    const data: MockDataItem[] = []

    const normalizedData = normalizeData(data)

    expect(normalizedData).toEqual({
      byId: {},
      ids: [],
    })
  })
})
