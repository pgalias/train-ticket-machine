import Station from '../model/station';

interface StationRepository {
  fetch(): Promise<Station[]>;
}

export default StationRepository;
