# Calculator App

A simple, responsive web-based calculator built with HTML, CSS, and JavaScript.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML](https://img.shields.io/badge/HTML-5-orange.svg)
![CSS](https://img.shields.io/badge/CSS-3-blue.svg)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow.svg)

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Browser Compatibility](#browser-compatibility)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [License](#license)
- [Troubleshooting](#troubleshooting)

## Features

- ✨ Basic arithmetic operations (addition, subtraction, multiplication, division)
- 💾 Memory functions (MC, MR, M+, M-)
- 🎨 Clean and modern user interface
- 📱 Responsive design that works on desktop and mobile
- ⌨️ Keyboard support for all operations
- 🛡️ Error handling for division by zero
- 🔢 Decimal number support
- 🎯 Floating point precision handling

## Demo

To see the calculator in action, simply open `index.html` in your web browser.

## Installation

### Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/kavyashri-as/check.git
   ```

2. Navigate to the project directory:
   ```bash
   cd check
   ```

3. Open `index.html` in your web browser:
   - **Option 1**: Double-click the `index.html` file
   - **Option 2**: Right-click and select "Open with" your preferred browser
   - **Option 3**: Use a local server (recommended for development)

### Using a Local Server (Optional)

For a better development experience, you can use a local server:

**Using Python 3:**
```bash
python3 -m http.server 8000
```

**Using Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

**Using Node.js (if http-server is installed):**
```bash
npx http-server
```

Then open your browser and navigate to `http://localhost:8000`

## Usage

### Basic Operations

1. Open `index.html` in your web browser
2. Use the on-screen buttons or keyboard to perform calculations
3. Click number buttons to enter numbers
4. Click operator buttons (+, -, ×, ÷) to select an operation
5. Click "=" or press Enter to calculate the result
6. Click "C" or press Escape to clear the display

### Keyboard Shortcuts

- **Numbers (0-9)**: Enter numbers
- **Operators (+, -, *, /)**: Perform operations
- **Enter or =**: Calculate result
- **Escape or C**: Clear display
- **Backspace**: Delete last entered character
- **.**: Add decimal point

### Memory Functions

- **MC**: Memory Clear - Clears the stored memory value
- **MR**: Memory Recall - Displays the stored memory value
- **M+**: Memory Add - Adds the current display value to memory
- **M-**: Memory Subtract - Subtracts the current display value from memory

## Browser Compatibility

This calculator is compatible with all modern web browsers:

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Opera (latest)

**Minimum Requirements:**
- JavaScript enabled
- CSS3 support
- HTML5 support

## File Structure

```
calculator-app/
├── index.html          # Main HTML structure
├── style.css           # Styling and responsive design
├── script.js           # Calculator functionality and keyboard support
├── README.md           # Project documentation
├── LICENSE             # MIT License
├── CONTRIBUTING.md     # Contribution guidelines
├── CODE_OF_CONDUCT.md  # Community guidelines
└── package.json        # Project metadata
```

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting a pull request.

### Quick Contribution Steps

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please also read our [Code of Conduct](CODE_OF_CONDUCT.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Troubleshooting

### Calculator not loading
- Ensure JavaScript is enabled in your browser
- Check browser console for errors (F12 or Ctrl+Shift+I)
- Try opening in a different browser

### Buttons not responding
- Clear your browser cache
- Ensure JavaScript is enabled
- Try using keyboard shortcuts as an alternative

### Display issues
- Zoom level might affect layout - try resetting zoom (Ctrl+0)
- Try a different browser
- Check if browser window is wide enough for the calculator

### Need Help?

If you encounter any issues not listed here:
1. Check the [Issues](https://github.com/kavyashri-as/check/issues) page
2. Open a new issue with detailed information about the problem
3. Include browser version, operating system, and steps to reproduce

---

**Made with ❤️ by the Calculator App Contributors**