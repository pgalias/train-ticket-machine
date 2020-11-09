<template>
  <station-chooser />
</template>

<script>
import LocalStorage from './infrastructure/cache/local-storage';
import StationChooser from './app/views/station-chooser/station-chooser.vue';
import { AggregateStationRepository, ApiStationRepository, InMemoryStationRepository } from './app/repository/station';

/**
 * TODO:
 *  - Add dependency injection library for services
 *  - Add router for view(s)
 *  - POST MVP: Add translations
 *  - POST MVP: Add virtual list for stations list
 */

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
