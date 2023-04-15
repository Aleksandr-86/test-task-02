import { getOutlinePoints } from '@/services/getOutlinePoints'

/**
 * @param index индекс коллекции
 * @param center объект с координатами центра
 * @param radius радиус
 * @param startOutline начальный угол контура (0 по умолчанию)
 * @param endOutline конечный угол контура (360 по умолчанию)
 * @param spanAngle текущее положение пролёта (в градусах)
 * @param color цвет контура
 * @returns коллекцию объектов
 */
export function getSectorCollection(
  index: number,
  center: { x: number; y: number },
  radius: number,
  startOutline: number,
  endOutline: number,
  spanAngle: number,
  color: string
) {
  // Коллекция
  const sectorCollection = new ymaps.GeoObjectCollection(
    {},
    {
      draggable: false
    }
  )

  const { x, y } = center

  if (color.length !== 7) {
    color = '#000000'
  }

  // Внутренний центральный круг
  const innerCircle = new ymaps.Circle(
    [[x, y], 4],
    {
      hintContent: 'Дождевальная установка № ' + index
    },
    {
      geodesic: true,
      fill: true,
      fillColor: '#000000',
      outline: false,
      zIndex: 3
    }
  )

  sectorCollection.add(innerCircle)

  // Средний центральный круг
  const middleCircle = new ymaps.Circle(
    [[x, y], 6],
    {
      hintContent: 'Дождевальная установка № ' + index
    },
    {
      geodesic: true,
      fill: true,
      fillColor: '#ffffff',
      outline: false,
      zIndex: 2
    }
  )

  sectorCollection.add(middleCircle)

  // Средний центральный круг
  const externalCircle = new ymaps.Circle(
    [[x, y], 6],
    {
      hintContent: 'Дождевальная установка № ' + index
    },
    {
      geodesic: true,
      fill: false,
      strokeColor: '#000000',
      strokeWidth: 3,
      zIndex: 1
    }
  )

  sectorCollection.add(externalCircle)

  // Контур сектора
  const outline = new ymaps.Polygon(
    [[...getOutlinePoints(center, radius, startOutline, endOutline)]],
    {
      hintContent: 'Дождевальная установка № ' + index
    },
    {
      fill: false, // Заливка
      // fillColor: '#FF0000', // Цвет заливки
      strokeColor: color, // Цвет границ
      opacity: 1, // Прозрачность
      strokeWidth: 10 // Ширина линии
    }
  )

  sectorCollection.add(outline)

  // Пролёт
  const points = [...getOutlinePoints(center, radius - 1, spanAngle, spanAngle)]

  const span = new ymaps.Polyline(
    [...points],
    {
      hintContent: 'Дождевальная установка № ' + index
    },
    {
      strokeColor: '#000000',
      strokeWidth: 6,
      zIndex: 1
    }
  )

  sectorCollection.add(span)

  return sectorCollection
}
