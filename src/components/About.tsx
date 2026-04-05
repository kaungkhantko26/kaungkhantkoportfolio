import { motion } from 'framer-motion';
import { BadgeCheck, Code2, Languages } from 'lucide-react';
import { profile } from '../data/profile';

const pillars = [
  { name: 'Core Skills', icon: <Code2 />, items: profile.skills },
  { name: 'Certifications', icon: <BadgeCheck />, items: profile.certifications.map((item) => item.title) },
  { name: 'Languages', icon: <Languages />, items: profile.languages },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title mb-8">
              <span className="text-primary">01.</span> About Me
            </h2>
            <div className="space-y-6 text-xl text-gray-800 dark:text-gray-200 leading-9">
              <p>
                {profile.name} works at the intersection of visual communication and software, combining junior graphic design experience with ongoing computer science study.
              </p>
              <p>
                The attached LinkedIn resume shows hands-on work in branding, posters, packaging, and social media graphics, alongside a strong interest in TypeScript and practical digital problem solving.
              </p>
              <p>
                This portfolio is now structured as a real profile hub: direct contact, downloadable resume, current education, professional roles, certifications, and recognitions in one place.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 gap-6"
          >
            {pillars.map((pillar) => (
              <div key={pillar.name} className="section-panel transition-colors group hover:border-primary/30">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  {pillar.icon}
                </div>
                <h3 className="mb-4 text-2xl font-bold">{pillar.name}</h3>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {pillar.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-base text-gray-700 dark:text-gray-200">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
