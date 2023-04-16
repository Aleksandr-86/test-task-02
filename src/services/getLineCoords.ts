import { fromGPSDegToDecimalDeg } from '@/services/fromGPSDegToDecimalDeg'
/**
 * В основе функции лежит решение https://ru.stackoverflow.com/a/779367
 */

/**
 * @param center объект с координатами центра
 * @param radius радиус
 * @param angle угол отрезка
 * @returns массив координат двух точек прямой
 */
export function getLineCoords(
  center: {
    x: { deg: number; min: number; sec: number }
    y: { deg: number; min: number; sec: number }
  },
  radius: number,
  angle: number
) {
  const outcome = []
  const x = fromGPSDegToDecimalDeg(center.x.deg, center.x.min, center.x.sec)
  const y = fromGPSDegToDecimalDeg(center.y.deg, center.y.min, center.y.sec)

  const firstSide = (Math.PI * (450 - angle)) / 180
  const dir = [Math.sin(firstSide), Math.cos(firstSide)]
  const coord = ymaps.coordSystem.geo.solveDirectProblem(
    [x, y],
    dir,
    radius
  ).endPoint

  outcome.push(coord)
  outcome.push([x, y])

  return outcome
}
