/** @type {import('tailwindcss').Config} */
// const { default: badgeColors } = require('@material-tailwind/react/theme/components/badge/badgeColors');
const withMT = require("@material-tailwind/react/utils/withMT");

// const { transform } = require('next/dist/build/swc');
const plugin = require('tailwindcss/plugin');
module.exports = withMT({
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./Template/**/*.{js,ts,jsx,tsx,mdx}",
    // "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    // "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary50":"#e9f3f1",
        "primary100":"#badbd2",
        "primary200":"#99cabc",
        "primary300":"#6bb19e",
        "primary400":"#4ea28b",
        "primary500":"#228b6e",
        "primary600":"#1f7e64",
        "primary700":"#18634e",
        "primary800":"#134c3d",
        "primary900":"#0e3a2e",

        "secondary10":"#ffffff",
        "secondary50":"#fcfcfc",
        "secondary100":"#f5f5f5",
        "secondary200":"#f0f0f0",
        "secondary300":"#d9d9d9",
        "secondary400":"#bfbfbf",
        "secondary500":"#8c8c8c",
        "secondary600":"#595959",
        "secondary700":"#454545",
        "secondary800":"#262626",
        "secondary900":"#1f1f1f",

        "tertiary50":"#e9f3f1",
        "tertiary100":"#f9e4b7",
        "tertiary200":"#f6d795",
        "tertiary300":"#f2c564",
        "tertiary400":"#f0ba46",
        "tertiary500":"#eca918",
        "tertiary600":"#d79a16",
        "tertiary700":"#a87811",
        "tertiary800":"#825d0d",
        "tertiary900":"#63470a",

        Base:"#3D4072",
        ETGreen:"#00AB97",
        BackgroundColor:"#fcfcfc",
        Gray:"gray"
      },
      fontFamily: {
        sans: ['shabnamFD'],
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },

    lineHeight: {
      'customLH': '18px',
    },
    boxShadow: {
      // 'custom-shadow': '1px 1px 10px  gray',
      'custom-shadow': '9px 3px 40.6px -3px  rgb(29 111 81 / 0.08)',
    },
    animation:{
        buttonAnimated:"buttonAnimated 800ms infinite alternate",
        hideBox:"hideBox 1.5s forwards",
        hidePage:"hidePage 1ms forwards 700ms"
    },
    keyframes: {
      buttonAnimated: {
        '0%': { transform: 'scaleX(.9)' },
        '100%': { transform: 'scaleX(1)' },
      },
      hideBox:{
        '0%': { bottom:'0' },
        '100%': {bottom:'-350px' },
      },
      hidePage:{
        '0%':{zIndex:3000 },
        "100%":{zIndex:-10}
      }
    },
  },
  plugins: [
      plugin(function ({ matchUtilities, theme, addComponents }) {
        // Match utility for text shadows
        matchUtilities({
            'text-shadow': (value) => ({
              textShadow: value,
            }),
          },
          { values: theme('textShadow') }
        );
        addComponents({
          '.headerShadow':{
            boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.3)'
          },
          // First page button animation
          '.buttonAnimated':{
              transformOrigin: 'center',
              animationName:'buttonAnimation',
              animationDuration:'700ms',
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite' ,
              animationDirection: 'alternate'
          },
          '.hideBox':{
              transformOrigin: 'bottom',
              animationName:'buttonAnimation',
              animationTimingFunction: 'ease-in-out',
          },
          // TextBox component
          '.textBox': {
            marginTop: '30px',
            position: 'relative',
            height: '50px',
            borderRadius: '15px',
            border:'1px solid rgba(128, 128, 128, 0.725)'
          },
          // Input component inside TextBox
          '.textBox .Input': {
            position: 'relative',
            zIndex: 10,
            backgroundColor: 'transparent',
            height: '100%',
            paddingRight: '10px',
            borderRadius: '10px',
            outline: 'none',
          },
          // PalaceHolder (placeholder label)

          '.textBox .palaceHolder': {
            transition: '500ms',
            position: 'absolute',
            zIndex: 0,
            top: '50%',
            fontSize: '0.8rem',
            backgroundColor:"white",
            transform: 'translateY(-50%)',
            color: 'rgba(128, 128, 128, 0.725)',
            right: '10px',
            paddingRight:'10px',
            paddingLeft:'10px'
          },

          // focus on input and move up title
          '.textBox:focus-within .palaceHolder':{
              fontSize:' 0.8rem',
              top: '0',
              backgroundColor:"white",
              zIndex:100,
              color: '#3D4072',
          },
          '.textBox:focus-within .activeInput':{
              border: '1px solid #3D4072'
          },
          '.turnOffTextBox':{
            marginTop: '30px',
            position: 'relative',
            height: '50px',
            borderRadius: '15px',
            badgeColors:'rgba(128, 128, 128, 0.725)',
            border:'1px solid rgba(128, 128, 128, 0.725)',
            backgroundColor:'#F0F0F1'
          },
          '.turnOffTextBox .Input': {
            position: 'relative',
            zIndex: 10,
            backgroundColor: 'transparent',
            height: '100%',
            paddingRight: '10px',
            borderRadius: '10px',
            outline: 'none',
          },
          '.turnOffTextBox .palaceHolder':{
            position: 'absolute',
            top:'50%',
            zIndex: 5,
            transform: 'translateY(-50%)',
            fontSize: '0.8rem',
            color: 'rgba(128, 128, 128, 0.725)',
            right: '10px',
          },

          // persian Number-------------------
          '.faNumber' :{
            fontFamily: 'yekan',
            fontWeight:'500'
        },

        });
      }),
    ]

})
