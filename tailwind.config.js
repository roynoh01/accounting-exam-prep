/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
          "./app/**/*.{js,ts,jsx,tsx,mdx}",
          "./components/**/*.{js,ts,jsx,tsx,mdx}",
          "./lib/**/*.{js,ts,jsx,tsx,mdx}",
        ],
    safelist: [
          "from-blue-500",
          "to-indigo-600",
          "from-emerald-500",
          "to-teal-600",
          "from-purple-500",
          "to-fuchsia-600",
          "from-orange-500",
          "to-rose-600",
        ],
    theme: {
          extend: {
                  colors: {
                            brand: {
                                        50: "#eef4ff",
                                        100: "#dbe7ff",
                                        200: "#bfd2ff",
                                        300: "#93b2ff",
                                        400: "#6088ff",
                                        500: "#3b63ff",
                                        600: "#2444f2",
                                        700: "#1b34d8",
                                        800: "#1a2fae",
                                        900: "#1c2d89",
                            },
                  },
                  fontFamily: {
                            sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial"],
                  },
          },
    },
    plugins: [],
};
