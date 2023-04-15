import { getOutlinePoints } from '@/services/getOutlinePoints'

/**
 * @param center объект с координатами центра
 * @param radius радиус
 * @param startAngle начальный угол (0 по умолчанию)
 * @param endAngle конечный угол (360 по умолчанию)
 * @param color цвет контура
 * @param alpha прозрачность контура
 * @param index индекс коллекции
 * @returns коллекцию объектов
 */
export function getSectorCollection(
  index: number,
  center: { x: number; y: number },
  radius: number,
  startAngle: number,
  endAngle: number,
  spanAngle: number,
  color: string,
  alpha: number
) {
  // Коллекция
  const sectorCollection = new ymaps.GeoObjectCollection(
    {},
    {
      draggable: false
    }
  )

  if (color.length !== 7) {
    color = '#000000'
  }

  // Контур сектора
  const outline = new ymaps.Polygon(
    [
      [
        // Координаты вершин внешней границы многоугольника.
        ...getOutlinePoints(center, radius, startAngle, endAngle)
      ]
    ],
    {
      // Свойства
      hintContent: 'Дождевальная установка № ' + index
    },
    {
      fill: false, // Заливка
      // fillColor: '#FF0000', // Цвет заливки
      strokeColor: color, // Цвет границ
      opacity: alpha, // Прозрачность
      strokeWidth: 10, // Ширина линии
      strokeStyle: 'solid' // Стиль линии
    }
  )

  sectorCollection.add(outline)

  return sectorCollection
}
