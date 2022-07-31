import React from "react";
import MainLayout from "../layout/MainLayout";
import * as PANOLENS from "panolens";

const src = "/assets/spaceship_edited.jpg";

const Gallery = () => {
  const panoRef = React.useRef(null);
  const [c, setC] = React.useState(null);
  React.useEffect(() => {
    const ctr = panoRef.current;
    if (!ctr) return;
    if (!c) {
      setC(ctr);
      const panorama = new PANOLENS.ImagePanorama(src);
      const viewer = new PANOLENS.Viewer({
        container: ctr,
      });
      viewer.add(panorama);
    }
  }, [c]);
  return (
    <div>
      <MainLayout>
        <main className="flex flex-col justify-center items-center font-primary text-[42.67px] leading-[58.28px]">
          <div ref={panoRef} className="max-h-0 max-w-0" />
          <button
            onClick={() => {
              c.mozRequestFullScreen();
            }}
          >
            View token
          </button>
          <p>Test</p>
          <p>More Tests</p>
        </main>
      </MainLayout>
    </div>
  );
};

export default Gallery;
