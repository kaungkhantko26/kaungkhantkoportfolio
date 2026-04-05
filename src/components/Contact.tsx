import { motion } from 'framer-motion';
import { FileText, Globe, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { profile } from '../data/profile';

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4 justify-center">
            <span className="text-primary">04.</span> Get In Touch
          </h2>
          <p className="section-copy mx-auto">
            Reach out for graphic design work, front-end builds, portfolio collaborations, or student ambassador opportunities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="space-y-8">
            <div className="section-panel shadow-sm">
              <h3 className="mb-8 text-2xl font-bold">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 dark:text-gray-200">Email</p>
                    <a href={`mailto:${profile.email}`} className="font-bold hover:text-primary transition-colors">{profile.email}</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 dark:text-gray-200">Location</p>
                    <p className="font-bold">{profile.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 dark:text-gray-200">Phone</p>
                    <a href={`tel:${profile.phone.replace(/\s+/g, '')}`} className="font-bold hover:text-primary transition-colors">{profile.phone}</a>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <p className="mb-4 text-sm text-gray-700 dark:text-gray-200">Profile Links</p>
                <div className="flex gap-4">
                  <a href={profile.website} target="_blank" rel="noreferrer" className="icon-button" aria-label="Website">
                    <Globe className="w-5 h-5" />
                  </a>
                  <a href={profile.linkedin} target="_blank" rel="noreferrer" className="icon-button" aria-label="LinkedIn">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href={profile.cvUrl} target="_blank" rel="noreferrer" className="icon-button" aria-label="Resume PDF">
                    <FileText className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="section-panel shadow-sm space-y-8">
              <div>
                <h3 className="mb-4 text-3xl font-bold">Ways to work together</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base leading-7 text-gray-700 dark:text-gray-200">
                  <div className="rounded-2xl border border-primary/10 p-5 dark:border-gray-800">
                    Graphic design support for posters, branding, packaging, and social media.
                  </div>
                  <div className="rounded-2xl border border-primary/10 p-5 dark:border-gray-800">
                    Front-end and TypeScript work that connects design with implementation.
                  </div>
                  <div className="rounded-2xl border border-primary/10 p-5 dark:border-gray-800">
                    Portfolio and personal-brand site work for students and creators.
                  </div>
                  <div className="rounded-2xl border border-primary/10 p-5 dark:border-gray-800">
                    Campus-facing collaborations, ambassador programs, and creative campaigns.
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-6">
                <p className="text-base text-gray-700 dark:text-gray-200 leading-relaxed">
                  Fastest contact route: <a href={`mailto:${profile.email}`} className="font-semibold text-primary hover:underline">{profile.email}</a>
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="primary-button"
                >
                  Email Directly <Mail className="w-5 h-5" />
                </a>
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noreferrer"
                  className="secondary-button"
                >
                  Visit Portfolio <Globe className="w-5 h-5 text-primary" />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="secondary-button"
                >
                  Open LinkedIn <Linkedin className="w-5 h-5 text-primary" />
                </a>
                <a
                  href={profile.cvUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="secondary-button"
                >
                  Download Resume <FileText className="w-5 h-5 text-primary" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
