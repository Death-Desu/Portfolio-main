import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function StoreBackground() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // SCENE SETUP
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x050505, 0.002);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 20;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);

        // PARTICLES
        const particlesGeometry = new THREE.BufferGeometry();
        const particleCount = 1500;

        const posArray = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i++) {
            // Spread particles
            posArray[i] = (Math.random() - 0.5) * 40;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        // Material - Big Bright Balls
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.2, // Much bigger (was 0.05)
            color: 0x00ffff, // Cyan
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // ANIMATION LOOP
        const animate = () => {
            requestAnimationFrame(animate);

            // Rotation
            particlesMesh.rotation.y += 0.002;
            particlesMesh.rotation.x += 0.001;

            renderer.render(scene, camera);
        };

        animate();

        // RESIZE HANDLER
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // CLEANUP
        return () => {
            window.removeEventListener('resize', handleResize);
            if (containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
            }
            particlesGeometry.dispose();
            particlesMaterial.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-0 pointer-events-none"
        />
    );
}
