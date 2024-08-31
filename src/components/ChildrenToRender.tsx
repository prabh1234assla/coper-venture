"use client";

import { FC, MemoExoticComponent, useEffect, useMemo, useRef, useState } from "react";
import { InstancedRigidBodies, InstancedRigidBodyProps, Physics, RapierRigidBody, RigidBody, vec3 } from "@react-three/rapier";
import { OrbitControls, Point, useGLTF } from "@react-three/drei";
import { InstancedMeshProps, ObjectMap, useFrame } from "@react-three/fiber";
import { Euler, InstancedMesh, Mesh, Vector3 } from "three";
import Copter from "./Copter";
import Points from "./Points";
import { Model } from "../../public/models/Land";

type Props = {

}

export interface Coordinates {
    x: number,
    y: number
}

const ChildrenToRender: FC<Props> = ({ }) => {
    const COUNT = 200;
    const rigidbodies = useRef<RapierRigidBody[]>(null);
    const meshes = useRef<InstancedMesh>(null);
    const land_origin: Coordinates = { x: 0, y: -2 };

    let a: number = 0;
    const sceneCenterCoords: Coordinates = { x: 0, y: -4 };
    let [groupRadius, setGroupRadius] = useState<number>(Math.random() * (5.8 - 4) + 4);
    let [numberOfPoints, setNumberOfPoints] = useState<number>([5, 10, 15, 20][Math.floor(Math.random() * 4)]);

    useEffect(() => {

        setInterval(() => {
            setGroupRadius(Math.random() * (5.8 - 4) + 4);
            setNumberOfPoints([5, 10, 15, 20][Math.floor(Math.random() * 4)]);
        }, 8000);

    }, [])

    useFrame((state, delta, frame) => {
        let incrementer = 0.6;
        let pos_y = 4;

        for (let i = 0; i < COUNT; ++i) {
            if (rigidbodies.current?.at(i)) {
                rigidbodies.current?.at(i)?.setTranslation(vec3({ x: (pos_y) * Math.cos(a) + sceneCenterCoords.x, y: (pos_y) * Math.sin(a) + sceneCenterCoords.y, z: 0 }), true);
            }

            pos_y += incrementer;
        }
    })

    // const { nodes }: ObjectMap = useGLTF("/models/land.glb", true, true);

    const instances = useMemo(() => {
        const instances: InstancedRigidBodyProps[] = [];

        let incrementer = 0.1;
        let pos_y = 6;

        for (let i = 0; i < COUNT; i++) {
            let angle = Math.PI / 36 * (36 * Math.random())

            instances.push({
                key: "instance_" + Math.random(),
                position: [(pos_y) * Math.cos(a + angle) + sceneCenterCoords.x, (pos_y) * Math.sin(a + angle) + sceneCenterCoords.y, 0],
                rotation: [0, 0, 0],
                scale: [0.05, 0.05, 0.05]
            });

            pos_y += incrementer;

        }

        return instances;
    }, []);

    return (<>
        <OrbitControls />

        <directionalLight intensity={0.2} position={[0, 5, 10]} />

        <Physics colliders={false} debug >

            <RigidBody position={[0, 0, 0]} gravityScale={0} colliders={false}>
                <Model position={[land_origin.x, land_origin.y, 0]} receiveShadow />
            </RigidBody>
            
            {/* <RigidBody>
                <InstancedRigidBodies
                    instances={instances}
                    ref={rigidbodies}
                    colliders="cuboid"
                    gravityScale={0}
                    mass={1}
                    type="fixed"
                    onCollisionEnter={(el) => { el; el.rigidBody?.setGravityScale(1, true); el.rigidBody?.addTorque(vec3({ x: 0, y: 0.01, z: 0 }), true) }}

                >
                    <instancedMesh args={[undefined, undefined, COUNT]} count={COUNT} ref={meshes} castShadow>
                        <boxGeometry />
                        <meshBasicMaterial color={"black"} />
                    </instancedMesh>
                </InstancedRigidBodies>
            </RigidBody> */}

            <Copter />

            <Points pointsGap={0.1} positionForPoints={new Vector3(0, 0, 0)} Coords={sceneCenterCoords} groupRadius={groupRadius} numberOfPoints={numberOfPoints} />

        </Physics >
    </>)
}

export default ChildrenToRender;