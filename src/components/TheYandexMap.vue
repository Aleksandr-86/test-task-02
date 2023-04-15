<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { watch } from 'vue'
import { getSectorCollection } from '@/services/getSectorCollection'

let myMap: any

interface sprinkler {
  num: number // Порядковый номер дождевальной установки
  center: { x: number; y: number } // Центр установки
  radius: number // Предельный радиус установки
  startOutline: number // Начальный угол контура
  endOutline: number // Конечный угол угол контура
  spanAngle: number // Текущее положение пролёта (в градусах)
  irrigationsStart: number // Начальный угол орошаемой поверхности
  irrigationEnd: number // Конечный угол орошаемой поверхности
  color: string // Цвет контура маркера установки
}

// Реактивный массив дождевальных машин
let sprinklers: sprinkler[] = reactive([
  {
    num: 1,
    center: { x: 44.976785, y: 42.001052 },
    radius: 50,
    startOutline: 0,
    endOutline: 360,
    spanAngle: 0,
    irrigationsStart: 45,
    irrigationEnd: 90,
    color: '#ff0000'
  },
  {
    num: 2,
    center: { x: 44.975705, y: 42.00193 },
    radius: 50,
    startOutline: 0,
    endOutline: 360,
    spanAngle: 0,
    irrigationsStart: 45,
    irrigationEnd: 90,
    color: '#00bfff'
  },
  {
    num: 3,
    center: { x: 44.975705, y: 42.000173 },
    radius: 50,
    startOutline: 0,
    endOutline: 360,
    spanAngle: 0,
    irrigationsStart: 45,
    irrigationEnd: 90,
    color: '#90ee90'
  }
])

onMounted(() => {
  ymaps.ready(init)

  function init() {
    // Инициализация карты
    myMap = new ymaps.Map(
      'map',
      {
        center: [44.976065, 42.001052],
        zoom: 18,
        type: 'yandex#satellite',
        controls: ['zoomControl', 'fullscreenControl']
      },
      {
        suppressMapOpenBlock: true
      }
    )

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
          sprinkler.color
        )
      )
    })

    myMap.geoObjects.add(new ymaps.Placemark([44.976065, 42.001052]))
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
      <div class="title wide">Координата X</div>
      <div class="title wide">Координата Y</div>
      <div class="title narrow">Радиус</div>
      <div class="title narrow">Нач. угол</div>
      <div class="title narrow">Кон. угол</div>
      <div class="title narrow">Угол пролёта</div>
      <div class="title wide">Цвет</div>
    </div>

    <div v-for="sprinkler in sprinklers" class="row">
      <input class="input narrow" type="text" v-model="sprinkler.num" />
      <input class="input wide" type="text" v-model="sprinkler.center.x" />
      <input class="input wide" type="text" v-model="sprinkler.center.y" />
      <input class="input narrow" type="text" v-model="sprinkler.radius" />
      <input
        class="input narrow"
        type="text"
        v-model="sprinkler.startOutline" />
      <input class="input narrow" type="text" v-model="sprinkler.endOutline" />
      <input class="input narrow" type="text" v-model="sprinkler.spanAngle" />
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
  align-items: center;
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
  width: 1380px;
  height: 650px;
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
