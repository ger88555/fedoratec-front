import React, { Suspense, useLayoutEffect, useRef, useState } from 'react';
import { Canvas, ThreeEvent } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

// 3D logo layers and transparency masks.
import back from '../../assets/images/parallax/back.png';
import cactus from '../../assets/images/parallax/cactus.png';
import front from '../../assets/images/parallax/front.png';
import backMask from '../../assets/images/parallax/backMask.png';
import cactusMask from '../../assets/images/parallax/cactusMask.png';
import frontMask from '../../assets/images/parallax/frontMask.png';


const Scene : React.FC = () => {
    return (
        <div id="canvas-container">
            <Canvas >
                <Suspense fallback={null}>
                    <Logo />
                </Suspense>
            </Canvas>
        </div>
    );
};


const Logo : React.FC = () => {
    const [focused, setFocused] = useState<boolean>(false);
    const resetOffsetRef = useRef<number | undefined>();

    const cactusRef = useRef<THREE.Mesh>();

    const [
        backTexture, cactusTexture, frontTexture,
        backMaskTexture, cactusMaskTexture, frontMaskTexture
    ] = useLoader(THREE.TextureLoader, [back, cactus, front, backMask, cactusMask, frontMask]);

    /**
     * Shift the cactus opposite to the pointer position.
     * 
     * @param e Event instance.
     */
    const pointerMoveHandler = (e : ThreeEvent<PointerEvent>) => {
        if (cactusRef.current) {
            cactusRef.current.position.x = -e.point.x / 16;
        }
    };

    useLayoutEffect(() => {
        if (!focused && cactusRef.current?.position?.x !== 0) {
            resetOffsetRef.current = window.setInterval(resetOffsetCallback, 25);

            return () => { clearInterval(resetOffsetRef.current); };
        }
    }, [focused]);

    /**
     * Gently shift the cactus back to the center.
     */
    const resetOffsetCallback = () => {
        const offset = cactusRef.current?.position?.x;
        
        if (offset === 0 || focused || offset === undefined || cactusRef.current === undefined) {
            return clearInterval(resetOffsetRef.current);
        }

        if (offset < 0) {
            cactusRef.current.position.x = Math.min(offset + 0.1, 0);
        } else {
            cactusRef.current.position.x = Math.max(offset - 0.1, 0);
        }
    };

    return (
        <group 
            onPointerEnter={() => setFocused(true)}
            onPointerMove={pointerMoveHandler}
            onPointerLeave={() => setFocused(false)}
        >
            <Layer texture={backTexture} mask={backMaskTexture} />
            <Layer texture={cactusTexture} mask={cactusMaskTexture} forwardRef={cactusRef} />
            <Layer texture={frontTexture} mask={frontMaskTexture} />
        </group>
    );
};


declare type LayerProps = {
    texture : THREE.Texture;
    mask?: THREE.Texture;
    forwardRef? : React.Ref<React.ReactNode>
}

const Layer : React.FC<LayerProps> = ({ texture, mask = null, forwardRef = undefined }) => {
    return (
        <mesh ref={forwardRef}>
            <planeBufferGeometry attach="geometry" args={[8,8]} />
            <meshBasicMaterial attach="material" map={texture} alphaMap={mask} transparent />
        </mesh>
    );
};


export default Scene;