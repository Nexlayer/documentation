import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#111111] border-t border-[#333333] py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
        <div className="text-sm text-gray-400 mb-4 sm:mb-0">© 2025 Nexlayer. All rights reserved.</div>
        <div className="flex space-x-6">
          <Link
            href="https://github.com/Nexlayer/documentation/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
          >
            GitHub
          </Link>
          <Link
            href="https://x.com/nexlayerai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
          >
            X.com
          </Link>
          <Link
            href="https://community.nexlayer.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
          >
            Community
          </Link>
        </div>
      </div>
    </footer>
  )
}
