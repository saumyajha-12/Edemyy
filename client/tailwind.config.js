// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       fontSize:{
//         'course-details-heading-small' : ['26px', '36px'],
//         'course-details-heading-large' : ['36px', '44px'],
//         'home-heading-small' : ['28px', '34px'],
//         'home-heading-large' : ['48px', '56px'],
//         'default' : ['15px', '21px']
//       },
//       gridTemplateColumns:{
//         'auto' : 'repeat(auto-fit, minmax(200px,1fr))',
//       },
//       spacing:{
//         'section-height' : '500px'
//       },
//       maxWidth:{
//         "course-card" : "424px",
//       },
//       boxShadow:{
//         "custom-card": "0px 4px 15px 2px rgba(0,0,0,0.1)",
        
//       }
//     },

//   },
//   plugins: [],
// }
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Poppins"', 'Outfit', 'sans-serif'],
        heading: ['"Outfit"', 'sans-serif'],
      },
      fontSize: {
        base: ['16px', '24px'],
        lg: ['18px', '28px'],
        xl: ['24px', '32px'],
        '2xl': ['30px', '38px'],
        '3xl': ['36px', '44px'],
        'hero': ['48px', '56px'],
      },
      colors: {
        background: '#f9fafb',
        primary: '#6366f1',
        secondary: '#f43f5e',
        muted: '#6b7280',
        heading: '#111827',
      },
      spacing: {
        'section': '6rem',
      },
      boxShadow: {
        card: '0 4px 12px rgba(0,0,0,0.1)',
      }
    },
  },
  plugins: [],
}
