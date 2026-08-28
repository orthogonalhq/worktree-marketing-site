"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { ribbonZoomEvent } from "./ribbon-zoom-control";
import {
  createStripeWaveGeometry,
  getStripeWaveGeometryTransform,
  type StripeWaveShape,
  type WaveGeometry,
  type WaveThreeRuntime,
} from "./stripe-wave-geometries";
import styles from "./stripe-wave-hero.module.css";

export type { StripeWaveShape } from "./stripe-wave-geometries";

type ModuleRecord = { exports: unknown };
type ModuleFactory = (module: ModuleRecord, exports: Record<string, unknown>, requireModule: WebpackRequire) => void;
type ChunkPayload = [unknown, Record<number, ModuleFactory>];
type ChunkCollector = { push: (payload: ChunkPayload) => void };

type WebpackRequire = ((id: number) => unknown) & {
  d: (exports: object, definitions: Record<string, () => unknown>) => void;
  g: typeof globalThis;
  n: (module: unknown) => (() => unknown) & { a?: unknown };
  o: (object: object, property: PropertyKey) => boolean;
  r: (exports: object) => void;
};

type WaveUniforms = Record<string, { value: unknown }>;
type WaveDeformationState = Record<string, unknown>;
type WaveMaterial = {
  blending: number;
  clone: () => WaveMaterial;
  depthTest: boolean;
  depthWrite: boolean;
  dispose: () => void;
  fragmentShader: string;
  needsUpdate: boolean;
  polygonOffset?: boolean;
  polygonOffsetFactor?: number;
  polygonOffsetUnits?: number;
  transparent: boolean;
  uniforms: WaveUniforms;
  vertexShader: string;
};
type WaveVector3 = { x: number; y: number; z: number };
type WaveMesh = {
  clone: () => WaveMesh;
  geometry: WaveGeometry;
  material: WaveMaterial;
  position: WaveVector3;
  renderOrder: number;
  rotation: WaveVector3;
  scale: WaveVector3;
};

type WaveTransform = {
  position: WaveVector3;
  rotation: WaveVector3;
  scale: WaveVector3;
};

type WaveInstance = {
  camera?: { updateProjectionMatrix: () => void; zoom: number };
  dispose: () => void;
  initScene: () => void;
  onLoadReady: (callback: () => void) => void;
  paused: boolean;
  postProcessingMaterial?: { uniforms: WaveUniforms };
  scene?: { add: (mesh: WaveMesh) => void; remove: (mesh: WaveMesh) => void };
  waveMesh?: { geometry: WaveGeometry; material: WaveMaterial; mesh: WaveMesh };
};

type WaveConstructor = new (
  canvas: HTMLCanvasElement,
  options: {
    mediumConfig: unknown;
    onError: (error: unknown, tags: unknown) => void;
    smallConfig: unknown;
    textures: Array<{ path: string }>;
    wideConfig: unknown;
  },
) => WaveInstance;

declare global {
  interface Window {
    __worktreeStripeWaveRequire?: WebpackRequire;
    webpackChunkStripeWave?: ChunkCollector;
  }
}

const chunkSources = [
  "/vendor/wave-prototype/c67c952e-7f65a464f661b1d2.js?direct=1",
  "/vendor/wave-prototype/55369f66-92e84f6aba0a73a8.js?direct=1",
  "/vendor/wave-prototype/68654-0ccff603146a8ff7.js?direct=1",
] as const;

function replaceWaveGeometry(
  wave: WaveInstance,
  three: WaveThreeRuntime,
  baseGeometry: WaveGeometry,
  baseTransform: WaveTransform,
  shape: StripeWaveShape,
  seed: number,
) {
  const waveMesh = wave.waveMesh;
  if (!waveMesh) return;

  const currentGeometry = waveMesh.mesh.geometry;
  const nextGeometry = shape === "header"
    ? baseGeometry
    : createStripeWaveGeometry(three, shape, seed);

  waveMesh.geometry = nextGeometry;
  waveMesh.mesh.geometry = nextGeometry;

  if (shape === "header") {
    Object.assign(waveMesh.mesh.position, baseTransform.position);
    Object.assign(waveMesh.mesh.rotation, baseTransform.rotation);
    Object.assign(waveMesh.mesh.scale, baseTransform.scale);
  } else {
    const transform = getStripeWaveGeometryTransform(shape);
    Object.assign(waveMesh.mesh.position, transform.position);
    Object.assign(waveMesh.mesh.rotation, transform.rotation);
    Object.assign(waveMesh.mesh.scale, transform.scale);
  }

  if (currentGeometry !== baseGeometry && currentGeometry !== nextGeometry) {
    currentGeometry.dispose();
  }
}

