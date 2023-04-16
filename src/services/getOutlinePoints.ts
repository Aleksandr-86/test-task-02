import { fromGPSDegToDecimalDeg } from '@/services/fromGPSDegToDecimalDeg'
/**
 * В основе функции лежит решение https://ru.stackoverflow.com/a/779367
 */

/**
 * @param center объект с координатами центра
 * @param radius радиус
 * @param startOutline начальный угол контура
 * @param endOutline конечный угол контура
 * @returns массив координат контура метки
 */
export function getOutlinePoints(
  center: {
    x: { deg: number; min: number; sec: number }
    y: { deg: number; min: number; sec: number }
  },
  radius: number,
  startOutline: number,
  endOutline: number
) {
  const outcome = []
  const x = fromGPSDegToDecimalDeg(center.x.deg, center.x.min, center.x.sec)
  const y = fromGPSDegToDecimalDeg(center.y.deg, center.y.min, center.y.sec)

  if (startOutline > endOutline) {
    endOutline = 360 - startOutline + endOutline
  } else {
    endOutline = endOutline - startOutline
  }

  // Азимут в радианах
  const firstSide = (Math.PI * (450 - startOutline)) / 180

  for (let i = 0; i <= endOutline; i++) {
    const side = firstSide - (Math.PI * i) / 180
    const dir = [Math.sin(side), Math.cos(side)]

    const coord = ymaps.coordSystem.geo.solveDirectProblem(
      [x, y],
      dir,
      radius
    ).endPoint

    outcome.push(coord)
  }

  if (startOutline !== 0 || endOutline !== 360) {
    outcome.push([x, y])
  }

  return outcome
}
