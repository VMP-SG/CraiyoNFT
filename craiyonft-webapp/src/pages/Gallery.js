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
    <MainLayout>
      <div ref={panoRef} className="max-h-0 max-w-0" />
      <button
        onClick={() => {
          c.mozRequestFullScreen();
        }}
      >
        View token
      </button>
    </MainLayout>
  );
};

export default Gallery;
