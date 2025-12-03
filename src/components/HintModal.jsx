import React from 'react';

const HintModal = ({ isOpen, hint, onClose, onApply }) => {
    if (!isOpen || !hint) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fadeIn">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        💡 Gợi Ý Thông Minh
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                    >
                        ×
                    </button>
                </div>

                {/* Technique Name */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg mb-4">
                    <h3 className="font-bold text-lg">🎯 Kỹ thuật: {hint.technique}</h3>
                </div>

                {/* Description */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 rounded">
                    <p className="text-gray-700 leading-relaxed">{hint.description}</p>
                </div>

                {/* Hint Details */}
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                            <span className="text-gray-600">Vị trí:</span>
                            <span className="ml-2 font-bold text-blue-600">
                                Hàng {hint.row + 1}, Cột {hint.col + 1}
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-600">Số cần điền:</span>
                            <span className="ml-2 font-bold text-green-600 text-xl">
                                {hint.value}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-xl transition-all"
                    >
                        Đóng
                    </button>
                    <button
                        onClick={() => {
                            onApply(hint);
                            onClose();
                        }}
                        className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105"
                    >
                        ✓ Áp Dụng
                    </button>
                </div>

                {/* Info */}
                <div className="mt-4 text-center text-xs text-gray-500">
                    💡 Mẹo: Hãy thử tự điền trước khi bấm "Áp Dụng" để học tốt hơn!
                </div>
            </div>
        </div>
    );
};

export default HintModal;
