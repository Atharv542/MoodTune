import React from "react";

export default function Home() {
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-4">
            Your Mood,
            <span className="block bg-gradient-to-r from-cyan-400 via-pink-400 to-orange-400 text-transparent bg-clip-text">
              Perfect Playlist
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            Upload a photo or use your webcam. Our AI analyzes your emotion and recommends songs from Spotify that match your mood perfectly.
          </p>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 bg-cyan-400 rounded-full" />
              <div>
                <h3 className="font-semibold text-lg">AI-Powered Detection</h3>
                <p className="text-gray-400">Advanced emotion recognition analyzes your facial expression instantly</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 bg-pink-400 rounded-full" />
              <div>
                <h3 className="font-semibold text-lg">Lightning Fast</h3>
                <p className="text-gray-400">Get personalized recommendations in less than 2 seconds</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 bg-orange-400 rounded-full" />
              <div>
                <h3 className="font-semibold text-lg">100% Private</h3>
                <p className="text-gray-400">Your photos are never stored. We respect your privacy completely</p>
              </div>
            </div>
          </div>
          <a href="/emotion" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-pink-500 text-white text-lg font-semibold rounded-full hover:shadow-2xl">
            Get Started
          </a>
        </div>

        <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden border border-gradient-to-r from-cyan-500/20 to-pink-500/20">
          <img
            src="https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=900"
            alt="Person with music"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        </div>
      </div>
    </div>
  );
}
