import React from 'react';

const WinModal = ({ isOpen, onClose, onNewGame, stats }) => {
    if (!isOpen) return null;

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 fade-in">
            <div className="glass-effect rounded-3xl p-8 max-w-md w-full celebrate shadow-2xl">
                <div className="text-center">
                    {/* Trophy Icon */}
                    <div className="text-8xl mb-4 animate-bounce-slow">🏆</div>

                    {/* Title */}
                    <h2 className="text-4xl font-bold text-white mb-2">
                        Chúc Mừng!
                    </h2>
                    <p className="text-xl text-white mb-6">
                        Bạn đã hoàn thành Sudoku!
                    </p>

                    {/* Stats */}
                    <div className="bg-white bg-opacity-20 rounded-2xl p-6 mb-6 space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-white font-medium">Thời gian:</span>
                            <span className="text-white font-bold text-xl">{formatTime(stats.timer)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-white font-medium">Sai sót:</span>
                            <span className="text-white font-bold text-xl">{stats.mistakes}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-white font-medium">Gợi ý đã dùng:</span>
                            <span className="text-white font-bold text-xl">{stats.hintsUsed}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-white font-medium">Độ khó:</span>
                            <span className="text-white font-bold text-xl">
                                {stats.difficulty === 'EASY' ? 'Dễ' :
                                    stats.difficulty === 'MEDIUM' ? 'Trung Bình' :
                                        stats.difficulty === 'HARD' ? 'Khó' : 'Chuyên Gia'}
                            </span>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="space-y-3">
                        <button
                            onClick={onNewGame}
                            className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
                        >
                            🎮 Chơi Game Mới
                        </button>
                        <button
                            onClick={onClose}
                            className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WinModal;
