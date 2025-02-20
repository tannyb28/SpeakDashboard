import { Assignment, Chat, TrendingUp, Flag, Support } from '@mui/icons-material';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      {/* Hero Section */}
      <div className="w-full h-[calc(100vh)] bg-gradient-radial from-secondary to-dark flex flex-col items-center justify-center text-center p-8">
        <span className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-medium to-bright mb-4">
          PeakSpeak
        </span>
        <h1 className="text-4xl font-bold text-white">Stay Connected, Track Progress, Communicate Effectively</h1>
        <p className="mt-4 text-lg text-white">
          Empowering speech therapists and patients to stay in sync between appointments.
        </p>
        <div className="mt-6 space-x-4">
          <a href="/login" className="bg-bright text-white px-8 py-4 rounded-lg font-semibold hover:bg-bright-dark transition">
            Get Started
          </a>
          <a href="#features" className="text-white px-8 py-4 rounded-lg font-semibold border border-white hover:bg-white hover:text-secondary transition">
            Learn More
          </a>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="w-full py-20 bg-white">
        <h2 className="text-3xl font-bold text-center text-dark mb-12">App Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8">
          {/* Feature 1: MUI Chat Icon */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
              <Chat style={{ fontSize: 32, color: '#fff' }} />
            </div>
            <h3 className="text-xl font-semibold">Seamless Communication</h3>
            <p className="text-gray-600 mt-2">Message your therapist anytime between appointments to ask questions, get advice, or provide updates.</p>
          </div>

          {/* Feature 2: MUI TrendingUp Icon */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
              <TrendingUp style={{ fontSize: 32, color: '#fff' }} />
            </div>
            <h3 className="text-xl font-semibold">Progress Tracking</h3>
            <p className="text-gray-600 mt-2">Monitor your therapy milestones, and visualize your progress over time.</p>
          </div>

          {/* Feature 3: MUI Flag Icon */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
              <Flag style={{ fontSize: 32, color: '#fff' }} />
            </div>
            <h3 className="text-xl font-semibold">Goal Setting</h3>
            <p className="text-gray-600 mt-2">Set specific speech therapy goals and track how close you are to achieving them.</p>
          </div>

          {/* Feature 4: MUI Support Icon */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
              <Support style={{ fontSize: 32, color: '#fff' }} />
            </div>
            <h3 className="text-xl font-semibold">Personalized Support</h3>
            <p className="text-gray-600 mt-2">Receive tips and exercises tailored to your specific needs and goals from your therapist.</p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="w-full py-20 bg-light">
        <h2 className="text-3xl font-bold text-center text-light mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-bright rounded-full flex items-center justify-center mb-4">
              <Assignment style={{ fontSize: 32, color: '#fff' }} />
            </div>
            <h3 className="text-xl text-gray-800 font-semibold">Step 1: Sign Up</h3>
            <p className="text-gray-600 mt-2">Create an account and connect with your speech therapist.</p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-bright rounded-full flex items-center justify-center mb-4">
              <Chat style={{ fontSize: 32, color: '#fff' }} />
            </div>
            <h3 className="text-xl text-gray-800 font-semibold">Step 2: Communicate & Track Progress</h3>
            <p className="text-gray-600 mt-2">Message your therapist, set goals, and monitor your progress.</p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-bright rounded-full flex items-center justify-center mb-4">
              <Flag style={{ fontSize: 32, color: '#fff' }} />
            </div>
            <h3 className="text-xl text-gray-800 font-semibold">Step 3: Achieve Your Goals</h3>
            <p className="text-gray-600 mt-2">Stay motivated and on track with continuous support from your therapist.</p>
          </div>
        </div>
      </div>

      {/* Disclaimer Section */}
      <div className="w-full py-8 bg-dark text-white text-center">
        <p className="text-sm">Disclaimer: PeakSpeak is a communication tool that allows speech therapists and patients to stay connected between appointments. The app is not intended to replace in-person or virtual therapy sessions with a licensed medical professional. Patients should always seek direct guidance and treatment from their healthcare providers.</p>
      </div>
    </main>
  );
}
