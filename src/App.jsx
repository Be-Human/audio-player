import { useState, useRef, useEffect, useCallback } from 'react';
import './App.css';

const tracks = [
  {
    id: 1,
    title: 'Ethereal Dawn',
    artist: 'Ambient Dreams',
    cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=300&h=300',
    notes: [
      { freq: 261.63, duration: 0.4 },
      { freq: 293.66, duration: 0.4 },
      { freq: 329.63, duration: 0.4 },
      { freq: 349.23, duration: 0.6 },
      { freq: 329.63, duration: 0.3 },
      { freq: 293.66, duration: 0.4 },
      { freq: 261.63, duration: 0.6 },
      { freq: 220.00, duration: 0.4 },
      { freq: 246.94, duration: 0.4 },
      { freq: 261.63, duration: 0.8 },
    ],
    baseNote: 261.63,
    duration: 60
  },
  {
    id: 2,
    title: 'Urban Rhythms',
    artist: 'Street Beats',
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=300&h=300',
    notes: [
      { freq: 196.00, duration: 0.3 },
      { freq: 220.00, duration: 0.3 },
      { freq: 246.94, duration: 0.3 },
      { freq: 261.63, duration: 0.4 },
      { freq: 246.94, duration: 0.2 },
      { freq: 220.00, duration: 0.3 },
      { freq: 196.00, duration: 0.5 },
      { freq: 174.61, duration: 0.3 },
      { freq: 196.00, duration: 0.4 },
      { freq: 220.00, duration: 0.6 },
    ],
    baseNote: 196.00,
    duration: 60
  },
  {
    id: 3,
    title: 'Cosmic Journey',
    artist: 'Space Sounds',
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=300&h=300',
    notes: [
      { freq: 329.63, duration: 0.5 },
      { freq: 392.00, duration: 0.5 },
      { freq: 440.00, duration: 0.4 },
      { freq: 493.88, duration: 0.6 },
      { freq: 440.00, duration: 0.3 },
      { freq: 392.00, duration: 0.5 },
      { freq: 349.23, duration: 0.4 },
      { freq: 329.63, duration: 0.6 },
      { freq: 293.66, duration: 0.4 },
      { freq: 329.63, duration: 0.8 },
    ],
    baseNote: 329.63,
    duration: 60
  },
  {
    id: 4,
    title: 'Nature Whispers',
    artist: 'Forest Echoes',
    cover: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=300&h=300',
    notes: [
      { freq: 293.66, duration: 0.4 },
      { freq: 329.63, duration: 0.4 },
      { freq: 293.66, duration: 0.3 },
      { freq: 261.63, duration: 0.5 },
      { freq: 246.94, duration: 0.4 },
      { freq: 220.00, duration: 0.6 },
      { freq: 246.94, duration: 0.3 },
      { freq: 261.63, duration: 0.5 },
      { freq: 293.66, duration: 0.4 },
      { freq: 329.63, duration: 0.8 },
    ],
    baseNote: 293.66,
    duration: 60
  },
  {
    id: 5,
    title: 'Ocean Waves',
    artist: 'Deep Blue',
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80&w=300&h=300',
    notes: [
      { freq: 174.61, duration: 0.6 },
      { freq: 196.00, duration: 0.4 },
      { freq: 220.00, duration: 0.5 },
      { freq: 246.94, duration: 0.4 },
      { freq: 220.00, duration: 0.3 },
      { freq: 196.00, duration: 0.5 },
      { freq: 174.61, duration: 0.6 },
      { freq: 164.81, duration: 0.4 },
      { freq: 174.61, duration: 0.5 },
      { freq: 196.00, duration: 0.8 },
    ],
    baseNote: 174.61,
    duration: 60
  }
];

class WebAudioPlayer {
  constructor() {
    this.audioContext = null;
    this.oscillators = [];
    this.gainNodes = [];
    this.isPlaying = false;
    this.startTime = 0;
    this.pauseTime = 0;
    this.onTimeUpdate = null;
    this.onEnded = null;
    this.duration = 60;
    this.intervalId = null;
    this.currentTrack = null;
  }

  initContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  createReverb() {
    const sampleRate = this.audioContext.sampleRate;
    const length = sampleRate * 2;
    const impulse = this.audioContext.createBuffer(2, length, sampleRate);
    const left = impulse.getChannelData(0);
    const right = impulse.getChannelData(1);

    for (let i = 0; i < length; i++) {
      const decay = Math.pow(1 - i / length, 2);
      left[i] = (Math.random() * 2 - 1) * decay;
      right[i] = (Math.random() * 2 - 1) * decay;
    }

    const convolver = this.audioContext.createConvolver();
    convolver.buffer = impulse;
    return convolver;
  }

  playNote(freq, startTime, duration, volume = 0.3) {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    const reverb = this.createReverb();
    const reverbGain = this.audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(freq, startTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, startTime);
    filter.Q.setValueAtTime(1, startTime);

    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(volume * 0.7, startTime + duration * 0.3);
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

    reverbGain.gain.setValueAtTime(0.3, startTime);

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    gainNode.connect(reverb);
    reverb.connect(reverbGain);
    reverbGain.connect(this.audioContext.destination);

    oscillator.start(startTime);
    oscillator.stop(startTime + duration);

    this.oscillators.push({ oscillator, stopTime: startTime + duration });
  }

  generateMelody(track, startTime, elapsedTime) {
    if (!this.audioContext || !track.notes) return;

    const notes = track.notes;
    const totalNoteDuration = notes.reduce((sum, n) => sum + n.duration, 0);
    const cycles = Math.floor(elapsedTime / totalNoteDuration);
    const cycleTime = elapsedTime % totalNoteDuration;

    let currentTime = 0;
    let startNoteIndex = 0;

    for (let i = 0; i < notes.length; i++) {
      if (currentTime + notes[i].duration > cycleTime) {
        startNoteIndex = i;
        break;
      }
      currentTime += notes[i].duration;
    }

    let playTime = startTime;
    const noteStartTime = cycleTime - currentTime;

    if (noteStartTime < notes[startNoteIndex].duration) {
      const remainingDuration = notes[startNoteIndex].duration - noteStartTime;
      this.playNote(notes[startNoteIndex].freq, playTime, remainingDuration);
      playTime += remainingDuration;
    }

    for (let i = startNoteIndex + 1; i < notes.length; i++) {
      this.playNote(notes[i].freq, playTime, notes[i].duration);
      playTime += notes[i].duration;
    }

    for (let cycle = 0; cycle < 5; cycle++) {
      for (let i = 0; i < notes.length; i++) {
        this.playNote(notes[i].freq, playTime, notes[i].duration);
        playTime += notes[i].duration;
      }
    }
  }

  play(track, seekTime = 0) {
    this.initContext();
    this.stop();

    this.currentTrack = track;
    this.duration = track.duration;
    this.isPlaying = true;
    this.startTime = this.audioContext.currentTime - seekTime;
    this.pauseTime = 0;

    this.generateMelody(track, this.audioContext.currentTime, seekTime);

    this.startTimeUpdate();
  }

  startTimeUpdate() {
    this.intervalId = setInterval(() => {
      if (this.isPlaying && this.onTimeUpdate) {
        const currentTime = this.audioContext.currentTime - this.startTime;
        if (currentTime >= this.duration) {
          this.stop();
          if (this.onEnded) {
            this.onEnded();
          }
        } else {
          this.onTimeUpdate(currentTime);
        }
      }
    }, 100);
  }

  pause() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    this.pauseTime = this.audioContext.currentTime - this.startTime;
    this.stopOscillators();
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  resume() {
    if (this.isPlaying || !this.currentTrack) return;
    this.initContext();
    this.isPlaying = true;
    this.startTime = this.audioContext.currentTime - this.pauseTime;
    this.generateMelody(this.currentTrack, this.audioContext.currentTime, this.pauseTime);
    this.startTimeUpdate();
  }

  stopOscillators() {
    this.oscillators.forEach(({ oscillator, stopTime }) => {
      try {
        oscillator.stop();
      } catch (e) {}
    });
    this.oscillators = [];
  }

  stop() {
    this.isPlaying = false;
    this.stopOscillators();
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  seek(time) {
    if (!this.currentTrack) return;
    const wasPlaying = this.isPlaying;
    this.stop();
    if (wasPlaying) {
      this.play(this.currentTrack, time);
    } else {
      this.pauseTime = time;
    }
  }

  getDuration() {
    return this.duration;
  }

  setVolume(volume) {
  }
}

function App() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(60);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const audioPlayerRef = useRef(null);

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    audioPlayerRef.current = new WebAudioPlayer();
    audioPlayerRef.current.onTimeUpdate = (time) => {
      setCurrentTime(time);
    };
    audioPlayerRef.current.onEnded = () => {
      playNext();
    };

