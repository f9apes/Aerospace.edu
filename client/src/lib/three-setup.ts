import * as THREE from 'three';

export class RocketVisualization {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private rocket: THREE.Group;
  private animationId: number | null = null;

  constructor(container: HTMLElement) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    this.setupRenderer(container);
    this.setupLighting();
    this.setupCamera();
    this.createRocket();
    this.animate();
  }

  private setupRenderer(container: HTMLElement) {
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(this.renderer.domElement);
  }

  private setupLighting() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    this.scene.add(ambientLight);

    // Directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(-1, 1, 1);
    directionalLight.castShadow = true;
    this.scene.add(directionalLight);

    // Point light for rocket glow
    const pointLight = new THREE.PointLight(0x00f5d4, 1, 100);
    pointLight.position.set(0, 0, 5);
    this.scene.add(pointLight);
  }

  private setupCamera() {
    this.camera.position.set(0, 0, 5);
    this.camera.lookAt(0, 0, 0);
  }

  private createRocket() {
    this.rocket = new THREE.Group();

    // Create rocket parts with different colors based on components
    this.createRocketPart('nose', 0x00f5d4, new THREE.ConeGeometry(0.3, 0.8, 8), new THREE.Vector3(0, 2, 0));
    this.createRocketPart('payload', 0xffd60a, new THREE.CylinderGeometry(0.3, 0.3, 0.8, 8), new THREE.Vector3(0, 1, 0));
    this.createRocketPart('fuel', 0x3a0ca3, new THREE.CylinderGeometry(0.3, 0.3, 1.2, 8), new THREE.Vector3(0, 0, 0));
    this.createRocketPart('engine', 0xff4444, new THREE.CylinderGeometry(0.25, 0.3, 0.6, 8), new THREE.Vector3(0, -1, 0));
    
    // Fins
    const finGeometry = new THREE.BoxGeometry(0.1, 0.8, 0.4);
    const finMaterial = new THREE.MeshLambertMaterial({ color: 0x44ff44 });
    
    for (let i = 0; i < 4; i++) {
      const fin = new THREE.Mesh(finGeometry, finMaterial);
      const angle = (i / 4) * Math.PI * 2;
      fin.position.set(Math.cos(angle) * 0.35, -1, Math.sin(angle) * 0.35);
      this.rocket.add(fin);
    }

    this.scene.add(this.rocket);
  }

  private createRocketPart(name: string, color: number, geometry: THREE.BufferGeometry, position: THREE.Vector3) {
    const material = new THREE.MeshLambertMaterial({ color });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(position);
    mesh.userData = { name };
    this.rocket.add(mesh);
  }

  public updateRocketParts(parts: Record<string, boolean>) {
    this.rocket.children.forEach((child) => {
      if (child.userData && child.userData.name) {
        const partName = child.userData.name;
        child.visible = parts[partName] || false;
      }
    });
  }

  public launchAnimation(): Promise<void> {
    return new Promise((resolve) => {
      const startY = this.rocket.position.y;
      const targetY = startY + 10;
      const duration = 3000; // 3 seconds
      const startTime = Date.now();

      const animateLaunch = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for realistic acceleration
        const easeProgress = progress * progress;
        
        this.rocket.position.y = startY + (targetY - startY) * easeProgress;
        this.rocket.rotation.z = Math.sin(elapsed * 0.01) * 0.1; // Slight wobble
        
        if (progress < 1) {
          requestAnimationFrame(animateLaunch);
        } else {
          // Reset position
          this.rocket.position.y = startY;
          this.rocket.rotation.z = 0;
          resolve();
        }
      };
      
      animateLaunch();
    });
  }

  public startIdleAnimation() {
    let time = 0;
    const idleAnimation = () => {
      time += 0.01;
      this.rocket.rotation.y += 0.005;
      this.rocket.position.y = Math.sin(time) * 0.1;
      
      this.animationId = requestAnimationFrame(idleAnimation);
    };
    idleAnimation();
  }

  public stopIdleAnimation() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  private animate() {
    const animationLoop = () => {
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(animationLoop);
    };
    animationLoop();
  }

  public resize(width: number, height: number) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  public dispose() {
    this.stopIdleAnimation();
    this.renderer.dispose();
  }
}
