import { createTheme, NextUIProvider } from "@nextui-org/react"

// 2. Call `createTheme` and pass your custom theme values
const theme = createTheme({
  type: "light", // it could be "light" or "dark"
  theme: {
    colors: {
      primary: '#4ADE7B',
      secondary: '#F9CB80',
      error: '#FCC5D8',
    },
  }
})


// 3. Pass the new `theme`` to the `NextUIProvider`
function MyApp({ Component, pageProps }:any) {
  return (
      <NextUIProvider theme={theme}>
        <Component {...pageProps} />
      </NextUIProvider>
  )
}

export default MyApp