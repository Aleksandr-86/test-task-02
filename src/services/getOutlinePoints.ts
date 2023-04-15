/**
 * @param center объект с координатами центра
 * @param radius радиус
 * @param ratio количество градусов на одну точку окружности (5 по умолчанию)
 * @param startAngle начальный угол (0 по умолчанию)
 * @param endAngle конечный угол (360 по умолчанию)
 * @returns массив координат контура сектора
 */
export function getOutlinePoints(
  center: { x: number; y: number },
  length: number,
  ratio: number = 5,
  startAngle: number = 0,
  endAngle: number = 360
) {
  if (ratio < 1) ratio = 90
  if (ratio > 90) ratio = 90
  if (startAngle > endAngle) {
    startAngle = endAngle
  }

  endAngle -= startAngle

  const outcome = []
  const { x, y } = center

  // Азимут в радианах
  var firstSide = (Math.PI * (360 - startAngle + 90)) / 180

  for (let i = 0; i <= endAngle; i += ratio) {
    const side = firstSide - (Math.PI * i) / 180
    const dir = [Math.sin(side), Math.cos(side)]
    outcome.push(
      ymaps.coordSystem.geo.solveDirectProblem([x, y], dir, length).endPoint
    )
  }

  if (startAngle !== 0 || endAngle !== 360) {
    outcome.push([x, y])
  }

  return outcome
}
