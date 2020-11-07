<template>
  <toast
    v-if="state === 'error'"
    type="danger"
    message="Error occurred during resolving available stations. Try again"
  />
  <loader v-if="state === 'loading'" />
  <div v-if="state === 'success'">
    <div class="container list-container">
      <list :stations="visibleStations" :selected-station="selectedStation" :on-station-select="onStationSelect" />
    </div>
    <div class="container keyboard-container">
      <user-input :value="keyboardInput" />
      <keyboard :buttons-sets="keyboardButtons" :on-click="onKeyboardButtonClick" />
    </div>
  </div>
</template>

<script lang="ts">
import createKeyboard from './utils/create-keyboard';
import List from '../../components/list/list.vue';
import { AggregateStationRepository, ApiStationRepository, InMemoryStationRepository } from '../../repository/station';
import Loader from '../../components/loader/loader.vue';
import Toast from '../../components/toast/toast.vue';
import UserInput from '../../components/user-input/user-input.vue';
import Keyboard from '../../components/keyboard/keyboard.vue';
import Station from '../../../domain/model/station';

import './station-chooser.css';

export default {
  name: 'StationChooser',
  components: { Keyboard, UserInput, Toast, Loader, List },
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
      if (value === '[backspace]') {
        this.keyboardInput = this.keyboardInput.slice(0, -1);
      } else {
        this.keyboardInput += value === '[space]' ? ' ' : value;
      }
      this.visibleStations = this.stationsCollection.filter((station: Station) =>
        station.name.toLowerCase().startsWith(this.keyboardInput.toLowerCase()),
      );
      document.querySelector('.list').scrollIntoView();
    },
  },
};
</script>
