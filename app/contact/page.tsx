export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 font-serif">
        Contact Us
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 space-y-6">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          We would love to hear from you. Whether you have a testimony,
          feedback, a prayer request, or simply want to connect — reach out
          to us.
        </p>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-xl">📧</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Email
              </p>
              <a
                href="mailto:placeofpentecost2@gmail.com"
                className="text-primary hover:underline"
              >
                placeofpentecost2@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-xl">📱</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Instagram
              </p>
              <a
                href="https://instagram.com/placeofpentecost"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                @placeofpentecost
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-xl">🌐</span>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Website
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                pop-devotional.firebaseapp.com
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            For prayer requests, testimonies, or partnership inquiries,
            please email us directly. We'd love to hear how God is working
            in your life through this devotional.
          </p>
        </div>
      </div>
    </div>
  );
}