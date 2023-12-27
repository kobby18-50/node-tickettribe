import QRCode from "qrcode";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export const generateQRCode = async (payload) => {
  const data = JSON.stringify(payload);

  const options = {
    color: {
      dark: "#000",
      light: "#FFF",
    },
    errorCorrectionLevel: "H",
    margin: 2,
    scale: 4,
  };

  const path = `${__dirname}code.png`;
  await QRCode.toFile(path, data, options, (err) => {
    if (err) throw err;
  });

  return path;
};