const deformationUniformNames = [
  "u_displaceAmount",
  "u_twistPowerX",
  "u_twistPowerY",
  "u_twistPowerZ",
] as const;

function captureWaveDeformation(material: WaveMaterial) {
  return Object.fromEntries(
    deformationUniformNames.map((name) => [name, material.uniforms[name]?.value]),
  ) satisfies WaveDeformationState;
}

function applyWaveDeformation(wave: WaveInstance, shape: StripeWaveShape, baseState: WaveDeformationState) {
  const material = wave.waveMesh?.material;
  if (!material) return;

  for (const name of deformationUniformNames) {
    const uniform = material.uniforms[name];
    if (!uniform) continue;
    uniform.value = shape === "orbit" ? 0 : baseState[name];
  }
}

function captureWaveTransform(mesh: WaveMesh): WaveTransform {
  return {
    position: { x: mesh.position.x, y: mesh.position.y, z: mesh.position.z },
    rotation: { x: mesh.rotation.x, y: mesh.rotation.y, z: mesh.rotation.z },
    scale: { x: mesh.scale.x, y: mesh.scale.y, z: mesh.scale.z },
  };
}

const stripeOpaqueSurface = "vec4 color = vec4(surfaceColor(v_uv, v_position, pdy), 1.0);";
const stripeGlowOutput = "color += (1.0 - pdy) * 0.25;";
const stripeVertexVaryings = "varying vec2 v_resolution;";
const stripeVertexOutput = "gl_Position = v_clipPosition;";
const worktreeGlassSurface = `
  float glassHighlight = mix(0.45, pow(1.0 - pdy, 1.35), 0.3);
  vec3 inheritedSurface = surfaceColor(v_uv, v_position, pdy);
  float inheritedLuminance = dot(inheritedSurface, vec3(0.299, 0.587, 0.114));
  float bodyCoordinate = clamp(v_uv.y * 0.72 + v_uv.x * 0.18, 0.0, 1.0);
  vec3 cobalt = vec3(0.08, 0.24, 1.0);
  vec3 cyan = vec3(0.015, 0.78, 1.0);
  vec3 violet = vec3(0.52, 0.12, 1.0);
  vec3 solidBody = mix(cobalt, violet, smoothstep(0.18, 0.86, bodyCoordinate));
  solidBody = mix(solidBody, cyan, glassHighlight * 0.58);
  vec3 transmittedGlass = mix(vec3(0.2, 0.25, 0.34), solidBody, 0.74)
    + inheritedSurface * 0.12
    + inheritedLuminance * vec3(0.055, 0.07, 0.1)
    + glassHighlight * vec3(0.12, 0.16, 0.24);
  float glassCoverage = mix(0.14, 0.22, glassHighlight);
  vec4 color = vec4(transmittedGlass * glassCoverage, 1.0);`;
const worktreeGlassGlow = `
  color.rgb += (1.0 - pdy) * vec3(0.025, 0.035, 0.055);
  color.a = 1.0;`;

