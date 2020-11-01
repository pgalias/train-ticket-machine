<template>
  <div class="list" v-if="areStationsValid(stations)">
    <div
      class="station"
      :class="{ selected: selectedStation === code }"
      v-for="{ code, name } in stations"
      :key="code"
      @click="onStationSelect(code)"
    >
      <div class="station__indicator-outer">
        <div class="station__indicator-inner"></div>
      </div>
      <p class="station__name" :title="name">
        {{ name }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { collectionValidator } from '../../../infrastructure/validators';
import { stationValidator } from '../../../domain/validator';
import Station from '../../../domain/model/station';

import './list.css';

export default {
  name: 'List',
  props: {
    stations: {
      validate(stations: Station[]) {
        return collectionValidator(stations, stationValidator);
      },
    },
    selectedStation: {
      type: String,
      default: null,
    },
    onStationSelect: {
      type: Function,
      required: true,
    },
  },
  methods: {
    areStationsValid(stations: Station[]) {
      return collectionValidator(stations, stationValidator);
    },
  },
};
</script>
