"use client";

import { motion, useReducedMotion } from "framer-motion";

const signatureCakes = [
  {
    name: "L'Or Noir",
    notes: "Dark cocoa, espresso ganache, sea salt",
    size: "6 in / 8 in / 10 in",
    mood: "Deep, dramatic, after-dinner",
  },
  {
    name: "Vanille Impériale",
    notes: "Madagascar vanilla, white chocolate, almond",
    size: "6 in / 8 in / 10 in",
    mood: "Soft, luminous, celebration-ready",
  },
  {
    name: "Rose Praline",
    notes: "Pistachio sponge, praline cream, rose glaze",
    size: "6 in / 8 in / 10 in",
    mood: "Floral, elegant, refined",
  },
  {
    name: "Citrus Atelier",
    notes: "Lemon curd, almond sponge, candied peel",
    size: "6 in / 8 in / 10 in",
    mood: "Bright, clean, modern",
  },
];

const serviceSteps = [
  {
    title: "Choose your direction",
    text: "Share the occasion, serving size, and flavor profile. We shape the concept around the mood of the event.",
  },
  {
    title: "Design the composition",
    text: "Flavors, finish, palette, garnish, and message are refined into a visual plan before the bake begins.",
  },
  {
    title: "Bake, build, and finish",
    text: "Every layer is assembled with the same precision as the hero sequence: deliberate, balanced, and polished.",
  },
  {
    title: "Deliver with care",
    text: "Final presentation, transport, and handoff are handled with the same attention as the cake itself.",
  },
];

const testimonials = [
  {
    quote: "The cake looked like a gallery piece and tasted even better. Every detail felt considered.",
    author: "Ariana M.",
    role: "Wedding client",
  },
  {
    quote: "The custom flavor pairing was thoughtful and the service felt calm, premium, and personal.",
    author: "Daniel R.",
    role: "Corporate order",
  },
  {
    quote: "It arrived exactly as promised, beautifully finished, and became the centerpiece of the night.",
    author: "Mina S.",
    role: "Birthday celebration",
  },
];

const stats = [
  { value: "48h", label: "Custom inquiry turnaround" },
  { value: "12", label: "Signature flavor combinations" },
  { value: "100%", label: "Made to order" },
];

const sectionReveal = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

function revealTransition(index = 0) {
  return {
    duration: 0.8,
    delay: index * 0.08,
    ease: [0.16, 1, 0.3, 1] as const,
  };
}

