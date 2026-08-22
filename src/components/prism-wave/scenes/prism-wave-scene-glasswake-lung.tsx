import { Environment, Lightformer, MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";

const waveDeformation = `
  float waveTravel = fract(0.28 + uWaveTime * 0.058);
  float waveDelta = fract(uv.x - waveTravel + 0.5) - 0.5;
  float wavePulse = exp(-pow(waveDelta * 5.4, 2.0));
  float waveShoulder = exp(-pow((waveDelta + 0.16) * 9.0, 2.0));
  float waveAcross = uv.y - 0.5;

  transformed.y += wavePulse * (0.38 + waveAcross * 0.20) - waveShoulder * 0.09;
  transformed.z += wavePulse * (0.10 + cos(waveAcross * 3.14159265) * 0.14);
`;

const ribVertexShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vViewPosition;
  varying float vWavePulse;
  varying float vScreenX;

  void main() {
    vUv = uv;

    vec3 transformed = position;
    float uWaveTime = uTime;
    ${waveDeformation}
    vWavePulse = wavePulse;

    vec4 viewPosition = modelViewMatrix * vec4(transformed, 1.0);
    vViewPosition = viewPosition.xyz;
    vec4 clipPosition = projectionMatrix * viewPosition;
    vScreenX = clipPosition.x / clipPosition.w;
    gl_Position = clipPosition;
  }
`;

const ribFragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform float uShellOnly;
  varying vec2 vUv;
  varying vec3 vViewPosition;
  varying float vWavePulse;
  varying float vScreenX;

  vec3 spectrum(float t) {
    vec3 a = vec3(0.5);
    vec3 b = vec3(0.5);
    vec3 c = vec3(1.0);
    vec3 d = vec3(0.0, 0.33, 0.67);
    return a + b * cos(6.28318530718 * (c * t + d));
  }

  float ribHash(float value) {
    return fract(sin(value * 127.1) * 43758.5453123);
  }

  float noiseHash(vec2 point) {
    return fract(sin(dot(point, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float materialNoise(vec2 point) {
    vec2 cell = floor(point);
    vec2 local = fract(point);
    local = local * local * (3.0 - 2.0 * local);

    float bottom = mix(noiseHash(cell), noiseHash(cell + vec2(1.0, 0.0)), local.x);
    float top = mix(noiseHash(cell + vec2(0.0, 1.0)), noiseHash(cell + vec2(1.0, 1.0)), local.x);
    return mix(bottom, top, local.y);
  }

  void main() {
    vec3 surfaceNormal = normalize(cross(dFdx(vViewPosition), dFdy(vViewPosition)));
    surfaceNormal *= gl_FrontFacing ? 1.0 : -1.0;
    float grazing = pow(1.0 - abs(surfaceNormal.z), 1.35);
    float viewDepth = -vViewPosition.z;
    float depthBlur = pow(smoothstep(9.7, 15.7, viewDepth), 0.82);

    float phaseWarp = sin(vUv.y * 16.8 + vUv.x * 5.4) * 0.34;
    phaseWarp += sin(vUv.y * 39.0 - vUv.x * 8.0) * 0.11;
    float phase = vUv.x * 112.0 + phaseWarp / 6.28318530718;
    float phaseFootprint = fwidth(phase);
    float ribDistance = abs(fract(phase + 0.5) - 0.5);
    float slowTexture = 0.5 + 0.5 * sin(vUv.y * 31.0 + vUv.x * 10.0);
    float fineTexture = 0.5 + 0.5 * sin(vUv.y * 73.0 - vUv.x * 17.0 + sin(vUv.y * 9.0));
    float ribIdentity = ribHash(floor(vUv.x * 112.0));
    float broadNoise = materialNoise(vUv * vec2(22.0, 9.0));
    float fineNoise = materialNoise(vUv * vec2(71.0, 33.0) + vec2(7.4, 2.1));
    float glassNoise = broadNoise * 0.68 + fineNoise * 0.32;
    float xrayTransition = smoothstep(0.36, 0.64, vScreenX + (broadNoise - 0.5) * 0.025);
    float foldCompression = smoothstep(0.13, 0.48, phaseFootprint);
    float leftRibPresence = mix(0.055, 0.008, foldCompression);
    float ribPresence = mix(leftRibPresence, 1.0, xrayTransition);
    float textureMix = slowTexture * 0.36 + fineTexture * 0.20 + ribIdentity * 0.24 + glassNoise * 0.20;
    float ribWidth = mix(0.026, 0.072, textureMix);
    float ribAntialias = max(fwidth(ribDistance), 0.002);
    float ribCore = 1.0 - smoothstep(ribWidth * 0.62, ribWidth * 0.62 + ribAntialias, ribDistance);
    float gaussianWidth = mix(ribWidth * 0.72, ribWidth * 2.35, depthBlur);
    float gaussianDistance = ribDistance / max(gaussianWidth, 0.002);
    float ribSoft = exp(-gaussianDistance * gaussianDistance * 1.55);
    float rib = mix(ribCore, ribSoft * 0.62, depthBlur);
    float xrayRib = max(ribCore, ribSoft * 0.48);
    rib = mix(rib, xrayRib, xrayTransition);
    float ribTexture = mix(0.42, 1.0, textureMix) * mix(0.78, 1.12, ribIdentity);

    float sweep = fract(vUv.x * 0.68 + vUv.y * 0.22 + uTime * 0.006);
    vec3 spectralColor = spectrum(fract(sweep + (textureMix - 0.5) * 0.055));
    float envelope = smoothstep(0.0, 0.11, vUv.y) * smoothstep(1.0, 0.89, vUv.y);
    float broadLight = 0.72 + 0.28 * sin((vUv.y * 1.7 + vUv.x * 0.28) * 6.28318530718);
    float crestInfluence = smoothstep(0.08, 0.92, vWavePulse);
    float glassVeil = envelope * broadLight * mix(0.072, 0.20, grazing);
    glassVeil *= mix(0.76, 1.24, glassNoise) * mix(1.08, 0.50, depthBlur);
    glassVeil *= mix(1.0, 0.58, xrayTransition);
    float convertedRibSheen = (1.0 - ribPresence) * envelope * mix(0.025, 0.085, grazing);
    convertedRibSheen *= mix(0.82, 1.18, broadNoise) * (0.72 + crestInfluence * 0.28);
    float ribHighlight = rib * ribTexture * envelope * mix(0.078, 0.26, grazing);
    ribHighlight *= 1.0 + crestInfluence * mix(0.18, 0.58, textureMix);
    float ribDepthGain = mix(1.16, 0.34, depthBlur);
    ribDepthGain = mix(ribDepthGain, 1.08, xrayTransition);
    ribHighlight *= ribDepthGain;
    ribHighlight *= mix(ribPresence, 1.62, xrayTransition);
    float xrayGlow = xrayRib * envelope * xrayTransition;
    xrayGlow *= mix(0.30, 0.64, grazing) * mix(0.82, 1.22, textureMix);
    vec3 color = mix(vec3(0.50, 0.76, 1.0), spectralColor, 0.72 + rib * 0.18);
    color *= mix(0.82, 1.20, grazing) + crestInfluence * rib * 0.18;
    float depthColorWash = depthBlur * 0.38 * mix(1.0, 0.12, xrayTransition);
    color = mix(color, vec3(0.28, 0.42, 0.78), depthColorWash);
    float depthHaze = envelope * depthBlur * mix(0.014, 0.056, broadNoise);
    float alpha = glassVeil + convertedRibSheen + ribHighlight + xrayGlow + depthHaze;

    if (uShellOnly > 0.5) {
      alpha = (ribHighlight + xrayGlow) * xrayTransition * 0.44;
      color = mix(color, spectralColor, 0.28);
    }

    if (alpha < 0.008) discard;

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
      const rightFlare = THREE.MathUtils.smootherstep(u, 0.52, 0.96);
      const flaredAcross = across * (1 + rightFlare * 0.78);
      const broadFold = Math.sin(along * 0.46 + across * 0.31) * 1.2;
      const secondaryFold = Math.sin(along * 0.19 - across * 0.58 + 0.7) * 0.76;
      const crest = Math.cos(across * 0.72 - along * 0.08) * 0.3;
      const edgeTaper = Math.sin(v * Math.PI) * 0.14 + 0.86;
      positions.push(
        along,
        (broadFold + secondaryFold + crest) * edgeTaper,
        flaredAcross * 0.7 + Math.sin(along * 0.24) * 0.46 + rightFlare * 0.65,
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

type RibUniforms = {
  uShellOnly: { value: number };
  uTime: { value: number };
};

function XrayShell({
  geometry,
  materialRef,
  meshRef,
  uniforms,
}: {
  geometry: THREE.BufferGeometry;
  materialRef: RefObject<THREE.ShaderMaterial | null>;
  meshRef: RefObject<THREE.Mesh | null>;
  uniforms: RibUniforms;
}) {
  return (
    <mesh ref={meshRef} geometry={geometry} renderOrder={4} scale={1.2}>
      <shaderMaterial
        ref={materialRef}
        blending={THREE.AdditiveBlending}
        depthTest={false}
        depthWrite={false}
        forceSinglePass
        fragmentShader={ribFragmentShader}
        side={THREE.DoubleSide}
        transparent
        uniforms={uniforms}
        vertexShader={ribVertexShader}
      />
    </mesh>
  );
}

function PrismRibbon() {
  const glassRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const glassShaderRef = useRef<Parameters<THREE.Material["onBeforeCompile"]>[0]>(null);
  const ribsRef = useRef<THREE.ShaderMaterial>(null);
  const shellMeshRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.ShaderMaterial>(null);
  const reducedMotionRef = useRef(false);
  const geometry = useMemo(() => createRibbonGeometry(), []);
  const ribUniforms = useMemo<RibUniforms>(() => ({ uShellOnly: { value: 0 }, uTime: { value: 0 } }), []);
  const shellUniforms = useMemo<RibUniforms>(() => ({ uShellOnly: { value: 1 }, uTime: { value: 0 } }), []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      reducedMotionRef.current = mediaQuery.matches;
    };

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useLayoutEffect(() => {
    const material = glassRef.current;
    if (!material) return;

    const originalOnBeforeCompile = material.onBeforeCompile.bind(material);
    const originalProgramCacheKey = material.customProgramCacheKey.bind(material);

    material.onBeforeCompile = (shader, renderer) => {
      originalOnBeforeCompile(shader, renderer);
      shader.uniforms.uWaveTime = { value: 0 };
      glassShaderRef.current = shader;
      shader.vertexShader = shader.vertexShader
        .replace("void main() {", "uniform float uWaveTime;\nvoid main() {")
        .replace("#include <begin_vertex>", `#include <begin_vertex>\n${waveDeformation}`);
    };
    material.customProgramCacheKey = () => `${originalProgramCacheKey()}-prism-wave-v2-textured-ribs`;
    material.needsUpdate = true;

    return () => {
      glassShaderRef.current = null;
      material.onBeforeCompile = originalOnBeforeCompile;
      material.customProgramCacheKey = originalProgramCacheKey;
      material.needsUpdate = true;
    };
  }, []);

  useFrame(({ clock }) => {
    const elapsed = reducedMotionRef.current ? 0 : clock.getElapsedTime();
    if (glassShaderRef.current) {
      glassShaderRef.current.uniforms.uWaveTime.value = elapsed;
    }
    if (ribsRef.current) {
      ribsRef.current.uniforms.uTime.value = elapsed;
    }
    if (shellRef.current) {
      shellRef.current.uniforms.uTime.value = elapsed;
    }
    if (shellMeshRef.current) {
      const waveTravel = (0.28 + elapsed * 0.058) % 1;
      const shellWaveDelta = ((0.76 - waveTravel + 1.5) % 1) - 0.5;
      const synchronizedBreath = Math.exp(-Math.pow(shellWaveDelta * 5.4, 2));
      shellMeshRef.current.scale.setScalar(1.2 + synchronizedBreath * 0.14);
    }
  });

  return (
    <group rotation={[-0.43, -0.1, -0.105]} position={[2.65, -0.05, -0.45]}>
      <mesh geometry={geometry}>
        <MeshTransmissionMaterial
          ref={(material) => {
            glassRef.current = material as unknown as THREE.MeshPhysicalMaterial | null;
          }}
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
          forceSinglePass
          fragmentShader={ribFragmentShader}
          side={THREE.DoubleSide}
          transparent
          uniforms={ribUniforms}
          vertexShader={ribVertexShader}
        />
      </mesh>
      <XrayShell geometry={geometry} materialRef={shellRef} meshRef={shellMeshRef} uniforms={shellUniforms} />
    </group>
  );
}

export function GlasswakeLungScene() {
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
