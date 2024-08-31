"use client";

import { Canvas } from "@react-three/fiber";
import { FC, ReactNode, Suspense, useEffect, useRef } from "react";

type Props = {
    children: ReactNode;
}

const Scene: FC<Props> = ({ children }) => {
    const canvas_ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        console.log(canvas_ref.current);
    }, [])

    return (<>
        <Canvas
            gl={{
                antialias: true,
            }}
            camera={{
                fov: 45,
                near: 0.1,
                far: 100
            }}
            ref={canvas_ref}
        >
            <Suspense>
                {children}
            </Suspense>
        </Canvas>
    </>)
}

export default Scene;