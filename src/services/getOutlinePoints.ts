/**
 * @param center объект с координатами центра
 * @param radius радиус
 * @param ratio количество градусов на одну точку окружности (5 по умолчанию)
 * @param startOutline начальный угол контура (0 по умолчанию)
 * @param endOutline конечный угол контура (360 по умолчанию)
 * @returns массив координат контура сектора
 */
export function getOutlinePoints(
  center: { x: number; y: number },
  length: number,
  startOutline: number = 0,
  endOutline: number = 360
) {
  if (startOutline > endOutline) {
    startOutline = endOutline
  }

  endOutline -= startOutline

  const outcome = []
  const { x, y } = center

  // Азимут в радианах
  const firstSide = (Math.PI * (360 - startOutline + 90)) / 180

  for (let i = 0; i <= endOutline; i += 5) {
    const side = firstSide - (Math.PI * i) / 180
    const dir = [Math.sin(side), Math.cos(side)]
    outcome.push(
      ymaps.coordSystem.geo.solveDirectProblem([x, y], dir, length).endPoint
    )
  }

  if (startOutline !== 0 || endOutline !== 360) {
    outcome.push([x, y])
  }

  return outcome
}
