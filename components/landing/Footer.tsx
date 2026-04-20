import { kapable } from '@/content/kapable'

export default function Footer() {
  const { footer } = kapable

  return (
    <footer className="bg-ink border-t border-white/5 py-8 px-5 sm:px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Brand */}
        <span className="font-display font-bold text-lg text-white/80 select-none">
          {footer.brand}
        </span>

        {/* Links */}
        <nav aria-label="Footer navigation" className="flex gap-6">
          {footer.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-sans text-sm text-white/40 hover:text-white/70 transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <p className="font-sans text-xs text-white/25 text-center sm:text-right">
          © {new Date().getFullYear()} Kapable. All rights reserved.
        </p>

      </div>
    </footer>
  )
}
