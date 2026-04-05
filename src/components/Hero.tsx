import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { ArrowRight, FileText, Globe, Linkedin, Mail, MapPin, Send } from 'lucide-react';
import { profile } from '../data/profile';

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-start"
        >
          <h2 className="section-kicker mb-5">
            Open for work
          </h2>
          <h1 className="mb-5 text-5xl md:text-7xl font-display font-bold tracking-tight">
            {profile.name}
          </h1>
          <div className="mb-7 text-3xl md:text-5xl font-display font-semibold leading-tight text-gray-800 dark:text-gray-200">
            <Typewriter
              options={{
                strings: [...profile.heroLines],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30,
              }}
            />
          </div>
          <p className="mb-10 max-w-2xl text-xl leading-9 text-gray-800 dark:text-gray-200">
            {profile.summary}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="primary-button"
            >
              View Experience <ArrowRight className="w-5 h-5" />
            </motion.a>
            <motion.a
              href={profile.cvUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="secondary-button"
            >
              Download Resume <FileText className="w-5 h-5 text-primary" />
            </motion.a>
            <div className="flex items-center gap-3">
              <a
                href={profile.website}
                target="_blank"
                rel="noreferrer"
                className="icon-button"
                aria-label="Website"
              >
                <Globe className="w-6 h-6" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="icon-button"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a href={`mailto:${profile.email}`} className="icon-button" aria-label="Email">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <div className="section-panel relative z-10 w-full overflow-hidden rounded-[1.75rem] p-6 md:p-8">
            <div className="rounded-[1.35rem] border border-primary/10 bg-white/60 p-8 dark:bg-white/3">
              <div className="section-kicker border-primary/10 bg-white dark:bg-gray-950/80">
                Computer Science + Design
              </div>

              <div className="mt-8 space-y-4">
                {profile.quickFacts.map((fact) => (
                  <div key={fact.label} className="rounded-2xl border border-primary/8 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950/80">
                    <p className="text-xs uppercase tracking-[0.25em] text-gray-700 dark:text-gray-300">{fact.label}</p>
                    <p className="mt-2 text-xl font-semibold leading-snug">{fact.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-primary/8 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950/80">
                  <div className="flex items-center gap-3 text-primary">
                    <MapPin className="w-5 h-5" />
                    <span className="font-medium">Base</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">{profile.location}</p>
                </div>
                <div className="rounded-2xl border border-primary/8 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950/80">
                  <div className="flex items-center gap-3 text-primary">
                    <Send className="w-5 h-5" />
                    <span className="font-medium">Direct contact</span>
                  </div>
                  <a href={`mailto:${profile.email}`} className="mt-3 block text-sm leading-relaxed text-gray-700 hover:text-primary dark:text-gray-300">
                    {profile.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-primary/12 blur-3xl" />
          <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-secondary/12 blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
}
