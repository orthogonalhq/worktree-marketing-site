export type WaveGeometry = {
  computeBoundingSphere: () => void;
  computeVertexNormals: () => void;
  dispose: () => void;
  setAttribute: (name: string, attribute: unknown) => WaveGeometry;
  setIndex: (index: number[]) => WaveGeometry;
};

export type WaveThreeRuntime = {
  a$l: new (array: Float32Array, itemSize: number) => unknown;
  u9r: new () => WaveGeometry;
};

export type StripeWaveShape = "canopy" | "halo" | "header" | "orbit" | "pleat" | "twist";

type CustomStripeWaveShape = Exclude<StripeWaveShape, "header">;
type Point3 = { x: number; y: number; z: number };

export type StripeWaveGeometryTransform = {
  position: Point3;
  rotation: Point3;
  scale: Point3;
};

type GeometryBuffers = {
  indices: number[];
  positions: number[];
  uvs: number[];
};

const geometryScale = 48;

function seededValue(seed: number, salt: number) {
  const value = Math.sin(seed * 91.173 + salt * 43.719) * 43758.5453;
  return value - Math.floor(value);
}

function finalizeGeometry(three: WaveThreeRuntime, buffers: GeometryBuffers) {
  const geometry = new three.u9r();
  geometry.setAttribute("position", new three.a$l(new Float32Array(buffers.positions), 3));
  geometry.setAttribute("uv", new three.a$l(new Float32Array(buffers.uvs), 2));
  geometry.setIndex(buffers.indices);
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}

function createSheetGeometry(three: WaveThreeRuntime, shape: Exclude<CustomStripeWaveShape, "orbit">, seed: number) {
  const columns = 128;
  const rows = 256;
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const phase = seededValue(seed, 1) * Math.PI * 2;
  const shapeBias = seededValue(seed, 2) - 0.5;

  for (let row = 0; row <= rows; row += 1) {
    const v01 = row / rows;
    const v = v01 * 2 - 1;

    for (let column = 0; column <= columns; column += 1) {
      const u = column / columns;
      const t = u * 2 - 1;
      let x = 0;
      let y = 0;
      let z = 0;

      if (shape === "twist") {
        const ribbonAngle = t * Math.PI * (1.12 + shapeBias * 0.18) + phase * 0.16;
        const width = (2.05 + 0.28 * Math.cos(t * Math.PI)) * (0.9 + seededValue(seed, 3) * 0.18);
        const centerX = Math.sin(t * 2.2 + phase * 0.12) * 1.15 + t * 0.25;
        x = centerX + v * width * Math.cos(ribbonAngle);
        y = t * 5.75 + Math.sin(t * 2.8 + phase) * 0.36 + v * 0.18 * Math.sin(ribbonAngle);
        z = v * width * Math.sin(ribbonAngle) + Math.cos(t * 2.1 - phase * 0.15) * 0.52;
      } else if (shape === "canopy") {
        const width = (2.55 + u * 0.92) * (0.92 + seededValue(seed, 4) * 0.15);
        const centerX = t * 4.65;
        const centerY = Math.sin(t * 1.78 + phase * 0.18) * 1.55 - t * 0.72;
        const fanAngle = -0.46 + t * 0.56 + Math.sin(t * 2.35 + phase * 0.2) * 0.18;
        x = centerX + v * width * Math.sin(fanAngle) * 0.72;
        y = centerY + v * width * Math.cos(fanAngle);
        z = Math.sin(t * 2.18 + v * 1.42 + phase * 0.23) * 1.18
          + Math.cos(v * 3.1 - t * 0.82) * 0.58
          + Math.exp(-Math.pow(t * 1.45, 2)) * 1.25;
      } else if (shape === "halo") {
        const arc = -Math.PI * 0.72 + u * Math.PI * 1.48;
        const ribbonWidth = 1.08 + Math.sin(u * Math.PI) * 0.34;
        const radiusX = 3.28 + shapeBias * 0.24;
        const radiusY = 4.05 + shapeBias * 0.22;
        const radialOffset = v * ribbonWidth;
        x = 0.76 + Math.cos(arc) * (radiusX + radialOffset * 0.56);
        y = 0.08 + Math.sin(arc) * (radiusY + radialOffset * 0.52);
        z = v * ribbonWidth * (0.88 + Math.sin(arc * 1.4 + phase * 0.16) * 0.34)
          + Math.cos(arc * 2.15 - phase * 0.2) * 0.46
          + Math.sin(v * Math.PI) * 0.24;
      } else {
        const ribbonWidth = 2.25 + Math.sin(u * Math.PI) * 0.38;
        const foldPhase = t * Math.PI * 2.7 + phase * 0.11;
        const foldEnvelope = 0.72 + Math.cos(t * Math.PI * 0.7) * 0.22;
        x = t * 4.75 + v * 0.26 * Math.sin(foldPhase);
        y = -t * 1.34 + v * ribbonWidth + Math.sin(t * Math.PI * 1.15 + phase * 0.08) * 0.34;
        z = Math.sin(foldPhase) * 1.08 * foldEnvelope
          + v * Math.cos(foldPhase) * 0.72
          + Math.sin(v * Math.PI * 1.6 + t * 1.2) * 0.16;
      }

      positions.push(x * geometryScale, y * geometryScale, z * geometryScale);
      uvs.push(u, v01);
    }
  }

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const current = row * (columns + 1) + column;
      const next = current + columns + 1;
      indices.push(current, next, current + 1, next, next + 1, current + 1);
    }
  }

  return finalizeGeometry(three, { indices, positions, uvs });
}

