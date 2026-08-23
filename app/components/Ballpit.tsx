"use client";

import { useEffect, useRef } from "react";
import {
  ACESFilmicToneMapping, AmbientLight, Color, InstancedMesh, MathUtils,
  MeshPhysicalMaterial, Object3D, PerspectiveCamera, Plane, PMREMGenerator,
  PointLight, Raycaster, Scene, SphereGeometry, SRGBColorSpace, Timer, Vector2,
  Vector3, WebGLRenderer,
} from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

type BallpitProps = {
  className?: string;
  count?: number;
  gravity?: number;
  friction?: number;
  wallBounce?: number;
  followCursor?: boolean;
  colors?: number[];
  ambientColor?: number;
  ambientIntensity?: number;
  lightIntensity?: number;
  minSize?: number;
  maxSize?: number;
  size0?: number;
  maxVelocity?: number;
  maxZ?: number;
};

type Config = Required<Omit<BallpitProps, "className">> & {
  maxX: number;
  maxY: number;
  controlSphere0: boolean;
};

const defaults: Config = {
  count: 62,
  colors: [0xc8d9df, 0xdce7dc, 0xeadcd3, 0xc7c1d2, 0xe7dfc7],
  ambientColor: 0xfffdf7,
  ambientIntensity: 1.7,
  lightIntensity: 95,
  minSize: .34,
  maxSize: .78,
  size0: 1,
  gravity: .34,
  friction: .992,
  wallBounce: .9,
  maxVelocity: .12,
  maxX: 5,
  maxY: 5,
  maxZ: 1.8,
  controlSphere0: false,
  followCursor: true,
};

class BallPhysics {
  positionData: Float32Array;
  velocityData: Float32Array;
  sizeData: Float32Array;
  center = new Vector3();
  constructor(public config: Config) {
    this.positionData = new Float32Array(3 * config.count);
    this.velocityData = new Float32Array(3 * config.count);
    this.sizeData = new Float32Array(config.count).fill(1);
    for (let index = 1; index < config.count; index += 1) {
      const offset = index * 3;
      this.positionData[offset] = MathUtils.randFloatSpread(config.maxX * 2);
      this.positionData[offset + 1] = MathUtils.randFloatSpread(config.maxY * 2);
      this.positionData[offset + 2] = MathUtils.randFloatSpread(config.maxZ * 2);
      this.velocityData[offset] = MathUtils.randFloatSpread(.035);
      this.velocityData[offset + 1] = MathUtils.randFloatSpread(.035);
      this.velocityData[offset + 2] = MathUtils.randFloatSpread(.02);
    }
    this.setSizes();
  }
  setSizes() {
    this.sizeData[0] = this.config.size0;
    for (let index = 1; index < this.config.count; index += 1) {
      this.sizeData[index] = MathUtils.randFloat(this.config.minSize, this.config.maxSize);
    }
  }
  update(delta: number) {
    const position = new Vector3();
    const velocity = new Vector3();
    const otherPosition = new Vector3();
    const otherVelocity = new Vector3();
    const direction = new Vector3();
    const correction = new Vector3();
    const start = this.config.controlSphere0 ? 1 : 0;
    if (this.config.controlSphere0) {
      position.fromArray(this.positionData, 0).lerp(this.center, .14).toArray(this.positionData, 0);
      velocity.set(0, 0, 0).toArray(this.velocityData, 0);
    }
    for (let index = start; index < this.config.count; index += 1) {
      const offset = index * 3;
      position.fromArray(this.positionData, offset);
      velocity.fromArray(this.velocityData, offset);
      velocity.y -= delta * this.config.gravity * this.sizeData[index];
      velocity.multiplyScalar(this.config.friction).clampLength(0, this.config.maxVelocity);
      position.add(velocity);
      position.toArray(this.positionData, offset);
      velocity.toArray(this.velocityData, offset);
    }
    for (let index = start; index < this.config.count; index += 1) {
      const offset = index * 3;
      position.fromArray(this.positionData, offset);
      velocity.fromArray(this.velocityData, offset);
      const radius = this.sizeData[index];
      for (let other = index + 1; other < this.config.count; other += 1) {
        const otherOffset = other * 3;
        otherPosition.fromArray(this.positionData, otherOffset);
        otherVelocity.fromArray(this.velocityData, otherOffset);
        direction.copy(otherPosition).sub(position);
        const distance = direction.length() || .0001;
        const overlap = radius + this.sizeData[other] - distance;
        if (overlap > 0) {
          correction.copy(direction).normalize().multiplyScalar(overlap * .5);
          position.sub(correction);
          otherPosition.add(correction);
          velocity.addScaledVector(correction, -1.3);
          otherVelocity.addScaledVector(correction, 1.3);
          otherPosition.toArray(this.positionData, otherOffset);
          otherVelocity.toArray(this.velocityData, otherOffset);
        }
      }
      if (this.config.controlSphere0) {
        otherPosition.fromArray(this.positionData, 0);
        direction.copy(otherPosition).sub(position);
        const overlap = radius + this.sizeData[0] - direction.length();
        if (overlap > 0) {
          correction.copy(direction.normalize()).multiplyScalar(overlap);
          position.sub(correction);
          velocity.addScaledVector(correction, -1.8);
        }
      }
      if (Math.abs(position.x) + radius > this.config.maxX) {
        position.x = Math.sign(position.x) * (this.config.maxX - radius);
        velocity.x *= -this.config.wallBounce;
      }
      if (position.y - radius < -this.config.maxY) {
        position.y = -this.config.maxY + radius;
        velocity.y *= -this.config.wallBounce;
      }
      if (position.y + radius > this.config.maxY) {
        position.y = this.config.maxY - radius;
        velocity.y *= -this.config.wallBounce;
      }
      const maxZ = Math.max(this.config.maxZ, this.config.maxSize);
      if (Math.abs(position.z) + radius > maxZ) {
        position.z = Math.sign(position.z) * (this.config.maxZ - radius);
        velocity.z *= -this.config.wallBounce;
      }
      position.toArray(this.positionData, offset);
      velocity.toArray(this.velocityData, offset);
    }
  }
}

