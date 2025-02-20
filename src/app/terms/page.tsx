import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="flex flex-col lg:flex-row w-full px-8">
      {/* Table of Contents */}
      <aside className="hidden lg:block lg:w-1/4 mb-8 lg:mb-0 lg:mr-12 py-14">
        <nav className="sticky top-16">
          <h2 className="text-xl font-bold mb-4"><a href="/terms">Table of Contents</a></h2>
          <ul className="space-y-4 text-gray-600">
            <li><Link href="#acceptance" className="hover:text-blue-600">Acceptance of Terms</Link></li>
            <li><Link href="#eligibility" className="hover:text-blue-600">Eligibility</Link></li>
            <li><Link href="#account" className="hover:text-blue-600">Account Creation and Security</Link></li>
            <li><Link href="#data-collection" className="hover:text-blue-600">Data Collection and Privacy</Link></li>
            <li><Link href="#user-content" className="hover:text-blue-600">User-Generated Content</Link></li>
            <li><Link href="#prohibited-conduct" className="hover:text-blue-600">Prohibited Conduct</Link></li>
            <li><Link href="#security" className="hover:text-blue-600">Data Security</Link></li>
            <li><Link href="#disputes" className="hover:text-blue-600">Dispute Resolution</Link></li>
            <li><Link href="#modifications" className="hover:text-blue-600">Modifications to the App and Terms</Link></li>
            <li><Link href="#termination" className="hover:text-blue-600">Termination</Link></li>
            <li><Link href="#governing-law" className="hover:text-blue-600">Governing Law</Link></li>
            <li><Link href="#contact" className="hover:text-blue-600">Contact Information</Link></li>
          </ul>
        </nav>
      </aside>

      {/* Privacy Policy Content */}
      <div className="lg:w-3/4 py-12 mt-15">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

        <p className="text-gray-500 mb-4">Effective Date: October 21, 2024</p>

        <section id="introduction" className="mb-8">
            <p className="text-gray-400">
                Welcome to <span className='font-bold'>Peak Speak Therapy</span>. These Terms of Service (&quot;Terms&quot;) govern your access to and use of our application (&quot;App&quot;) and services, which connect speech therapists and patients, provide exercises, and track patient progress. By using our App, you agree to these Terms. Please read them carefully.
            </p>
        </section>

        <section id="acceptance" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
            <p className="text-gray-400">
                By accessing or using Peak Speak Therapy&apos;s app, you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, you may not use the app. Continued use of the app signifies acceptance of the current Terms, which may be updated from time to time.
            </p>
        </section>

        <section id="eligibility" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Eligibility</h2>
            <p className="text-gray-400">
                The app is intended for use by licensed speech therapists and their patients. By creating an account, you confirm that you are either a licensed speech therapist or a patient using the app under the supervision of a licensed therapist. The app is available for use within the United States only.
            </p>
        </section>

        <section id="account" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Account Creation and Security</h2>
            <p className="text-gray-400">
                To access the app, both therapists and patients must create an account. You agree to provide accurate and up-to-date information when creating your account. You are responsible for safeguarding your login credentials, and you agree to notify us immediately if you suspect any unauthorized use of your account.
            </p>
        </section>

        <section id="data-collection" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Data Collection and Use</h2>
            <p className="text-gray-400">
                We collect the following personal information to provide the app&apos;s services:
            </p>
            <ul className="list-disc list-inside text-gray-400 ml-4 mt-2">
                <li>Name</li>
                <li>Email Address</li>
                <li>Video recordings of patient exercises</li>
            </ul>
            <p className="text-gray-400 mt-4">
                The collected information is used solely for assigning speech therapy exercises and tracking patient progress. We do not share this information with third parties except for data storage and encryption services provided by MongoDB, DigitalOcean, and AWS. For more details, please review our Privacy Policy.
            </p>
        </section>

        <section id="user-content" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">User-Generated Content</h2>
            <p className="text-gray-400">
                Users, including both therapists and patients, may upload exercises, progress data, and video recordings. By uploading content, you retain ownership of your content, and you grant us a limited license to store and display this content within the app to fulfill its intended purpose. We do not claim any ownership rights over user-generated content.
            </p>
        </section>

        <section id="prohibited-conduct" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Prohibited Conduct</h2>
            <p className="text-gray-400">
                Users of the app are prohibited from:
            </p>
        <ul className="list-disc list-inside text-gray-400 ml-4 mt-2">
            <li>Engaging in fraudulent behavior or impersonating others</li>
            <li>Using the app for unauthorized speech therapy services without proper licensure</li>
            <li>Misusing, sharing, or distributing personal data or patient content without consent</li>
        </ul>
            <p className="text-gray-400 mt-4">
                Any violation of these prohibitions may result in suspension or termination of your account.
            </p>
        </section>

        <section id="security" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Data Storage and Security</h2>
            <p className="text-gray-400">
            We employ industry-standard security measures, including AES encryption and key wrapping via AWS Key Management Services (KMS), to ensure that your personal information and uploaded content are securely stored. However, you acknowledge that no system is completely secure, and we cannot guarantee absolute security. For more information, please review our Privacy Policy.
            </p>
        </section>

        <section id="disputes" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Dispute Resolution</h2>
            <p className="text-gray-400">
                In the event of a dispute arising from your use of the app, we encourage you to contact us to seek a resolution. If we cannot resolve the dispute through informal negotiation, both parties agree to submit to binding arbitration in accordance with the American Arbitration Association&apos;s rules. 
                <br /> <br />
                All arbitration will take place in the United States and will be governed by U.S. law.
            </p>

        </section>

        <section id="modifications" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Modifications to the App and Terms</h2>
            <p className="text-gray-400">
                We reserve the right to modify, update, or discontinue the app or these Terms at any time. Any changes to the Terms will be posted within the app, and your continued use of the app after such changes constitutes your acceptance of the new Terms.
            </p>
        </section>

        <section id="termination" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Termination</h2>
            <p className="text-gray-400">
                We reserve the right to terminate or suspend your account and access to the App at any time for violating these Terms or engaging in prohibited conduct.
            </p>
        </section>

        <section id="governing-law" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Governing Law and Jurisdiction</h2>
            <p className="text-gray-400">
                These Terms are governed by the laws of the United States. By using the app, you agree that any legal action arising from your use of the app will be filed in the courts located within the United States.
            </p>
        </section>

        <section id="contact" className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-400">
                If you have any questions or concerns regarding these Terms of Service, please feel free to contact us at <Link href="/contact" className='font-bold text-gray-400 underline hover:text-blue-600'>Contact Us</Link>.
            </p>
        </section>

      </div>
    </div>
  );
}
