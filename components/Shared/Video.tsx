export default function Video({ src }: { src: string }) {
  return (
    <video
      className="aspect-video w-full overflow-hidden rounded-lg border border-th-accent-2"
      controls
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}
