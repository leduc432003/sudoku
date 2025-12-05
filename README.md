# Sudoku Game

A modern, feature-rich Sudoku game built with React and Vite. Play classic Sudoku with multiple difficulty levels, hints, and customizable settings.

## 🎮 Live Demo

**Play now:** [https://sudoku-theta-ten.vercel.app/](https://sudoku-theta-ten.vercel.app/)

## ✨ Features

- **Multiple Difficulty Levels**: 
  - **Dễ (Easy)**: 51 clues - Perfect for beginners
  - **Trung Bình (Medium)**: 41 clues - Moderate challenge
  - **Khó (Hard)**: 31 clues - Requires logical thinking
  - **Chuyên Gia (Expert)**: 26 clues - Advanced techniques needed
  - **Cực Khó (Master)**: 17-22 clues - Extremely challenging, requires advanced solving techniques
- **Smart Hints System**: Get helpful hints when you're stuck
- **Pencil Marks (Notes)**: Add candidate numbers to cells
- **Auto Pencil**: Automatically fill in all possible candidates
- **Undo/Redo**: Easily correct mistakes
- **Timer**: Track your solving time
- **Mistake Counter**: Keep track of errors
- **Settings Menu**:
  - Toggle sound effects
  - Auto-remove pencil marks
  - Highlight matching numbers
- **Responsive Design**: Play on desktop or mobile devices
- **Modern UI**: Clean and intuitive interface

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sudoku-game
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Built With

- **React** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Styling
- **Lucide React** - Icons

## 📦 Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## 🎯 How to Play

1. Select a difficulty level
2. Click on a cell to select it
3. Enter numbers 1-9 using your keyboard or the number pad
4. Use pencil mode to add candidate numbers
5. Use hints if you get stuck
6. Complete the puzzle without making too many mistakes!

## ⚙️ Technologies

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) - Fast Refresh with Babel
- React Hooks for state management
- Custom Sudoku generator and solver algorithms

## 📝 License

This project is open source and available under the MIT License.
