import React, { useState } from 'react';
import { getAIHint, isAIAvailable } from '../utils/geminiAI';

const AIHintModal = ({ isOpen, onClose, board, difficulty }) => {
    const [hint, setHint] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGetHint = async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await getAIHint(board, difficulty);

            if (result.success) {
                setHint(result);
            } else {
                setError(result.error || 'Không thể lấy gợi ý từ AI');
            }
        } catch (err) {
            setError(err.message || 'Đã xảy ra lỗi khi kết nối với AI');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setHint(null);
        setError(null);
        onClose();
    };

    if (!isOpen) return null;

    // Kiểm tra xem AI có được cấu hình không
    if (!isAIAvailable()) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fadeIn">
                <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
                        <h2 className="text-2xl font-bold">🤖 AI Gợi Ý</h2>
                    </div>

                    <div className="p-6">
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                            <p className="text-yellow-800 font-medium">⚠️ Chưa cấu hình API Key</p>
                            <p className="text-yellow-700 text-sm mt-2">
                                Để sử dụng tính năng AI Gợi Ý, bạn cần:
                            </p>
                            <ol className="text-yellow-700 text-sm mt-2 ml-4 list-decimal">
                                <li>Lấy API key từ <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline">Google AI Studio</a></li>
                                <li>Thêm vào file <code className="bg-yellow-100 px-1 rounded">.env</code></li>
                                <li>Khởi động lại ứng dụng</li>
                            </ol>
                        </div>

                        <button
                            onClick={handleClose}
                            className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-xl transition-all"
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden transform transition-all">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">🤖</span>
                        <h2 className="text-2xl font-bold">AI Gợi Ý Thông Minh</h2>
                    </div>
                    <button
                        onClick={handleClose}
                        className="text-white opacity-70 hover:opacity-100 transition-opacity text-2xl font-bold"
                    >
                        ×
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {!hint && !loading && !error && (
                        <div className="text-center py-8">
                            <div className="text-6xl mb-4">🧠</div>
                            <p className="text-gray-600 mb-6">
                                Gemini AI sẽ phân tích bảng Sudoku và đưa ra gợi ý thông minh cho bạn!
                            </p>
                            <button
                                onClick={handleGetHint}
                                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg"
                            >
                                ✨ Nhận Gợi Ý AI
                            </button>
                        </div>
                    )}

                    {loading && (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent mb-4"></div>
                            <p className="text-gray-600 font-medium">AI đang suy nghĩ...</p>
                            <p className="text-gray-500 text-sm mt-2">Đang phân tích bảng Sudoku của bạn</p>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                            <p className="text-red-800 font-medium">❌ Lỗi</p>
                            <p className="text-red-700 text-sm mt-1">{error}</p>
                        </div>
                    )}

                    {hint && (
                        <div className="space-y-4">
                            {/* Technique Badge */}
                            {hint.technique && (
                                <div className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold">
                                    📚 Kỹ thuật: {hint.technique}
                                </div>
                            )}

                            {/* AI Hint */}
                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-5">
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">💡</span>
                                    <div className="flex-1">
                                        <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                                            {hint.hint}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                                <p className="text-blue-800 text-sm">
                                    💭 <strong>Lưu ý:</strong> AI chỉ đưa ra gợi ý, không phải đáp án trực tiếp.
                                    Hãy suy nghĩ và áp dụng gợi ý để tự giải quyết!
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3">
                                <button
                                    onClick={handleGetHint}
                                    className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-xl transition-all"
                                >
                                    🔄 Gợi Ý Khác
                                </button>
                                <button
                                    onClick={handleClose}
                                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-xl transition-all"
                                >
                                    Đóng
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AIHintModal;