const fresnelReflectionShader = `
precision highp float;

uniform sampler2D u_paletteTexture;

varying vec2 v_uv;
varying vec3 v_viewDirection;
varying vec3 v_viewNormal;
varying vec3 v_viewPosition;

float ribLayer(float coordinate, float frequency, float sharpness) {
  float phase = coordinate * frequency * 6.28318530718;
  float footprint = fwidth(phase);
  float samplingFade = 1.0 - smoothstep(0.72, 1.9, footprint);
  float ridge = pow(0.5 + 0.5 * cos(phase), sharpness);
  return ridge * samplingFade;
}

float wrappedLobe(float phase, float center, float concentration) {
  float distanceToCenter = abs(phase - center);
  distanceToCenter = min(distanceToCenter, 1.0 - distanceToCenter);
  return exp(-distanceToCenter * distanceToCenter * concentration);
}

vec3 spectralRamp(float value) {
  float t = clamp(value, 0.0, 1.0);
  vec3 red = vec3(1.0, 0.05, 0.015);
  vec3 orange = vec3(1.0, 0.34, 0.015);
  vec3 yellow = vec3(1.0, 0.88, 0.035);
  vec3 green = vec3(0.05, 0.94, 0.25);
  vec3 cyan = vec3(0.015, 0.82, 1.0);
  vec3 blue = vec3(0.08, 0.26, 1.0);
  vec3 violet = vec3(0.54, 0.035, 1.0);

  if (t < 0.14) return mix(red, orange, t / 0.14);
  if (t < 0.29) return mix(orange, yellow, (t - 0.14) / 0.15);
  if (t < 0.45) return mix(yellow, green, (t - 0.29) / 0.16);
  if (t < 0.61) return mix(green, cyan, (t - 0.45) / 0.16);
  if (t < 0.79) return mix(cyan, blue, (t - 0.61) / 0.18);
  return mix(blue, violet, (t - 0.79) / 0.21);
}

void main(void) {
  vec3 derivativeNormal = normalize(cross(dFdx(v_viewPosition), dFdy(v_viewPosition)));
  vec3 normalDirection = normalize(mix(v_viewNormal, derivativeNormal, 0.35));
  vec3 viewDirection = normalize(-v_viewPosition);
  float viewFacing = abs(dot(normalDirection, viewDirection));
  float incidence = 1.0 - viewFacing;
  float fresnel = pow(incidence, 5.0);
  float surfaceBend = 1.0 - abs(dot(normalize(v_viewNormal), derivativeNormal));
  float causticFocus = smoothstep(0.025, 0.28, surfaceBend)
    * smoothstep(0.24, 0.76, incidence);

  // Closely spaced longitudinal ridges create anisotropic highlights. They only
  // modulate the angle-derived reflection, so the spectrum stays optically ordered.
  float ribCoordinate = v_uv.x
    + sin(v_uv.y * 7.0) * 0.0032
    + sin(v_uv.y * 31.0) * 0.00075;
  float broadRibs = ribLayer(ribCoordinate, 128.0, 4.5);
  float fineRibs = ribLayer(ribCoordinate + v_uv.y * 0.0008, 470.0, 7.5);
  float hairlineRibs = ribLayer(ribCoordinate - v_uv.y * 0.00035, 920.0, 11.0);
  float ribStructure = clamp(
    broadRibs * 0.34 + fineRibs * 0.52 + hairlineRibs * 0.28,
    0.0,
    1.0
  );

  // Each broad rib behaves like a tiny curved lens. The small RGB offsets keep
  // chromatic fringes ordered while the neutral sheen carries most of the form.
  float ribPhase = fract(ribCoordinate * 128.0);
  vec3 ribDispersion = vec3(
    wrappedLobe(ribPhase, 0.42, 190.0),
    wrappedLobe(ribPhase, 0.5, 190.0),
    wrappedLobe(ribPhase, 0.58, 190.0)
  );
  float ribDispersionEnergy = max(ribDispersion.r, max(ribDispersion.g, ribDispersion.b));

  // Three overlapping wavelength lobes form one compact refracted band. Their
  // overlap naturally produces yellow and cyan between the red, green, and blue.
  vec3 refractedLight = vec3(
    exp(-pow((incidence - 0.48) / 0.105, 2.0)),
    exp(-pow((incidence - 0.58) / 0.105, 2.0)),
    exp(-pow((incidence - 0.68) / 0.105, 2.0))
  );
  float refractionEnergy = max(refractedLight.r, max(refractedLight.g, refractedLight.b));
  float refractionStrength = 0.075 + causticFocus * 0.11;

  float environmentSheen = 0.012 + pow(incidence, 1.35) * 0.026;
  float whiteEdge = fresnel * 0.18;
  float whiteSpecular = exp(-pow((incidence - 0.77) / 0.105, 2.0)) * 0.13;
  float ribSheen = ribStructure * (0.018 + fresnel * 0.055);
  float ribPrism = ribDispersionEnergy * pow(incidence, 1.6) * 0.024;

  vec3 frontEdgePalette = texture2D(u_paletteTexture, v_uv).rgb;
  vec3 frontEdgeColor = vec3(
    0.065 + frontEdgePalette.r * 0.44,
    0.025 + frontEdgePalette.b * 0.045,
    0.145 + frontEdgePalette.b * 0.5
  );
  float lipAcross = clamp((v_uv.x - 0.54) / 0.46, 0.0, 1.0);
  float frontLipMask = smoothstep(0.0, 0.16, lipAcross);

  // Build a stable tangent from the UV derivatives, then rotate the reflection
  // normal through a rounded arc across the lip's actual spatial coordinate.
  vec3 positionDx = dFdx(v_viewPosition);
  vec3 positionDy = dFdy(v_viewPosition);
  vec2 uvDx = dFdx(v_uv);
  vec2 uvDy = dFdy(v_uv);
  float uvDeterminant = uvDx.x * uvDy.y - uvDx.y * uvDy.x;
  float safeUvDeterminant = abs(uvDeterminant) < 0.00001
    ? (uvDeterminant < 0.0 ? -0.00001 : 0.00001)
    : uvDeterminant;
  vec3 lipLongitudinalTangent = normalize(
    (-positionDx * uvDy.x + positionDy * uvDx.x) / safeUvDeterminant
  );
  vec3 frontNormal = dot(normalDirection, viewDirection) < 0.0
    ? -normalDirection
    : normalDirection;
  vec3 lipSideNormal = normalize(cross(lipLongitudinalTangent, frontNormal));
  if (dot(lipSideNormal, viewDirection) < 0.0) lipSideNormal *= -1.0;
  float roundedEdgeArc = smoothstep(0.0, 1.0, lipAcross) * 1.35;
  vec3 beveledEdgeNormal = normalize(
    frontNormal * cos(roundedEdgeArc)
      + lipSideNormal * sin(roundedEdgeArc)
  );
  float beveledEdgeIncidence = 1.0 - abs(dot(beveledEdgeNormal, viewDirection));
  float roundedFresnel = pow(beveledEdgeIncidence, 3.0);
  float bevelGlint = frontLipMask * (
    0.025
      + roundedFresnel * 0.13
      + exp(-pow((beveledEdgeIncidence - 0.56) / 0.2, 2.0)) * 0.045
  );
  vec3 bevelSpectrum = spectralRamp(
    clamp(beveledEdgeIncidence * 0.92 + 0.04, 0.0, 1.0)
  );
  vec3 bevelColor = mix(frontEdgeColor, bevelSpectrum, 0.14);
  float frontEdgeTransmission = frontLipMask * (0.055 + roundedFresnel * 0.055);
  float bevelTransmission = bevelGlint;

  vec3 neutralGlass = vec3(0.58, 0.7, 0.92);
  vec3 accumulatedLight = neutralGlass * (environmentSheen + whiteEdge + whiteSpecular + ribSheen)
    + refractedLight * refractionStrength
    + ribDispersion * ribPrism
    + frontEdgeColor * frontEdgeTransmission
    + bevelColor * bevelTransmission;
  accumulatedLight = accumulatedLight / (vec3(1.0) + accumulatedLight * 1.35);
  float reflectionAlpha = environmentSheen
    + whiteEdge
    + whiteSpecular
    + ribSheen
    + refractionEnergy * refractionStrength
    + ribPrism
    + frontEdgeTransmission
    + bevelTransmission;
  reflectionAlpha = min(reflectionAlpha, 0.36);
  vec3 reflectionColor = accumulatedLight / max(reflectionAlpha, 0.001);

  gl_FragColor = vec4(reflectionColor, reflectionAlpha);
}`;

