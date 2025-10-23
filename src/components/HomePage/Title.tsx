import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from "three";
import { motion } from 'framer-motion';

function Title() {
    return (
        <div>
            <h1 className="title">
                <motion.span
                    style={{ display: 'inline-block', translateY: -80 }}
                    animate={{ translateY: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    Aiden Tran.
                </motion.span>
            </h1>
            <h1 className="bgLogo">Aiden Tran</h1>
            <h2 className="subTitle subHead">
                <motion.span
                    style={{ display: 'inline-block', translateY: -50 }}
                    animate={{ translateY: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Programmer
                </motion.span>
            </h2>
            <motion.div
                className="model"
                style={{ translateY: 60 }}
                initial={{ opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <Canvas shadows camera={{ position: [0, 1, 3], fov: 40, zoom: 9 }}>
                    <ambientLight intensity={1} />
                    <Sunlight />
                    <Keyboard position={[0, -0.07, 0]} />
                </Canvas>
            </motion.div>
            <motion.div className="scrollDownContainer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
                <div className="arrow"></div>
                <div className="arrow"></div>
            </motion.div>
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

            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotation.current.x, 0.01);
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotation.current.y, 0.01);
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
        </group>
    );
}

useGLTF.preload('/models/gmmkpro.gltf');

export default Title;
