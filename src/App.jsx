import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
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
    duration: 60,
    lyrics: [
      { time: 0, text: '清晨的第一缕阳光' },
      { time: 5, text: '轻轻洒落在我的脸庞' },
      { time: 10, text: '鸟儿开始欢快地歌唱' },
      { time: 15, text: '新的一天已经起航' },
      { time: 20, text: '微风轻轻吹过脸庞' },
      { time: 25, text: '带走了昨夜的忧伤' },
      { time: 30, text: '阳光洒满每一个角落' },
      { time: 35, text: '温暖着每一颗心房' },
      { time: 40, text: '让我们一起迎接' },
      { time: 45, text: '这美好的时光' },
      { time: 50, text: '未来的路还很长' },
      { time: 55, text: '让我们携手去闯' },
    ]
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
    duration: 60,
    lyrics: [
      { time: 0, text: '城市的夜晚霓虹闪烁' },
      { time: 5, text: '街头的节奏开始跳动' },
      { time: 10, text: '脚步声伴随着鼓点' },
      { time: 15, text: '每个人都在追逐梦想' },
      { time: 20, text: '酒吧里传来萨克斯声' },
      { time: 25, text: '街角艺人演奏着吉他' },
      { time: 30, text: '都市的脉搏从未停歇' },
      { time: 35, text: '人们在音乐中释放自己' },
      { time: 40, text: '这是属于我们的节奏' },
      { time: 45, text: '让音符在夜空中飞扬' },
      { time: 50, text: '城市的故事还在继续' },
      { time: 55, text: '直到黎明的第一道光' },
    ]
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
    duration: 60,
    lyrics: [
      { time: 0, text: '穿越星际的旅程' },
      { time: 5, text: '感受宇宙的浩瀚无垠' },
      { time: 10, text: '银河在身边缓缓流淌' },
      { time: 15, text: '星星在远处眨眼微笑' },
      { time: 20, text: '黑洞边缘的神秘力量' },
      { time: 25, text: '星云深处的未知世界' },
      { time: 30, text: '飞船在虚空中自由翱翔' },
      { time: 35, text: '时间在这里变得缓慢' },
      { time: 40, text: '让我们一起探索' },
      { time: 45, text: '这无尽的宇宙奥秘' },
      { time: 50, text: '带着对未知的好奇' },
      { time: 55, text: '继续向更深的太空前进' },
    ]
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
    duration: 60,
    lyrics: [
      { time: 0, text: '清晨的森林一片静谧' },
      { time: 5, text: '露珠在绿叶上闪烁' },
      { time: 10, text: '鸟儿开始第一声歌唱' },
      { time: 15, text: '阳光透过树叶洒下' },
      { time: 20, text: '溪水潺潺流淌不息' },
      { time: 25, text: '青苔在石头上蔓延' },
      { time: 30, text: '蝴蝶在花丛中翩翩起舞' },
      { time: 35, text: '风儿轻轻吹过树梢' },
      { time: 40, text: '这是大自然的低语' },
      { time: 45, text: '诉说着生命的故事' },
      { time: 50, text: '让我们静静聆听' },
      { time: 55, text: '感受森林的呼吸' },
    ]
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
    duration: 60,
    lyrics: [
      { time: 0, text: '蓝色的大海一望无际' },
      { time: 5, text: '海浪轻轻拍打着沙滩' },
      { time: 10, text: '海风带来咸咸的气息' },
      { time: 15, text: '海鸥在天空自由翱翔' },
      { time: 20, text: '日落时分的金色光芒' },
      { time: 25, text: '洒在波光粼粼的海面' },
      { time: 30, text: '远方的船只若隐若现' },
      { time: 35, text: '带着梦想驶向地平线' },
      { time: 40, text: '这是大海的呼唤' },
      { time: 45, text: '讲述着古老的传说' },
      { time: 50, text: '让我们倾听海浪' },
      { time: 55, text: '感受大海的心跳' },
    ]
  }
];

