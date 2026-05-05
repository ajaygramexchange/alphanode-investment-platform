// app/page.tsx
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center text-2xl">💎</div>
            <span className="font-bold text-3xl tracking-tighter">AetherInvest</span>
          </div>
          <nav className="hidden md:flex gap-10 text-sm font-medium">
            <a href="#features" className="hover:text-violet-400 transition">Features</a>
            <a href="#plans" className="hover:text-violet-400 transition">Plans</a>
            <a href="#about" className="hover:text-violet-400 transition">About</a>
          </nav>
          <a href="/auth" className="bg-white text-black px-8 py-3 rounded-2xl font-semibold hover:bg-zinc-100 transition">Get Started</a>
        </div>
      </header>



      {/* Hero */}
      <section className="pt-32 pb-24 px-6 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-zinc-900 rounded-full mb-8 border border-zinc-700">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span>USDT • BTC • ETH Deposits Live</span>
        </div>

        <h1 className="text-6xl md:text-7xl font-bold tracking-tighter leading-none mb-6">
          The Most Beautiful<br />
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">Crypto Investment Platform</span>
        </h1>

        <p className="text-2xl text-zinc-400 max-w-2xl mx-auto mb-12">
          Fixed &amp; flexible plans. Real yields. Bank-grade security.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/auth" className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 px-12 py-5 rounded-2xl text-xl font-semibold shadow-xl shadow-violet-500/30 transition hover:scale-105">
            Start Investing Now
          </a>
          <a href="#plans" className="border border-zinc-700 hover:bg-zinc-900 px-12 py-5 rounded-2xl text-xl font-medium transition">View Plans</a>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="border-y border-zinc-800 py-8 bg-zinc-900/50">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-x-16 gap-y-4 text-sm text-zinc-400">
          <div>🔒 Secure Custody</div>
          <div>⚡ Instant Deposits</div>
          <div>📈 Live Analytics</div>
          <div>🌍 Multi-Chain</div>
          <div>🛡️ KYC Verified</div>
        </div>
      </div>
    </div>
  );
}