'use client';

import {Canvas} from '@react-three/fiber';
import {Suspense} from 'react';
import {OrbitControls, Environment} from '@react-three/drei';
import Model from './model';

export default function ThreeCanvas() {
  return (
    <Canvas camera={{position: [0, 1.5, 1], fov: 78}} className="w-full h-full">
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 5, 5]} intensity={0.4} />

      <Suspense fallback={null}>
        <Model />
        <Environment preset="sunset" />
      </Suspense>

      <OrbitControls
        // enableZoom={false}
        // enablePan={false}
        // enableRotate={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
}