class WebAudioPlayer {
  constructor() {
    this.audioContext = null;
    this.masterGain = null;
    this.analyser = null;
    this.oscillators = [];
    this.isPlaying = false;
    this.startTime = 0;
    this.pauseTime = 0;
    this.currentTrack = null;
    this.volume = 0.7;
    this.isMuted = false;
    this.schedulerInterval = null;
    this.lookahead = 25.0;
    this.scheduleAheadTime = 0.1;
    this.nextNoteTime = 0.0;
    this.nextNoteIndex = 0;
    this.notesPlayed = 0;
    this.notesPerCycle = 0;
    this.cycleDuration = 0;
    this.elapsedInCycle = 0;
    this.onTimeUpdateCallback = null;
    this.onEndedCallback = null;
    this.onLoadedMetadataCallback = null;
    this.timeUpdateInterval = null;
    
    this.isLocalFile = false;
    this.audioElement = null;
    this.mediaElementSource = null;
    
    this.boundHandleLoadedMetadata = null;
    this.boundHandleTimeUpdate = null;
    this.boundHandleEnded = null;
  }

  initContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.masterGain = this.audioContext.createGain();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.audioContext.currentTime);
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.audioContext.destination);
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  getAnalyser() {
    return this.analyser;
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

  playNote(freq, startTime, duration, noteVolume = 0.3) {
    if (!this.audioContext || !this.masterGain) return;

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

    const effectiveVolume = noteVolume * (this.isMuted ? 0.0001 : this.volume);
    
    gainNode.gain.setValueAtTime(0.0001, startTime);
    gainNode.gain.linearRampToValueAtTime(effectiveVolume, startTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(Math.max(0.0001, effectiveVolume * 0.7), startTime + duration * 0.3);
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

    reverbGain.gain.setValueAtTime(0.3, startTime);

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);
    gainNode.connect(reverb);
    reverb.connect(reverbGain);
    reverbGain.connect(this.masterGain);

    oscillator.start(startTime);
    oscillator.stop(startTime + duration);

    this.oscillators.push({ oscillator, stopTime: startTime + duration });
  }

  nextNote() {
    const notes = this.currentTrack.notes;
    const currentTime = this.audioContext.currentTime;
    
    while (this.nextNoteTime < currentTime + this.scheduleAheadTime) {
      const note = notes[this.nextNoteIndex];
      this.playNote(note.freq, this.nextNoteTime, note.duration, 0.3);
      
      this.nextNoteTime += note.duration;
      this.notesPlayed++;
      
      this.elapsedInCycle += note.duration;
      if (this.elapsedInCycle >= this.cycleDuration) {
        this.elapsedInCycle = 0;
      }
      
      this.nextNoteIndex = (this.nextNoteIndex + 1) % notes.length;
    }
  }

  scheduler() {
    this.nextNote();
    
    const currentPlayTime = this.audioContext.currentTime - this.startTime;
    
    if (currentPlayTime >= this.currentTrack.duration) {
      this.stop();
      if (this.onEndedCallback) {
        this.onEndedCallback();
      }
      return;
    }
    
    if (this.onTimeUpdateCallback) {
      this.onTimeUpdateCallback(currentPlayTime);
    }
  }

  calculateStartPosition(seekTime) {
    if (!this.currentTrack) return { noteIndex: 0, elapsedInCycle: 0, notesPlayed: 0 };
    
    const notes = this.currentTrack.notes;
    const noteDuration = this.cycleDuration;
    
    const totalCycles = Math.floor(seekTime / noteDuration);
    const remainingInCycle = seekTime % noteDuration;
    
    let noteIndex = 0;
    let elapsedInCycle = 0;
    
    for (let i = 0; i < notes.length; i++) {
      if (elapsedInCycle + notes[i].duration > remainingInCycle) {
        noteIndex = i;
        break;
      }
      elapsedInCycle += notes[i].duration;
      noteIndex = i + 1;
    }
    
    const notesPlayed = totalCycles * notes.length + noteIndex;
    
    return { noteIndex, elapsedInCycle, notesPlayed };
  }

  play(track, seekTime = 0) {
    this.initContext();
    this.stop();

    this.currentTrack = track;
    this.isLocalFile = !!track.isLocalFile;
    
    if (this.isLocalFile) {
      this.playLocalFile(track, seekTime);
    } else {
      this.playSynthesized(track, seekTime);
    }
  }
  
  playSynthesized(track, seekTime = 0) {
    this.notesPerCycle = track.notes.length;
    this.cycleDuration = track.notes.reduce((sum, n) => sum + n.duration, 0);
    
    const { noteIndex, elapsedInCycle, notesPlayed } = this.calculateStartPosition(seekTime);
    this.nextNoteIndex = noteIndex;
    this.elapsedInCycle = elapsedInCycle;
    this.notesPlayed = notesPlayed;
    
    this.isPlaying = true;
    this.startTime = this.audioContext.currentTime - seekTime;
    this.pauseTime = 0;
    this.nextNoteTime = this.audioContext.currentTime;

    this.schedulerInterval = setInterval(() => {
      if (this.isPlaying) {
        this.scheduler();
      }
    }, this.lookahead);
  }
  
  playLocalFile(track, seekTime = 0) {
    if (!this.audioElement) {
      this.audioElement = new Audio();
      this.boundHandleLoadedMetadata = this.handleLoadedMetadata.bind(this);
      this.boundHandleTimeUpdate = this.handleTimeUpdate.bind(this);
      this.boundHandleEnded = this.handleEnded.bind(this);
      
      this.audioElement.addEventListener('loadedmetadata', this.boundHandleLoadedMetadata);
      this.audioElement.addEventListener('timeupdate', this.boundHandleTimeUpdate);
      this.audioElement.addEventListener('ended', this.boundHandleEnded);
    }
    
    this.audioElement.src = track.audioUrl;
    this.audioElement.volume = this.isMuted ? 0 : this.volume;
    this._pendingSeekTime = seekTime;
    
    if (!this.mediaElementSource) {
      this.mediaElementSource = this.audioContext.createMediaElementSource(this.audioElement);
      this.mediaElementSource.connect(this.masterGain);
    }
    
    this.isPlaying = true;
    this.pauseTime = seekTime;
    
    this.audioElement.play().catch(err => {
      console.error('Error playing audio:', err);
    });
  }
  
  handleLoadedMetadata() {
    if (this.currentTrack) {
      this.currentTrack.duration = this.audioElement.duration;
    }
    
    if (this._pendingSeekTime !== undefined && this._pendingSeekTime > 0) {
      this.audioElement.currentTime = this._pendingSeekTime;
      this._pendingSeekTime = undefined;
    }
    
    if (this.onLoadedMetadataCallback) {
      this.onLoadedMetadataCallback(this.audioElement.duration);
    }
  }
  
  handleTimeUpdate() {
    if (this.onTimeUpdateCallback) {
      this.onTimeUpdateCallback(this.audioElement.currentTime);
    }
  }
  
  handleEnded() {
    this.isPlaying = false;
    if (this.onEndedCallback) {
      this.onEndedCallback();
    }
  }

  pause() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    
    if (this.isLocalFile) {
      this.pauseTime = this.audioElement.currentTime;
      this.audioElement.pause();
    } else {
      this.pauseTime = this.audioContext.currentTime - this.startTime;
      
      if (this.schedulerInterval) {
        clearInterval(this.schedulerInterval);
        this.schedulerInterval = null;
      }
      
      this.stopOscillators();
    }
  }

  resume() {
    if (this.isPlaying || !this.currentTrack) return;
    
    if (this.isLocalFile && this.audioElement) {
      this.isPlaying = true;
      this.audioElement.play().catch(err => {
        console.error('Error resuming audio:', err);
      });
    } else {
      this.play(this.currentTrack, this.pauseTime);
    }
  }

  stopOscillators() {
    this.oscillators.forEach(({ oscillator }) => {
      try {
        oscillator.stop();
      } catch {
        // ignore errors when stopping oscillators
      }
    });
    this.oscillators = [];
  }

  stop() {
    this.isPlaying = false;
    
    if (this.isLocalFile && this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
    } else {
      if (this.schedulerInterval) {
        clearInterval(this.schedulerInterval);
        this.schedulerInterval = null;
      }
      
      if (this.timeUpdateInterval) {
        clearInterval(this.timeUpdateInterval);
        this.timeUpdateInterval = null;
      }
      
      this.stopOscillators();
    }
  }

  seek(time) {
    if (!this.currentTrack) return;
    
    if (this.isLocalFile && this.audioElement) {
      this.audioElement.currentTime = time;
      this.pauseTime = time;
    } else {
      const wasPlaying = this.isPlaying;
      this.stop();
      this.pauseTime = time;
      if (wasPlaying) {
        this.play(this.currentTrack, time);
      }
    }
  }

  setVolume(volume) {
    this.volume = volume;
    if (this.masterGain && this.audioContext) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : volume, this.audioContext.currentTime);
    }
    if (this.audioElement) {
      this.audioElement.volume = this.isMuted ? 0 : volume;
    }
  }

  setMute(muted) {
    this.isMuted = muted;
    if (this.masterGain && this.audioContext) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : this.volume, this.audioContext.currentTime);
    }
    if (this.audioElement) {
      this.audioElement.volume = muted ? 0 : this.volume;
    }
  }

  getDuration() {
    return this.currentTrack ? this.currentTrack.duration : 60;
  }

  onTimeUpdate(callback) {
    this.onTimeUpdateCallback = callback;
  }

  onEnded(callback) {
    this.onEndedCallback = callback;
  }

  onLoadedMetadata(callback) {
    this.onLoadedMetadataCallback = callback;
  }
}

