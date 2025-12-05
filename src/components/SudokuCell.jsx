import React from 'react';

const SudokuCell = ({
    value,
    row,
    col,
    isGiven,
    isSelected,
    isSameNumber,
    hasError,
    notes,
    isRelated,
    onClick,
    darkMode
}) => {
    const getCellClasses = () => {
        let classes = 'sudoku-cell relative transition-colors duration-200';

        // Base styling based on dark mode
        if (darkMode) {
            classes += ' bg-gray-700 text-gray-100';
        }

        if (isGiven) classes += ' given';
        else if (value !== 0) classes += ' user-input';

        if (isSelected) classes += ' selected';
        else if (isRelated) classes += ' related';

        if (isSameNumber && value !== 0) classes += ' same-number';
        if (hasError) classes += ' error';

        // Thêm border đậm cho các ô 3x3
        const borderClasses = [];
        const borderColor = darkMode ? 'border-gray-600' : 'border-gray-800';
        if (row % 3 === 0 && row !== 0) borderClasses.push(`border-t-4 border-t-${darkMode ? 'gray-600' : 'gray-800'}`);
        if (col % 3 === 0 && col !== 0) borderClasses.push(`border-l-4 border-l-${darkMode ? 'gray-600' : 'gray-800'}`);
        if (row === 8) borderClasses.push(`border-b-4 border-b-${darkMode ? 'gray-600' : 'gray-800'}`);
        if (col === 8) borderClasses.push(`border-r-4 border-r-${darkMode ? 'gray-600' : 'gray-800'}`);
        if (row === 0) borderClasses.push(`border-t-4 border-t-${darkMode ? 'gray-600' : 'gray-800'}`);
        if (col === 0) borderClasses.push(`border-l-4 border-l-${darkMode ? 'gray-600' : 'gray-800'}`);

        return `${classes} ${borderClasses.join(' ')} border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`;
    };

    return (
        <div
            className={getCellClasses()}
            onClick={() => onClick(row, col)}
            style={{
                aspectRatio: '1/1',
            }}
        >
            {value !== 0 ? (
                <span style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    lineHeight: '1',
                    color: hasError ? '#ffffff' :
                        isGiven ? '#1f2937' :
                            isSameNumber ? '#ffffff' :
                                isSelected ? '#111827' : '#2563eb',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {value}
                </span>
            ) : (
                notes && notes.length > 0 && (
                    <div className="grid grid-cols-3 gap-0 w-full h-full p-0.5 pointer-events-none">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                            <div key={num} className="flex items-center justify-center text-[8px] sm:text-[10px] leading-none text-gray-500 font-medium">
                                {notes.includes(num) ? num : ''}
                            </div>
                        ))}
                    </div>
                )
            )}
        </div>
    );
};

export default SudokuCell;
