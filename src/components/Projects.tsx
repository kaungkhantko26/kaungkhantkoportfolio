import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Megaphone, Palette } from 'lucide-react';
import { experienceHighlights } from '../data/profile';

const categories = ['All', 'Design', 'Ambassador'] as const;
type Category = typeof categories[number];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filteredProjects = activeCategory === 'All'
    ? experienceHighlights
    : experienceHighlights.filter((item) => item.category === activeCategory);

  const iconMap = {
    Design: Palette,
    Ambassador: Megaphone,
  };

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title mb-4">
              <span className="text-primary">02.</span> Experience
            </h2>
            <p className="section-copy max-w-md">
              The current work history listed in the attached LinkedIn resume, focused on graphic design and student-facing brand work.
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'border border-primary/15 bg-primary/8 text-primary shadow-sm dark:border-primary/40 dark:bg-primary dark:text-white'
                    : 'secondary-button px-5 py-2.5 text-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((item) => {
              const Icon = iconMap[item.category];

              return (
                <motion.div
                  key={`${item.title}-${item.organization}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="section-panel overflow-hidden p-0 group transition-all hover:border-primary/30"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div>
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-mono text-primary">
                          {item.category}
                        </span>
                        <p className="mt-3 text-xs uppercase tracking-[0.2em] text-gray-700 dark:text-gray-300">{item.period}</p>
                      </div>
                      <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="mb-1 text-2xl font-bold group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="mb-4 text-base font-medium text-gray-700 dark:text-gray-300">
                      {item.organization}
                    </p>
                    {item.location && (
                      <p className="mb-4 text-base font-semibold text-primary">{item.location}</p>
                    )}
                    <ul className="space-y-3 text-base leading-7 text-gray-700 dark:text-gray-200">
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
