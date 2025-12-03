// Sound Utility using Web Audio API

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

const playTone = (freq, type, duration, vol = 0.1) => {
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioContext.currentTime);

    gain.gain.setValueAtTime(vol, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.start();
    osc.stop(audioContext.currentTime + duration);
};

const sounds = {
    click: () => playTone(600, 'sine', 0.1, 0.1),
    number: () => playTone(800, 'sine', 0.1, 0.1),
    delete: () => playTone(300, 'triangle', 0.15, 0.1),
    error: () => {
        playTone(150, 'sawtooth', 0.3, 0.2);
        setTimeout(() => playTone(100, 'sawtooth', 0.3, 0.2), 100);
    },
    pencil: () => playTone(1200, 'sine', 0.05, 0.05),
    win: () => {
        const now = audioContext.currentTime;
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
            setTimeout(() => playTone(freq, 'sine', 0.3, 0.2), i * 150);
        });
    }
};

export const playSound = (soundType) => {
    if (sounds[soundType]) {
        sounds[soundType]();
    }
};

