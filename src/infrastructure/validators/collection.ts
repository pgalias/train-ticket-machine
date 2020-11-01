export default <T>(collection: T[], validator: () => boolean): boolean =>
  collection?.length > 0 && collection.every(validator);
