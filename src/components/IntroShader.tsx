import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";

export default function IntroShader() {
  const config = {
    animate: "on",
    axesHelper: "off",
    brightness: 1.1,
    cAzimuthAngle: 180,
    cDistance: 3.6,
    cPolarAngle: 90,
    cameraZoom: 1,
    color1: "#ab08cb",
    color2: "#5a8eff",
    color3: "#445ef5",
    destination: "onCanvas",
    embedMode: "off",
    envPreset: "city",
    format: "gif",
    fov: 45,
    frameRate: 10,
    gizmoHelper: "hide",
    grain: "on",
    lightType: "3d",
    pixelDensity: 1,
    positionX: -1.4,
    positionY: 0,
    positionZ: 0,
    range: "disabled",
    rangeEnd: 40,
    rangeStart: 0,
    reflection: 0.1,
    rotationX: 0,
    rotationY: 10,
    rotationZ: 50,
    shader: "defaults",
    type: "sphere",
    uAmplitude: 1,
    uDensity: 2.5,
    uFrequency: 5.5,
    uSpeed: 0.2,
    uStrength: 3.7,
    uTime: 0,
    wireframe: false,
  } as const;

  return (
    <div className="introOverlay">
      <ShaderGradientCanvas>
        <ShaderGradient {...config} />
      </ShaderGradientCanvas>
    </div>
  );
}