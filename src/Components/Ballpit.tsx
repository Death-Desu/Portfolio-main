import { Canvas, useFrame, useThree } from '@react-three/fiber';


import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Environment } from '@react-three/drei';

interface BallpitProps {
    count?: number;
    gravity?: number;
    friction?: number;
    wallBounce?: number;
    followCursor?: boolean;
}

function Balls({ count = 100, gravity = 0.8, friction = 0.99, wallBounce = 0.9, followCursor = true }: BallpitProps) {
    const { viewport } = useThree();
    const mouse = useRef(new THREE.Vector2());


    // Physics State
    const [data] = useState(() => {
        return Array.from({ length: count as number }, () => ({
            // Position
            x: (Math.random() - 0.5) * viewport.width,
            y: (Math.random() - 0.5) * viewport.height,
            z: 0,
            // Velocity
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
            vz: 0,
            // Radius (Larger)
            r: 0.5 + Math.random() * 0.4,
            // Color - White & SkyBlue (Winter)
            color: ["#ffffff", "#f5d0fe", "#e879f9", "#c084fc", "#a78bfa", "#818cf8"][Math.floor(Math.random() * 6)]
        }));
    });

    const meshRef = useRef<THREE.InstancedMesh>(null);
    const colorArray = useMemo(() => new Float32Array(count! * 3), [count]);

    useEffect(() => {
        const tempColor = new THREE.Color();
        for (let i = 0; i < count!; i++) {
            tempColor.set(data[i].color);
            tempColor.toArray(colorArray, i * 3);
        }
    }, [data, count, colorArray]);

    useFrame((state) => {
        if (!meshRef.current) return;

        // Update Mouse
        mouse.current.x = (state.mouse.x * viewport.width) / 2;
        mouse.current.y = (state.mouse.y * viewport.height) / 2;

        const dummy = new THREE.Object3D();

        data.forEach((ball, i) => {
            // Apply Gravity
            ball.vy -= gravity * 0.1;

            // Apply Friction
            ball.vx *= friction;
            ball.vy *= friction;

            // Mouse Repulsion (if enabled)
            if (followCursor) {
                const dx = ball.x - mouse.current.x;
                const dy = ball.y - mouse.current.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 3) {
                    const force = (3 - dist) * 0.05;
                    ball.vx += (dx / dist) * force;
                    ball.vy += (dy / dist) * force;
                }
            }

            // Update Position
            ball.x += ball.vx;
            ball.y += ball.vy;

            // Wall Collisions
            const width = viewport.width / 2;
            const height = viewport.height / 2;

            if (ball.x + ball.r > width) {
                ball.x = width - ball.r;
                ball.vx *= -wallBounce;
            } else if (ball.x - ball.r < -width) {
                ball.x = -width + ball.r;
                ball.vx *= -wallBounce;
            }

            if (ball.y + ball.r > height) {
                ball.y = height - ball.r;
                ball.vy *= -wallBounce;
            } else if (ball.y - ball.r < -height) {
                ball.y = -height + ball.r;
                ball.vy *= -wallBounce;
            }

            // Ball-to-Ball Collisions (Naive O(N^2) but ok for <200 balls)
            for (let j = i + 1; j < count!; j++) {
                const ball2 = data[j];
                const dx = ball.x - ball2.x;
                const dy = ball.y - ball2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const minDist = ball.r + ball2.r;

                if (dist < minDist) {
                    const angle = Math.atan2(dy, dx);
                    const tx = ball2.x + Math.cos(angle) * minDist;
                    const ty = ball2.y + Math.sin(angle) * minDist;

                    const ax = (ball.x - tx) * 0.5; // Spring
                    const ay = (ball.y - ty) * 0.5;

                    ball.vx -= ax;
                    ball.vy -= ay;
                    ball2.vx += ax;
                    ball2.vy += ay;
                }
            }

            // Render
            dummy.position.set(ball.x, ball.y, 0);
            dummy.scale.set(1, 1, 1); // scale could vary if r was in geom

            // We set geometry radius to 1, scale to ball.r
            dummy.scale.setScalar(ball.r);

            dummy.updateMatrix();
            if (meshRef.current) {
                meshRef.current.setMatrixAt(i, dummy.matrix);
            }
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <sphereGeometry args={[1, 32, 32]}>
                <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
            </sphereGeometry>
            <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.6} vertexColors />
        </instancedMesh>
    );
}

export default function Ballpit({
    count = 100,
    gravity = 0.01,
    friction = 0.9975,
    wallBounce = 0.95,
    followCursor = false
}: BallpitProps) {
    return (
        <Canvas
            gl={{ alpha: true, antialias: true }}
            camera={{ position: [0, 0, 20], fov: 45 }}
            style={{ background: 'transparent' }}
        >
            <ambientLight intensity={1.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, 10, 10]} intensity={0.5} />

            <Balls
                count={count}
                gravity={gravity}
                friction={friction}
                wallBounce={wallBounce}
                followCursor={followCursor}
            />
            <Environment preset="city" />
        </Canvas>
    );
}
