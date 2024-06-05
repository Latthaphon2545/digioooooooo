"use client";

interface CustomCSSProperties extends React.CSSProperties {
  "--value"?: number;
}

export default function ProgressIndicator({
  uploadProgress,
}: {
  uploadProgress: number;
}) {
  return (
    <div
      className={`radial-progress text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
      style={{ "--value": uploadProgress } as CustomCSSProperties}
      role="progressbar"
    >
      {uploadProgress}%
    </div>
  );
}
