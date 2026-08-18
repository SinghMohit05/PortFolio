import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import ProjectCard from "@/components/sections/ProjectCard";
import Timeline from "@/components/sections/Timeline";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import CursorSpotlight from "@/components/ui/CursorSpotlight";

export default function Home() {
  return (
    <>
      <CursorSpotlight />
      <div className="fixed inset-0 w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#888888]/5 via-transparent to-transparent pointer-events-none z-[-1]" />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Skills />
        <ProjectCard />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
