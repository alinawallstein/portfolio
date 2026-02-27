import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';

export default function ShaderBG() {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}>
      <ShaderGradientCanvas
        style={{ position: 'absolute', inset: 0 }}
        fov={45}
        pixelDensity={1}
      >
        <ShaderGradient
          animate="on"
          brightness={1}
          cAzimuthAngle={180}
          cDistance={3.6}
          cPolarAngle={90}
          cameraZoom={1}
          color1="#567d94"
          color2="#839fdb"
          color3="#7179a8"
          envPreset="city"
          grain="off"
          lightType="3d"
          positionX={-1.4}
          positionY={0}
          positionZ={0}
          reflection={0.1}
          rotationX={0}
          rotationY={10}
          rotationZ={50}
          shader="defaults"
          type="waterPlane"
          uAmplitude={1}
          uDensity={1.2}
          uFrequency={5.5}
          uSpeed={0.2}
          uStrength={3.8}
          uTime={0}
          wireframe={false}
        />
      </ShaderGradientCanvas>

      {/* Optional: Lesbarkeits-Overlay (falls Text zu wenig Kontrast hat) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(0,0,0,.35), rgba(0,0,0,.12), rgba(0,0,0,.45))',
        }}
      />
    </div>
  );
}