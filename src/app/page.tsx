import Navigation from "@/components/Navigation";
import CakeSequence from "@/components/CakeSequence";
import BakeryExperience from "@/components/BakeryExperience";

export default function Home() {
  return (
    <main className="bg-[#120D0A] min-h-screen">
      <Navigation />
      
      {/* 
        The CakeSequence internally has a height of 600vh, triggering the scroll storytelling.
        When scroll passes this, it naturally moves to the next sections.
      */}
      <CakeSequence />
      
      {/* POST-SEQUENCE: The Craft */}
      <section id="craft" className="relative z-10 py-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1">
          <span className="text-[#C6A15B] font-sans text-xs tracking-[0.3em] uppercase block mb-8">
            The Dedication
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight leading-tight mb-8">
            Made slowly.<br />Remembered instantly.
          </h2>
          <p className="text-white/60 font-sans text-base leading-relaxed max-w-md font-light">
            Every layer is a testament to the pursuit of perfection. From the crisp snap of temper to the delicate aeration of the sponge, this is craftsmanship that speaks to both the eye and the palate. The intention is not simply to bake, but to elevate a moment of celebration into an enduring memory.
          </p>
        </div>
        <div className="flex-1 w-full aspect-square md:aspect-[4/5] bg-gradient-to-tr from-[#211711] to-[#291C14] rounded-sm relative overflow-hidden flex items-center justify-center border border-white/5">
          <div className="text-white/20 font-serif text-sm">Editoral Image Placeholder</div>
        </div>
      </section>

      {/* POST-SEQUENCE: Collection */}
      <section id="layers" className="relative z-10 py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="text-[#C6A15B] font-sans text-xs tracking-[0.3em] uppercase block mb-4">
              The Collection
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight">
              Signatures of Atelier V
            </h2>
          </div>
          <a href="#" className="font-sans text-xs tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1">
            View All Creations
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Card 1 */}
          <div className="group cursor-pointer">
            <div className="w-full aspect-[4/3] bg-[#211711] mb-6 overflow-hidden relative border border-white/5 flex items-center justify-center">
              <div className="text-white/20 font-serif text-sm transition-transform duration-700 group-hover:scale-105">View Creation</div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-serif text-white mb-2 group-hover:text-[#C6A15B] transition-colors">L&apos;Or Noir</h3>
                <p className="text-white/50 font-sans text-sm font-light">Dark cocoa, espresso ganache, sea salt</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group cursor-pointer">
            <div className="w-full aspect-[4/3] bg-[#211711] mb-6 overflow-hidden relative border border-white/5 flex items-center justify-center">
              <div className="text-white/20 font-serif text-sm transition-transform duration-700 group-hover:scale-105">View Creation</div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-serif text-white mb-2 group-hover:text-[#C6A15B] transition-colors">Vanille Impériale</h3>
                <p className="text-white/50 font-sans text-sm font-light">Madagascar vanilla, white chocolate, almond</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BakeryExperience />

      {/* FOOTER */}
      <footer className="relative z-10 pt-32 pb-12 px-6 md:px-12 border-t border-white/5 flex flex-col items-center">
        <h2 className="text-[12vw] font-serif leading-none tracking-tighter text-white mb-16 opacity-10">
          ATELIER V
        </h2>
        
        <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8 text-xs font-sans tracking-[0.2em] text-white/40 uppercase">
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Journal</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div>
            &copy; 2026 ATELIER V. All Rights Reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
