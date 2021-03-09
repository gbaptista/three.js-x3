class GenericObserver {
  static add(object, folder) {
    folder.add(object, 'visible');
  }
}

export default GenericObserver;
