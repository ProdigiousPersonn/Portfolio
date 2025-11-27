import React, { useRef, Suspense, useEffect, useState } from 'react';
import {
    FaPython, FaJava, FaReact, FaNodeJs, FaHtml5, FaCss3, FaDocker, FaGit,
} from 'react-icons/fa';
import { SiLua, SiRobloxstudio, SiElectron, SiCplusplus, SiNextdotjs, SiUnity, SiTypescript, SiPostgresql, SiFigma } from "react-icons/si";
import { motion, useInView } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';
import ThreeMeshUI from 'three-mesh-ui';
import '@styles/Components/HomePage/About.css';

interface CollapsibleSectionProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="collapsibleSection">
            <button
                className="collapsibleHeader"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="collapsibleTitle">{title}</span>
                <span className="collapsibleIcon">{isOpen ? '−' : '+'}</span>
            </button>
            <motion.div
                initial={false}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
                className="collapsibleContent"
            >
                <div className="collapsibleInner">
                    {children}
                </div>
            </motion.div>
        </div>
    );
};

// Component to set the camera from GLTF
const GLTFCamera: React.FC<{ cameras: THREE.Camera[] }> = ({ cameras }) => {
    const { set, size } = useThree();
    const [initialFov, setInitialFov] = useState<number | null>(null);

    useEffect(() => {
        if (cameras && cameras.length > 0) {
            const gltfCamera = cameras[0];

            // Update the camera's aspect ratio to match the canvas
            if (gltfCamera instanceof THREE.PerspectiveCamera) {
                // Only set the FOV multiplier once on initial load
                if (initialFov === null) {
                    const newFov = gltfCamera.fov * 1.1; // Increase field of view by 30%
                    setInitialFov(newFov);
                    gltfCamera.fov = newFov;
                } else {
                    gltfCamera.fov = initialFov;
                }

                gltfCamera.aspect = size.width / size.height;
                gltfCamera.updateProjectionMatrix();
                console.log('Setting GLTF camera with aspect:', size.width / size.height, 'fov:', gltfCamera.fov);
                set({ camera: gltfCamera as THREE.PerspectiveCamera });
            }
        }
    }, [cameras, set, size, initialFov]);

    return null;
};

interface LaptopModelProps {
    scale: number;
    position: [number, number, number];
    rotation: [number, number, number];
    isOpen: boolean;
}