type ShaderMaterialParameters = Record<string, unknown> & { fragmentShader?: string };
type ShaderMaterialConstructor = new (parameters?: ShaderMaterialParameters) => object;
type RendererFactory = (
  options: Record<string, unknown> & { canvas?: HTMLCanvasElement },
  requiredExtensions?: string[],
) => unknown;

const worktreeBokehKernel = `
vec4 worktreeBokehBlur(sampler2D tex, vec2 uv, vec2 texel, float radius) {
  vec4 total = texture2D(tex, uv) * 1.4;
  float totalWeight = 1.4;

  for (int ring = 1; ring <= 3; ring++) {
    float ringProgress = float(ring) / 3.0;
    float ringRadius = radius * ringProgress;
    float ringWeight = 1.0 - ringProgress * 0.28;

    for (int tap = 0; tap < 8; tap++) {
      float angle = (float(tap) + float(ring) * 0.37) * 0.78539816339;
      vec2 offset = vec2(cos(angle), sin(angle)) * ringRadius * texel;
      total += texture2D(tex, uv + offset) * ringWeight;
      totalWeight += ringWeight;
    }
  }

  return total / totalWeight;
}
`;

function customizePostProcessingShader(shader: string) {
  const mainAnchor = "void main() {";
  const blurAnchor = "vec4 diffuseBlurred = noiseBlur(u_scene, st, texel, blurRadius);";
  const blurMixAnchor = "finalColor = mix(finalColor, diffuseBlurred, min(u_diffuseBlur * 2.0, 1.0));";

  if (!shader.includes(mainAnchor) || !shader.includes(blurAnchor) || !shader.includes(blurMixAnchor)) {
    console.warn("Worktree wave bokeh customization could not find the expected shader anchors.");
    return shader;
  }

  return shader
    .replace(mainAnchor, `${worktreeBokehKernel}\n${mainAnchor}`)
    .replace(
      blurAnchor,
      `float foregroundBokeh = smoothstep(0.66, 0.96, v_uv.x);
    vec4 diffuseBlurred = finalColor;
    if (foregroundBokeh > 0.001) {
      diffuseBlurred = worktreeBokehBlur(u_scene, st, texel, blurRadius);
    }`,
    )
    .replace(
      blurMixAnchor,
      `float bokehStrength = foregroundBokeh * min(u_diffuseBlur * 2.35, 0.78);
    finalColor = mix(finalColor, diffuseBlurred, bokehStrength);`,
    );
}