export default function BakeryExperience() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative z-10">
      <section id="menu" className="relative overflow-hidden border-t border-white/5 px-6 py-28 md:px-12 md:py-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(198,165,91,0.12),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(170,139,107,0.10),transparent_34%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.82fr_1.18fr]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            variants={sectionReveal}
            transition={revealTransition()}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <span className="mb-5 block text-xs tracking-[0.3em] text-[#C6A15B] uppercase">
              Signature Menu
            </span>
            <h2 className="max-w-md text-4xl leading-[1.02] tracking-tight text-white md:text-6xl font-serif">
              Cakes designed to feel occasion-specific, not generic.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/60 font-light">
              A refined menu with clear flavor profiles, visual moods, and serving sizes that make choosing feel effortless.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                  variants={sectionReveal}
                  transition={revealTransition(index)}
                  className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 backdrop-blur-sm"
                >
                  <div className="text-2xl font-serif text-white md:text-3xl">{stat.value}</div>
                  <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-white/45">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2">
            {signatureCakes.map((cake, index) => (
              <motion.article
                key={cake.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={sectionReveal}
                transition={revealTransition(index)}
                whileHover={reduceMotion ? undefined : { y: -8, rotate: index % 2 === 0 ? -0.35 : 0.35 }}
                className="group overflow-hidden rounded-[1.5rem] border border-white/8 bg-[linear-gradient(180deg,rgba(33,23,17,0.88),rgba(18,13,10,0.92))] shadow-[0_24px_80px_rgba(0,0,0,0.24)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[radial-gradient(circle_at_50%_35%,rgba(198,165,91,0.24),transparent_28%),linear-gradient(180deg,#392418,#211711)]">
                  <motion.div
                    animate={reduceMotion ? undefined : { scale: [1, 1.06, 1] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(255,255,255,0.08),transparent_42%)]"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent" />
                  <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/20 px-3 py-1 text-[10px] tracking-[0.22em] text-white/70 uppercase backdrop-blur-sm">
                    {cake.mood}
                  </div>
                  <div className="absolute inset-0 flex items-end p-6">
                    <div>
                      <div className="text-sm tracking-[0.3em] text-[#C6A15B] uppercase">
                        Atelier {String(index + 1).padStart(2, "0")}
                      </div>
                      <h3 className="mt-3 text-3xl font-serif text-white">{cake.name}</h3>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 p-6">
                  <p className="text-sm leading-relaxed text-white/58">{cake.notes}</p>
                  <div className="flex items-center justify-between border-t border-white/6 pt-4 text-[11px] tracking-[0.18em] text-white/42 uppercase">
                    <span>{cake.size}</span>
                    <span>Custom finish</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="relative overflow-hidden border-t border-white/5 px-6 py-28 md:px-12 md:py-36">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,12,9,0),rgba(17,12,9,0.45)),radial-gradient(circle_at_top,rgba(198,165,91,0.09),transparent_42%)]" />
        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            variants={sectionReveal}
              transition={revealTransition()}
            className="mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <span className="mb-5 block text-xs tracking-[0.3em] text-[#C6A15B] uppercase">
                Bespoke Process
              </span>
              <h2 className="max-w-xl text-4xl tracking-tight text-white md:text-6xl font-serif">
                A calm, premium process from inquiry to delivery.
              </h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-white/60 font-light">
              The experience is designed to feel editorial but efficient: you can move from inspiration to confirmed order without friction.
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={sectionReveal}
              className="rounded-[2rem] border border-white/8 bg-white/[0.03] p-6 md:p-8"
            >
              <div className="flex items-center justify-between border-b border-white/8 pb-5">
                <div>
                  <div className="text-[10px] tracking-[0.24em] text-white/40 uppercase">
                    Process timeline
                  </div>
                  <div className="mt-2 text-2xl font-serif text-white">Simple, elegant, precise</div>
                </div>
                <div className="text-right text-[10px] tracking-[0.22em] text-white/35 uppercase">
                  Avg. lead time
                  <div className="mt-2 text-2xl font-serif text-[#C6A15B]">3-7 Days</div>
                </div>
              </div>

              <div className="mt-8 space-y-5">
                {serviceSteps.map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.35 }}
                    variants={sectionReveal}
                    transition={revealTransition(index)}
                    className="grid gap-4 rounded-2xl border border-white/6 bg-black/10 p-5 md:grid-cols-[72px_1fr]"
                  >
                    <div className="flex items-start gap-4 md:block">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#C6A15B]/25 bg-[#C6A15B]/10 text-sm text-[#C6A15B]">
                        0{index + 1}
                      </div>
                      <div className="md:mt-4 h-px flex-1 bg-gradient-to-r from-[#C6A15B]/40 to-transparent md:w-12" />
                    </div>
                    <div>
                      <h3 className="text-xl font-serif text-white md:text-2xl">{step.title}</h3>
                      <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/58">{step.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="grid gap-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.28 }}
                variants={sectionReveal}
                transition={revealTransition()}
                className="rounded-[2rem] border border-white/8 bg-[linear-gradient(135deg,rgba(65,28,9,0.95),rgba(33,23,17,0.95))] p-6 md:p-8"
              >
                <span className="text-[10px] tracking-[0.24em] text-[#C6A15B] uppercase">
                  Built for events
                </span>
                <h3 className="mt-4 text-3xl font-serif text-white md:text-4xl">
                  Weddings, birthdays, gifting, and corporate moments.
                </h3>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/65">
                  Each order is adapted to the scale of the event, with a finish that feels intentional from the first cut to the final slice.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    "Celebration cakes",
                    "Mini dessert towers",
                    "Branded corporate cakes",
                    "Gift-ready boxes",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-4 text-sm text-white/80"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.28 }}
                variants={sectionReveal}
                transition={revealTransition()}
                className="rounded-[2rem] border border-white/8 bg-white/[0.03] p-6 md:p-8"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] tracking-[0.24em] text-white/40 uppercase">
                      Trust signal
                    </span>
                    <div className="mt-2 text-2xl font-serif text-white">Loved for the details</div>
                  </div>
                  <div className="h-12 w-12 rounded-full border border-white/10 bg-[radial-gradient(circle,rgba(198,165,91,0.35),rgba(198,165,91,0.08))]" />
                </div>

                <div className="mt-6 grid gap-4">
                  {[
                    "Clear communication from inquiry to delivery",
                    "Premium finishes that photograph beautifully",
                    "Flavors that stay balanced even in larger formats",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm text-white/60">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#C6A15B]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section id="visit" className="relative overflow-hidden border-t border-white/5 px-6 py-28 md:px-12 md:py-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(170,139,107,0.12),transparent_38%),linear-gradient(180deg,rgba(18,13,10,0.5),rgba(18,13,10,0.9))]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionReveal}
            transition={revealTransition()}
          >
            <span className="mb-5 block text-xs tracking-[0.3em] text-[#C6A15B] uppercase">
              Visit / Order
            </span>
            <h2 className="max-w-2xl text-4xl tracking-tight text-white md:text-6xl font-serif">
              Designed to make ordering feel as elevated as the cake itself.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 font-light">
              Whether you want a tasting-style menu, a custom celebration piece, or a fast-turnaround gift order, the experience should feel premium and clear from the first tap.
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {testimonials.map((item, index) => (
                <motion.figure
                  key={item.author}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.28 }}
                  variants={sectionReveal}
                  transition={revealTransition(index)}
                  className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-5"
                >
                  <blockquote className="text-sm leading-relaxed text-white/70">
                    “{item.quote}”
                  </blockquote>
                  <figcaption className="mt-5 border-t border-white/8 pt-4">
                    <div className="text-sm text-white">{item.author}</div>
                    <div className="mt-1 text-[10px] tracking-[0.2em] text-white/40 uppercase">
                      {item.role}
                    </div>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </motion.div>

          <motion.aside
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionReveal}
            transition={revealTransition()}
            className="rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(33,23,17,0.95),rgba(18,13,10,0.95))] p-6 md:p-8"
          >
            <div className="space-y-8">
              <div>
                <span className="text-[10px] tracking-[0.24em] text-white/40 uppercase">
                  Atelier details
                </span>
                <div className="mt-4 text-2xl font-serif text-white md:text-3xl">
                  Open for inquiries
                </div>
              </div>

              <div className="grid gap-4 text-sm text-white/65">
                <div className="flex items-center justify-between border-b border-white/8 pb-4">
                  <span>Studio</span>
                  <span>Atelier V</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/8 pb-4">
                  <span>Response time</span>
                  <span>Within 48 hours</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/8 pb-4">
                  <span>Orders</span>
                  <span>Custom + celebration</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/8 pb-4">
                  <span>Contact</span>
                  <span>hello@atelierv.com</span>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-[#C6A15B]/20 bg-[#C6A15B]/10 p-5">
                <div className="text-[10px] tracking-[0.24em] text-[#C6A15B] uppercase">
                  Ready to order
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/68">
                  Start with an inquiry, share your date, and let the menu guide you toward the right composition.
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <button className="rounded-full bg-white px-6 py-3 text-[10px] font-medium tracking-[0.2em] text-[#120D0A] uppercase transition-transform duration-300 hover:-translate-y-0.5">
                    Place Inquiry
                  </button>
                  <button className="rounded-full border border-white/15 px-6 py-3 text-[10px] tracking-[0.2em] text-white uppercase transition-colors duration-300 hover:bg-white/5">
                    View Menu PDF
                  </button>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>
    </div>
  );
}