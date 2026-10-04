"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="text-xl font-bold">
            GenAI<span className="text-blue-400">Hub</span>
          </div>

          <div className="hidden gap-8 text-sm text-slate-300 md:flex">
            <Link href="#features" className="hover:text-white">
              Features
            </Link>

            <Link href="#pricing" className="hover:text-white">
              Pricing
            </Link>

            <Link href="#about" className="hover:text-white">
              About
            </Link>
          </div>

          <div className="flex gap-3">
            <button className="rounded-lg px-4 py-2 text-sm text-slate-300 hover:text-white">
              Login
            </button>

            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-500">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-24 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm text-blue-300">
            ✨ AI-powered workspace for modern teams
          </div>

          <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
            Work smarter with
            <span className="text-blue-400"> GenAI</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Upload your knowledge, interact with your documents, and use
            powerful AI tools from one intelligent workspace.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <button className="rounded-xl bg-blue-600 px-6 py-3 font-medium hover:bg-blue-500">
              Start for free
            </button>

            <button className="rounded-xl border border-white/10 px-6 py-3 font-medium text-slate-300 hover:bg-white/5">
              Explore features
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-white/10 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Everything you need
            </h2>

            <p className="mt-4 text-slate-400">
              One platform for your AI-powered workflow.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon="📄"
              title="Document Intelligence"
              description="Upload documents and let AI understand, summarize, and extract information from them."
            />

            <FeatureCard
              icon="🤖"
              title="AI Assistant"
              description="Ask questions and get intelligent answers grounded in your own knowledge."
            />

            <FeatureCard
              icon="🔎"
              title="Smart Search"
              description="Find the information you need using semantic search instead of simple keywords."
            />

            <FeatureCard
              icon="⚡"
              title="AI Generation"
              description="Generate summaries, reports, explanations, and other useful content."
            />

            <FeatureCard
              icon="📊"
              title="Usage Analytics"
              description="Track your AI usage, documents, queries, and account activity."
            />

            <FeatureCard
              icon="🔐"
              title="Secure Workspace"
              description="Keep your documents and AI conversations protected inside your personal workspace."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="about" className="border-t border-white/10 py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl font-bold">
            Your AI workspace starts here.
          </h2>

          <p className="mt-5 text-slate-400">
            Upload your first document and experience the power of
            AI-powered knowledge management.
          </p>

          <button className="mt-8 rounded-xl bg-blue-600 px-7 py-3 font-medium hover:bg-blue-500">
            Create your workspace
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto flex max-w-7xl justify-between px-6 text-sm text-slate-500">
          <p>© 2026 GenAIHub</p>
          <p>FullStack GenAI SaaS Product</p>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-blue-400/30 hover:bg-white/[0.05]">
      <div className="mb-5 text-3xl">{icon}</div>

      <h3 className="text-xl font-semibold">{title}</h3>

      <p className="mt-3 leading-7 text-slate-400">
        {description}
      </p>
    </div>
  );
}