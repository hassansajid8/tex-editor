import SidePanel from "../components/SidePanel";

export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body style={{display: "flex"}}>
            <SidePanel />
            {children}
          </body>
      </html>
    );
  }