import { motion } from 'framer-motion';
import { Award, BadgeCheck, Download, GraduationCap, Languages } from 'lucide-react';
import { education, profile } from '../data/profile';

export default function Resume() {
  return (
    <section id="resume" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title mb-4">
              <span className="text-primary">03.</span> Education & Credentials
            </h2>
            <p className="section-copy max-w-2xl">
              A cleaner view of education, certifications, awards, and language proficiency from your LinkedIn resume.
            </p>
          </motion.div>

          <motion.a
            href={profile.cvUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="secondary-button"
          >
            <Download className="h-5 w-5 text-primary" /> Download Resume (PDF)
          </motion.a>
        </div>

        <div className="grid gap-12">
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-panel"
          >
              <h3 className="mb-8 flex items-center gap-3 text-3xl font-bold">
                <GraduationCap className="h-6 w-6 text-primary" /> Education
              </h3>

            <div className="grid gap-5 lg:grid-cols-2">
              {education.map((item) => (
                <article
                  key={`${item.institution}-${item.award}`}
                  className="rounded-2xl border border-primary/10 bg-white/80 p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950/60"
                >
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-mono uppercase tracking-[0.24em] text-primary">{item.institution}</p>
                      <h4 className="mt-3 text-2xl font-bold leading-snug">{item.award}</h4>
                    </div>
                    {item.period && (
                      <span className="rounded-full border border-primary/12 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                        {item.period}
                      </span>
                    )}
                  </div>

                  <ul className="space-y-3 text-base leading-8 text-gray-700 dark:text-gray-200">
                    {item.details.map((detail) => (
                      <li key={detail} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-panel"
          >
              <h3 className="mb-8 flex items-center gap-3 text-3xl font-bold">
                <BadgeCheck className="h-6 w-6 text-primary" /> Certifications
              </h3>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {profile.certifications.map((item) => (
                <article
                  key={`${item.title}-${item.issuer}`}
                  className="rounded-2xl border border-primary/10 bg-white/80 p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950/60"
                >
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                    <p className="text-xs font-mono uppercase tracking-[0.24em] text-primary">{item.issuer}</p>
                    {item.issued && (
                      <span className="rounded-full bg-primary/8 px-3 py-1 text-xs font-medium text-primary">
                        {item.issued}
                      </span>
                    )}
                  </div>

                  <h4 className="text-xl font-bold leading-snug">{item.title}</h4>

                  <div className="mt-4 space-y-2 text-base leading-7 text-gray-700 dark:text-gray-200">
                    {item.credentialId && (
                      <p>
                        <span className="font-semibold text-gray-900 dark:text-white">Credential ID:</span>{' '}
                        {item.credentialId}
                      </p>
                    )}
                    {item.skills && item.skills.length > 0 && (
                      <p>
                        <span className="font-semibold text-gray-900 dark:text-white">Skills:</span>{' '}
                        {item.skills.join(', ')}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </motion.section>

          <div className="grid gap-12 lg:grid-cols-2">
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-panel"
            >
              <h3 className="mb-8 flex items-center gap-3 text-3xl font-bold">
                <Award className="h-6 w-6 text-primary" /> Honors & Awards
              </h3>

              <div className="grid gap-4">
                {profile.honors.map((item) => (
                  <article
                    key={item}
                    className="rounded-2xl border border-primary/10 bg-white/80 px-5 py-4 shadow-sm dark:border-gray-800 dark:bg-gray-950/60"
                  >
                    <p className="text-xs font-mono uppercase tracking-[0.24em] text-primary">Award</p>
                    <h4 className="mt-2 text-xl font-bold">{item}</h4>
                  </article>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-panel"
            >
              <h3 className="mb-8 flex items-center gap-3 text-3xl font-bold">
                <Languages className="h-6 w-6 text-primary" /> Languages
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                {profile.languages.map((item) => {
                  const [language, level] = item.split(': ');

                  return (
                    <article
                      key={item}
                      className="rounded-2xl border border-primary/10 bg-white/80 px-5 py-4 shadow-sm dark:border-gray-800 dark:bg-gray-950/60"
                    >
                      <p className="text-xs font-mono uppercase tracking-[0.24em] text-primary">Language</p>
                      <h4 className="mt-2 text-xl font-bold">{language}</h4>
                      {level && (
                        <p className="mt-2 text-base leading-7 text-gray-700 dark:text-gray-200">{level}</p>
                      )}
                    </article>
                  );
                })}
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </section>
  );
}
