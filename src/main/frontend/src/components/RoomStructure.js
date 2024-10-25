import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import axios from "axios";
import './RoomStructure.css';
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import RoomSidebar from "./RoomSidebar";

const RoomStructure = ({onNext}) => {
    const [selectedShape, setSelectedShape] = useState(null);
    const [sizeX, setSizeX] = useState(10);
    const [sizeY, setSizeY] = useState(10);
    const [sizeZ, setSizeZ] = useState(10);
    const [model, setModel] = useState(null);
    const sceneRef = useRef(null);
    const scene = useRef(new THREE.Scene());
    const camera = useRef(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000));
    const renderer = useRef(new THREE.WebGLRenderer());
    const controls = useRef(null);
    const [currentStep, setCurrentStep] = useState(1);

    useEffect(() => {
        renderer.current.shadowMap.enabled = true;
        renderer.current.shadowMap.type = THREE.PCFSoftShadowMap;

        renderer.current.setClearColor(0xf0f0f0);

        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.current.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(50, 50, 50).normalize();
        directionalLight.castShadow = true;
        scene.current.add(directionalLight);

        camera.current.position.set(0, 50, 250);

        renderer.current.setSize(sceneRef.current.clientWidth, sceneRef.current.clientHeight);

        if (sceneRef.current) {
            sceneRef.current.appendChild(renderer.current.domElement);
        }

        const floorGeometry = new THREE.PlaneGeometry(1000, 1000);
        const floorMaterial = new THREE.ShadowMaterial({opacity: 0.3});
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = -20;
        floor.receiveShadow = true;
        scene.current.add(floor);

        controls.current = new OrbitControls(camera.current, renderer.current.domElement);
        controls.current.enableDamping = true;
        controls.current.dampingFactor = 0.05;
        controls.current.maxPolarAngle = Math.PI / 2;
        controls.current.minDistance = 100;
        controls.current.maxDistance = 3000;
        controls.current.update();

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.current.render(scene.current, camera.current);
            controls.current.update();
        };
        animate();

        window.addEventListener('resize', () => {
            const width = sceneRef.current.clientWidth;
            const height = sceneRef.current.clientHeight;
            camera.current.aspect = width / height;
            camera.current.updateProjectionMatrix();
            renderer.current.setSize(width, height);
        });

        return () => {
            if (sceneRef.current) {
                sceneRef.current.removeChild(renderer.current.domElement);
            }
            window.removeEventListener('resize', null);
        };
    }, []);

    const loadModel = (shape) => {
        const loader = new OBJLoader();
        loader.load(`/models/${shape}.obj`, (obj) => {
            obj.scale.set(sizeX, sizeY, sizeZ);
            obj.castShadow = true;
            scene.current.add(obj);
            setModel(obj);

            const box = new THREE.Box3().setFromObject(obj);
            const center = box.getCenter(new THREE.Vector3());
            obj.position.sub(center);

            camera.current.position.set(center.x, center.y + 100, 400);
            camera.current.lookAt(center);
        });
    };

    const handleShapeClick = (shape) => {
        setSelectedShape(shape);
        if (model) {
            scene.current.remove(model);
        }
        loadModel(shape);
    };

    useEffect(() => {
        if (model) {
            model.scale.set(sizeX, sizeY, sizeZ);
        }
    }, [sizeX, sizeY, sizeZ, model]);

    const handleNextStep = () => {
        if (currentStep < 4) setCurrentStep((prev) => prev + 1);
    };

    const handlePreviousStep = () => {
        if (currentStep > 1) setCurrentStep((prev) => prev - 1);
    };

    return (
        <div className="room-structure-container">
            <h1>방 구조 설정</h1>
            <div className="room-viewer">
                <div ref={sceneRef} className="threejs-container"></div>
                <RoomSidebar
                    onShapeClick={handleShapeClick}
                    sizeX={sizeX}
                    sizeY={sizeY}
                    sizeZ={sizeZ}
                    setSizeX={setSizeX}
                    setSizeY={setSizeY}
                    setSizeZ={setSizeZ}
                    currentStep={currentStep}
                    selectedShape={selectedShape}
                />
            </div>

            <div className="step-controls">
                {currentStep > 1 && <button className="prev-step" onClick={handlePreviousStep}>이전 단계</button>}
                {currentStep < 4 && <button className="next-step" onClick={handleNextStep}>다음 단계</button>}
            </div>
        </div>
    );
};

export default RoomStructure;