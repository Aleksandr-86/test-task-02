import { getOutlinePoints } from './getOutlinePoints'

/**
 * @param center объект с координатами центра
 * @param radius радиус
 * @param startAngle начальный угол (0 по умолчанию)
 * @param endAngle конечный угол (360 по умолчанию)
 * @param outlineColor цвет контура
 * @returns коллекцию объектов
 */
export function getSectorCollection(
  center: { x: number; y: number },
  radius: number,
  startAngle: number,
  endAngle: number,
  outlineColor: string,
  alpha: number
) {
  // Коллекция
  const sectorCollection = new ymaps.GeoObjectCollection(
    {},
    {
      draggable: false
    }
  )

  if (outlineColor.length !== 7) {
    outlineColor = '#000000'
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
      hintContent: 'Многоугольник'
    },
    {
      fill: false, // Заливка
      // fillColor: '#FF0000', // Цвет заливки
      // strokeColor: '#0000FF', // Цвет границ (синий)
      strokeColor: outlineColor, // Цвет границ
      opacity: alpha, // Прозрачность
      strokeWidth: 1, // Ширина линии

      strokeStyle: 'solid' // Стиль линии
    }
  )

  sectorCollection.add(outline)

  return sectorCollection
}
