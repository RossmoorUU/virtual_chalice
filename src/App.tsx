import { useState } from 'react'
import './App.css'

function App() {
  const [isLit, setIsLit] = useState(false)

  const lightChalice = () => {
    setIsLit(true)
  }

  const extinguishChalice = () => {
    setIsLit(false)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Virtual Chalice</h1>
        <p>Light the flame of hope, love, and community</p>
      </header>
      
      <main className="chalice-container">
        <div className="chalice-wrapper">
          {/* Flame */}
          {isLit && (
            <div className="flame">
              <div className="flame-part flame-1"></div>
              <div className="flame-part flame-2"></div>
              <div className="flame-part flame-3"></div>
            </div>
          )}
          
          {/* Chalice SVG - Based on authentic UU Flaming Chalice */}
          <svg 
            className="chalice-svg" 
            width="200" 
            height="300" 
            viewBox="0 0 500 449"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Main chalice body */}
            <path
              fill="#8B4513"
              d="M 379.5,433.93346 C 375.06816,426.85718 340.57511,425.23182 324.16235,424.60717 L 321.19734,264.01845 L 328.59405,262.998 C 338.8806,262.99539 367.02061,258.82001 383.5,254.85111 C 399.05822,251.10407 418.07786,244.72312 432.15562,238.52752 C 437.81375,236.03738 446.69503,232.69488 446.48442,230.69003 C 446.20013,227.98367 433.74404,230.40871 430,230.75745 C 400.89357,233.46855 349.54765,232.20551 300.60394,227.57449 C 265.29985,224.23404 250.40717,222.73882 220.99077,222.78832 C 189.47179,222.84136 179.11362,224.47815 160.05635,228.48782 C 152.79146,230.01636 150.81026,230.63563 150.81026,230.63563 C 150.81026,230.63563 157.44855,233.90801 163.49679,236.48578 C 204.73946,254.06345 255.27984,263.98113 303.69098,263.99646 C 309.84602,263.99841 315.07061,264.3375 315.30117,264.75 L 310.55559,424.46374 C 290.51035,425.89595 251.21118,423.08623 245.98155,434.29875 C 252.02803,434.73867 374.58647,434.24926 379.5,433.93346 z"
            />
            
            {/* Flame - only shown when not lit (static flame in original) */}
            {!isLit && (
              <path
                fill="#654321"
                opacity="0.3"
                d="M 315.97449,222.4987 C 305.30489,197.89412 300.72245,179.31929 300.67931,160.5 C 300.65134,148.30219 301.96779,140.0853 307.13856,120.18309 C 315.16749,89.279864 315.67516,78.777875 310.48292,51 L 309.31947,46.990773 L 312.55007,52 C 317.82367,60.720299 327.13493,80.928671 331.06679,92.690565 C 340.83012,121.8969 341.59169,151.65965 331.75325,187.48701 C 326.45639,206.77586 318.75077,226.7187 318.75077,226.7187 C 318.75077,226.7187 317.64068,226.34101 315.97449,222.4987 z"
              />
            )}
            
            {/* Inner flame detail */}
            {!isLit && (
              <path
                fill="#A0522D"
                opacity="0.5"
                d="M 320.91761,198 C 323.11803,185.57086 323.38461,168.37257 321.56748,156.07384 C 320.63897,149.78945 319.29361,143.52989 318.57779,142.16371 C 317.30701,139.73834 317.24357,139.80736 315.88816,145.08987 C 314.07877,152.14167 314.02525,185.74315 315.80785,195.5 C 318.1508,208.32379 319.01505,208.74664 320.91761,198 z"
              />
            )}
            
            {/* UU Symbol - First interlocking circle */}
            <circle
              cx="278"
              cy="225" 
              r="220"
              fill="none"
              stroke="#FFD700"
              strokeWidth="6"
              opacity="0.8"
            />
            
            {/* UU Symbol - Second interlocking circle */}
            <circle
              cx="228"
              cy="225"
              r="220" 
              fill="none"
              stroke="#FFD700"
              strokeWidth="6"
              opacity="0.8"
            />
          </svg>
        </div>
        
        <div className="controls">
          <button 
            className={`control-btn light-btn ${isLit ? 'active' : ''}`}
            onClick={lightChalice}
            disabled={isLit}
          >
            Light the Chalice
          </button>
          
          <button 
            className={`control-btn extinguish-btn ${!isLit ? 'active' : ''}`}
            onClick={extinguishChalice}
            disabled={!isLit}
          >
            Extinguish the Chalice
          </button>
        </div>
        
        {isLit && (
          <div className="flame-message">
            <p>"We light this chalice as a symbol of our faith, the warmth of our community, and the light of our truth."</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
