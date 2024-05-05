"use client";

import Scene from "@/components/Scene";
import ChildrenToRender from "@/components/ChildrenToRender";
import { CldImage } from "next-cloudinary";

export default function Home() {
  return (
    <main className="w-screen h-screen relative">

      <CldImage
        src="coper_venture_3d_game/environment_upe9kw"
        alt="environment image for the game"
        style={{ position: "absolute", opacity: 0.6 }}
        fill
      />

      <Scene>
        <ChildrenToRender />
      </Scene>

    </main>
  );
}
