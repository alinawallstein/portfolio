type Props = {
  src?: string;
};

export default function CGVideoViewer({ src = "/computergrafik.mp4" }: Props) {
  return (
    <div className="viewer">
      <video
        className="videoViewer"
        src={src}
        controls
        playsInline
        preload="metadata"
      />
    </div>
  );
}