function appendSphere(
  buffers: GeometryBuffers,
  center: Point3,
  radius: number,
  longitudeSegments: number,
  latitudeSegments: number,
) {
  const baseVertex = buffers.positions.length / 3;

  for (let latitude = 0; latitude <= latitudeSegments; latitude += 1) {
    const v = latitude / latitudeSegments;
    const theta = v * Math.PI;
    const sinTheta = Math.sin(theta);
    const cosTheta = Math.cos(theta);

    for (let longitude = 0; longitude <= longitudeSegments; longitude += 1) {
      const u = longitude / longitudeSegments;
      const phi = u * Math.PI * 2;
      const sinPhi = Math.sin(phi);
      const cosPhi = Math.cos(phi);
      const x = center.x + radius * sinTheta * cosPhi;
      const y = center.y + radius * sinTheta * sinPhi;
      const z = center.z + radius * cosTheta;
      buffers.positions.push(x * geometryScale, y * geometryScale, z * geometryScale);
      buffers.uvs.push(u, 1 - v);
    }
  }

  const rowWidth = longitudeSegments + 1;
  for (let latitude = 0; latitude < latitudeSegments; latitude += 1) {
    for (let longitude = 0; longitude < longitudeSegments; longitude += 1) {
      const current = baseVertex + latitude * rowWidth + longitude;
      const next = current + rowWidth;
      buffers.indices.push(current, next, current + 1, next, next + 1, current + 1);
    }
  }
}

function createOrbitalGeometry(three: WaveThreeRuntime) {
  const buffers: GeometryBuffers = { indices: [], positions: [], uvs: [] };
  const satelliteCount = 8;
  const orbitRadius = 4.15;

  appendSphere(buffers, { x: 0, y: 0, z: 0 }, 1.72, 72, 48);

  for (let index = 0; index < satelliteCount; index += 1) {
    const angle = -Math.PI / 2 + (index / satelliteCount) * Math.PI * 2;
    appendSphere(
      buffers,
      {
        x: Math.cos(angle) * orbitRadius,
        y: Math.sin(angle) * orbitRadius,
        z: 0,
      },
      0.58,
      40,
      28,
    );
  }

  return finalizeGeometry(three, buffers);
}

export function createStripeWaveGeometry(three: WaveThreeRuntime, shape: CustomStripeWaveShape, seed: number) {
  return shape === "orbit"
    ? createOrbitalGeometry(three)
    : createSheetGeometry(three, shape, seed);
}

export function getStripeWaveGeometryTransform(shape: CustomStripeWaveShape): StripeWaveGeometryTransform {
  if (shape === "orbit") {
    return {
      position: { x: 80, y: -18, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 },
    };
  }

  const rotationZ = shape === "twist"
    ? -0.14
    : shape === "canopy"
      ? -0.34
      : shape === "pleat"
        ? -0.2
        : 0;

  return {
    position: { x: 80, y: -18, z: 0 },
    rotation: { x: 0.08, y: -0.1, z: rotationZ },
    scale: { x: 1, y: 1, z: 1 },
  };
}
