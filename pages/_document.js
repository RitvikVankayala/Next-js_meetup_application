import Document, { Html, Head, Main, NextScript } from "next/document";

class Mydocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <div className="overlays"></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Mydocument;
