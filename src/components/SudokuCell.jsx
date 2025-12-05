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

        // Add dark mode class
        if (darkMode) {
            classes += ' dark-mode';
        }

        if (isGiven) classes += ' given';
        else if (value !== 0) classes += ' user-input';

        if (isSelected) classes += ' selected';
        else if (isRelated) classes += ' related';

        if (isSameNumber && value !== 0) classes += ' same-number';
        if (hasError) classes += ' error';

        return classes;
    };

    const getBorderStyle = () => {
        const style = {};
        const thickBorder = darkMode ? '3px solid #1f2937' : '3px solid #111827';
        const normalBorder = darkMode ? '1px solid #4b5563' : '1px solid #d1d5db';

        // Viền dày cho các khối 3x3
        style.borderTop = (row % 3 === 0) ? thickBorder : normalBorder;
        style.borderLeft = (col % 3 === 0) ? thickBorder : normalBorder;
        style.borderBottom = (row === 8 || (row + 1) % 3 === 0) ? thickBorder : normalBorder;
        style.borderRight = (col === 8 || (col + 1) % 3 === 0) ? thickBorder : normalBorder;

        return style;
    };

    return (
        <div
            className={getCellClasses()}
            onClick={() => onClick(row, col)}
            style={{
                aspectRatio: '1/1',
                ...getBorderStyle()
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
