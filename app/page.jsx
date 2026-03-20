'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronRight, Volume2, VolumeX } from 'lucide-react'

export default function Home() {
  const [activeTab, setActiveTab] = useState(0)
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [soundOn, setSoundOn] = useState(true)
  const [trackIndex, setTrackIndex] = useState(0)
  const [showWelcome, setShowWelcome] = useState(true)
  const [showPaymentPopup, setShowPaymentPopup] = useState(false)
  const [showBackMessagePopup, setShowBackMessagePopup] = useState(false)
  const [showVideoPopup, setShowVideoPopup] = useState(false)
  const audioRef = useRef(null)
  const hasInteractedRef = useRef(false)
  const audioTracks = ['/1.mp3', '/2.mp3']
  const paymentVideoSrc = '/Confirm%20Jannati%20Hai%20meme%20_%20Yasir%20Soharwardi%20_%20MemeTube.mp4'

  useEffect(() => {
    if (hasInteractedRef.current && soundOn) {
      playAudio()
    }
  }, [trackIndex])

  const playAudio = () => {
    const audio = audioRef.current

    if (!audio) return

    audio.muted = false
    audio.play().catch(() => {
      // Ignore blocked autoplay errors and wait for another user gesture.
    })
  }

  const handleFirstInteraction = () => {
    if (hasInteractedRef.current) return

    hasInteractedRef.current = true

    if (soundOn) {
      playAudio()
    }
  }

  const handleSoundToggle = () => {
    const audio = audioRef.current

    if (soundOn) {
      setSoundOn(false)

      if (audio) {
        audio.pause()
      }

      return
    }

    setSoundOn(true)

    if (audio) {
      audio.currentTime = 0
      playAudio()
    }
  }

  const handleAudioEnded = () => {
    setTrackIndex((prev) => (prev + 1) % audioTracks.length)
  }

  const handleNextClick = () => {
    setShowPaymentPopup(true)
  }

  const handleBackClick = () => {
    setShowPaymentPopup(false)
    setShowBackMessagePopup(true)
  }

  const handlePaymentDoneClick = () => {
    setShowPaymentPopup(false)
    setShowVideoPopup(true)
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"
      onClickCapture={handleFirstInteraction}
    >
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
              ✓
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white">সালামির পাঠান</h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Profile Card */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
          <div className="relative bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar */}
              <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full blur opacity-75 animate-pulse" />
                <img
                  src="/default-avatar.png"
                  alt="Avatar"
                  className="absolute inset-1 w-[calc(100%-0.5rem)] h-[calc(100%-0.5rem)] rounded-full object-cover border border-slate-700"
                />
                <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">

                    </div>
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-1">
                      Md. Yusuf Adnan
                    </h2>
                    <p className="text-slate-400 mb-4">@yusufadnan</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-slate-300 text-sm md:text-base">
                    সালামি আমার অধিকার। সালামি না পাইলে শাহবাগ আটকান হবে।
                  </p>


                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3 mt-8">
              <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg px-4 py-4 text-center hover:border-slate-500/50 transition-colors">
                <div suppressHydrationWarning className="text-2xl font-bold text-white mb-1">०</div>
                <div className="text-xs md:text-sm text-slate-400">সালামি</div>
              </div>
              <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg px-4 py-4 text-center hover:border-slate-500/50 transition-colors">
                <div suppressHydrationWarning className="text-2xl font-bold text-white mb-1">💳</div>
                <div className="text-xs md:text-sm text-slate-400">MFS লেনদেন</div>
              </div>
              <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg px-4 py-4 text-center hover:border-slate-500/50 transition-colors">
                <div suppressHydrationWarning className="text-2xl font-bold text-white mb-1">43</div>
                <div className="text-xs md:text-sm text-slate-400">মিনিট</div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <div className="flex items-center gap-3">
              <div suppressHydrationWarning className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-white text-sm">
                💝
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white">সালামি প্রদান করুন</h3>
            </div>

          </div>



          {/* Process Indicator */}
          <div className="flex justify-center gap-4 mb-8">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                  step === 1
                    ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white ring-4 ring-pink-500/30'
                    : 'bg-slate-700/50 border border-slate-600/50 text-slate-400'
                }`}
              >
                {step}
              </div>
            ))}
          </div>

          {/* Payment Method Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {['বিকাশ', ].map((method, index) => (
              <button
                key={index}
                onClick={() => setSelectedPayment(index)}
                className={`p-6 rounded-xl border-2 transition-all text-left ${
                  selectedPayment === index
                    ? 'bg-slate-700/50 border-pink-500/50'
                    : 'bg-slate-700/30 border-slate-600/50 hover:border-slate-500/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div suppressHydrationWarning className="w-12 h-12 bg-slate-600/50 rounded-lg flex items-center justify-center text-xl">
                    {method === 'বিকাশ' && '🏦'}

                  </div>
                  <div>
                    <h4 className="font-bold text-white">{method}</h4>
                    <p className="text-slate-400 text-sm">
                      {selectedPayment === index
                        ? '01937098591'
                        : 'পেমেন্ট পদ্ধতি'}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Selected Payment Details */}
          {selectedPayment === 0 && (
            <div className="bg-slate-700/30 border border-slate-600/50 rounded-xl p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div suppressHydrationWarning className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center">
                  📋
                </div>
                <h4 className="font-bold text-white">বিকাশ</h4>
              </div>
              <div className="space-y-2">
                <p className="text-slate-300">নাম্বার: <span className="font-mono text-pink-400">01937098591</span></p>

              </div>
            </div>
          )}

          {/* Next Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleNextClick}
              className="flex-1 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 group bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700"
            >
              পরবর্তী
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <span className="text-4xl text-white animate-bounce leading-none" aria-hidden="true">👈</span>
          </div>
        </div>

        {/* Steps Section */}
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-8">
            <div suppressHydrationWarning className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">ℹ️</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white"> এটি যেভাবে কাজ করে</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                number: 1,
                title: 'মেথড বেছে নিন',
                description: "পছন্দের পেমেন্ট মেথড সিলেক্ট করুন",
              },
              {
                number: 2,
                title: 'টাকা পাঠান',
                description: "নির্দিষ্ট নম্বরে সেন্ড মানি করুন",
              },
              {
                number: 3,
                title: 'তথ্য দিন',
                description: "নাম ও পরিমাণ দিয়ে কনফার্ম করুন",
              },
              {
                number: 4,
                title: 'ঈদ এনজয়!',
                description: "সালামি পৌঁছে যাবে! ঈদ মোবারক 🌙",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="group relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-slate-800/80 border border-slate-700/50 rounded-xl p-6 text-center hover:border-slate-600/50 transition-colors">
                  <div className="w-14 h-14 bg-slate-700/50 border-2 border-slate-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-white text-lg">
                    {step.number}
                  </div>
                  <h4 className="font-bold text-white mb-2">{step.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-700/50 bg-slate-900/70 px-4 py-5 text-center">
        <p className="text-base md:text-lg text-slate-300">Inspired from সালামির পাতা.বাংলা</p>
      </footer>

      {/* Bottom Sound Toggle (Mobile) */}
      <button
        onClick={handleSoundToggle}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-50"
        aria-label="Toggle sound"
      >
        {soundOn ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
      </button>

      <audio
        ref={audioRef}
        src={audioTracks[trackIndex]}
        onEnded={handleAudioEnded}
        preload="auto"
      />

      {showPaymentPopup && (
        <div className="fixed inset-0 z-[90] bg-slate-950/85 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-md max-h-[88vh] overflow-y-auto rounded-2xl border border-slate-700/60 bg-slate-900 p-5 md:p-6 shadow-2xl">
            <img
              src="/95218475_930057237448976_1119763274749968384_n.jpg"
              alt="Payment popup visual"
              className="w-full max-h-[40vh] h-auto object-contain rounded-xl border border-slate-700/60 mb-4 bg-slate-800/60"
            />

            <h2 className="text-xl md:text-2xl font-bold text-white mb-3">সবিনয় আকুল আবেদন এই যে </h2>
            <p className="text-slate-300 mb-6">
              MFS কিনার টাকা নাই তাইতো সালামি দরকার এত। কষ্ট করে বিকাশে গিয়ে সেন্ড মানি করুন। 
            </p>

            <div className="rounded-xl border border-slate-700/60 bg-slate-800/70 p-4 mb-6">
              <p className="text-white font-semibold">বিকাশ</p>
              <p className="text-pink-400 font-mono mt-1">01937098591</p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handlePaymentDoneClick}
                className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-3 px-5 rounded-lg transition-all"
              >
                যদি সালামি দেয়া হয় শুধু তাহলেই এই খানে ক্লিক করুন 
              </button>
              <button
                onClick={handleBackClick}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-5 rounded-lg transition-colors"
              >
                ফিরে যান
              </button>

            </div>
          </div>
        </div>
      )}

      {showVideoPopup && (
        <div className="fixed inset-0 z-[97] bg-slate-950/90 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-2xl rounded-2xl border border-slate-700/60 bg-slate-900 p-4 md:p-5 shadow-2xl">
            <video
              src={paymentVideoSrc}
              className="w-full max-h-[70vh] rounded-xl bg-black"
              controls
              autoPlay
              playsInline
            />
            <button
              onClick={() => setShowVideoPopup(false)}
              className="w-full mt-4 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-3 px-5 rounded-lg transition-all"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      )}

      {showBackMessagePopup && (
        <div className="fixed inset-0 z-[95] bg-slate-950/85 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-700/60 bg-slate-900 p-5 md:p-6 shadow-2xl text-center">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">বার্তা</h3>
            <p className="text-slate-200 mb-6">
              রমজান মাসে সালামি দিলে সওয়াব হবে, তাই দেন দেন—কৃপণতা করবেন না।
            </p>
            <button
              onClick={() => setShowBackMessagePopup(false)}
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-3 px-5 rounded-lg transition-all"
            >
              ঠিক আছে
            </button>
          </div>
        </div>
      )}

      {showWelcome && (
        <div className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-700/60 bg-slate-900 p-6 text-center shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-3">স্বাগতম</h2>
            <p className="text-slate-300 mb-6">
              সালামির পেজে আপনাকে স্বাগতম। নিচের বাটনে ক্লিক করে ভিতরে প্রবেশ করুন।
            </p>
            <button
              onClick={() => setShowWelcome(false)}
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg transition-all"
            >
              Enter
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
