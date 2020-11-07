<template>
  <station-chooser />
</template>

<script>
import LocalStorage from './infrastructure/cache/local-storage';
import StationChooser from './app/views/station-chooser/station-chooser.vue';

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
    return {
      cache: new LocalStorage(),
    };
  },
};
</script>
