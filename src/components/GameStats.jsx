import React from 'react';

const GameStats = ({
    difficulty,
    mistakes,
    hintsUsed,
    timer,
    onNewGame,
    onHint,
    onAIHint,
    onValidate,
    onChangeDifficulty,
    isPaused,
    onTogglePause,
    darkMode
}) => {
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const difficulties = ['EASY', 'MEDIUM', 'HARD', 'EXPERT', 'MASTER'];
    const difficultyNames = {
        EASY: 'Dễ',
        MEDIUM: 'Trung Bình',
        HARD: 'Khó',
        EXPERT: 'Chuyên Gia',
        MASTER: 'Cực Khó'
    };

    return (
        <div className={`glass-effect rounded-2xl p-6 shadow-2xl space-y-6 ${darkMode ? 'bg-gray-800/30' : ''}`}>
            {/* Timer */}
            <div className="text-center relative">
                <div className="text-white text-sm font-medium mb-2">Thời Gian</div>
                <div className="text-4xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                    {formatTime(timer)}
                </div>
                <button
                    onClick={onTogglePause}
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white text-xs font-bold py-1 px-3 rounded-full transition-all"
                >
                    {isPaused ? '▶️ Tiếp Tục' : '⏸️ Tạm Dừng'}
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white bg-opacity-20 rounded-xl p-4 text-center">
                    <div className="text-white text-sm font-medium mb-1">Sai Sót</div>
                    <div className="text-3xl font-bold text-red-300">{mistakes}</div>
                </div>
                <div className="bg-white bg-opacity-20 rounded-xl p-4 text-center">
                    <div className="text-white text-sm font-medium mb-1">Gợi Ý</div>
                    <div className="text-3xl font-bold text-yellow-300">{hintsUsed}</div>
                </div>
            </div>

            {/* Difficulty Selector */}
            <div>
                <div className="text-white text-sm font-medium mb-2 text-center">Độ Khó</div>
                <div className="grid grid-cols-2 gap-2">
                    {difficulties.map((diff) => (
                        <button
                            key={diff}
                            onClick={() => onChangeDifficulty(diff)}
                            className={`py-2 px-3 rounded-lg font-semibold text-sm transition-all duration-200 transform hover:scale-105 ${difficulty === diff
                                ? 'bg-white text-purple-600 shadow-lg'
                                : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                                }`}
                        >
                            {difficultyNames[diff]}
                        </button>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
                <button
                    onClick={onHint}
                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
                >
                    💡 Gợi Ý
                </button>
                <button
                    onClick={onAIHint}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
                >
                    🤖 AI Gợi Ý
                </button>
                <button
                    onClick={onValidate}
                    className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
                >
                    ✓ Kiểm Tra
                </button>
                <button
                    onClick={onNewGame}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
                >
                    🎮 Game Mới
                </button>
            </div>
        </div>
    );
};

export default GameStats;
