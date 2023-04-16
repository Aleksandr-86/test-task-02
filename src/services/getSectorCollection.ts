import { getOutlinePoints } from '@/services/getOutlinePoints'
import { fromGPSDegToDecimalDeg } from '@/services/fromGPSDegToDecimalDeg'
import { ballon } from '@/store'

/**
 * @param index индекс коллекции
 * @param center объект с координатами центра
 * @param radius радиус
 * @param startOutline начальный угол контура
 * @param endOutline конечный угол контура
 * @param spanAngle текущее положение пролёта
 * @param irrigationPoint угол начал орошения
 * @param irrigationStart начальный угол орошаемой поверхности
 * @param irrigationEnd конечный угол орошаемой поверхности
 * @param color цвет контура
 * @returns коллекцию объектов
 */
export function getSectorCollection(
  index: number,
  center: {
    x: { deg: number; min: number; sec: number }
    y: { deg: number; min: number; sec: number }
  },
  radius: number,
  startOutline: number,
  endOutline: number,
  spanAngle: number,
  irrigationPoint: number,
  irrigationStart: number,
  irrigationEnd: number,
  color: string
) {
  // Коллекция
  const sectorCollection = new ymaps.GeoObjectCollection(
    {},
    {
      draggable: false
    }
  )

  // const { x, y } = center
  const x = fromGPSDegToDecimalDeg(center.x.deg, center.x.min, center.x.sec)
  const y = fromGPSDegToDecimalDeg(center.y.deg, center.y.min, center.y.sec)

  // const x = fromGPSDegToDecimalDeg(center.x.deg)

  if (color.length !== 7) {
    color = '#000000'
  }

  // Внутренний круг
  const innerCircle = new ymaps.Circle(
    [[x, y], 2],
    {
      hintContent: 'Дождевальная установка № ' + index
    },
    {
      geodesic: true,
      fill: true,
      fillColor: '#000000',
      outline: false,
      zIndex: 33
    }
  )

  sectorCollection.add(innerCircle)

  // Средний круг
  const middleCircle = new ymaps.Circle(
    [[x, y], 3],
    {
      hintContent: 'Дождевальная установка № ' + index
    },
    {
      geodesic: true,
      fill: true,
      fillColor: '#ffffff',
      outline: false,
      zIndex: 32
    }
  )

  sectorCollection.add(middleCircle)

  // Внешний круг
  const externalCircle = new ymaps.Circle(
    [[x, y], 3],
    {
      hintContent: 'Дождевальная установка № ' + index
    },
    {
      geodesic: true,
      fill: false,
      strokeColor: '#000000',
      strokeWidth: 5,
      zIndex: 31
    }
  )

  sectorCollection.add(externalCircle)

  // Контур метки
  const outline = new ymaps.Polygon(
    [[...getOutlinePoints(center, radius, startOutline, endOutline)]],
    {
      hintContent: 'Дождевальная установка № ' + index
    },
    {
      fill: false,
      strokeColor: color,
      opacity: 1,
      strokeWidth: 10,
      zIndex: 10
    }
  )

  sectorCollection.add(outline)

  // Пролёт
  const spanPoints = [
    ...getOutlinePoints(center, radius - 1, spanAngle, spanAngle)
  ]

  const span = new ymaps.Polyline(
    [...spanPoints],
    {
      hintContent: 'Дождевальная установка № ' + index
    },
    {
      strokeColor: '#000000',
      strokeWidth: 6,
      zIndex: 10
    }
  )

  sectorCollection.add(span)

  // Метка начала орошаемой поверхности
  const irrigationMarkerPoints = [
    ...getOutlinePoints(center, radius - 1, irrigationPoint, irrigationPoint)
  ]

  const irrigationMarker = new ymaps.Polyline(
    [...irrigationMarkerPoints],
    {
      hintContent: 'Дождевальная установка № ' + index
    },
    {
      strokeColor: '#cccc00',
      strokeWidth: 3,
      opacity: 0.8,
      zIndex: 2
    }
  )

  sectorCollection.add(irrigationMarker)

  // Орошаемая поверхность
  const irrigationSurface = new ymaps.Polygon(
    [[...getOutlinePoints(center, radius - 1, irrigationStart, irrigationEnd)]],
    {
      hintContent: 'Дождевальная установка № ' + index
    },
    {
      fill: true,
      fillColor: '#d1d1d1',
      outline: false,
      opacity: 0.6,
      strokeWidth: 1,
      zIndex: 1
    }
  )

  sectorCollection.add(irrigationSurface)

  // Обработка нажатия левой кнопкой мыши
  sectorCollection.events.add('click', (e: any) => {
    if (!ballon.state) {
      const coords = e.get('coords')
      ballon.index = index
      ballon.coords = coords
    }
  })

  return sectorCollection
}
