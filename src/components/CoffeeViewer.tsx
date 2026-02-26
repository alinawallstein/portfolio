import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { Suspense, useEffect, useMemo } from "react";
import * as THREE from "three";

/* ===============================
   MODEL COMPONENT (no <primitive />)
================================= */

function CoffeeModel() {
  const { scene } = useThree();

  const loader = useMemo(() => new OBJLoader(), []);

  useEffect(() => {
    let modelGroup: THREE.Group | null = null;

    loader.load("/coffee.obj", (obj) => {
      const material = new THREE.MeshStandardMaterial({
        color: "#d7d7d7",
        metalness: 0.25,
        roughness: 0.45,
      });

      obj.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.material = material;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
        }
      });

      // Wrapper Group
      const wrapper = new THREE.Group();
      wrapper.add(obj);

      // Center model
      const box = new THREE.Box3().setFromObject(obj);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      wrapper.position.set(
        -center.x,
        -center.y - size.y * 0.15,
        -center.z
      );

      wrapper.scale.set(1, 1, 1);

      scene.add(wrapper);
      modelGroup = wrapper;
    });

    return () => {
      if (modelGroup) {
        scene.remove(modelGroup);
      }
    };
  }, [loader, scene]);

  return null;
}

/* ===============================
   LIGHT + BACKGROUND
================================= */

function SceneSetup() {
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    // Background color
    scene.background = new THREE.Color("#0b0e14");

    // Ambient Light
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);

    // Directional Light
    const directional = new THREE.DirectionalLight(0xffffff, 1.2);
    directional.position.set(5, 6, 4);
    directional.castShadow = true;

    scene.add(directional);

    return () => {
      scene.remove(ambient);
      scene.remove(directional);
    };
  }, [scene]);

  return null;
}

/* ===============================
   MAIN VIEWER
================================= */

export default function CoffeeViewer() {
  return (
    <div className="viewer">
      <Canvas
        shadows
        camera={{ position: [0, 1.8, 24], fov: 45 }}
      >
        <Suspense fallback={null}>
          <SceneSetup />
          <CoffeeModel />
        </Suspense>

        <OrbitControls
          enablePan={false}
          minDistance={8}
          maxDistance={40}
        />
      </Canvas>
    </div>
  );
}