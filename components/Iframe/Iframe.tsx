export default function Iframe() {
  return (
    <div className=" w-[500px] overflow-hidden border border-th-accent-2 rounded-lg">
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
        className="w-full h-[300px]"
      />
    </div>
  )
}
