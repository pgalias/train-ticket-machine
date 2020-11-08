<template>
  <toast
    v-if="state === 'error'"
    type="danger"
    message="Error occurred during resolving available stations. Try again"
  />
  <loader v-if="state === 'loading'" />
  <div v-if="state === 'success'">
    <div class="container list-container">
      <list
        v-if="visibleStations.length"
        :stations="visibleStations"
        :selected-station="selectedStation"
        @station-select="onStationSelect"
      />
      <no-results v-if="visibleStations.length === 0" />
    </div>
    <div class="keyboard-container">
      <div class="container">
        <user-input :value="keyboardInput" />
        <keyboard :buttons-sets="keyboardButtons" @keyboard-click="onKeyboardButtonClick" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { createKeyboard, keyboardDisabler, handleInput } from './utils';
import List from '../../components/list/list.vue';
import { AggregateStationRepository, ApiStationRepository, InMemoryStationRepository } from '../../repository/station';
import Loader from '../../components/loader/loader.vue';
import Toast from '../../components/toast/toast.vue';
import UserInput from '../../components/user-input/user-input.vue';
import Keyboard from '../../components/keyboard/keyboard.vue';
import Station from '../../../domain/model/station';
import NoResults from '../../components/no-results/no-results.vue';

import './station-chooser.css';

export default {
  name: 'StationChooser',
  components: { NoResults, Keyboard, UserInput, Toast, Loader, List },
  data() {
    return {
      state: 'none',
      stationsCollection: [],
      visibleStations: [],
      selectedStation: null,
      keyboardButtons: createKeyboard(),
      keyboardInput: '',
    };
  },
  inject: ['cache'],
  async created() {
    this.state = 'loading';
    const apiRepository = new ApiStationRepository(this.cache);
    const inMemoryRepository = new InMemoryStationRepository(this.cache);
    const aggregateRepository = new AggregateStationRepository([inMemoryRepository, apiRepository]);

    try {
      this.stationsCollection = await aggregateRepository.fetch();
      this.visibleStations = this.stationsCollection;
      this.keyboardButtons = this.keyboardButtons.map(
        keyboardDisabler(this.keyboardInput.length, this.visibleStations),
      );
      this.state = 'success';
    } catch {
      this.state = 'error';
    }
  },
  methods: {
    onStationSelect(code: string) {
      this.selectedStation = code;
    },
    onKeyboardButtonClick(value: string) {
      this.keyboardInput = handleInput(this.keyboardInput, value);
      this.visibleStations = this.stationsCollection.filter((station: Station) =>
        station.name.toLowerCase().startsWith(this.keyboardInput.toLowerCase()),
      );
      this.keyboardButtons = this.keyboardButtons.map(
        keyboardDisabler(this.keyboardInput.length, this.visibleStations),
      );
      this.scrollToTop();
    },
    scrollToTop() {
      document.querySelector('.list')?.scrollIntoView();
    },
  },
};
</script>
