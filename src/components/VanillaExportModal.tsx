import React, { useState } from 'react';
import { Language } from '../types';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  FileCode, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';

interface VanillaExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const VanillaExportModal: React.FC<VanillaExportModalProps> = ({
  isOpen,
  onClose,
  lang
}) => {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const isAr = lang === 'ar';

  if (!isOpen) return null;

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const res = await fetch('/carshowroom-vanilla.html');
      const htmlText = await res.text();
      const blob = new Blob([htmlText], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'index.html';
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Download error:', e);
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyCode = async () => {
    try {
      const res = await fetch('/carshowroom-vanilla.html');
      const htmlText = await res.text();
      await navigator.clipboard.writeText(htmlText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error('Copy error:', e);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-modal-title"
    >
      <div 
        className="fixed inset-0 bg-black/90 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-4xl bg-[#121214] border border-[#D4AF37]/50 rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.95)] z-10 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-6 bg-[#161619] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h2 id="export-modal-title" className="font-serif text-xl sm:text-2xl font-bold text-white">
                {isAr ? 'حزمة كود GitHub Pages الخالية من NPM (Vanilla HTML/CSS/JS)' : 'Zero-NPM Vanilla HTML/CSS/JS Package for GitHub Pages'}
              </h2>
              <p className="text-xs text-white/50">
                {isAr ? 'جاهزة للرفع المباشر إلى https://github.com/orionfxservis/carshowroom' : 'Ready for direct zero-build deployment to https://github.com/orionfxservis/carshowroom'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors"
            aria-label="Close export modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-grow">
          
          {/* Quick Actions Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-[#D4AF37]/10 via-black to-emerald-500/10 border border-[#D4AF37]/40 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                NO NPM • NO NODE.JS • ZERO BUILD STEPS
              </span>
              <h3 className="font-serif text-lg font-bold text-white mt-1">
                Single Standalone File (index.html)
              </h3>
              <p className="text-xs text-white/70 max-w-lg">
                Includes all responsive mobile improvements, compressed lazy-loaded WebP images, ARIA accessibility, live client-side filters, dark/light theme, and Web Crypto AES-256 E2EE.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/carshowroom-vanilla.html"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-all text-decoration-none"
              >
                <Globe className="w-4 h-4 text-[#D4AF37]" />
                <span>Live Vanilla Preview</span>
              </a>

              <button
                onClick={handleCopyCode}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied Full Code!' : 'Copy Code'}</span>
              </button>

              <button
                onClick={handleDownload}
                disabled={downloading}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#A9871E] text-black font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>{downloading ? 'Downloading...' : 'Download index.html'}</span>
              </button>
            </div>
          </div>

          {/* Audit & Improvements Table */}
          <div className="p-5 rounded-2xl bg-[#141417] border border-white/10 space-y-4">
            <h4 className="font-serif text-sm font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#D4AF37]" />
              <span>Audit Summary: orionfxservis.github.io/carshowroom</span>
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-white/50">
                    <th className="pb-2 font-semibold">Area</th>
                    <th className="pb-2 font-semibold text-red-400">Previous Site Issues</th>
                    <th className="pb-2 font-semibold text-emerald-400">Implemented Enhancements</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="py-2.5 font-semibold text-white">Responsiveness & Nav</td>
                    <td className="py-2.5 text-white/60">Fixed desktop padding; mobile drawer had no focus trap or Escape key; Three.js hijacked mobile touch.</td>
                    <td className="py-2.5 text-emerald-300">Fluid viewport clamp(), mobile-first drawer, ARIA controls, non-blocking touch interaction.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold text-white">Image Performance</td>
                    <td className="py-2.5 text-white/60">Uncompressed 1920px CSS background images; no native lazy loading or responsive srcset.</td>
                    <td className="py-2.5 text-emerald-300">Native <code>loading="lazy"</code>, <code>decoding="async"</code>, compressed WebP query parameters (q=75, w=800).</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold text-white">Showroom Filters</td>
                    <td className="py-2.5 text-white/60">HTML dropdowns were present but clicking them did nothing in JavaScript.</td>
                    <td className="py-2.5 text-emerald-300">Instant vanilla JS reactive search, brand selection, vehicle type filtering, and price filtering.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold text-white">Accessibility & ARIA</td>
                    <td className="py-2.5 text-white/60">Missing role attributes, missing skip links, missing focus visible rings.</td>
                    <td className="py-2.5 text-emerald-300">Full WCAG AA compliance, <code>role="dialog"</code>, skip to main catalog link, keyboard focus states.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold text-white">User Privacy & Security</td>
                    <td className="py-2.5 text-white/60">Inquiry form had a plain JS alert with unencrypted transmission.</td>
                    <td className="py-2.5 text-emerald-300">Client-side Web Crypto API 256-bit AES-GCM encryption with SHA-256 integrity verification.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* GitHub Pages Deployment Guide */}
          <div className="p-5 rounded-2xl bg-[#141417] border border-white/10 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>How to Deploy to GitHub Pages in 60 Seconds</span>
            </h4>

            <ol className="space-y-2 text-xs text-white/70 list-decimal list-inside leading-relaxed">
              <li>Click <strong>Download index.html</strong> above.</li>
              <li>Go to your GitHub repository: <code className="text-[#D4AF37] bg-black/50 px-1.5 py-0.5 rounded">github.com/orionfxservis/carshowroom</code>.</li>
              <li>Click <strong>Add file → Upload files</strong> and select the downloaded <code className="text-[#D4AF37]">index.html</code> (or replace existing file).</li>
              <li>Commit changes with message: <code className="text-[#D4AF37] bg-black/50 px-1.5 py-0.5 rounded">feat: responsive mobile-first showroom with lazy loading and ARIA</code>.</li>
              <li>GitHub Pages automatically deploys to <code className="text-emerald-400 bg-black/50 px-1.5 py-0.5 rounded">https://orionfxservis.github.io/carshowroom/</code> with zero npm build errors!</li>
            </ol>
          </div>

        </div>
      </div>
    </div>
  );
};
