/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#0A0A0A",
          light: "#141414",
          soft: "#1C1C1C",
          line: "#2A2A28",
        },
        navy: {
          DEFAULT: "#0F172A",
          light: "#1E293B",
        },
        gold: {
          DEFAULT: "#D4AF37",
          light: "#F2D879",
          deep: "#9C7B22",
        },
        glow: {
          DEFAULT: "#3B82F6",
          soft: "#60A5FA",
        },
        ink: "#F8F7F2",
      },
      fontFamily: {
        display: ["Unbounded", "sans-serif"],
        body: ["Plus Jakarta Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #F2D879 0%, #D4AF37 45%, #9C7B22 100%)",
        "gold-gradient-soft": "linear-gradient(135deg, rgba(242,216,121,0.18) 0%, rgba(212,175,55,0.10) 100%)",
        "navy-fade": "linear-gradient(180deg, #0A0A0A 0%, #0F172A 100%)",
        "route-glow": "radial-gradient(circle at 30% 20%, rgba(212,175,55,0.16), transparent 60%), radial-gradient(circle at 80% 70%, rgba(59,130,246,0.14), transparent 55%)",
      },
      boxShadow: {
        gold: "0 0 40px -10px rgba(212,175,55,0.45)",
        glow: "0 0 60px -15px rgba(59,130,246,0.45)",
        card: "0 8px 30px -10px rgba(0,0,0,0.5)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: 1, transform: "scale(1)" },
          "50%": { opacity: 0.6, transform: "scale(0.92)" },
        },
        "draw-line": {
          from: { strokeDashoffset: 1000 },
          to: { strokeDashoffset: 0 },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-soft": "pulse-soft 2.4s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
      maxWidth: {
        content: "1280px",
      },
    },
  },
  plugins: [],
};
