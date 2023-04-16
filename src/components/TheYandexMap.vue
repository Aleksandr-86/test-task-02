<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { watch } from 'vue'
import { getSectorCollection } from '@/services/getSectorCollection'
import { fromGPSDegToDecimalDeg } from '@/services/fromGPSDegToDecimalDeg'
import { ballon } from '@/store/index'

let myMap: any
let myBalloon: any

interface sprinkler {
  num: number // Порядковый номер дождевальной установки
  center: {
    x: { deg: number; min: number; sec: number }
    y: { deg: number; min: number; sec: number }
  } // Центр установки
  radius: number // Предельный радиус установки, м
  startOutline: number // Начальный угол контура, градус
  endOutline: number // Конечный угол угол контура, градус
  spanAngle: number // Текущее положение пролёта, градус
  irrigationPoint: number // Угол начала орошения
  irrigationStart: number // Начальный угол орошаемой поверхности, градус
  irrigationEnd: number // Конечный угол орошаемой поверхности, градус
  color: string // Цвет контура установки
  state: string // Состояние дождевальной установки
}

// Реактивный массив дождевальных машин
let sprinklers: sprinkler[] = reactive([
  {
    num: 1,
    center: {
      x: { deg: 44, min: 58, sec: 36 },
      y: { deg: 42, min: 0, sec: 4 }
    },
    radius: 50,
    startOutline: 200,
    endOutline: 90,
    spanAngle: 168,
    irrigationPoint: 2,
    irrigationStart: 358,
    irrigationEnd: 2,
    color: '#ff0000',
    state: `
    <p>Состояние: <span style="color: red; font-weight: bold;">НЕИСПРАВНА</span></p>
    <p>Угловая скорость, град/мин: 0</p>
    <p>Направление движения: –</p>
    <p>Начало работы: --:--</p>
    <p>В работе: --:--</p>
    <p>Вод. питание: автономное</p>
    <p>Запас воды, л: 333</p>
    `
  },
  {
    num: 2,
    center: {
      x: { deg: 44, min: 58, sec: 33 },
      y: { deg: 42, min: 0, sec: 1 }
    },
    radius: 50,
    startOutline: 270,
    endOutline: 90,
    spanAngle: 0,
    irrigationPoint: 24,
    irrigationStart: 19,
    irrigationEnd: 24,
    color: '#90ee90',
    state: `
    <p>Состояние: <span style="color: #00cc00; font-weight: bold;">ИСПРАВНА</span></p>
    <p>Угловая скорость, град/мин: 5</p>
    <p>Направление движения: против часовой стрелки</p>
    <p>Начало работы: 09:11</p>
    <p>В работе: 00:28</p>
    <p>Вод. питание: автономное</p>
    <p><span style="color: red; font-weight: bold;">Запас воды, л: 77</span></p>
    `
  },
  {
    num: 3,
    center: {
      x: { deg: 44, min: 58, sec: 33 },
      y: { deg: 42, min: 0, sec: 7 }
    },
    radius: 50,
    startOutline: 0,
    endOutline: 360,
    spanAngle: 164,
    irrigationPoint: 2,
    irrigationStart: 340,
    irrigationEnd: 2,
    color: '#00bfff',
    state: `
    <p>Состояние: <span style="color: #00cc00; font-weight: bold;">ИСПРАВНА</span></p>
    <p>Угловая скорость, град/мин: 5</p>
    <p>Направление движения: по часовой стрелке</p>
    <p>Начало работы: 09:15</p>
    <p>В работе: 00:24</p>
    <p>Вод. питание: водозабор</p>
    `
  }
])

onMounted(() => {
  ymaps.ready(init)

  function init() {
    // Инициализация карты
    myMap = new ymaps.Map(
      'map',
      {
        center: [44.976191, 42.001051],
        zoom: 18,
        type: 'yandex#satellite',
        controls: ['zoomControl', 'fullscreenControl']
      },
      {
        suppressMapOpenBlock: true
      }
    )

    myMap.events.add('click', () => {
      ballon.state = false

      if (myBalloon) {
        myBalloon.close()
      }
    })

    // Добавление дождевальных машин на карту
    sprinklers.forEach(sprinkler => {
      myMap.geoObjects.add(
        getSectorCollection(
          sprinkler.num,
          sprinkler.center,
          sprinkler.radius,
          sprinkler.startOutline,
          sprinkler.endOutline,
          sprinkler.spanAngle,
          sprinkler.irrigationPoint,
          sprinkler.irrigationStart,
          sprinkler.irrigationEnd,
          sprinkler.color
        )
      )
    })
  }
})

