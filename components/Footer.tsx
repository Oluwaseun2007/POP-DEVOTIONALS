import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">
              POP Devotional
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              A 30-day journey of intimacy with God, crafted for a generation
              hungry for more.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wide mb-3 text-gray-700 dark:text-gray-300">
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/devotional/today" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  Today's Devotional
                </Link>
              </li>
              <li>
                <Link href="/archive" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  Archive
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  About POP
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Theme */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wide mb-3 text-gray-700 dark:text-gray-300">
              2026 Theme
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Our Year of the Wind of the Spirit (RUACH ELOHIM)
              <br />
              <span className="text-primary font-medium">Acts 2:2-4</span>
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Place of Pentecost (POP). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}