import * as THREE from 'three';

export class EmergencyEngine {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.reducedMotion = options.reducedMotion || false;
    this.width = canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth;
    this.height = canvas.parentElement ? canvas.parentElement.clientHeight : window.innerHeight;
    this.scrollProgress = 0;
    this.targetScrollProgress = 0;
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.clock = new THREE.Clock();
    this.animFrameId = null;
    this.disposed = false;
    this.init();
  }

  init() {
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x030712, 0.028);

    this.camera = new THREE.PerspectiveCamera(50, this.width / this.height, 0.1, 100);
    this.camera.position.set(0, 0, 14);

    this.scene.add(new THREE.AmbientLight(0x0a1128, 1.5));
    this.pointLight = new THREE.PointLight(0xef4444, 4, 30);
    this.pointLight.position.set(2.5, 0, 3);
    this.scene.add(this.pointLight);
    const rim = new THREE.PointLight(0x06b6d4, 2, 25);
    rim.position.set(-8, 6, 2);
    this.scene.add(rim);

    this.buildNetwork();
    this.buildBeacon();
    this.buildDust();

    this.handleResize = this.handleResize.bind(this);
    this.handlePointerMove = this.handlePointerMove.bind(this);
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('pointermove', this.handlePointerMove);
    this.animate();
  }

  buildNetwork() {
    this.networkGroup = new THREE.Group();
    this.scene.add(this.networkGroup);
    const count = 55;
    this.nodePos = [];
    const geo = new THREE.SphereGeometry(0.1, 10, 10);
    const mat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.7 });
    this.nodes = new THREE.InstancedMesh(geo, mat, count);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 26, y = (Math.random() - 0.5) * 16, z = (Math.random() - 0.5) * 16 - 2;
      this.nodePos.push(new THREE.Vector3(x, y, z));
      dummy.position.set(x, y, z);
      dummy.scale.setScalar(0.7 + Math.random() * 0.8);
      dummy.updateMatrix();
      this.nodes.setMatrixAt(i, dummy.matrix);
    }
    this.nodes.instanceMatrix.needsUpdate = true;
    this.networkGroup.add(this.nodes);
    const linePos = [];
    for (let i = 0; i < count; i++)
      for (let j = i + 1; j < count; j++)
        if (this.nodePos[i].distanceTo(this.nodePos[j]) < 6.5)
          linePos.push(this.nodePos[i].x, this.nodePos[i].y, this.nodePos[i].z, this.nodePos[j].x, this.nodePos[j].y, this.nodePos[j].z);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));
    this.networkGroup.add(new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({ color: 0x0284c7, transparent: true, opacity: 0.15, blending: THREE.AdditiveBlending })));
  }

  buildBeacon() {
    this.beaconGroup = new THREE.Group();
    this.scene.add(this.beaconGroup);
    const isMobile = this.width < 768;
    this.beaconGroup.position.set(isMobile ? 0 : 3.0, isMobile ? 1.5 : 0, 0);
    this.coreMat = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xef4444, emissiveIntensity: 0.85, roughness: 0.2, metalness: 0.8 });
    this.beaconCore = new THREE.Mesh(new THREE.IcosahedronGeometry(1.2, 1), this.coreMat);
    this.beaconGroup.add(this.beaconCore);
    this.beaconShroud = new THREE.Mesh(new THREE.IcosahedronGeometry(1.8, 2), new THREE.MeshBasicMaterial({ color: 0xff6b6b, wireframe: true, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending }));
    this.beaconGroup.add(this.beaconShroud);
    this.rings = [];
    const ringGeo = new THREE.RingGeometry(1.4, 1.55, 32);
    for (let r = 0; r < 3; r++) {
      const ring = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.7, side: THREE.DoubleSide, blending: THREE.AdditiveBlending }));
      ring.rotation.x = Math.PI / 2;
      ring.userData.offset = r * 0.8;
      this.beaconGroup.add(ring);
      this.rings.push(ring);
    }
  }

  buildDust() {
    const count = 200;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 35;
      pos[i+1] = (Math.random() - 0.5) * 25;
      pos[i+2] = (Math.random() - 0.5) * 20;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    this.particles = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0x38bdf8, size: 0.08, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending }));
    this.scene.add(this.particles);
  }

  handlePointerMove(e) {
    if (this.reducedMotion) return;
    this.mouse.targetX = (e.clientX / this.width - 0.5) * 2;
    this.mouse.targetY = -(e.clientY / this.height - 0.5) * 2;
  }

  handleResize() {
    this.width = this.canvas.parentElement ? this.canvas.parentElement.clientWidth : window.innerWidth;
    this.height = this.canvas.parentElement ? this.canvas.parentElement.clientHeight : window.innerHeight;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }

  setScrollProgress(p) { this.targetScrollProgress = Math.max(0, Math.min(1, p)); }

  setScenarioColor(hex) {
    const c = new THREE.Color(hex);
    if (this.coreMat) { this.coreMat.color.copy(c); this.coreMat.emissive.copy(c); }
    if (this.pointLight) this.pointLight.color.copy(c);
    if (this.rings) this.rings.forEach(r => r.material.color.copy(c));
  }

  triggerPulse() { if (this.beaconCore) this.beaconCore.scale.set(1.6, 1.6, 1.6); }

  animate() {
    if (this.disposed) return;
    this.animFrameId = requestAnimationFrame(this.animate.bind(this));
    const t = this.clock.getElapsedTime();
    this.scrollProgress += (this.targetScrollProgress - this.scrollProgress) * 0.08;
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;
    const mob = this.width < 768;
    const camPos = new THREE.Vector3().lerpVectors(
      new THREE.Vector3(0, 0, 14),
      new THREE.Vector3(mob ? 0 : 2.4, mob ? 0.8 : -0.2, 6.0),
      this.scrollProgress
    );
    if (!this.reducedMotion) { camPos.x += this.mouse.x * 0.5; camPos.y += this.mouse.y * 0.4; }
    this.camera.position.copy(camPos);
    this.camera.lookAt(new THREE.Vector3(mob ? 0 : 2.0 * (1 - this.scrollProgress * 0.5), mob ? 1.0 : 0, 0));
    if (this.beaconGroup) {
      const spd = this.reducedMotion ? 0.05 : 0.4;
      this.beaconCore.rotation.y = t * spd;
      this.beaconCore.rotation.x = t * spd * 0.7;
      this.beaconShroud.rotation.y = -t * spd * 0.8;
      this.beaconShroud.rotation.z = t * spd * 0.5;
      const pulse = 1.0 + Math.sin(t * 4) * 0.08;
      const ts = this.beaconCore.scale.x > 1.2 ? this.beaconCore.scale.x - 0.02 : pulse;
      this.beaconCore.scale.setScalar(ts);
      this.rings.forEach((ring) => {
        const rt = (t * 1.2 + ring.userData.offset) % 2.5;
        const n = rt / 2.5;
        ring.scale.set(1 + n * 2.5, 1 + n * 2.5, 1 + n * 2.5);
        ring.material.opacity = Math.max(0, (1 - n) * 0.75);
      });
    }
    if (this.networkGroup && !this.reducedMotion) {
      this.networkGroup.rotation.y = t * 0.03;
      this.networkGroup.rotation.x = Math.sin(t * 0.05) * 0.05;
    }
    if (this.particles && !this.reducedMotion) this.particles.rotation.y = t * 0.015;
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.disposed = true;
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('pointermove', this.handlePointerMove);
    this.scene.traverse((c) => {
      if (c.geometry) c.geometry.dispose();
      if (c.material) Array.isArray(c.material) ? c.material.forEach(m => m.dispose()) : c.material.dispose();
    });
    if (this.renderer) this.renderer.dispose();
  }
}