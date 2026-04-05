import { profile } from '../data/profile';

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-gray-100 dark:border-gray-900">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-xl font-display font-bold text-primary dark:text-white">{profile.name}</span>
          <p className="text-sm text-gray-700 dark:text-gray-200">© 2026 {profile.name}. All rights reserved.</p>
        </div>

        <div className="flex gap-8">
          <a href={profile.website} target="_blank" rel="noreferrer" className="text-sm text-gray-700 dark:text-gray-200 hover:text-primary transition-colors">Website</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-sm text-gray-700 dark:text-gray-200 hover:text-primary transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