function useGlassMaterials(exports: unknown) {
  if (!exports || typeof exports !== "object") return exports;

  const three = exports as Record<PropertyKey, unknown>;
  const ShaderMaterial = three.jyz as ShaderMaterialConstructor;

  class WorktreeShaderMaterial extends ShaderMaterial {
    constructor(parameters: ShaderMaterialParameters = {}) {
      const fragmentShader = parameters.fragmentShader ?? "";

      if (fragmentShader.includes("glassAlpha")) {
        super({
          ...parameters,
          transparent: true,
          blending: three.Xaj,
          blendEquation: three.bGH,
          blendSrc: three.k74,
          blendDst: three.LgZ,
          blendEquationAlpha: three.bGH,
          blendSrcAlpha: three.ghN,
          blendDstAlpha: three.LgZ,
        });
        return;
      }

      if (fragmentShader.includes("u_diffuseBlur")) {
        super({
          ...parameters,
          fragmentShader: customizePostProcessingShader(fragmentShader),
          transparent: true,
        });
        return;
      }

      super(parameters);
    }
  }

  return new Proxy(three, {
    get(target, property, receiver) {
      if (property === "jyz") return WorktreeShaderMaterial;
      return Reflect.get(target, property, receiver);
    },
  });
}

function useCaptureSafeRenderer(exports: unknown) {
  if (!exports || typeof exports !== "object") return exports;

  const rendererUtilities = exports as Record<PropertyKey, unknown>;

  return new Proxy(rendererUtilities, {
    get(target, property, receiver) {
      const value = Reflect.get(target, property, receiver);
      if (property !== "Us" || typeof value !== "function") return value;

      const createRenderer = value as RendererFactory;
      return (options: Parameters<RendererFactory>[0], requiredExtensions?: string[]) => {
        const preserveDrawingBuffer = options.canvas?.dataset.ribbonCaptureCanvas === "true";
        return createRenderer(
          preserveDrawingBuffer ? { ...options, preserveDrawingBuffer: true } : options,
          requiredExtensions,
        );
      };
    },
  });
}

function customizeSurfaceShader(shader: string) {
  if (!shader.includes(stripeOpaqueSurface)) {
    console.warn("Worktree wave surface customization could not find the expected shader output.");
    return shader;
  }

  return shader
    .replace(stripeOpaqueSurface, worktreeGlassSurface.trim())
    .replace(stripeGlowOutput, worktreeGlassGlow.trim());
}

