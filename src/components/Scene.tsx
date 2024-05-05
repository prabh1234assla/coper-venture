"use client";

import { Canvas } from "@react-three/fiber";
import { FC, ReactNode, Suspense } from "react";

type Props = {
    children: ReactNode;
}

const Scene: FC<Props> = ({ children }) => {
    
    return (<>
        <Canvas
            gl={{
                antialias: true,
            }}
            camera={{
                fov: 45,
                near: 0.1,
                far: 100,
            }}
        >
            <Suspense>
                {children}
            </Suspense>
        </Canvas>
    </>)
}

export default Scene;