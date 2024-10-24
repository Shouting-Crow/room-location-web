import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import axios from "axios";
import './RoomStructure.css';
import {OrbitControls} from "three/addons/controls/OrbitControls.js";

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

    useEffect(() => {
        renderer.current.shadowMap.enabled = true;
        renderer.current.shadowMap.type = THREE.PCFSoftShadowMap;

        renderer.current.setClearColor(0xf0f0f0);

        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.current.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(50, 50, 50).normalize();
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 5000;
        scene.current.add(directionalLight);

        const floorGeometry = new THREE.PlaneGeometry(1000, 1000);
        const floorMaterial = new THREE.ShadowMaterial({opacity: 0.3});
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = -20;
        floor.receiveShadow = true;
        scene.current.add(floor);

        camera.current.position.set(0, 50, 250);

        renderer.current.setSize(window.innerWidth * 0.8, window.innerHeight);
        if (sceneRef.current) {
            sceneRef.current.appendChild(renderer.current.domElement);
        }

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
            camera.current.aspect = window.innerWidth / window.innerHeight;
            camera.current.updateProjectionMatrix();
            renderer.current.setSize(window.innerWidth * 0.8, window.innerHeight);
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

    const createRoom = async () => {
        if (!selectedShape) {
            alert("방 구조를 선택해주세요.");
            return;
        }

        try {
            const response = await axios.post('/api/rooms/create', {
                roomShapeId: selectedShape,
                roomSize: `${sizeX},${sizeY},${sizeZ}`,
            });
            console.log("방 생성 성공: ", response.data);
            onNext(selectedShape);
        } catch (error) {
            console.error("방 생성 에러: ", error);
        }
    };

    return (
        <div className="room-structure-container">
            <h1>방 구조 설정</h1>
            <div className="room-viewer">
                <div ref={sceneRef} className="threejs-container"></div>
                <div className="room-shapes-menu">
                    <img
                        src="/models/thumbnail/thumbnail1.jpg"
                        alt="방 1"
                        onClick={() => handleShapeClick('shape1')}
                        className="shape-thumbnail"
                    />
                </div>
            </div>

            <div className="size-inputs">
                <div className="input-group">
                    <label htmlFor="sizeX">가로: </label>
                    <input
                        id="sizeX"
                        type="number"
                        value={sizeX}
                        onChange={(e) => setSizeX(parseFloat(e.target.value))}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="sizeY">높이: </label>
                    <input
                        id="sizeY"
                        type="number"
                        value={sizeY}
                        onChange={(e) => setSizeY(parseFloat(e.target.value))}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="sizeZ">세로: </label>
                    <input
                        id="sizeZ"
                        type="number"
                        value={sizeZ}
                        onChange={(e) => setSizeZ(parseFloat(e.target.value))}
                    />
                </div>
            </div>

            <button className="next-step" onClick={createRoom}>방 생성하기</button>
        </div>
    );
};

export default RoomStructure;