function customizeReflectionVertexShader(shader: string) {
  if (!shader.includes(stripeVertexVaryings) || !shader.includes(stripeVertexOutput)) {
    console.warn("Worktree wave reflection could not find the expected vertex shader anchors.");
    return shader;
  }

  return shader
    .replace(
      stripeVertexVaryings,
      `${stripeVertexVaryings}\nvarying vec3 v_viewDirection;\nvarying vec3 v_viewNormal;\nvarying vec3 v_viewPosition;`,
    )
    .replace(
      stripeVertexOutput,
      `vec3 deformedNormal = normal;\n  deformedNormal = (vec4(deformedNormal, 0.0) * rotationA).xyz;\n  deformedNormal = (vec4(deformedNormal, 0.0) * rotationB).xyz;\n  deformedNormal = (vec4(deformedNormal, 0.0) * rotationC).xyz;\n  vec3 viewPosition = (modelViewMatrix * vec4(v_position, 1.0)).xyz;\n  v_viewNormal = normalize(normalMatrix * deformedNormal);\n  v_viewDirection = normalize(-viewPosition);\n  v_viewPosition = viewPosition;\n  ${stripeVertexOutput}`,
    );
}

function addFresnelReflection(wave: WaveInstance) {
  const waveMesh = wave.waveMesh;
  const scene = wave.scene;

  if (!waveMesh || !scene) return () => {};

  const reflectionMaterial = waveMesh.material.clone();
  reflectionMaterial.vertexShader = customizeReflectionVertexShader(reflectionMaterial.vertexShader);
  reflectionMaterial.fragmentShader = fresnelReflectionShader;
  reflectionMaterial.uniforms = waveMesh.material.uniforms;
  reflectionMaterial.transparent = true;
  reflectionMaterial.blending = 2;
  reflectionMaterial.depthWrite = false;
  reflectionMaterial.depthTest = true;
  reflectionMaterial.polygonOffset = true;
  reflectionMaterial.polygonOffsetFactor = -1;
  reflectionMaterial.polygonOffsetUnits = -1;
  reflectionMaterial.needsUpdate = true;

  const reflectionMesh = waveMesh.mesh.clone();
  reflectionMesh.material = reflectionMaterial;
  reflectionMesh.renderOrder = 2;
  scene.add(reflectionMesh);

  return () => {
    scene.remove(reflectionMesh);
    reflectionMaterial.dispose();
  };
}

function prepareGlassBase(wave: WaveInstance) {
  const postProcessingUniforms = wave.postProcessingMaterial?.uniforms;
  const angularBlur = postProcessingUniforms?.u_blurAmount;
  const diffuseBlur = postProcessingUniforms?.u_diffuseBlur;

  if (angularBlur) angularBlur.value = 0.02;
  if (diffuseBlur) diffuseBlur.value = 0.32;
}

