"use client";

import Scene from "@/components/Scene";
import ChildrenToRender from "@/components/ChildrenToRender";
import { CldImage } from "next-cloudinary";

export default function Home() {
  return (
    <main className="w-screen h-screen relative">

      <audio src="/audio/helicopter.mp3">jjsjsjj</audio>

      <CldImage
        src="coper_venture_3d_game/environment_upe9kw"
        alt="environment image for the game"
        style={{ position: "absolute", opacity: 0.6 }}
        fill
      />

      <CldImage
        src="coper_venture_3d_game/vfpwouazilxutpimxaop"
        alt="health"
        height={46}
        width={144}
        style={{ position: "absolute", top: 0, left: 0, objectFit: "none", objectPosition: "left top" }}
      />

      <Scene>
        <ChildrenToRender />
      </Scene>

    </main>
  );
}
