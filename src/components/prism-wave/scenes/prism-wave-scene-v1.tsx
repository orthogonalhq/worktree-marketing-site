import { Environment, Lightformer, MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const TAU = Math.PI * 2;

const ribVertexShader = `
  varying vec2 vUv;
  varying vec3 vViewNormal;

  void main() {
    vUv = uv;
    vViewNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ribFragmentShader = `
  precision highp float;

  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vViewNormal;

  vec3 spectrum(float t) {
    vec3 a = vec3(0.5);
    vec3 b = vec3(0.5);
    vec3 c = vec3(1.0);
    vec3 d = vec3(0.0, 0.33, 0.67);
    return a + b * cos(6.28318530718 * (c * t + d));
  }

  void main() {
    float phase = vUv.x * 112.0 * 6.28318530718;
    float footprint = max(fwidth(phase), 0.001);
    float rib = pow(0.5 + 0.5 * cos(phase), 13.0);
    rib *= 1.0 - smoothstep(0.8, 2.4, footprint);

    float grazing = pow(1.0 - abs(vViewNormal.z), 1.5);
    float sweep = fract(vUv.x * 0.68 + vUv.y * 0.22 + uTime * 0.006);
    vec3 spectralColor = spectrum(sweep);
    vec3 color = mix(vec3(0.62, 0.82, 1.0), spectralColor, 0.82);
    float envelope = smoothstep(0.0, 0.11, vUv.y) * smoothstep(1.0, 0.89, vUv.y);
    float broadLight = 0.72 + 0.28 * sin((vUv.y * 1.7 + vUv.x * 0.28) * 6.28318530718);
    float glassSheen = envelope * broadLight * mix(0.075, 0.245, grazing);
    float ribHighlight = rib * envelope * mix(0.035, 0.145, grazing);
    color = mix(color * 0.72 + vec3(0.035, 0.05, 0.09), color, smoothstep(0.04, 0.48, grazing) + rib * 0.22);
    float alpha = glassSheen + ribHighlight;

    gl_FragColor = vec4(color, alpha);
  }
`;

function createRibbonGeometry() {
  const columns = 224;
  const rows = 72;
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let row = 0; row <= rows; row += 1) {
    const v = row / rows;
    const across = (v - 0.5) * 7.2;

    for (let column = 0; column <= columns; column += 1) {
      const u = column / columns;
      const along = (u - 0.5) * 18.5;
      const broadFold = Math.sin(along * 0.46 + across * 0.31) * 1.2;
      const secondaryFold = Math.sin(along * 0.19 - across * 0.58 + 0.7) * 0.76;
      const crest = Math.cos(across * 0.72 - along * 0.08) * 0.3;
      const edgeTaper = Math.sin(v * Math.PI) * 0.14 + 0.86;
      const ribRelief = Math.cos(u * 112 * TAU) * 0.012;

      positions.push(
        along,
        (broadFold + secondaryFold + crest) * edgeTaper,
        across * 0.7 + Math.sin(along * 0.24) * 0.46 + ribRelief,
      );
      uvs.push(u, v);
    }
  }

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const current = row * (columns + 1) + column;
      const next = current + columns + 1;
      indices.push(current, next, current + 1, next, next + 1, current + 1);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}

function PrismRibbon() {
  const groupRef = useRef<THREE.Group>(null);
  const ribsRef = useRef<THREE.ShaderMaterial>(null);
  const geometry = useMemo(() => createRibbonGeometry(), []);
  const ribUniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.z = -0.085 + Math.sin(elapsed * 0.12) * 0.018;
      groupRef.current.position.y = Math.sin(elapsed * 0.16) * 0.09;
    }
    if (ribsRef.current) {
      ribsRef.current.uniforms.uTime.value = elapsed;
    }
  });

  return (
    <group ref={groupRef} rotation={[-0.43, -0.1, -0.105]} position={[2.65, -0.05, -0.45]}>
      <mesh geometry={geometry}>
        <MeshTransmissionMaterial
          anisotropicBlur={0.12}
          attenuationColor="#7ca5ff"
          attenuationDistance={6.4}
          backside
          backsideThickness={1.15}
          chromaticAberration={0.23}
          color="#f1f8ff"
          distortion={0.26}
          distortionScale={0.72}
          envMapIntensity={3.8}
          ior={1.34}
          roughness={0.035}
          samples={8}
          temporalDistortion={0.07}
          thickness={1.1}
          transmission={1}
        />
      </mesh>
      <mesh geometry={geometry} renderOrder={3} scale={[1.0015, 1.0015, 1.0015]}>
        <shaderMaterial
          ref={ribsRef}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          fragmentShader={ribFragmentShader}
          side={THREE.DoubleSide}
          transparent
          uniforms={ribUniforms}
          vertexShader={ribVertexShader}
        />
      </mesh>
    </group>
  );
}

export function PrismWaveSceneV1() {
  return (
    <>
      <PrismRibbon />
      <Environment resolution={256}>
        <Lightformer color="#e7f8ff" intensity={7.5} position={[-4, 5, 4]} rotation={[0.2, 0.2, 0]} scale={[8, 2, 1]} />
        <Lightformer color="#684bff" intensity={5.4} position={[4, 1, 3]} rotation={[0, -0.6, 0]} scale={[5, 6, 1]} />
        <Lightformer color="#ff47ce" intensity={4.2} position={[0, -4, 2]} rotation={[-0.4, 0, 0]} scale={[9, 1, 1]} />
        <Lightformer color="#4be7ff" intensity={4.8} position={[7, 3, -2]} rotation={[0, 0.8, 0]} scale={[4, 3, 1]} />
      </Environment>
    </>
  );
}
