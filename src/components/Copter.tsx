import { useState, useEffect, FC, useRef } from "react";
import { RapierRigidBody, RigidBody, vec3 } from "@react-three/rapier";

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

    const _pressed_keys: Keys = {
        up: ["ArrowUp", "8"],
        down: ["ArrowDown", "2"],
        left: ["ArrowLeft", "4"],
        right: ["ArrowRight", "6"]
    }

    useEffect(() => {

        const Listener = (ev: KeyboardEvent) => {
            if (ev.key == _pressed_keys.up[0] || ev.key == _pressed_keys.up[1]) {
                console.log('up event')
                copter_ref.current?.setTranslation(vec3({ x: copter_ref.current?.translation().x, y: copter_ref.current?.translation().y + 0.5, z: 0 }), true)
            }

            if (ev.key == _pressed_keys.down[0] || ev.key == _pressed_keys.down[1]) {

                console.log('down event')
                copter_ref.current?.setTranslation(vec3({ x: copter_ref.current?.translation().x, y: copter_ref.current?.translation().y - 0.5, z: 0 }), true)
            }

            if (ev.key == _pressed_keys.left[0] || ev.key == _pressed_keys.left[1]) {

                console.log('left event')
                copter_ref.current?.setTranslation(vec3({ x: copter_ref.current?.translation().x - 0.5, y: copter_ref.current?.translation().y, z: 0 }), true)
            }

            if (ev.key == _pressed_keys.right[0] || ev.key == _pressed_keys.right[1]) {

                console.log('right event')
                copter_ref.current?.setTranslation(vec3({ x: copter_ref.current?.translation().x + 0.5, y: copter_ref.current?.translation().y, z: 0 }), true)
            }
        }

        document.addEventListener("keydown", (ev) => Listener(ev))

        return () => {
            document.removeEventListener("keydown", (ev) => Listener(ev))
        }

    }, [_pressed_keys.up, _pressed_keys.down, _pressed_keys.left, _pressed_keys.right])

    return (<>
        <RigidBody position={[0, -1, 0]} rotation={[0, 0, 0]} ref={copter_ref} colliders="trimesh" gravityScale={0}>
            <mesh scale={[0.2, 0.2, 0.2]}>
                <boxGeometry />
                <meshBasicMaterial color={'blue'} />
            </mesh>
        </RigidBody>
    </>)
}

export default Copter;