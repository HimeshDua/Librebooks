'use client';

import {useRef} from 'react';
import {useGLTF} from '@react-three/drei';
import {useFrame} from '@react-three/fiber';
import * as THREE from 'three';

const book = '/model/paladins_book.glb';

export default function Model(props: any) {
  const {scene} = useGLTF(book);
  const group = useRef<THREE.Group>(null);

  // const DURATION = 1.8;
  const DURATION = 2.8; // cinematic

  useFrame(({clock}) => {
    if (!group.current) return;

    const t = clock.getElapsedTime();
    const progress = THREE.MathUtils.clamp(t / DURATION, 0, 1);

    // true cinematic easing (slow → fast → slow)
    const eased =
      progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    // position (right → left)
    group.current.position.x = THREE.MathUtils.lerp(1.2, -0.05, eased);
    group.current.position.y = 0.25;
    group.current.position.z = 0;

    // zoom-in
    const scale = THREE.MathUtils.lerp(3.8, 6, eased);
    group.current.scale.setScalar(scale);

    // rotation settle
    group.current.rotation.set(5.3, THREE.MathUtils.lerp(0.4, 0, eased), Math.PI);
  });

  return (
    <group ref={group} {...props}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(book);
