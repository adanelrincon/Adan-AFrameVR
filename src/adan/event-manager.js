AFRAME.registerComponent('event-manager', {

  init: function () {
    this.bindMethods();

    this.boxGeometryEl = document.querySelector('#boxGeometry');
    this.sphereGeometryEl = document.querySelector('#sphereGeometry');
    this.torusGeometryEl = document.querySelector('#torusGeometry');

    this.boxButtonEl = document.querySelector('#boxButton');
    this.sphereButtonEl = document.querySelector('#sphereButton');
    this.torusButtonEl = document.querySelector('#torusButton');
    this.darkModeButtonEl = document.querySelector('#darkModeButton');
    this.greenButtonEl = document.querySelector('#greenButton');
    this.orangeButtonEl = document.querySelector('#orangeButton');

    this.buttonToGeometry = {
      'boxButton': this.boxGeometryEl,
      'sphereButton': this.sphereGeometryEl,
      'torusButton': this.torusGeometryEl
    };

    this.boxButtonEl.addEventListener('click', this.onClick);
    this.sphereButtonEl.addEventListener('click', this.onClick);
    this.torusButtonEl.addEventListener('click', this.onClick);
    this.darkModeButtonEl.addEventListener('click', this.onClick);
    this.greenButtonEl.addEventListener('click', this.onClick);
    this.orangeButtonEl.addEventListener('click', this.onClick);

    this.boxButtonEl.addState('pressed');
  },

  bindMethods: function () {
    this.onClick = this.onClick.bind(this);
  },

  onClick: function (evt) {
    var targetEl = evt.target;
    if (targetEl === this.boxButtonEl ||
      targetEl === this.sphereButtonEl ||
      targetEl === this.torusButtonEl) {
      this.boxButtonEl.removeState('pressed');
      this.sphereButtonEl.removeState('pressed');
      this.torusButtonEl.removeState('pressed');
      this.boxGeometryEl.object3D.visible = false;
      this.sphereGeometryEl.object3D.visible = false;
      this.torusGeometryEl.object3D.visible = false;
      this.buttonToGeometry[targetEl.id].object3D.visible = true;
    }

    switch (targetEl) {
      case this.greenButtonEl:
        this.boxGeometryEl.setAttribute('material', 'color', '#00FF00');
        this.sphereGeometryEl.setAttribute('material', 'color', '#00FF00');
        this.torusGeometryEl.setAttribute('material', 'color', '#00FF00');
        break;
      case this.orangeButtonEl:
        this.boxGeometryEl.setAttribute('material', 'color', '#FFA500');
        this.sphereGeometryEl.setAttribute('material', 'color', '#FFA500');
        this.torusGeometryEl.setAttribute('material', 'color', '#FFA500');
        break;
      default:
        this.boxGeometryEl.setAttribute('material', 'color', '#ff4b5c');
        this.sphereGeometryEl.setAttribute('material', 'color', '#d2e603');
        this.torusGeometryEl.setAttribute('material', 'color', '#fcdab7');
        break;
    }

    if (targetEl === this.darkModeButtonEl) {
      if (this.el.sceneEl.is('starry')) {
        targetEl.setAttribute('button', 'label', 'Dark Mode');
        this.el.sceneEl.setAttribute('environment', { preset: 'default' });
        this.el.sceneEl.removeState('starry');
      } else {
        targetEl.setAttribute('button', 'label', 'Light Mode');
        this.el.sceneEl.setAttribute('environment', { preset: 'starry' });
        this.el.sceneEl.addState('starry');
      }
    } else {
      targetEl.addState('pressed');
    }
  }
});
