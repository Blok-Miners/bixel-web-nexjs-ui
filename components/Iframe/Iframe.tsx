export default function Iframe() {
  return (
    <div className="w-full h-fit overflow-hidden rounded-lg border border-th-accent-2">
      {/* <video controls className="aspect-video h-full w-full rounded-lg">
        <source src="/videos/explaination.mp4" />
      </video> */}
      <iframe
        width="853"
        height="853"
        src={`https://www.youtube.com/embed/lyrbeXFTHB0`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded YouTube"
        className="h-[300px] w-full"
      />
    </div>
  )
}
