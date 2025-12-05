import React from 'react';

const NumberPad = ({
    onNumberSelect,
    onDelete,
    onNoteToggle,
    isNoteMode,
    remainingCounts,
    onUndo,
    onRedo,
    canUndo,
    canRedo,
    onAutoPencil,
    onClearNotes,
    canAutoFinish,
    onAutoFinish,
    darkMode
}) => {
    return (
        <div className="flex flex-col gap-4 w-full">
            {/* Hàng công cụ chính */}
            <div className="grid grid-cols-5 gap-2">
                <button
                    onClick={onUndo}
                    disabled={!canUndo}
                    className={`p-3 rounded-xl font-bold transition-all flex flex-col items-center justify-center text-sm ${canUndo
                        ? 'bg-gray-200 hover:bg-gray-300 text-gray-700 shadow-sm'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                    title="Hoàn tác (Ctrl+Z)"
                >
                    <span>↩️</span>
                </button>

                <button
                    onClick={onRedo}
                    disabled={!canRedo}
                    className={`p-3 rounded-xl font-bold transition-all flex flex-col items-center justify-center text-sm ${canRedo
                        ? 'bg-gray-200 hover:bg-gray-300 text-gray-700 shadow-sm'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                    title="Làm lại (Ctrl+Y)"
                >
                    <span>↪️</span>
                </button>

                <button
                    onClick={onNoteToggle}
                    className={`p-3 rounded-xl font-bold transition-all flex flex-col items-center justify-center text-sm ${isNoteMode
                        ? 'bg-yellow-400 text-white shadow-md scale-105 ring-2 ring-yellow-200'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700 shadow-sm'
                        }`}
                    title="Chế độ ghi chú (N)"
                >
                    <span>✏️</span>
                </button>

                <button
                    onClick={onDelete}
                    className="bg-red-100 hover:bg-red-200 text-red-600 p-3 rounded-xl font-bold transition-all flex flex-col items-center justify-center text-sm shadow-sm"
                    title="Xóa ô (Backspace)"
                >
                    <span>⌫</span>
                </button>

                <button
                    onClick={onAutoPencil}
                    className="bg-purple-100 hover:bg-purple-200 text-purple-600 p-3 rounded-xl font-bold transition-all flex flex-col items-center justify-center text-sm shadow-sm"
                    title="Tự động điền ghi chú"
                >
                    <span>📝</span>
                </button>
            </div>

            {/* Hàng công cụ phụ */}
            <div className="grid grid-cols-2 gap-2">
                <button
                    onClick={onClearNotes}
                    className="bg-orange-100 hover:bg-orange-200 text-orange-600 p-2 rounded-xl font-bold transition-all text-sm shadow-sm flex items-center justify-center gap-2"
                    title="Xóa ghi chú ô đang chọn"
                >
                    <span>🧹 Xóa Ghi Chú</span>
                </button>

                {canAutoFinish && (
                    <button
                        onClick={onAutoFinish}
                        className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white p-2 rounded-xl font-bold transition-all text-sm shadow-md animate-pulse flex items-center justify-center gap-2"
                        title="Tự động hoàn thành game"
                    >
                        <span>⚡ Auto Finish</span>
                    </button>
                )}
            </div>

            {/* Bàn phím số */}
            <div className="grid grid-cols-9 gap-1 sm:gap-2 xl:grid-cols-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <button
                        key={num}
                        onClick={() => onNumberSelect(num)}
                        disabled={remainingCounts[num] === 0}
                        className={`
              relative h-12 sm:h-14 rounded-lg xl:rounded-xl font-bold text-xl sm:text-2xl transition-all shadow-sm
              ${remainingCounts[num] === 0
                                ? `${darkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-100 text-gray-300'} cursor-not-allowed`
                                : `${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-100 border-gray-600' : 'bg-white hover:bg-blue-50 text-blue-600 border-gray-200'} hover:shadow-md active:scale-95 border`
                            }
            `}
                    >
                        {num}
                        <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 text-[8px] sm:text-[10px] font-normal text-gray-400">
                            {remainingCounts[num]}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default NumberPad;
