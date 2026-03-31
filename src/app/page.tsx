import ScrollyCanvas from "@/components/ScrollyCanvas";
import ProjectsGrid from "@/components/Projects";

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen text-white">
      {/* 
        frameCount is the total number of frames in your /Sequence folder.
        Adjust this number to match exactly how many frames you have.
      */}
      <ScrollyCanvas frameCount={75} framePrefix="frame_" />
      
      {/* 
        This is the work grid section that will appear naturally 
        after the 500vh scroll sequence completes.
      */}
      <ProjectsGrid />
    </main>
  );
}
