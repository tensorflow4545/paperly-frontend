export default function CookiesPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-yellow-100 via-amber-100 to-orange-100 text-gray-800 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-yellow-200/30 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold">Cookie Policy for Paprly</h1>
          </div>
          <p className="text-xl text-gray-700">Effective Date: 08/08/2025</p>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl">
            Paprly uses cookies and similar technologies to improve your experience, analyse site performance, and
            deliver personalised content. This Cookie Policy explains what cookies are, how we use them, and your
            choices regarding cookies.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Section 1: What Are Cookies */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-full flex items-center justify-center text-gray-700 font-bold">
              1
            </div>
            <h2 className="text-2xl font-bold text-gray-800">What Are Cookies?</h2>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100">
            <p className="text-gray-700 leading-relaxed">
              Cookies are small text files stored on your device (computer, tablet, or smartphone) when you visit a
              website. They help websites remember your preferences, enhance functionality, and measure performance.
            </p>
          </div>
        </section>

        {/* Section 2: How We Use Cookies */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-full flex items-center justify-center text-gray-700 font-bold">
              2
            </div>
            <h2 className="text-2xl font-bold text-gray-800">How We Use Cookies</h2>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100">
            <p className="text-gray-700 mb-4">We use cookies for the following purposes:</p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-200 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-gray-800">Essential Cookies</h3>
                  <p className="text-gray-600">
                    Necessary for the operation of Paprly services (e.g., logging in, accessing secure areas).
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-200 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-gray-800">Performance Cookies</h3>
                  <p className="text-gray-600">
                    Help us understand how users interact with Paprly to improve usability and speed.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-200 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-gray-800">Functionality Cookies</h3>
                  <p className="text-gray-600">Remember your preferences, such as language or display settings.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-200 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-gray-800">Analytics Cookies</h3>
                  <p className="text-gray-600">Used to track usage statistics through tools like Google Analytics.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-200 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-gray-800">Advertising Cookies</h3>
                  <p className="text-gray-600">
                    Deliver relevant ads and measure the effectiveness of our marketing campaigns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Third-Party Cookies */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-full flex items-center justify-center text-gray-700 font-bold">
              3
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Third-Party Cookies</h2>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100">
            <p className="text-gray-700 mb-4">Some cookies are placed by third parties, such as:</p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-amber-200 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-gray-800">Google Analytics</span>
                  <span className="text-gray-600"> – To understand how visitors use Paprly.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-amber-200 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-gray-800">Ad Networks (e.g., Google AdSense)</span>
                  <span className="text-gray-600"> – To show tailored advertisements.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-amber-200 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-gray-800">Social Media Plugins</span>
                  <span className="text-gray-600"> – To allow content sharing and engagement.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Your Choices */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-full flex items-center justify-center text-gray-700 font-bold">
              4
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Your Choices</h2>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100">
            <p className="text-gray-700 mb-4">You can control and manage cookies in the following ways:</p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-200 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-gray-800">Browser Settings:</h3>
                  <p className="text-gray-600">Most browsers allow you to block or delete cookies.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-200 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-gray-800">Opt-out Tools:</h3>
                  <p className="text-gray-600">
                    Use industry opt-out tools like Network Advertising Initiative or Your Online Choices.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-200 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-gray-800">In-App Settings:</h3>
                  <p className="text-gray-600">If available, adjust cookie preferences within your Paprly account.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Changes to This Policy */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-full flex items-center justify-center text-gray-700 font-bold">
              5
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Changes to This Policy</h2>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100">
            <p className="text-gray-700">
              We may update this Cookie Policy from time to time. Any changes will be posted on this page with the
              updated effective date.
            </p>
          </div>
        </section>

        {/* Section 6: Contact Us */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-full flex items-center justify-center text-gray-700 font-bold">
              6
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Contact Us</h2>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-yellow-100">
            <p className="text-gray-700 mb-4">If you have questions about our Cookie Policy, contact us at:</p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="text-gray-700">
                  <span className="font-semibold">Email:</span> home@paprly.in
                </span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.559-.499-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.559.499.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.497-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.148.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">
                  <span className="font-semibold">Website:</span> www.paprly.in
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Cookie Preferences Section */}
        <section className="bg-gradient-to-r from-yellow-100 via-amber-100 to-orange-100 rounded-xl p-8 text-gray-800">
          <h3 className="text-2xl font-bold mb-4">Manage Your Cookie Preferences</h3>
          <p className="mb-6 text-gray-700">
            You can customize your cookie settings below. Note that disabling certain cookies may affect your experience
            on Paprly.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <button className="bg-white/60 hover:bg-white/80 transition-colors duration-200 rounded-lg p-4 text-left">
              <h4 className="font-semibold mb-2">Accept All Cookies</h4>
              <p className="text-sm text-gray-600">Enable all cookies for the best experience</p>
            </button>
            <button className="bg-white/60 hover:bg-white/80 transition-colors duration-200 rounded-lg p-4 text-left">
              <h4 className="font-semibold mb-2">Essential Only</h4>
              <p className="text-sm text-gray-600">Only enable cookies necessary for basic functionality</p>
            </button>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-yellow-100 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-600">
            © 2024 Paprly. This Cookie Policy is part of our commitment to transparency and user privacy.
          </p>
        </div>
      </footer>
    </div>
  )
}
