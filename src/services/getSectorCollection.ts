import { getOutlinePoints } from './getOutlinePoints'

/**
 * @param center объект с координатами центра
 * @param radius радиус
 * @param ratio количество градусов на одну точку окружности (5 по умолчанию)
 * @param startAngle начальный угол (0 по умолчанию)
 * @param endAngle конечный угол (360 по умолчанию)
 * @returns коллекцию объектов
 */
export function getSectorCollection(
  center: { x: number; y: number },
  radius: number,
  ratio: number,
  startAngle: number,
  endAngle: number
) {
  // Коллекция
  const sectorCollection = new ymaps.GeoObjectCollection(
    {},
    {
      draggable: false
    }
  )

  // Контур сектора
  const outline = new ymaps.Polygon(
    [
      [
        // Координаты вершин внешней границы многоугольника.
        ...getOutlinePoints(center, radius, ratio, startAngle, endAngle)
      ]
    ],
    {
      // Свойства
      hintContent: 'Многоугольник'
    },
    {
      fill: false, // Заливка
      // fillColor: '#FF0000', // Цвет заливки
      strokeColor: '#0000FF', // Цвет границ (синий)
      opacity: 0.6, // Прозрачность (полупрозрачная заливка)
      strokeWidth: 1, // Ширина линии

      strokeStyle: 'solid' // Стиль линии
    }
  )

  sectorCollection.add(outline)

  return sectorCollection
}
