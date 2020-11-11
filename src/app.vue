<template>
  <station-chooser />
</template>

<script>
import LocalStorage from './infrastructure/cache/local-storage';
import StationChooser from './app/views/station-chooser/station-chooser.vue';
import { AggregateStationRepository, ApiStationRepository, InMemoryStationRepository } from './app/repository/station';

export default {
  name: 'App',
  components: {
    StationChooser,
  },
  provide() {
    const cache = new LocalStorage();
    const inMemoryStationRepository = new InMemoryStationRepository(cache);
    const apiStationRepository = new ApiStationRepository(cache);
    const aggregateStationRepository = new AggregateStationRepository([
      inMemoryStationRepository,
      apiStationRepository,
    ]);

    return {
      repository: aggregateStationRepository,
    };
  },
};
</script>
