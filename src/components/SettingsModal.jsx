import React from 'react';

const SettingsModal = ({ isOpen, onClose, settings, onUpdateSettings }) => {
    if (!isOpen) return null;

    const handleToggle = (key) => {
        onUpdateSettings({
            ...settings,
            [key]: !settings[key]
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden transform transition-all scale-100">
                {/* Header */}
                <div className="bg-gradient-to-r from-gray-700 to-gray-900 p-6 text-white flex justify-between items-center">
                    <h2 className="text-2xl font-bold">⚙️ Cài Đặt</h2>
                    <button
                        onClick={onClose}
                        className="text-white opacity-70 hover:opacity-100 transition-opacity text-2xl font-bold"
                    >
                        ×
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">

                    {/* Sound Setting */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">🔊</span>
                            <div>
                                <p className="font-bold text-gray-800">Âm thanh</p>
                                <p className="text-xs text-gray-500">Bật/Tắt hiệu ứng âm thanh</p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleToggle('soundEnabled')}
                            className={`w-14 h-8 rounded-full p-1 transition-all duration-300 ${settings.soundEnabled ? 'bg-blue-500' : 'bg-gray-300'}`}
                        >
                            <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${settings.soundEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                    </div>

                    {/* Auto Remove Notes Setting */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">🧹</span>
                            <div>
                                <p className="font-bold text-gray-800">Tự động xóa ghi chú</p>
                                <p className="text-xs text-gray-500">Xóa ghi chú khi điền số trùng</p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleToggle('autoRemoveNotes')}
                            className={`w-14 h-8 rounded-full p-1 transition-all duration-300 ${settings.autoRemoveNotes ? 'bg-blue-500' : 'bg-gray-300'}`}
                        >
                            <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${settings.autoRemoveNotes ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                    </div>

                    {/* Highlight Same Numbers Setting */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">🔦</span>
                            <div>
                                <p className="font-bold text-gray-800">Highlight số giống nhau</p>
                                <p className="text-xs text-gray-500">Làm nổi bật các số đang chọn</p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleToggle('highlightSameNumbers')}
                            className={`w-14 h-8 rounded-full p-1 transition-all duration-300 ${settings.highlightSameNumbers ? 'bg-blue-500' : 'bg-gray-300'}`}
                        >
                            <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${settings.highlightSameNumbers ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                    </div>

                </div>

                {/* Footer */}
                <div className="p-4 bg-gray-50 text-center">
                    <button
                        onClick={onClose}
                        className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-8 rounded-xl transition-all shadow-md"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