const LaptopModel: React.FC<LaptopModelProps> = ({ scale, position, rotation, isOpen }) => {
    const { scene, cameras } = useGLTF('/models/Laptop/thinkpad.glb');
    const topLidRef = useRef<THREE.Object3D | null>(null);
    const screenRef = useRef<THREE.Object3D | null>(null);
    const screenLightRef = useRef<THREE.PointLight>(null);
    const screenUIRef = useRef<any>(null);
    const [targetRotation, setTargetRotation] = useState(Math.PI);

    const screenColor = new THREE.Color('#ffffff');
    const screenEmissiveIntensity = 1;
    const screenRotationOffset = 1.05;

    // Find both the top lid and screen objects, and apply materials
    useEffect(() => {
        if (scene) {
            scene.traverse((child) => {
                const nameLower = child.name.toLowerCase();

                // Find lid and screen
                if (nameLower.includes('lid') || (nameLower.includes('top') && !nameLower.includes('screen'))) {
                    topLidRef.current = child;
                }
                if (nameLower.includes('screen') || nameLower.includes('display')) {
                    screenRef.current = child;
                }

                // Apply enhanced materials to all meshes
                if (child instanceof THREE.Mesh) {
                    if (child.material) {
                        // Clone the material to avoid affecting other instances
                        const material = Array.isArray(child.material)
                            ? child.material.map(mat => mat.clone())
                            : child.material.clone();

                        // Check if this is the screen mesh
                        const isScreen = nameLower.includes('screen') || nameLower.includes('display');

                        // Apply material enhancements
                        const applyEnhancements = (mat: THREE.Material) => {
                            if (mat instanceof THREE.MeshStandardMaterial || mat instanceof THREE.MeshPhysicalMaterial) {
                                if (isScreen) {
                                    // Make screen emissive for bloom effect
                                    mat.emissive = screenColor;
                                    mat.emissiveIntensity = screenEmissiveIntensity;
                                    mat.toneMapped = false; // Disable tone mapping for bloom
                                } else {
                                    // Enhance metalness and roughness for better lighting response
                                    mat.metalness = Math.max(mat.metalness, 0.3);
                                    mat.roughness = Math.min(mat.roughness, 0.7);
                                    // Enable environment mapping
                                    mat.envMapIntensity = 1.5;
                                }
                                // Better shadow response
                                mat.needsUpdate = true;
                            }
                        };

                        if (Array.isArray(material)) {
                            material.forEach(applyEnhancements);
                        } else {
                            applyEnhancements(material);
                        }

                        child.material = material;
                    }

                    // Enable shadows
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
        }
    }, [scene]);

    // Update target rotation based on isOpen prop
    useEffect(() => {
        setTargetRotation(isOpen ? Math.PI*0.12 : Math.PI*0.67);
    }, [isOpen]);

    // Smooth animation using useFrame
    useFrame(() => {
        // Update three-mesh-ui
        ThreeMeshUI.update();

        if (topLidRef.current) {
            const currentRotation = topLidRef.current.rotation.x;
            const diff = targetRotation - currentRotation;
            topLidRef.current.rotation.x += diff * 0.05;
        }

        if (screenRef.current) {
            // Rotate screen
            const targetScreenRotation = targetRotation + screenRotationOffset;
            const currentRotation = screenRef.current.rotation.x;
            const diff = targetScreenRotation - currentRotation;
            screenRef.current.rotation.x += diff * 0.05;

            // Update UI to follow screen
            if (screenUIRef.current && isOpen) {
                const screenWorldPos = new THREE.Vector3();
                const screenWorldQuat = new THREE.Quaternion();
                screenRef.current.getWorldPosition(screenWorldPos);
                screenRef.current.getWorldQuaternion(screenWorldQuat);

                // Apply TOP face rotation (-90° X)
                const faceQuat = new THREE.Quaternion();
                const euler = new THREE.Euler(-Math.PI / 2, 0, 0);
                faceQuat.setFromEuler(euler);

                const finalQuat = screenWorldQuat.clone().multiply(faceQuat);

                screenUIRef.current.position.copy(screenWorldPos);
                screenUIRef.current.quaternion.copy(finalQuat);

                // Apply offset
                const offset = new THREE.Vector3(0, 0.01, 0);
                offset.applyQuaternion(screenWorldQuat);
                screenUIRef.current.position.add(offset);
            }

            // Update screen light
            if (screenLightRef.current && isOpen) {
                const screenWorldPos = new THREE.Vector3();
                screenRef.current.getWorldPosition(screenWorldPos);

                const screenNormal = new THREE.Vector3(0, 0, 1);
                screenNormal.applyQuaternion(screenRef.current.getWorldQuaternion(new THREE.Quaternion()));
                screenNormal.multiplyScalar(0.3);

                screenLightRef.current.position.copy(screenWorldPos.add(screenNormal));
                screenLightRef.current.intensity = 10;
            }
        }
    });

    return (
        <group>
            {/* Use the camera from the GLTF file */}
            {cameras && cameras.length > 0 && <GLTFCamera cameras={cameras} />}

            {/* Complementary point light that matches screen color */}
            <pointLight
                ref={screenLightRef}
                color={screenColor}
                intensity={100}
                distance={200}
                decay={0}
            />

            <primitive
                object={scene}
                scale={scale}
                position={position}
                rotation={rotation}
            />

        </group>
    );
};

const About: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const laptopRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: false, amount: 0.2 }); // For fade-in animations
    const isLaptopInView = useInView(laptopRef, { once: false, amount: 0.5 }); // For laptop animation - 50% visible

    // 3D model configuration
    const scale = 1;
    const position: [number, number, number] = [0, 0, 0];
    const rotation: [number, number, number] = [0, 0, 0];

    const fadeIn = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.215, 0.61, 0.355, 1]
            }
        },
    };

    return (
        <div ref={containerRef} className="aboutSection">
            <div className="aboutContainer">
                <motion.div
                    className="aboutContent"
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeIn}
                >
                    <div className="aboutIntro">
                        <p className="aboutMainText">
                            I'm an <span className="highlight">18 year old developer</span> with <span className="highlight">6-7 years </span>
                            of experience
                        </p>
                        <p className="aboutSubText">
                            I love building things that challenge me to<br />
                            <span className="highlight">think differently</span> and <span className="highlight">create something</span><br />
                            <span className="highlight">meaningful</span>.
                        </p>
                    </div>

                    <div className="aboutSkills">
                        <CollapsibleSection title="Languages:" defaultOpen={false}>
                            <div className="skillGrid">
                                <div className="skillItem"><SiCplusplus /> C++</div>
                                <div className="skillItem"><FaPython /> Python</div>
                                <div className="skillItem"><FaJava /> Java</div>
                                <div className="skillItem"><SiCplusplus /> C#</div>
                                <div className="skillItem"><SiLua /> Lua</div>
                                <div className="skillItem"><SiTypescript /> TypeScript</div>
                                <div className="skillItem"><FaHtml5 /> HTML</div>
                                <div className="skillItem"><FaCss3 /> CSS</div>
                            </div>
                        </CollapsibleSection>

                        <CollapsibleSection title="Technologies" defaultOpen={false}>
                            <div className="skillGrid">
                                <div className="skillItem"><FaReact /> React</div>
                                <div className="skillItem"><FaNodeJs /> Node.js</div>
                                <div className="skillItem"><SiNextdotjs /> Next.js</div>
                                <div className="skillItem"><SiElectron /> Electron</div>
                                <div className="skillItem"><SiUnity /> Unity</div>
                                <div className="skillItem"><SiRobloxstudio /> Roblox</div>
                                <div className="skillItem"><SiPostgresql /> PostgreSQL</div>
                            </div>
                        </CollapsibleSection>

                        <CollapsibleSection title="Tools" defaultOpen={false}>
                            <div className="skillGrid">
                                <div className="skillItem"><FaGit /> Git</div>
                                <div className="skillItem"><FaDocker /> Docker</div>
                                {/* <div className="skillItem"><SiVscode /> VS Code</div> */}
                                <div className="skillItem"><SiFigma /> Figma</div>
                            </div>
                        </CollapsibleSection>
                    </div>
                </motion.div>

                <motion.div
                    ref={laptopRef}
                    className="about3DContainer"
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeIn}
                >
                    <Canvas shadows gl={{ antialias: true, alpha: true }}>
                        <Suspense fallback={null}>
                            {/* Ambient light for overall scene illumination */}
                            <ambientLight intensity={0.3} />

                            <LaptopModel scale={scale} position={position} rotation={rotation} isOpen={isLaptopInView} />

                            {/* Environment for reflections and ambient lighting */}
                            <Environment preset="warehouse" />
                        </Suspense>
                    </Canvas>
                </motion.div>
            </div>
        </div>
    );
};

export default About;