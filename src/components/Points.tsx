import { useFrame } from "@react-three/fiber";
import { FC, useEffect, useRef } from "react";
import { Euler, Group, Mesh, Vector3 } from "three";
import { Coordinates } from "./ChildrenToRender";

type PointProps = {
    position: Vector3,
    phase: number,
    key: number,
    radius: number,
    coords: Coordinates
}

const PointGenerator: FC<PointProps> = ({ position, phase, key, radius, coords }) => {
    const GroupRef = useRef<Group>(null);
    const point_mesh = useRef<Mesh>(null);

    useEffect(() => {
        // GroupRef.current?.removeFromParent()
    }, []);

    let a: number = 0;

    useFrame((state, delta, clock) => {

        if (point_mesh.current) {

            point_mesh.current?.setRotationFromEuler(
                new Euler(0.5 * Math.sin(state.clock.getElapsedTime() * 3),
                    2 * Math.sin(state.clock.getElapsedTime()),
                    0,
                    "XYZ"));

            point_mesh.current?.position.setY(0.05 * Math.sin(state.clock.getElapsedTime() + Math.PI / 2 * phase) + position.y);
        }

        if (GroupRef.current) {

            GroupRef.current?.position.setX(radius * 1.5 * Math.cos(a + Math.PI / 3.4) + coords.x);
            GroupRef.current?.position.setY(radius * Math.sin(a + Math.PI / 3.4) + coords.y);

            // if (GroupRef.current?.position.x < 3 &&
            //     GroupRef.current?.position.y < -1)
            //     GroupRef.current.removeFromParent();

            a += 0.004;
        }

    })

    return (<>
        <group key={key} ref={GroupRef} position={[coords.x, coords.y, 0]}>
            <pointLight position={[position.x, -1 + position.y, position.z]} intensity={1} color={'purple'} />
            <pointLight position={[position.x, 1 + position.y, position.z]} intensity={1} color={'purple'} />
            <mesh name="points" ref={point_mesh} position={[position.x, 0, position.z]} rotation={[0, 0, 0]} >
                <octahedronGeometry args={[0.03, 0]} />
                <meshPhysicalMaterial color={'#86469C'} roughness={0.5} metalness={0.5} reflectivity={1} iridescence={1} iridescenceIOR={1.5} sheen={1} sheenColor={'#FF0080'} sheenRoughness={0} />
            </mesh>
        </group>
    </>)

}

type Props = {
    positionForPoints: Vector3
    pointsGap: number
    Coords: Coordinates
    groupRadius: number
    numberOfPoints: number
};

const Points: FC<Props> = ({ positionForPoints, pointsGap, Coords, groupRadius, numberOfPoints }) => {

    return (<>
        {
            [...Array(numberOfPoints)].map((_, index) => {

                const position = new Vector3(positionForPoints.x + index * pointsGap, positionForPoints.y, positionForPoints.z);

                return (<>
                    <PointGenerator position={position} phase={index} key={index} radius={groupRadius} coords={Coords} />
                </>)
            })
        }
    </>)
}

export default Points;