function App() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(60);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [playMode, setPlayMode] = useState('sequence');
  const [playHistory, setPlayHistory] = useState(() => {
    const savedHistory = localStorage.getItem('audioPlayerHistory');
    if (savedHistory) {
      try {
        return JSON.parse(savedHistory);
      } catch {
        return [];
      }
    }
    return [];
  });
  const [localTracks, setLocalTracks] = useState([]);
  const audioPlayerRef = useRef(null);
  const isSeeking = useRef(false);
  const currentTrackIndexRef = useRef(currentTrackIndex);
  const lyricsContainerRef = useRef(null);
  const playModeRef = useRef(playMode);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const allTracks = useMemo(() => [...tracks, ...localTracks], [localTracks]);
  const currentTrack = allTracks[currentTrackIndex];

  const getCurrentLyricIndex = useCallback(() => {
    if (!currentTrack.lyrics || currentTrack.lyrics.length === 0) return 0;
    
    for (let i = currentTrack.lyrics.length - 1; i >= 0; i--) {
      if (currentTime >= currentTrack.lyrics[i].time) {
        return i;
      }
    }
    return 0;
  }, [currentTrack, currentTime]);

  const addToHistory = useCallback((trackIndex) => {
    const track = allTracks[trackIndex];
    const historyItem = {
      id: track.id,
      title: track.title,
      artist: track.artist,
      cover: track.cover,
      trackIndex: trackIndex,
      playedAt: Date.now()
    };

    setPlayHistory(prev => {
      let newHistory = [historyItem, ...prev.filter(item => item.id !== track.id)];
      if (newHistory.length > 10) {
        newHistory = newHistory.slice(0, 10);
      }
      localStorage.setItem('audioPlayerHistory', JSON.stringify(newHistory));
      return newHistory;
    });
  }, [allTracks]);

  const playTrack = useCallback((index) => {
    if (!audioPlayerRef.current) return;
    
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    setCurrentTime(0);
    setDuration(allTracks[index].duration);
    audioPlayerRef.current.play(allTracks[index], 0);
    addToHistory(index);
  }, [allTracks, addToHistory]);

  const handleTrackEnd = useCallback(() => {
    const currentMode = playModeRef.current;
    const currentIdx = currentTrackIndexRef.current;
    
    if (currentMode === 'repeat') {
      playTrack(currentIdx);
    } else if (currentMode === 'shuffle') {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * allTracks.length);
      } while (nextIndex === currentIdx && allTracks.length > 1);
      playTrack(nextIndex);
    } else {
      const nextIndex = (currentIdx + 1) % allTracks.length;
      playTrack(nextIndex);
    }
  }, [playTrack, allTracks.length]);

  const handleFileSelect = useCallback((e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newTracks = [];
    let idCounter = 1000 + localTracks.length;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      if (!file.type.startsWith('audio/')) continue;

      const audioUrl = URL.createObjectURL(file);
      const fileName = file.name.replace(/\.[^/.]+$/, '');

      const newTrack = {
        id: idCounter++,
        title: fileName,
        artist: '本地音乐',
        cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=300&h=300',
        isLocalFile: true,
        audioUrl: audioUrl,
        duration: 0,
        lyrics: []
      };

      newTracks.push(newTrack);
    }

    if (newTracks.length > 0) {
      setLocalTracks(prev => [...prev, ...newTracks]);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [localTracks.length]);

  const openFileSelector = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const togglePlayMode = () => {
    const modes = ['sequence', 'repeat', 'shuffle'];
    const currentIndex = modes.indexOf(playMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setPlayMode(nextMode);
  };

  const getPlayModeIcon = () => {
    switch (playMode) {
      case 'repeat':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
          </svg>
        );
      case 'shuffle':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/>
          </svg>
        );
      default:
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
          </svg>
        );
    }
  };

  const getPlayModeTooltip = () => {
    switch (playMode) {
      case 'repeat':
        return '单曲循环';
      case 'shuffle':
        return '随机播放';
      default:
        return '列表循环';
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const playNext = () => {
    if (playMode === 'shuffle') {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * allTracks.length);
      } while (nextIndex === currentTrackIndex && allTracks.length > 1);
      playTrack(nextIndex);
    } else {
      const nextIndex = (currentTrackIndex + 1) % allTracks.length;
      playTrack(nextIndex);
    }
  };

  const playPrevious = () => {
    const prevIndex = (currentTrackIndex - 1 + allTracks.length) % allTracks.length;
    playTrack(prevIndex);
  };

  const handleProgressChange = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    isSeeking.current = true;
  };

  const handleProgressMouseUp = (e) => {
    const time = parseFloat(e.target.value);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.seek(time);
    }
    isSeeking.current = false;
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.setVolume(vol);
    }
    if (vol > 0) {
      setIsMuted(false);
      if (audioPlayerRef.current) {
        audioPlayerRef.current.setMute(false);
      }
    }
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.setMute(newMuted);
    }
  };

  const togglePlay = useCallback(() => {
    if (!audioPlayerRef.current) return;

    if (isPlaying) {
      audioPlayerRef.current.pause();
    } else {
      if (audioPlayerRef.current.pauseTime > 0 || audioPlayerRef.current.isPlaying) {
        audioPlayerRef.current.resume();
      } else {
        audioPlayerRef.current.play(currentTrack);
      }
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, currentTrack]);

  const handleTrackEndRef = useRef(handleTrackEnd);
  const togglePlayRef = useRef(togglePlay);
  const playPreviousRef = useRef(playPrevious);
  const playNextRef = useRef(playNext);
  const toggleMuteRef = useRef(toggleMute);
  
  useEffect(() => {
    handleTrackEndRef.current = handleTrackEnd;
    togglePlayRef.current = togglePlay;
    playPreviousRef.current = playPrevious;
    playNextRef.current = playNext;
    toggleMuteRef.current = toggleMute;
  }, [handleTrackEnd, togglePlay, playPrevious, playNext, toggleMute]);

  useEffect(() => {
    currentTrackIndexRef.current = currentTrackIndex;
  }, [currentTrackIndex]);

  useEffect(() => {
    playModeRef.current = playMode;
  }, [playMode]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          togglePlayRef.current();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          playPreviousRef.current();
          break;
        case 'ArrowRight':
          e.preventDefault();
          playNextRef.current();
          break;
        case 'KeyM':
          e.preventDefault();
          toggleMuteRef.current();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    audioPlayerRef.current = new WebAudioPlayer();
    
    audioPlayerRef.current.onTimeUpdate((time) => {
      if (!isSeeking.current) {
        setCurrentTime(time);
      }
    });
    
    audioPlayerRef.current.onEnded(() => {
      handleTrackEndRef.current();
    });
    
    audioPlayerRef.current.onLoadedMetadata((duration) => {
      setDuration(duration);
    });

    return () => {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.stop();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (lyricsContainerRef.current && currentTrack.lyrics) {
      const currentLyricIndex = getCurrentLyricIndex();
      const lyricElements = lyricsContainerRef.current.querySelectorAll('.lyric-line');
      if (lyricElements[currentLyricIndex]) {
        lyricElements[currentLyricIndex].scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }
  }, [currentTime, currentTrackIndex, currentTrack.lyrics, getCurrentLyricIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const barCount = 64;
    const barWidth = (rect.width - 40) / barCount;
    const barGap = 1;
    const maxBarHeight = rect.height - 20;
    const minBarHeight = 8;
    
    const smoothedHeights = new Array(barCount).fill(minBarHeight);
    const targetHeights = new Array(barCount).fill(minBarHeight);
    
    const getLogFrequencyIndex = (barIndex, totalBars, totalFrequencyBins) => {
      const minFreq = 20;
      const maxFreq = 20000;
      const minLog = Math.log10(minFreq);
      const maxLog = Math.log10(maxFreq);
      const logRange = maxLog - minLog;
      
      const freqLog = minLog + (barIndex / totalBars) * logRange;
      const freq = Math.pow(10, freqLog);
      
      const nyquist = audioPlayerRef.current?.audioContext?.sampleRate / 2 || 22050;
      const binIndex = Math.floor((freq / nyquist) * totalFrequencyBins);
      
      return Math.min(Math.max(0, binIndex), totalFrequencyBins - 1);
    };

    const getAverageValue = (dataArray, startIndex, endIndex) => {
      let sum = 0;
      const count = endIndex - startIndex + 1;
      for (let i = startIndex; i <= endIndex; i++) {
        sum += dataArray[i] || 0;
      }
      return sum / count;
    };

    let dataArray = null;
    let bufferLength = 0;

    const drawVisualizer = () => {
      const analyser = audioPlayerRef.current?.getAnalyser();
      const isCurrentlyPlaying = isPlaying && analyser;
      
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      const time = Date.now() / 1000;
      
      if (isCurrentlyPlaying) {
        bufferLength = analyser.frequencyBinCount;
        if (!dataArray || dataArray.length !== bufferLength) {
          dataArray = new Uint8Array(bufferLength);
        }
        analyser.getByteFrequencyData(dataArray);
      }
      
      for (let i = 0; i < barCount; i++) {
        if (isCurrentlyPlaying && dataArray) {
          const logIndex = getLogFrequencyIndex(i, barCount, bufferLength);
          
          const binWidth = Math.max(1, Math.floor(bufferLength / (barCount * 2)));
          const startBin = Math.max(0, logIndex - Math.floor(binWidth / 2));
          const endBin = Math.min(bufferLength - 1, logIndex + Math.floor(binWidth / 2));
          
          let value = getAverageValue(dataArray, startBin, endBin);
          
          const position = i / barCount;
          let freqBoost;
          if (position < 0.2) {
            freqBoost = 1.8 + (0.2 - position) * 3;
          } else if (position < 0.5) {
            freqBoost = 1.5 + (0.5 - position) * 1;
          } else if (position < 0.8) {
            freqBoost = 1.2 + (0.8 - position) * 0.5;
          } else {
            freqBoost = 1.0 + (1.0 - position) * 1.5;
          }
          
          value = Math.min(255, value * freqBoost);
          
          const dynamicNoise = (Math.sin(time * 5 + i * 0.8) + 1) * 3;
          value = Math.min(255, Math.max(0, value + dynamicNoise));
          
          const randomVariation = (Math.random() - 0.5) * 4;
          value = Math.min(255, Math.max(0, value + randomVariation));
          
          targetHeights[i] = (value / 255) * maxBarHeight + minBarHeight;
        } else {
          const baseHeight = minBarHeight;
          const wave1 = Math.sin(time * 1.5 + i * 0.25) * 8;
          const wave2 = Math.sin(time * 2.8 + i * 0.4) * 5;
          const wave3 = Math.cos(time * 1.2 + i * 0.15) * 4;
          const wave4 = Math.sin(time * 4 + i * 0.6) * 2;
          targetHeights[i] = baseHeight + wave1 + wave2 + wave3 + wave4;
        }
        
        const smoothingFactor = isCurrentlyPlaying ? 0.12 : 0.06;
        smoothedHeights[i] += (targetHeights[i] - smoothedHeights[i]) * smoothingFactor;
        
        const barHeight = Math.max(minBarHeight, smoothedHeights[i]);
        const x = 20 + i * (barWidth + barGap);
        const y = (rect.height - barHeight) / 2;
        
        const intensity = Math.min(1, (barHeight - minBarHeight) / (maxBarHeight - minBarHeight));
        const alpha = isCurrentlyPlaying ? 0.35 + intensity * 0.65 : 0.15 + intensity * 0.15;
        
        const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
        
        if (intensity > 0.8) {
          gradient.addColorStop(0, `rgba(30, 215, 96, ${alpha})`);
          gradient.addColorStop(0.25, `rgba(29, 185, 84, ${alpha * 0.95})`);
          gradient.addColorStop(0.5, `rgba(25, 160, 72, ${alpha * 0.85})`);
          gradient.addColorStop(0.75, `rgba(22, 140, 64, ${alpha * 0.7})`);
          gradient.addColorStop(1, `rgba(18, 120, 54, ${alpha * 0.4})`);
        } else if (intensity > 0.5) {
          gradient.addColorStop(0, `rgba(29, 185, 84, ${alpha})`);
          gradient.addColorStop(0.3, `rgba(25, 160, 72, ${alpha * 0.9})`);
          gradient.addColorStop(0.7, `rgba(22, 140, 64, ${alpha * 0.75})`);
          gradient.addColorStop(1, `rgba(18, 120, 54, ${alpha * 0.5})`);
        } else if (intensity > 0.2) {
          gradient.addColorStop(0, `rgba(25, 160, 72, ${alpha})`);
          gradient.addColorStop(0.5, `rgba(22, 140, 64, ${alpha * 0.85})`);
          gradient.addColorStop(1, `rgba(18, 120, 54, ${alpha * 0.6})`);
        } else {
          gradient.addColorStop(0, `rgba(22, 140, 64, ${alpha})`);
          gradient.addColorStop(1, `rgba(18, 120, 54, ${alpha * 0.7})`);
        }
        
        ctx.fillStyle = gradient;
        
        const radius = Math.min(2, barWidth / 2);
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + barWidth - radius, y);
        ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + radius);
        ctx.lineTo(x + barWidth, y + barHeight - radius);
        ctx.quadraticCurveTo(x + barWidth, y + barHeight, x + barWidth - radius, y + barHeight);
        ctx.lineTo(x + radius, y + barHeight);
        ctx.quadraticCurveTo(x, y + barHeight, x, y + barHeight - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.fill();
        
        if (isCurrentlyPlaying && intensity > 0.4) {
          const glowAlpha = intensity * 0.4;
          const glowBlur = 8 + intensity * 6;
          ctx.shadowBlur = glowBlur;
          ctx.shadowColor = `rgba(30, 215, 96, ${glowAlpha})`;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      animationFrameRef.current = requestAnimationFrame(drawVisualizer);
    };

    drawVisualizer();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying]);

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;
  const volumePercentage = volume * 100;

  return (
    <div className="app-container">
      <div className="main-layout">
        <div className="playlist-sidebar">
          <div className="playlist-header">
            <h2 className="playlist-title">播放列表</h2>
            <button className="add-music-btn" onClick={openFileSelector} title="添加本地音乐">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              multiple
              style={{ display: 'none' }}
              onChange={handleFileSelect}
            />
          </div>
          <div className="track-list">
            {allTracks.map((track, index) => (
              <div
                key={track.id}
                className={`track-item ${index === currentTrackIndex ? 'active' : ''} ${track.isLocalFile ? 'local-track' : ''}`}
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
                  <div className="track-artist">
                    {track.isLocalFile && <span className="local-badge">本地</span>}
                    {track.artist}
                  </div>
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

          {playHistory.length > 0 && (
            <div className="history-section">
              <h3 className="history-title">最近播放</h3>
              <div className="history-list">
                {playHistory.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className={`track-item history-item ${item.trackIndex === currentTrackIndex ? 'active' : ''}`}
                    onClick={() => playTrack(item.trackIndex)}
                  >
                    <div className="track-cover">
                      <img src={item.cover} alt={item.title} />
                      {item.trackIndex === currentTrackIndex && isPlaying && (
                        <div className="playing-indicator">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      )}
                    </div>
                    <div className="track-info">
                      <div className="track-title">{item.title}</div>
                      <div className="track-artist">{item.artist}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="shortcuts-section">
            <h3 className="shortcuts-title">键盘快捷键</h3>
            <div className="shortcuts-list">
              <div className="shortcut-item">
                <kbd className="shortcut-key">空格</kbd>
                <span className="shortcut-desc">播放/暂停</span>
              </div>
              <div className="shortcut-item">
                <kbd className="shortcut-key">←</kbd>
                <span className="shortcut-desc">上一首</span>
              </div>
              <div className="shortcut-item">
                <kbd className="shortcut-key">→</kbd>
                <span className="shortcut-desc">下一首</span>
              </div>
              <div className="shortcut-item">
                <kbd className="shortcut-key">M</kbd>
                <span className="shortcut-desc">切换静音</span>
              </div>
            </div>
          </div>
        </div>

        <div className="player-main">
          <div className="player-content">
            <div className="visualizer-section">
              <canvas ref={canvasRef} className="visualizer-canvas"></canvas>
            </div>

            <div className="album-art-wrapper">
              <div className={`album-art ${isPlaying ? 'spinning' : ''}`}>
                <img src={currentTrack.cover} alt={currentTrack.title} />
              </div>
            </div>

            <div className="lyrics-section">
              <div className="lyrics-container" ref={lyricsContainerRef}>
                {currentTrack.lyrics && currentTrack.lyrics.length > 0 ? (
                  currentTrack.lyrics.map((lyric, index) => {
                    const currentLyricIndex = getCurrentLyricIndex();
                    return (
                      <div
                        key={index}
                        className={`lyric-line ${index === currentLyricIndex ? 'active' : ''}`}
                      >
                        {lyric.text}
                      </div>
                    );
                  })
                ) : (
                  <div className="lyric-line">暂无歌词</div>
                )}
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
                    onMouseUp={handleProgressMouseUp}
                    onTouchEnd={handleProgressMouseUp}
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
              <div className="play-mode-control">
                <button 
                  className={`control-btn play-mode-btn ${playMode !== 'sequence' ? 'active' : ''}`} 
                  onClick={togglePlayMode}
                  title={getPlayModeTooltip()}
                >
                  {getPlayModeIcon()}
                </button>
              </div>

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
                      if (percent > 0) {
                        setIsMuted(false);
                        if (audioPlayerRef.current) {
                          audioPlayerRef.current.setMute(false);
                        }
                      }
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
