import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";

export default function Emotion() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [emotion, setEmotion] = useState("");
  const [trackUris, setTrackUris] = useState([]);
  const [useWebcam, setUseWebcam] = useState(false);
  const [loading, setLoading] = useState(false);

  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setSelectedImage(preview);
    const reader = new FileReader();
    reader.onloadend = () => sendToBackend(reader.result);
    reader.readAsDataURL(file);
  };

  const captureFromWebcam = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;
    setSelectedImage(imageSrc);
    sendToBackend(imageSrc);
  };

  const sendToBackend = async (base64Image) => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ img: base64Image }),
      });
      const data = await res.json();
      if (data.error) {
        console.error(data.error);
        setEmotion("error");
        setTrackUris([]);
      } else {
        setEmotion(data.emotion);
        // backend returns array of track ids
        if (data.tracks && data.tracks.length > 0) {
          setTrackUris(data.tracks);
        } else {
          setTrackUris([]);
        }
      }
    } catch (err) {
      console.error(err);
      setEmotion("error");
      setTrackUris([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-center text-4xl font-bold mb-8">
        Detect Your Mood 🎭
      </h1>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => setUseWebcam((s) => !s)}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full text-lg font-semibold"
        >
          {useWebcam ? "Use Upload" : "Use Webcam"}
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          className="ml-4 px-6 py-3 bg-gray-700 rounded-full text-lg font-semibold"
        >
          Go to Dashboard
        </button>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-[360px] h-[260px] border-2 border-dashed border-cyan-400 rounded-xl flex items-center justify-center text-gray-300 transition-all relative overflow-hidden">
          {!useWebcam ? (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
                title="Click to upload"
              />
              {!selectedImage ? (
                <div className="text-center px-6">
                  <p className="mb-2">Click / Drop to Upload Image</p>
                  <p className="text-sm text-gray-500">or switch to webcam</p>
                </div>
              ) : (
                <img src={selectedImage} alt="preview" className="w-full h-full object-cover" />
              )}
            </>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={340}
                videoConstraints={{ width: 340, height: 240, facingMode: "user" }}
              />
              <div className="flex gap-3">
                <button
                  onClick={captureFromWebcam}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-orange-500 rounded-md"
                >
                  Capture
                </button>
                <button
                  onClick={() => { setSelectedImage(null); setEmotion(""); setTrackUris([]); }}
                  className="px-4 py-2 bg-gray-700 rounded-md"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>

        {loading && <p className="text-gray-300 mt-4">Detecting...</p>}

        {emotion && emotion !== "error" && (
          <p className="text-2xl mt-4 font-semibold">
            Emotion Detected: <span className="text-cyan-400">{emotion.toUpperCase()}</span>
          </p>
        )}

        {/* vertical list of tracks */}
        {trackUris.length > 0 && (
          <div className="mt-8 w-full max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Recommended Songs</h2>
            <div className="flex flex-col gap-4">
              {trackUris.map((id) => (
                <div key={id} className="bg-gray-800 p-4 rounded-lg flex items-center gap-4">
                  <iframe
                    src={`https://open.spotify.com/embed/track/${id}`}
                    width="800"
                    height="80"
                    frameBorder="0"
                    allow="encrypted-media"
                    className="rounded"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
