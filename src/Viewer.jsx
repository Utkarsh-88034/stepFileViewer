import {
  Loader,
  OrbitControls,
  Stage,
  useGLTF,
  useScroll,
} from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
const Viewer = ({ glb }) => {
  const [model, setModel] = useState();

  useEffect(() => {
    if (!glb) return;
    const loader = new GLTFLoader();
    loader.parse(glb, "", (gltf) => {
      console.log(gltf);
      setModel(gltf.scene);
    });
  }, [glb]);

  return (
    <>
      <Canvas style={{ height: "100vh", width: "100vw" }}>
        <Stage>{model && <primitive object={model} />}</Stage>
        <OrbitControls />
      </Canvas>
      <Loader />
    </>
  );
};

export default Viewer;
