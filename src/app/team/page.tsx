import Image from "next/image";

export default function Page() {
  return (
    <main className="flex h-[calc(100vh-3rem)] flex-col items-center justify-center p-12 bg-secondary">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-4xl font-bold text-bright">Our Team</h1>
        <p className="text-white text-lg">
          At the heart of <span className="text-bright font-semibold">PeakSpeak</span> is a shared mission driven by personal experience, passion, and a deep commitment to helping others communicate with confidence.
        </p>
        {/* row with two profile images and descriptions of the people */}
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12">
          <div className="flex flex-col items-center space-y-4">
          <div className="relative w-32 h-32 rounded-full overflow-hidden">
              <Image
                src="/loy-headshot.jpg"
                alt="Profile 2"
                fill
              />
            </div>
            <h2 className="text-2xl font-bold text-bright">Loy Bhowmick</h2>
            <h3 className="text-lg text-bright">Founder</h3>
            <p className="text-white text-lg">
            Loy is a high school senior who overcame a lifelong stutter through speech therapy. Inspired by his journey, he started PeakSpeak to help others feel supported and empowered in finding their voice.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-32 h-32 rounded-full overflow-hidden">
              <Image
                src="/tanish-headshot.jpg"
                alt="Profile 2"
                fill
              />
            </div>
            <h2 className="text-2xl font-bold text-bright">Tanish Bhowmick</h2>
            <h3 className="text-lg text-bright">Co-Founder</h3>
            <p className="text-white text-lg">
            Tanish is Loy&apos;s older brother and a grad student in Computer Science. After watching Loy&apos;s journey up close, he set out to build tech that makes speech therapy more personal and accessible.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
