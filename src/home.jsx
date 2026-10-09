import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Headphones, 
  Mic, 
  MessageSquare, 
  Bot, 
  PenTool, 
  BookOpen, 
  Briefcase, 
  Sparkles, 
  User, 
  Coins, 
  ChevronRight, 
  Lock
} from 'lucide-react';

export default function AppHub() {
  const [activeTab, setActiveTab] = useState('all');

  // 機能カードのデータ定義（Genkoyoshi Editorのリンクを '/editor' に設定）
  const features = [
    {
      id: 'genkou',
      title: 'Genkoyoshi Editor',
      category: 'tools',
      badge: 'Tool',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      description: 'Vertical and horizontal Japanese manuscript layout editor for character counting and drafting compositions.',
      icon: <FileText className="w-6 h-6 text-emerald-600" />,
      link: '/editor',
      status: 'available',
      target: 'All Users'
    },
    {
      id: 'vce-audio',
      title: 'Oral Exam Audio Bank',
      category: 'vce',
      badge: 'VCE Year 12',
      badgeColor: 'bg-indigo-100 text-indigo-800',
      description: 'Practice audio bank featuring predicted VCE Oral Exam questions and native model answer recordings.',
      icon: <Headphones className="w-6 h-6 text-indigo-600" />,
      link: '/oral-exam',
      status: 'available',
      target: 'VCE Students'
    },
    {
      id: 'vce-drill',
      title: 'Oral Exam Quick Drill',
      category: 'vce',
      badge: 'VCE Year 12',
      badgeColor: 'bg-indigo-100 text-indigo-800',
      description: 'Section 1 & 2 quick-response drills to sharpen reflexes and master natural conversational flow.',
      icon: <Mic className="w-6 h-6 text-indigo-600" />,
      link: '/vce/drill',
      status: 'available',
      target: 'VCE Students'
    },
    {
      id: 'vce-elaborate',
      title: 'Oral Exam Elaborate Practice',
      category: 'vce',
      badge: 'VCE Year 12',
      badgeColor: 'bg-indigo-100 text-indigo-800',
      description: 'Training module focused on structuring logical, deep responses and elaborating on detailed study topics.',
      icon: <MessageSquare className="w-6 h-6 text-indigo-600" />,
      link: '/vce/elaborate',
      status: 'available',
      target: 'VCE Students'
    },
    {
      id: 'vce-mock',
      title: 'Mock Oral Simulator',
      category: 'vce',
      badge: 'VCE Year 12',
      badgeColor: 'bg-indigo-100 text-indigo-800',
      description: 'Authentic mock oral examination sessions powered by AI voice dialogue engines (Whisper & Vertex AI).',
      icon: <Bot className="w-6 h-6 text-indigo-600" />,
      link: '/vce/mock-oral',
      status: 'available',
      target: 'VCE Students'
    },
    {
      id: 'vce-writing',
      title: 'Written Exam AI Writing Tutor',
      category: 'vce',
      badge: 'VCE Year 12',
      badgeColor: 'bg-indigo-100 text-indigo-800',
      description: 'VCE writing practice prompts with rubric-aligned grading, kanji validation, and grammar checking.',
      icon: <PenTool className="w-6 h-6 text-indigo-600" />,
      link: '/vce/writing-tutor',
      status: 'available',
      target: 'VCE Students'
    },
    {
      id: 'junior-curriculum',
      title: 'Years 7–10 Curriculum Section',
      category: 'junior',
      badge: 'Junior High',
      badgeColor: 'bg-amber-100 text-amber-800',
      description: 'Interactive mini-games and vocabulary/grammar quizzes aligned with textbooks like Obento and iiTomo.',
      icon: <BookOpen className="w-6 h-6 text-amber-600" />,
      link: '#',
      status: 'coming-soon',
      target: 'Years 7 - 10'
    },
    {
      id: 'adult-learning',
      title: 'Business & General Japanese',
      category: 'adult',
      badge: 'Adults',
      badgeColor: 'bg-sky-100 text-sky-800',
      description: 'Premium content for mastering business keigo, practical conversation skills, and cultural context.',
      icon: <Briefcase className="w-6 h-6 text-sky-600" />,
      link: '#',
      status: 'coming-soon',
      target: 'Adults & General'
    }
  ];

  // タブによるフィルタリング
  const filteredFeatures = activeTab === 'all' 
    ? features 
    : features.filter(f => f.category === activeTab);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
       
      {/* ─── ヘッダー ─── */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* ロゴ・画像リンク（クリックでホームへ） */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img 
              src="/jptutoraiyamato.png" 
              alt="AI Yamato Logo" 
              className="w-10 h-10 object-contain rounded-xl shadow-sm group-hover:scale-105 transition-transform" 
            />
            <div>
              <span className="font-bold text-lg text-slate-900 tracking-tight">AI Yamato Japanese Hub</span>
              <span className="hidden sm:inline-block ml-2 text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-medium">
                app.jptutoraiyamato.com
              </span>
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            {/* クレジット残高表示 */}
            <div className="hidden sm:flex items-center space-x-1.5 bg-slate-100 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700">
              <Coins className="w-4 h-4 text-amber-500" />
              <span>Credits: <strong className="text-slate-900">120 pts</strong></span>
            </div>

            {/* ユーザープロフィール */}
            <div className="flex items-center space-x-2 border-l border-slate-200 pl-4">
              <div className="w-9 h-9 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-semibold shadow-inner">
                <User className="w-5 h-5" />
              </div>
              <div className="hidden md:block text-left text-xs">
                <p className="font-semibold text-slate-900">Tomonari Sasaki</p>
                <p className="text-slate-500">Teacher / Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ─── メインコンテンツ ─── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
         
        {/* ヒーローセクション */}
        <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 rounded-2xl p-6 sm:p-10 text-white shadow-xl mb-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center space-x-1.5 bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs font-medium mb-4 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Welcome to AI Japanese Learning Portal</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
              Choose the Best Tool for Your Studies
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Access all learning features from here, ranging from VCE exam preparation and the Genkoyoshi editor to upcoming junior secondary curriculum resources.
            </p>
          </div>
        </div>

        {/* カテゴリーフィルタータブ */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all shadow-xs ${
              activeTab === 'all'
                ? 'bg-indigo-600 text-white shadow-indigo-200'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Features
          </button>
          <button
            onClick={() => setActiveTab('vce')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all shadow-xs ${
              activeTab === 'vce'
                ? 'bg-indigo-600 text-white shadow-indigo-200'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            🎓 VCE Exam Prep (Year 12)
          </button>
          <button
            onClick={() => setActiveTab('junior')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all shadow-xs ${
              activeTab === 'junior'
                ? 'bg-indigo-600 text-white shadow-indigo-200'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            📚 Years 7–10 (Coming Soon)
          </button>
          <button
            onClick={() => setActiveTab('adult')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all shadow-xs ${
              activeTab === 'adult'
                ? 'bg-indigo-600 text-white shadow-indigo-200'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            💼 Adults & General (Planned)
          </button>
          <button
            onClick={() => setActiveTab('tools')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all shadow-xs ${
              activeTab === 'tools'
                ? 'bg-indigo-600 text-white shadow-indigo-200'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            🛠️ Tools & Utilities
          </button>
        </div>

        {/* ─── カード一覧グリッド ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFeatures.map((feature) => {
            const isComingSoon = feature.status === 'coming-soon';

            return (
              <div 
                key={feature.id}
                className={`bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm transition-all duration-200 flex flex-col justify-between relative group ${
                  isComingSoon ? 'opacity-75 bg-slate-50/50' : 'hover:shadow-lg hover:border-indigo-300 hover:-translate-y-1'
                }`}
              >
                <div>
                  {/* カード上部：アイコン & バッジ */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${feature.badgeColor}`}>
                        {feature.badge}
                      </span>
                      {isComingSoon && (
                        <span className="text-[11px] font-medium bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full flex items-center space-x-1">
                          <Lock className="w-3 h-3" />
                          <span>Coming Soon</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* タイトル & 説明 */}
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                    {feature.description}
                  </p>
                </div>

                {/* カード下部：アクションボタン */}
                <div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500 mb-3">
                    <span>Target: <strong className="text-slate-700">{feature.target}</strong></span>
                  </div>

                  {isComingSoon ? (
                    <div className="w-full py-2.5 px-4 bg-slate-200 text-slate-500 rounded-xl font-semibold text-xs text-center cursor-not-allowed">
                      Coming Soon
                    </div>
                  ) : (
                    <Link
                      to={feature.link}
                      className="w-full py-2.5 px-4 bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all shadow-2xs no-underline"
                    >
                      <span>Get Started</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </main>

      {/* ─── フッター ─── */}
      <footer className="bg-white border-t border-slate-200 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-700">AI Yamato Japanese Platform</span>
            <span>© 2026 Tomonari Sasaki. All rights reserved.</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-slate-700 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-700 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-700 transition-colors">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  );
}