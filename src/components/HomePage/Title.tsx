import { Component } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { lerp } from 'three/src/math/MathUtils';
import React from 'react';

class Title extends Component<unknown> {
    render() {
        return (
            <>
                <h1 className="title">Aiden Tran.</h1>
                <h1 className="bgLogo">Aiden Tran</h1>
                <h2 className="subTitle subHead">Programmer</h2>
                <div className="model">
                    <Canvas shadows camera={{ position: [0, 1, 3], fov: 40, zoom: 9 }}>
                        <ambientLight intensity={1} />
                        <Sunlight />
                        <Keyboard position={[0, -0.08, 0]} rotation={[0, 0, 0]} />
                    </Canvas>
                </div>
            </>
        );
    }
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
    const groupRef = React.useRef<THREE.Group>(null);

    // Track mouse position
    const mouse = React.useRef({ x: 0, y: 0 });
    const targetRotation = React.useRef({ x: 0, y: 0 });

    React.useEffect(() => {
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

export default Title;
