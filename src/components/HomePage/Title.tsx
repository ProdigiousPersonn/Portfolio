import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { lerp } from 'three/src/math/MathUtils';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

function Title() {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const subTitleRef = useRef(null);
    const modelRef = useRef(null);
    const arrowsRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            gsap.from(titleRef.current, { y: -80, duration: 0.4 });

            gsap.from(subTitleRef.current, { y: -50, duration: 0.6 });

            gsap.from(modelRef.current, { y: 60, duration: 0.8 });
            gsap.from(modelRef.current, { opacity: 0, duration: 0.5 });

            gsap.from(arrowsRef.current, { opacity: 0, duration: 2 });
        }, containerRef);

        return () => ctx.revert();
    }, []);




    return (
        <div ref={containerRef}>
            <h1 ref={titleRef} className="title">Aiden Tran.</h1>
            <h1 className="bgLogo">Aiden Tran</h1>
            <h2 ref={subTitleRef} className="subTitle subHead">Programmer</h2>
            <div ref={modelRef} className="model">
                <Canvas shadows camera={{ position: [0, 1, 3], fov: 40, zoom: 9 }}>
                    <ambientLight intensity={1} />
                    <Sunlight />
                    <Keyboard position={[0, -0.07, 0]} rotation={[0, 0, 0]} />
                </Canvas>
            </div>
            <div ref={arrowsRef} className="scrollDownContainer">
                <div className="arrow"></div>
                <div className="arrow"></div>
            </div>
        </div>
    );
}


type KeyProps = {
    position?: [number, number, number];
    rotation?: [number, number, number];
    scale?: number | [number, number, number];
};

function Sunlight() {
    return (
        <>
            <directionalLight
                position={[0, 20, 5]}
                intensity={12}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-far={50}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
            />
            <mesh position={[10, 10, 5]}>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshBasicMaterial color="yellow" />
            </mesh>
        </>
    );
}

function Keyboard(props: KeyProps) {
    const groupRef = useRef<THREE.Group>(null);

    const mouse = useRef({ x: 0, y: 0 });
    const targetRotation = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useFrame(() => {
        if (groupRef.current) {
            const rotationFactor = 0.2;
            targetRotation.current.x = -mouse.current.y * rotationFactor;
            targetRotation.current.y = mouse.current.x * rotationFactor;

            groupRef.current.rotation.x = lerp(
                groupRef.current.rotation.x,
                targetRotation.current.x,
                0.01
            );
            groupRef.current.rotation.y = lerp(
                groupRef.current.rotation.y,
                targetRotation.current.y,
                0.01
            );
        }
    });

    const { nodes, materials } = useGLTF('/models/gmmkpro.gltf') as any;

    return (
        <group ref={groupRef} {...props} dispose={null}>
            <mesh geometry={nodes.KB_Base.geometry} material={materials["Black Metal"]} />
            <mesh geometry={nodes.Knob.geometry} material={materials['Material.001Gold']} />
            <mesh geometry={nodes.KeyLight.geometry} material={materials['DarkBlue']} />
            <mesh geometry={nodes.KeyDark.geometry} material={materials['DarkBlue.001']} />
            <mesh geometry={nodes.KeyOrange.geometry} material={materials['Orange']} />
            {/* <mesh geometry={nodes.Backlight.geometry} material={materials['Backlight']} /> */}
        </group>
    );
}

useGLTF.preload('/models/gmmkpro.gltf');

export default Title;