function createBallpit(canvas: HTMLCanvasElement, props: BallpitProps) {
  const config: Config = { ...defaults, ...props } as Config;
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.setClearAlpha(0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  const camera = new PerspectiveCamera(50, 1, .1, 100);
  camera.position.set(0, 0, 20);
  const scene = new Scene();
  const environment = new PMREMGenerator(renderer).fromScene(new RoomEnvironment(), .04).texture;
  const material = new MeshPhysicalMaterial({ envMap: environment, metalness: .08, roughness: .32, clearcoat: .9, clearcoatRoughness: .2, transparent: true, opacity: .82 });
  const mesh = new InstancedMesh(new SphereGeometry(1, 26, 18), material, config.count);
  const colors = config.colors.map((value) => new Color(value));
  for (let index = 0; index < config.count; index += 1) mesh.setColorAt(index, colors[index % colors.length]);
  mesh.instanceColor!.needsUpdate = true;
  scene.add(mesh);
  scene.add(new AmbientLight(config.ambientColor, config.ambientIntensity));
  const light = new PointLight(config.colors[0], config.lightIntensity);
  light.position.set(-4, 6, 9);
  scene.add(light);
  const physics = new BallPhysics(config);
  const dummy = new Object3D();
  const timer = new Timer();
  const raycaster = new Raycaster();
  const plane = new Plane(new Vector3(0, 0, 1), 0);
  const hit = new Vector3();
  const pointer = new Vector2();
  let frame = 0;
  let visible = true;

  const resize = () => {
    const width = canvas.parentElement?.clientWidth || window.innerWidth;
    const height = canvas.parentElement?.clientHeight || window.innerHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.fov = camera.aspect > 1.5 ? 56 : 50;
    camera.updateProjectionMatrix();
    const worldHeight = 2 * Math.tan(MathUtils.degToRad(camera.fov / 2)) * camera.position.length();
    config.maxY = worldHeight / 2;
    config.maxX = worldHeight * camera.aspect / 2;
  };
  const move = (event: PointerEvent) => {
    if (!config.followCursor) return;
    const rect = canvas.getBoundingClientRect();
    pointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -(((event.clientY - rect.top) / rect.height) * 2 - 1));
    raycaster.setFromCamera(pointer, camera);
    camera.getWorldDirection(plane.normal);
    if (raycaster.ray.intersectPlane(plane, hit)) {
      physics.center.copy(hit);
      config.controlSphere0 = true;
    }
  };
  const leave = () => { config.controlSphere0 = false; };
  const animate = () => {
    frame = requestAnimationFrame(animate);
    if (!visible) return;
    timer.update();
    physics.update(Math.min(timer.getDelta(), .032));
    for (let index = 0; index < config.count; index += 1) {
      dummy.position.fromArray(physics.positionData, index * 3);
      dummy.scale.setScalar(index === 0 && !config.followCursor ? 0 : physics.sizeData[index]);
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    renderer.render(scene, camera);
  };
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
  observer.observe(canvas);
  const resizeObserver = new ResizeObserver(resize);
  if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);
  canvas.addEventListener("pointermove", move, { passive: true });
  canvas.addEventListener("pointerleave", leave);
  resize();
  timer.reset();
  animate();
  return () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
    resizeObserver.disconnect();
    canvas.removeEventListener("pointermove", move);
    canvas.removeEventListener("pointerleave", leave);
    mesh.geometry.dispose();
    material.dispose();
    environment.dispose();
    renderer.dispose();
  };
}

export default function Ballpit({ className = "", ...props }: BallpitProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const propsRef = useRef(props);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const initialProps = propsRef.current;
    return createBallpit(canvas, { ...initialProps, count: reduced ? Math.min(initialProps.count ?? defaults.count, 26) : initialProps.count });
  }, []);
  return <canvas aria-hidden="true" className={className} ref={canvasRef} />;
}
