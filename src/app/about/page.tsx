export default function Page() {
  return (
    <main className="flex h-[calc(100vh-3rem)] flex-col items-center justify-center p-12 bg-secondary">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-4xl font-bold text-bright">About PeakSpeak</h1>
        <p className="text-white text-lg">
          Welcome to <span className="text-bright font-semibold">PeakSpeak</span>, a dedicated platform bridging the gap between speech therapists and their patients. Our mission is to enhance communication and progress tracking by providing tools that empower therapists to assign personalized exercises and monitor patient improvements over time.
        </p>
        <p className="text-white text-lg">
          We understand the challenges that come with maintaining consistency in speech exercises throughout the week. From personal experience, we know how easy it is to fall behind, which can significantly slow down progress. That&apos;s why we created PeakSpeak—to keep you motivated and on track, ensuring that every practice session counts towards your goals.
        </p>
        <p className="text-white text-lg">
          Join us in transforming the speech therapy journey, making it more engaging and effective for both therapists and patients.
        </p>
      </div>
    </main>
  );
}