function loadScript(source: string) {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.async = false;
    script.dataset.stripeWaveChunk = source;
    script.src = source;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Unable to load wave chunk: ${source}`));
    document.head.appendChild(script);
  });
}

async function getWaveRuntime() {
  if (window.__worktreeStripeWaveRequire) return window.__worktreeStripeWaveRequire;

  const factories: Record<number, ModuleFactory> = {};
  const cache: Record<number, ModuleRecord> = {};

  window.webpackChunkStripeWave = {
    push(payload) {
      Object.assign(factories, payload[1] ?? {});
    },
  };

  for (const source of chunkSources) {
    await loadScript(source);
  }

  const requireModule = ((id: number) => {
    if (cache[id]) return cache[id].exports;

    const factory = factories[id];
    if (!factory) throw new Error(`Missing bundled wave module ${id}`);

    const moduleRecord: ModuleRecord = { exports: {} };
    cache[id] = moduleRecord;
    factory(moduleRecord, moduleRecord.exports as Record<string, unknown>, requireModule);

    if (id === 95145) {
      moduleRecord.exports = useGlassMaterials(moduleRecord.exports);
    }

    if (id === 39798 && typeof moduleRecord.exports === "string") {
      moduleRecord.exports = customizeSurfaceShader(moduleRecord.exports);
    }

    if (id === 90126) {
      moduleRecord.exports = useCaptureSafeRenderer(moduleRecord.exports);
    }

    return moduleRecord.exports;
  }) as WebpackRequire;

  requireModule.d = (exports, definitions) => {
    for (const [key, definition] of Object.entries(definitions)) {
      if (!Object.prototype.hasOwnProperty.call(exports, key)) {
        Object.defineProperty(exports, key, { enumerable: true, get: definition });
      }
    }
  };
  requireModule.n = (module) => {
    const getter = module && typeof module === "object" && "__esModule" in module && "default" in module
      ? () => module.default
      : () => module;
    requireModule.d(getter, { a: getter });
    return getter;
  };
  requireModule.r = (exports) => {
    if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
    }
    Object.defineProperty(exports, "__esModule", { value: true });
  };
  requireModule.o = (object, property) => Object.prototype.hasOwnProperty.call(object, property);
  requireModule.g = globalThis;
  window.__worktreeStripeWaveRequire = requireModule;

  return requireModule;
}

type StripeWaveHeroProps = {
  captureSeed?: number;
  freezeOnReady?: boolean;
  initialZoom?: number;
  mode?: "capture" | "hero" | "hero-fallback-landscape" | "hero-fallback-portrait";
  shape?: StripeWaveShape;
};

export function StripeWaveHero({
  captureSeed = 0,
  freezeOnReady = false,
  initialZoom = 1,
  mode = "hero",
  shape = "header",
}: StripeWaveHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentsRef = useRef<HTMLDivElement>(null);
  const layoutRef = useRef<HTMLDivElement>(null);
  const baseGeometryRef = useRef<WaveGeometry | undefined>(undefined);
  const baseTransformRef = useRef<WaveTransform | undefined>(undefined);
  const disposeReflectionRef = useRef<(() => void) | undefined>(undefined);
  const baseDeformationRef = useRef<WaveDeformationState | undefined>(undefined);
  const shapeRef = useRef<StripeWaveShape>(shape);
  const seedRef = useRef(captureSeed);
  const threeRef = useRef<WaveThreeRuntime | undefined>(undefined);
  const waveRef = useRef<WaveInstance | undefined>(undefined);
  const captureValue = (salt: number) => {
    const value = Math.sin(captureSeed * 83.173 + salt * 41.719) * 43758.5453;
    return Number((value - Math.floor(value)).toFixed(6));
  };
  const isCaptureMode = mode !== "hero";
  const captureStyle = mode === "capture"
    ? ({
        "--wave-capture-flip": captureValue(4) > 0.5 ? "-1" : "1",
        "--wave-capture-rotate": `${-3.5 + captureValue(3) * 7}deg`,
        "--wave-capture-scale": `${0.94 + captureValue(2) * 0.25}`,
        "--wave-capture-shift": `${-25 + captureValue(1) * 31.25}%`,
        "--wave-capture-y": `${-15.83 + captureValue(5) * 19.17}%`,
      } as CSSProperties)
    : undefined;

  useEffect(() => {
    shapeRef.current = shape;
    seedRef.current = captureSeed;
  }, [captureSeed, shape]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const contents = contentsRef.current;
    const layout = layoutRef.current;

    if (!canvas || !contents || !layout) return;

    if (isCaptureMode) {
      delete document.documentElement.dataset.ribbonRenderReady;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let baseCameraZoom = 1;
    let wave: WaveInstance | undefined;

    function applyZoom(zoom: number) {
      if (!wave?.camera) return;
      wave.camera.zoom = baseCameraZoom * zoom;
      wave.camera.updateProjectionMatrix();
    }

    function handleZoom(event: Event) {
      applyZoom((event as CustomEvent<number>).detail);
    }

    window.addEventListener(ribbonZoomEvent, handleZoom);

    void getWaveRuntime().then((requireModule) => {
      if (disposed) return;

      const Wave = (requireModule(4014) as { $: WaveConstructor }).$;
      const three = requireModule(95145) as WaveThreeRuntime;
      const configs = requireModule(89224) as { P1: unknown; gj: unknown; y7: unknown };
      const textures = (requireModule(22137) as { W7: Array<{ path: string }> }).W7;
      textures[0].path = "/vendor/wave-prototype/palette.webp";

      wave = new Wave(canvas, {
        wideConfig: configs.gj,
        mediumConfig: configs.gj,
        smallConfig: configs.gj,
        textures,
        onError(error, tags) {
          console.error(error, tags);
        },
      });
      waveRef.current = wave;
      threeRef.current = three;

      wave.onLoadReady(() => {
        if (disposed || !wave) return;
        const waveGeometry = wave.waveMesh?.mesh.geometry;
        const waveMesh = wave.waveMesh?.mesh;
        const waveMaterial = wave.waveMesh?.material;
        if (waveGeometry && waveMesh && waveMaterial) {
          baseGeometryRef.current = waveGeometry;
          baseTransformRef.current = captureWaveTransform(waveMesh);
          baseDeformationRef.current = captureWaveDeformation(waveMaterial);
          replaceWaveGeometry(
            wave,
            three,
            waveGeometry,
            baseTransformRef.current,
            shapeRef.current,
            seedRef.current,
          );
          applyWaveDeformation(wave, shapeRef.current, baseDeformationRef.current);
        }
        prepareGlassBase(wave);
        disposeReflectionRef.current = addFresnelReflection(wave);
        baseCameraZoom = wave.camera?.zoom ?? 1;
        applyZoom(initialZoom);
        const revealFrame = () => {
          if (disposed || !wave) return;
          layout.classList.add(styles.drawn);
          if (isCaptureMode) {
            document.documentElement.dataset.ribbonRenderReady = "true";
          }
        };

        // Let WebGL complete and present a real frame before fading away the
        // static image. Two frames avoid exposing an initialized-but-empty canvas.
        requestAnimationFrame(() => requestAnimationFrame(revealFrame));
      });

      // A paused Wave renders one deterministic time-zero frame as soon as its
      // scene is ready. Set the state before initialization so fallback captures
      // never advance by a load-time-dependent number of animation frames.
      wave.paused = freezeOnReady || reducedMotion.matches;
      wave.initScene();
    }).catch((error: unknown) => {
      console.error(error);
    });

    function handleReducedMotion(event: MediaQueryListEvent) {
      if (wave && !freezeOnReady) wave.paused = event.matches;
    }

    reducedMotion.addEventListener("change", handleReducedMotion);

    return () => {
      disposed = true;
      layout.classList.remove(styles.drawn);
      window.removeEventListener(ribbonZoomEvent, handleZoom);
      reducedMotion.removeEventListener("change", handleReducedMotion);
      disposeReflectionRef.current?.();
      disposeReflectionRef.current = undefined;
      wave?.dispose();
      waveRef.current = undefined;
      threeRef.current = undefined;
      baseGeometryRef.current = undefined;
      baseTransformRef.current = undefined;
      baseDeformationRef.current = undefined;
      if (isCaptureMode) {
        delete document.documentElement.dataset.ribbonRenderReady;
      }
    };
  }, [freezeOnReady, initialZoom, isCaptureMode, mode]);

  useEffect(() => {
    const wave = waveRef.current;
    const three = threeRef.current;
    const baseGeometry = baseGeometryRef.current;
    const baseTransform = baseTransformRef.current;
    const baseDeformation = baseDeformationRef.current;
    if (!wave || !three || !baseGeometry || !baseTransform || !baseDeformation) return;

    const currentGeometry = wave.waveMesh?.mesh.geometry;
    if (shape === "header" && currentGeometry === baseGeometry) return;

    delete document.documentElement.dataset.ribbonRenderReady;
    disposeReflectionRef.current?.();
    replaceWaveGeometry(wave, three, baseGeometry, baseTransform, shape, captureSeed);
    applyWaveDeformation(wave, shape, baseDeformation);
    disposeReflectionRef.current = addFresnelReflection(wave);

    requestAnimationFrame(() => {
      if (isCaptureMode) {
        document.documentElement.dataset.ribbonRenderReady = "true";
      }
    });
  }, [captureSeed, isCaptureMode, mode, shape]);

  return (
    <div
      aria-hidden="true"
      className={`${styles.root} ${isCaptureMode ? styles.captureRoot : ""} ${mode === "hero-fallback-landscape" ? styles.fallbackLandscapeRoot : ""} ${mode === "hero-fallback-portrait" ? styles.fallbackPortraitRoot : ""}`}
      data-wave-surface="glass-v1"
      style={captureStyle}
    >
      <div className={styles.layout} ref={layoutRef}>
        <picture className={styles.fallbackFrame}>
          <source media="(max-width: 639px)" srcSet="/vendor/wave-prototype/wave-fallback-mobile.webp" />
          <source media="(max-width: 1263px)" srcSet="/vendor/wave-prototype/wave-fallback-tablet.webp" />
          <img
            alt=""
            className={styles.fallback}
            fetchPriority="high"
            loading="eager"
            src="/vendor/wave-prototype/wave-fallback-desktop.webp"
          />
        </picture>
        <div className={styles.contents} ref={contentsRef}>
          <canvas
            className={styles.canvas}
            data-ribbon-capture-canvas={isCaptureMode ? "true" : undefined}
            ref={canvasRef}
          />
        </div>
      </div>
    </div>
  );
}