watch(ballon, newValue => {
  if (newValue) {
    if (myBalloon) {
      myBalloon.close()
    }

    myBalloon = new ymaps.Balloon(myMap)
    myBalloon.options.setParent(myMap.options)
    myBalloon.open(ballon.coords, {
      contentHeader: `<h3>Дождевальная установка № ${ballon.index}</h3>`,
      contentBody: sprinklers[ballon.index - 1].state
    })
  } else {
    if (myBalloon) {
      myBalloon.close()
    }
  }
})

watch(sprinklers, newValue => {
  myMap.geoObjects.removeAll()

  newValue.forEach(sprinkler =>
    myMap.geoObjects.add(
      getSectorCollection(
        sprinkler.num,
        sprinkler.center,
        sprinkler.radius,
        sprinkler.startOutline,
        sprinkler.endOutline,
        sprinkler.spanAngle,
        sprinkler.irrigationPoint,
        sprinkler.irrigationStart,
        sprinkler.irrigationEnd,
        sprinkler.color
      )
    )
  )
})
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="title narrow">№ п/п</div>
      <div class="title narrow">x°</div>
      <div class="title narrow">x'</div>
      <div class="title narrow">x"</div>
      <div class="title narrow">y°</div>
      <div class="title narrow">y'</div>
      <div class="title narrow">y"</div>
      <div class="title narrow">Радиус</div>
      <div class="title narrow">Нач. угол контура</div>
      <div class="title narrow">Кон. угол контура</div>
      <div class="title narrow">Угол пролёта</div>
      <div class="title narrow">Угол начала орош.</div>
      <div class="title narrow">Нач. угол орош. повер.</div>
      <div class="title narrow">Кон. угол орош. повер.</div>
      <div class="title wide">Цвет</div>
    </div>

    <div v-for="sprinkler in sprinklers" class="row">
      <input class="input narrow" type="number" v-model="sprinkler.num" />
      <input
        class="input narrow"
        type="number"
        v-model="sprinkler.center.x.deg" />
      <input
        class="input narrow"
        type="number"
        v-model="sprinkler.center.x.min" />
      <input
        class="input narrow"
        type="number"
        v-model="sprinkler.center.x.sec" />
      <input
        class="input narrow"
        type="number"
        v-model="sprinkler.center.y.deg" />
      <input
        class="input narrow"
        type="number"
        v-model="sprinkler.center.y.min" />
      <input
        class="input narrow"
        type="number"
        v-model="sprinkler.center.y.sec" />
      <input class="input narrow" type="number" v-model="sprinkler.radius" />
      <input
        class="input narrow"
        type="number"
        v-model="sprinkler.startOutline" />
      <input
        class="input narrow"
        type="number"
        v-model="sprinkler.endOutline" />
      <input class="input narrow" type="number" v-model="sprinkler.spanAngle" />
      <input
        class="input narrow"
        type="number"
        v-model="sprinkler.irrigationPoint" />
      <input
        class="input narrow"
        type="number"
        v-model="sprinkler.irrigationStart" />
      <input
        class="input narrow"
        type="number"
        v-model="sprinkler.irrigationEnd" />
      <input class="input wide" type="text" v-model="sprinkler.color" />
    </div>
    <div class="map-container">
      <div id="map" class="map"></div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

.title {
  display: flex;
  justify-content: center;
  align-items: end;
  font-size: 25px;
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
}

.map-container {
  display: flex;
  justify-content: center;
}

.map {
  width: 1740px;
  height: 600px;
}

.input {
  height: 50px;
  font-size: 30px;
  text-align: center;
  border-radius: 12px;
}

.input:focus {
  outline-color: red;
}

.wide {
  width: 200px;
}

.narrow {
  width: 100px;
}
</style>
