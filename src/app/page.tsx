import Hero from "@/components/home/Hero";
import Projects from "@/components/projects/Projects";
import Skills from "@/components/skills/Skills";
import Resume from "@/components/resume/Resume";
import Contact from "@/components/contact/Contact";

export default function Home() {
  return (
    <div className="space-y-24 py-16">
      <section id="home">
        <Hero />
      </section>
      <section id="projects" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Projects</h2>
        <Projects />
      </section>
      <section id="skills" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Skills</h2>
        <Skills />
      </section>
      <section id="resume" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Resume</h2>
        <Resume />
      </section>
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Contact</h2>
        <Contact />
      </section>
    </div>
  );
}
