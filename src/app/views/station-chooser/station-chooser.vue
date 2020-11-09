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
        <keyboard :buttons-sets="keyboardButtons" @keyboardClick="onKeyboardButtonClick" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, inject } from 'vue';
import { createKeyboard, keyboardDisabler, handleInput } from './utils';
import StationRepository from '../../../domain/repository/station-repository';
import Station from '../../../domain/model/station';
import List from '../../components/list/list.vue';
import Loader from '../../components/loader/loader.vue';
import Toast from '../../components/toast/toast.vue';
import UserInput from '../../components/user-input/user-input.vue';
import Keyboard from '../../components/keyboard/keyboard.vue';
import NoResults from '../../components/no-results/no-results.vue';

import './station-chooser.css';

export default {
  name: 'StationChooser',
  components: { NoResults, Keyboard, UserInput, Toast, Loader, List },
  inject: ['repository'],
  setup() {
    const state = ref('none');
    const stationsCollection = ref<Station[]>([]);
    const visibleStations = ref<Station[]>([]);
    const selectedStation = ref('');
    const keyboardButtons = ref(createKeyboard());
    const keyboardInput = ref('');

    const onStationSelect = (value: string) => (selectedStation.value = value);
    const refreshKeyboard = () =>
      (keyboardButtons.value = keyboardButtons.value.map(
        keyboardDisabler(keyboardInput.value.length, visibleStations.value),
      ));
    const scrollToTop = () => document.querySelector('.list')?.scrollIntoView();
    const onKeyboardButtonClick = (value: string) => {
      keyboardInput.value = handleInput(keyboardInput.value, value);
      visibleStations.value = stationsCollection.value.filter((station: Station) =>
        station.name.toLowerCase().startsWith(keyboardInput.value.toLowerCase()),
      );
      refreshKeyboard();
      scrollToTop();
    };

    (inject('repository') as StationRepository)
      .fetch()
      .then((stations: Station[]) => {
        stationsCollection.value = stations;
        visibleStations.value = stations;
        refreshKeyboard();
        state.value = 'success';
      })
      .catch(() => (state.value = 'error'));

    return {
      state,
      stationsCollection,
      visibleStations,
      selectedStation,
      keyboardButtons,
      keyboardInput,
      onStationSelect,
      onKeyboardButtonClick,
    };
  },
};
</script>
