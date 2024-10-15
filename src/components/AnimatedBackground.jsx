export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 animate-[fade-in_1.5s_ease-in_forwards] bg-black">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(circle at 10% 10%, #04eeff, transparent 30%), radial-gradient(circle at 90% 90%, #ff9204, transparent 30%)",
        }}
      />
    </div>
  );
}