    return () => {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.stop();
      }
    };
  }, []);

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlay = useCallback(() => {
    if (!audioPlayerRef.current) return;

    if (isPlaying) {
      audioPlayerRef.current.pause();
    } else {
      if (audioPlayerRef.current.pauseTime > 0) {
        audioPlayerRef.current.resume();
      } else {
        audioPlayerRef.current.play(currentTrack);
      }
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, currentTrack]);

  const playTrack = (index) => {
    if (!audioPlayerRef.current) return;
    
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    setCurrentTime(0);
    setDuration(tracks[index].duration);
    audioPlayerRef.current.play(tracks[index], 0);
  };

  const playNext = () => {
    const nextIndex = (currentTrackIndex + 1) % tracks.length;
    playTrack(nextIndex);
  };

  const playPrevious = () => {
    const prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    playTrack(prevIndex);
  };

  const handleProgressChange = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.seek(time);
    }
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.setVolume(vol);
    }
    setIsMuted(vol === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
  const volumePercentage = volume * 100;

  return (
    <div className="app-container">
      <div className="main-layout">
        <div className="playlist-sidebar">
          <h2 className="playlist-title">播放列表</h2>
          <div className="track-list">
            {tracks.map((track, index) => (
              <div
                key={track.id}
                className={`track-item ${index === currentTrackIndex ? 'active' : ''}`}
                onClick={() => playTrack(index)}
              >
                <div className="track-cover">
                  <img src={track.cover} alt={track.title} />
                  {index === currentTrackIndex && isPlaying && (
                    <div className="playing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  )}
                </div>
                <div className="track-info">
                  <div className="track-title">{track.title}</div>
                  <div className="track-artist">{track.artist}</div>
                </div>
                <div className="track-number">
                  {index === currentTrackIndex && isPlaying ? (
                    <div className="playing-icon">♪</div>
                  ) : (
                    index + 1
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="player-main">
          <div className="player-content">
            <div className="album-art-wrapper">
              <div className={`album-art ${isPlaying ? 'spinning' : ''}`}>
                <img src={currentTrack.cover} alt={currentTrack.title} />
              </div>
            </div>

            <div className="track-details">
              <h1 className="current-title">{currentTrack.title}</h1>
              <p className="current-artist">{currentTrack.artist}</p>
            </div>

            <div className="progress-section">
              <div className="progress-container">
                <div 
                  className="progress-background"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                    const newTime = percent * duration;
                    setCurrentTime(newTime);
                    if (audioPlayerRef.current) {
                      audioPlayerRef.current.seek(newTime);
                    }
                  }}
                >
                  <div 
                    className="progress-fill" 
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleProgressChange}
                    className="progress-slider"
                  />
                </div>
              </div>
              <div className="time-display">
                <span className="current-time">{formatTime(currentTime)}</span>
                <span className="total-time">{formatTime(duration)}</span>
              </div>
            </div>

            <div className="controls-section">
              <div className="main-controls">
                <button className="control-btn prev-btn" onClick={playPrevious}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                  </svg>
                </button>
                <button className="control-btn play-btn" onClick={togglePlay}>
                  {isPlaying ? (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                    </svg>
                  ) : (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
                </button>
                <button className="control-btn next-btn" onClick={playNext}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
                  </svg>
                </button>
              </div>

              <div className="volume-control">
                <button className="volume-btn" onClick={toggleMute}>
                  {isMuted || volume === 0 ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                    </svg>
                  ) : volume < 0.5 ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                    </svg>
                  )}
                </button>
                <div className="volume-slider-container">
                  <div 
                    className="volume-background"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                      setVolume(percent);
                      if (audioPlayerRef.current) {
                        audioPlayerRef.current.setVolume(percent);
                      }
                      setIsMuted(percent === 0);
                    }}
                  >
                    <div 
                      className="volume-fill" 
                      style={{ width: `${isMuted ? 0 : volumePercentage}%` }}
                    ></div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="volume-slider"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
