export default function Contact() {
  return (
    <footer id="contact" className="relative z-10 pt-32 pb-20 px-10 border-t border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.8)]">
      <div className="max-w-7xl mx-auto text-center space-y-12">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8">
          Let's work together.
        </h2>

        <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-20">
          <a href="mailto:yourname@vitap.ac.in" className="group">
            <p className="text-sm text-gray-400 font-medium mb-2 uppercase tracking-wider">Email</p>
            <p className="text-2xl font-bold text-white group-hover:text-blue-500 transition-colors">yourname@vitap.ac.in</p>
          </a>
          <a href="#" className="group">
            <p className="text-sm text-gray-400 font-medium mb-2 uppercase tracking-wider">LinkedIn</p>
            <p className="text-2xl font-bold text-white group-hover:text-blue-500 transition-colors">linkedin.com/in/krish</p>
          </a>
        </div>

        <div className="pt-24 mt-12 border-t border-white/5">
          <p className="text-sm text-gray-500">
            © 2026 Krish Patel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}