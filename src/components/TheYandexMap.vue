<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { watch } from 'vue'
import { getSectorCollection } from '@/services/getSectorCollection'

let myMap: any
// Реактивный массив дождевальных машин
let sprinklers = reactive([
  {
    center: { x: 44.976065, y: 42.001052 },
    radius: 50,
    ratio: 5,
    startAngle: 0,
    endAngle: 360
  },
  {
    center: { x: 44.9764, y: 42.001052 },
    radius: 50,
    ratio: 5,
    startAngle: 0,
    endAngle: 360
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
          sprinkler.center,
          sprinkler.radius,
          sprinkler.ratio,
          sprinkler.startAngle,
          sprinkler.endAngle
        )
      )
    })

    myMap.geoObjects.add(new ymaps.Placemark([44.976065, 42.001052]))
  }
})

watch(sprinklers, newValue => {
  console.log(newValue)
  myMap.geoObjects.removeAll()

  newValue.forEach(sprinkler =>
    myMap.geoObjects.add(
      getSectorCollection(
        sprinkler.center,
        sprinkler.radius,
        sprinkler.ratio,
        sprinkler.startAngle,
        sprinkler.endAngle
      )
    )
  )
})
</script>

<template>
  <div class="container">
    <div v-for="sprinkler in sprinklers" class="input-container">
      <input class="input" type="text" v-model="sprinkler.center.x" />
      <input class="input" type="text" v-model="sprinkler.center.y" />
      <input class="input" type="text" v-model="sprinkler.radius" />
      <input class="input" type="text" v-model="sprinkler.ratio" />
      <input class="input" type="text" v-model="sprinkler.startAngle" />
      <input class="input" type="text" v-model="sprinkler.endAngle" />
    </div>
    <div id="map" style="width: 1200px; height: 800px"></div>
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

.input-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
}

.input {
  width: 200px;
  height: 50px;
  font-size: 30px;
}
</style>
