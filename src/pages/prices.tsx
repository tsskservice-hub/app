import { useState, useEffect } from "react";
import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { Sparkles, ArrowRight, ShieldCheck, Sun, Moon, Check, ShoppingBag, GraduationCap, Mic } from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "Pricing & Plans - JP Tutor AI Yamato" },
    { name: "description", content: "Choose your ideal learning plan or select individual app modules for VCE Japanese success." },
  ];
};

export default function Prices() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isDarkModeActive = savedTheme === "dark" || (!savedTheme && document.documentElement.classList.contains("dark"));
    
    setIsDark(isDarkModeActive);
    if (isDarkModeActive) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
      
      {/* ヘッダー */}
      <header className="border-b border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl overflow-hidden shadow-md shadow-indigo-500/20 flex items-center justify-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <img 
                src="/jptutoraiyamato.png" 
                alt="JP Tutor AI Yamato Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-600 dark:from-white dark:via-slate-200 dark:to-indigo-300 bg-clip-text text-transparent">
              JP Tutor AI Yamato
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-800 shadow-sm cursor-pointer select-none"
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <span className="inline-flex items-center gap-1.5">
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">Light</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5">
                  <Moon className="w-4 h-4 text-indigo-600" />
                  <span className="hidden sm:inline">Dark</span>
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        
        {/* ページタイトル */}
        <section className="pt-14 pb-8 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-300 text-xs sm:text-sm font-medium mb-4 shadow-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>Transparent & Flexible Pricing</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            Plans & Pricing Options
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Choose an all-in-one package for maximum value, or select individual applications tailored precisely to your goals.
          </p>
        </section>

        {/* ① セットプラン（All-in-one Packages）セクション */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="mb-10">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Recommended Packages (All-in-One)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              The smartest way to get complete coverage for your Japanese learning journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            
            {/* 1. Free Plan */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm">
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Free</div>
                <div className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">$0 <span className="text-xs font-normal text-slate-500">/ forever</span></div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  Access to traditional games, Genkoyoshi editor, and basic community features.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 mb-6">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Free Traditional Games (Go, Hanafuda)</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Genkoyoshi Grid & PDF Tool</li>
                </ul>
              </div>
              <Link
                to="/"
                className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-center transition-all"
              >
                Get Started Free
              </Link>
            </div>

            {/* 2. Junior Years */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm">
              <div>
                <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">Junior Years</div>
                <div className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">$98 <span className="text-xs font-normal text-slate-500">/ year</span></div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  Foundational modules and interactive vocabulary building for Year 7-10 students.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 mb-6">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-500 flex-shrink-0" /> Year 7-10 Curriculum Support</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-500 flex-shrink-0" /> Interactive Vocab & Audio Drills</li>
                </ul>
              </div>
              <span className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-slate-100 dark:bg-slate-800/60 text-slate-400 text-center cursor-not-allowed">
                Coming Soon
              </span>
            </div>

            {/* 3. VCE Senior Pass */}
            <div className="bg-gradient-to-b from-indigo-900 to-slate-900 rounded-3xl p-6 border-2 border-indigo-500 text-white flex flex-col justify-between shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                Best Value 🌟
              </div>
              <div>
                <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2">VCE Senior Pass</div>
                <div className="text-3xl font-extrabold text-white mb-4">$198 <span className="text-xs font-normal text-indigo-200">/ year</span></div>
                <p className="text-xs text-indigo-200 mb-6 leading-relaxed">
                  All-in-one package for Year 11-12 students. Complete exam prep & unlimited coaching.
                </p>
                <ul className="space-y-2.5 text-xs text-indigo-100 mb-6">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Full VCE Writing AI Tutor (110 Qs)</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 flex-shrink-0" /> VCE Oral Exam Audio Hub & AI Practice</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Unlimited AI Yamato Chat Coaching</li>
                </ul>
              </div>
              <a
                href="https://vceeoywriting.jptutoraiyamato.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white text-center shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <span>Select VCE Senior Pass</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* 4. School License */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm">
              <div>
                <div className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-2">School License</div>
                <div className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">Custom</div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  Enterprise solution for Japanese language departments and classroom teachers.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 mb-6">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-500 flex-shrink-0" /> Multi-Student Access & Teacher Dashboard</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-500 flex-shrink-0" /> Priority Support & Custom Setup</li>
                </ul>
              </div>
              <a
                href="mailto:support@jptutoraiyamato.com"
                className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-purple-600 hover:bg-purple-500 text-white text-center transition-all"
              >
                Contact for School
              </a>
            </div>

          </div>
        </section>

        {/* 区切り線 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="border-t border-slate-200 dark:border-slate-800" />
        </div>

        {/* ② 単品購入メニュー（Alacarte / Single Apps）セクション */}
        <section id="alacarte" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 scroll-mt-24">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium mb-3">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>A La Carte Options</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Individual App & Module Purchase Menu
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl mx-auto">
              Looking for a specific feature only? Purchase individual apps separately. (Tip: Adding just $68 more gives you the full VCE Senior Pass above!)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 単品 1: VCE Oral Exam Prep */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
                    <Mic className="w-5 h-5" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    $130 <span className="text-xs font-normal text-slate-500">/ year</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  VCE Oral Exam AI Tutor Module
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Specialised oral exam simulation featuring Whisper speech-to-text, interactive examiner questions, and AI audio feedback.
                </p>
              </div>
              <a
                href="https://vceeoywriting.jptutoraiyamato.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-center transition-all flex items-center justify-center gap-1.5"
              >
                <span>Buy Oral Exam App Only ($130)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* 単品 2: VCE Writing AI Tutor */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    $130 <span className="text-xs font-normal text-slate-500">/ year</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  VCE Writing AI Tutor Module
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Complete access to 110 original writing questions, handwriting photo evaluation, and detailed VCE-aligned grammar checking.
                </p>
              </div>
              <a
                href="https://vceeoywriting.jptutoraiyamato.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-center transition-all flex items-center justify-center gap-1.5"
              >
                <span>Buy Writing App Only ($130)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </section>

      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-slate-100 dark:bg-slate-950 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} JP Tutor AI Yamato. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link to="/" className="hover:text-slate-700 dark:hover:text-slate-400 transition-colors">Home</Link>
            <span className="hover:text-slate-700 dark:hover:text-slate-400 transition-colors">Powered by AI Yamato</span>
          </div>
        </div>
      </footer>
    </div>
  );
}