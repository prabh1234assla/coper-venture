import { useState, useEffect, FC, useRef } from "react";
import { RapierRigidBody, RigidBody, vec3 } from "@react-three/rapier";
import { Model } from "../../public/models/Chopper";
import { Vector4 } from "three";

type Props = {

}

interface Keys {
    up: string[]
    down: string[]
    left: string[]
    right: string[]
}

const Copter: FC<Props> = ({ }) => {

    const copter_ref = useRef<RapierRigidBody>(null);
    const linVel = 1;
    const torque = 0.2;

    const _pressed_keys: Keys = {
        up: ["ArrowUp", "8"],
        down: ["ArrowDown", "2"],
        left: ["ArrowLeft", "4"],
        right: ["ArrowRight", "6"]
    }
//144 121 95 72 46 23
    useEffect(() => {

        const Listener = (ev: KeyboardEvent) => {
            copter_ref.current?.setLinearDamping(0.5);
            copter_ref.current?.setAngularDamping(1);

            if (ev.key == _pressed_keys.up[0] || ev.key == _pressed_keys.up[1]) {
                console.log('up event')
                copter_ref.current?.setLinvel(vec3({ x: 0, y: linVel, z: 0 }), true);
            }

            if (ev.key == _pressed_keys.down[0] || ev.key == _pressed_keys.down[1]) {

                console.log('down event')
                copter_ref.current?.setLinvel(vec3({ x: 0, y: -linVel, z: 0 }), true);
            }

            if (ev.key == _pressed_keys.left[0] || ev.key == _pressed_keys.left[1]) {

                console.log('left event')
                copter_ref.current?.setLinvel(vec3({ x: -linVel, y: 0, z: 0 }), true);
            }

            if (ev.key == _pressed_keys.right[0] || ev.key == _pressed_keys.right[1]) {

                console.log('right event')
                copter_ref.current?.setLinvel(vec3({ x: linVel, y: 0, z: 0 }), true);
            }
        }

        document.addEventListener("keydown", (ev) => Listener(ev))

        return () => {
            document.removeEventListener("keydown", (ev) => Listener(ev))
        }

    }, [_pressed_keys.up, _pressed_keys.down, _pressed_keys.left, _pressed_keys.right])

    return (<>
        <RigidBody mass={50} position={[0, -1, 0]} rotation={[0, 0, 0]} ref={copter_ref} colliders="trimesh" gravityScale={0}>
            <Model scale={[0.05, 0.05, 0.05]} rotation={[0, Math.PI / 2, 0]} />
        </RigidBody>
    </>)
}

export default Copter;