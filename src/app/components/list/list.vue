<template>
  <div class="list" v-if="areStationsValid(stations)">
    <p class="list-length">Select one of the {{ stations.length }} stations:</p>
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
import { isString } from 'lodash-es';
import { collectionValidator } from '../../../infrastructure/validators';
import { stationValidator } from '../../../domain/validator';
import Station from '../../../domain/model/station';

import './list.css';

export default {
  name: 'List',
  emits: {
    'station-select'(payload) {
      return isString(payload);
    },
  },
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
  },
  methods: {
    areStationsValid(stations: Station[]) {
      return collectionValidator(stations, stationValidator);
    },
    onStationSelect(code: string) {
      this.$emit('station-select', code);
    },
  },
};
</script>
