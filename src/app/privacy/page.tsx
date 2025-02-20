import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col lg:flex-row w-full px-8">
      {/* Table of Contents */}
      <aside className="hidden lg:block lg:w-1/4 mb-8 lg:mb-0 lg:mr-12 py-24">
        <nav className="sticky top-24">
          <h2 className="text-xl font-bold mb-4"><a href="/privacy">Table of Contents</a></h2>
          <ul className="space-y-4 text-gray-600">
            <li><Link href="#information-we-collect" className="hover:text-blue-600">Information We Collect</Link></li>
            <li><Link href="#how-we-use-information" className="hover:text-blue-600">How We Use Your Information</Link></li>
            <li><Link href="#data-storage" className="hover:text-blue-600">Data Storage and Security</Link></li>
            <li><Link href="#data-retention" className="hover:text-blue-600">Data Retention</Link></li>
            <li><Link href="#your-rights" className="hover:text-blue-600">Your Rights</Link></li>
            <li><Link href="#children-privacy" className="hover:text-blue-600">Children’s Privacy</Link></li>
            <li><Link href="#changes" className="hover:text-blue-600">Changes to This Privacy Policy</Link></li>
            <li><Link href="#jurisdiction" className="hover:text-blue-600">Jurisdiction</Link></li>
          </ul>
        </nav>
      </aside>

      {/* Privacy Policy Content */}
      <div className="lg:w-3/4 py-24 mt-15">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

        <p className="text-gray-500 mb-4">Effective Date: October 21, 2024</p>

        <section id="introduction" className="mb-12">
          <p className="text-gray-400">
            Peak Speak Therapy ("we," "our," or "us") is owned and operated by <Link href="https://tnluplift.com" target='__blank' className='font-bold underline hover:text-white'>TNL Uplift LLC</Link>. We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and protect your personal data when you use our app, Peak Speak Therapy, which connects speech therapists with their patients to assign exercises and track progress.
          </p>
        </section>

        <section id="information-we-collect" className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p className="text-gray-400">
            We collect the following personal information from users:
          </p>
          <ul className="list-disc list-inside text-gray-400 ml-4 mt-2">
            <li>Name</li>
            <li>Email Address</li>
          </ul>

          <p className="text-gray-400 mt-4">
            We do <span className='font-bold'>not</span> collect any medical records, patient health information, or any details related to specific health conditions. The purpose of the app is not to provide medical advice or healthcare services.
          </p>
        </section>

        <section id="how-we-use-information" className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <p className="text-gray-400">
            The information we collect is used exclusively for the following purposes:
          </p>
          <ul className="list-disc list-inside text-gray-400 ml-4 mt-2">
            <li>Assigning speech therapy exercises to patients</li>
            <li>Tracking patient progress through the app</li>
          </ul>
          <p className="text-gray-400 mt-4">
            We do <span className='font-bold'>not</span> share your personal information with third parties. However, we use third-party services such as <Link href="https://www.mongodb.com/products/capabilities/security/encryption" target="__blank" className='font-bold underline hover:text-white'>MongoDB</Link> and <Link href="https://www.digitalocean.com/security" target="__blank" className='font-bold underline hover:text-white'>DigitalOcean</Link> to store your data securely.
          </p>
        </section>

        <section id="data-storage" className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Data Storage and Security</h2>
          <p className="text-gray-400">
            Your data is stored on cloud servers provided by third-party services. We use <Link href="https://en.wikipedia.org/wiki/Advanced_Encryption_Standard" target="__blank" className='font-bold underline hover:text-white'>AES Encryption</Link> and key wrapping via <Link href="https://aws.amazon.com/kms/" target="__blank" className='font-bold underline hover:text-white'>Key Management Service (KMS)</Link> to ensure your personal information is securely stored.
          </p>
        </section>

        <section id="data-retention" className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
          <p className="text-gray-400">
            We retain your personal information indefinitely unless you request its deletion.
          </p>
        </section>

        <section id="your-rights" className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <p className="text-gray-400">
            You have the right to:
          </p>
          <ul className="list-disc list-inside text-gray-400 ml-4 mt-2">
            <li><strong>Access Your Data</strong>: You may request access to the personal information we hold about you.</li>
            <li><strong>Correct Your Data</strong>: You may request corrections to any inaccuracies in your personal information.</li>
            <li><strong>Delete Your Data</strong>: You may request the deletion of your personal information.</li>
          </ul>
          <p className="text-gray-400 mt-4">
            To exercise any of these rights, please <Link href="/contact" className='font-bold text-gray-400 underline hover:text-blue-600'>Contact Us.</Link>
          </p>
        </section>

        <section id="children-privacy" className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Children’s Privacy</h2>
          <p className="text-gray-400">
          Our app is appropriate for users of all ages, and we do not knowingly collect more personal information from children than is reasonably necessary to provide our services. Again, we do <span className='font-bold'>not</span> collect any medical records or health information from children or any other users.
          </p>
        </section>

        <section id="changes" className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
          <p className="text-gray-400">
            We may update this Privacy Policy from time to time. Any changes will be posted within the app, and the "Effective Date" at the top of this page will be updated accordingly. Continued use of the app after any changes indicates your acceptance of the updated policy.
          </p>
        </section>

        <section id="jurisdiction" className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Jurisdiction</h2>
          <p className="text-gray-400">
            This Privacy Policy is governed by the laws of the United States and is intended for users within the United States only.
          </p>
        </section>
      </div>
    </div>
  );
}
