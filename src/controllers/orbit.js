class OrbitController {
  constructor(OrbitControls, camera, renderer) {
    this.orbit = new OrbitControls(
      camera, renderer.domElement,
    );

    this.orbit.enableDamping = true;
  }

  tick() {
    this.orbit.update();
  }
}

export default OrbitController;
