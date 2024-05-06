"use client";

import { FC, MemoExoticComponent, useEffect, useMemo, useRef } from "react";
import { InstancedRigidBodies, InstancedRigidBodyProps, Physics, RapierRigidBody, RigidBody, vec3 } from "@react-three/rapier";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { ObjectMap, useFrame } from "@react-three/fiber";
import { Euler, Mesh } from "three";
import Copter from "./Copter";

type Props = {

}

interface Coordinates {
    x: number,
    y: number
}

const ChildrenToRender: FC<Props> = ({ }) => {
    const land_ref = useRef<Mesh>(null);
    const COUNT = 5;
    let a: number = 0;
    const rigidbodies = useRef<RapierRigidBody[]>(null);

    const land_origin: Coordinates = { x: 0, y: -2 };

    useFrame((state, delta, frame) => {
        a += 0.01;
        if (land_ref && land_ref.current) {
            land_ref.current.setRotationFromEuler(new Euler(a, a, a, "XYZ"));
        }

        let incrementer = 0.6;
        let pos_y = 1.3;

        for (let i = 0; i < COUNT; ++i) {
            if (rigidbodies.current?.at(i)) {
                rigidbodies.current?.at(i)?.setTranslation(vec3({ x: (pos_y) * Math.cos(a * 2) + land_origin.x, y: (pos_y) * Math.sin(a * 2) + land_origin.y, z: 0 }), true);
            }

            pos_y += incrementer;
        }
    })

    const { nodes }: ObjectMap = useGLTF("/models/land.glb", true, true);


    const instances = useMemo(() => {
        const instances: InstancedRigidBodyProps[] = [];


        for (let i = 0; i < COUNT; i++) {

            instances.push({
                key: "instance_" + Math.random(),
                position: [0, 0, 0],
                rotation: [0, 0, 0],
                scale: [0.05, 0.05, 0.05]
            });

        }

        return instances;
    }, []);

    return (<>
        <OrbitControls />

        <directionalLight intensity={0.2} position={[0, 5, 10]} />

        <Physics colliders={false} debug>

            <RigidBody gravityScale={0} colliders={false}>
                <mesh ref={land_ref} scale={[0.5, 0.5, 0.5]} geometry={nodes.land.geometry} position={[land_origin.x, land_origin.y, 0]} rotation={[0, 0, Math.PI * 0.5]} receiveShadow >
                    <meshBasicMaterial color={'olive'} />
                </mesh>
            </RigidBody>

            <RigidBody>
                <InstancedRigidBodies
                    instances={instances}
                    ref={rigidbodies}
                    colliders="cuboid"
                    gravityScale={0}
                    mass={100}
                    type="fixed"
                    onCollisionEnter={(el) => { el; el.rigidBody?.setGravityScale(1, true); el.rigidBody?.addTorque(vec3({x : 0, y: 1, z: 0}), true) }}

                >
                    <instancedMesh args={[undefined, undefined, COUNT]} count={COUNT} castShadow>
                        <boxGeometry />
                        <meshBasicMaterial color={"black"} />
                    </instancedMesh>
                </InstancedRigidBodies>
            </RigidBody>

            <Copter />

        </Physics >
    </>)
}

export default ChildrenToRender;