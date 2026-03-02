export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 px-6 py-16">

      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">

        {/* Logo + About */}
        <div>
            
          <h2 className="text-white text-2xl font-bold">
            Chat-Me
          </h2>
          <p className="mt-4 text-sm">
            A modern messaging platform built for fast, secure, and seamless communication.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white font-semibold mb-4">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Features</li>
            <li className="hover:text-white cursor-pointer">About</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-white font-semibold mb-4">Features</h3>
          <ul className="space-y-2 text-sm">
            <li>Real-time Chat</li>
            <li>Secure Messaging</li>
            <li>Group Chats</li>
            <li>Media Sharing</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4 text-lg">
            <span className="hover:text-white cursor-pointer">🌐</span>
            <span className="hover:text-white cursor-pointer">🐦</span>
            <span className="hover:text-white cursor-pointer">💼</span>
            <span className="hover:text-white cursor-pointer">📸</span>
          </div>
        </div>

      </div>

      {/* Bottom Line */}
      <div className="border-t border-white/10 mt-12 pt-6 text-center text-sm">
        © {new Date().getFullYear()} ChatApp. All rights reserved.
      </div>

    </footer>
  );
}