import sendEmail from "./sendEmail.js"
import {readFileSync, unlinkSync} from 'node:fs'

const sendQRCodeMail = async ({email,name,img}) => {


  const imgData = readFileSync(img);
  const imgBase64 = imgData.toString("base64");
  const imgSrc = `data:image/png;base64,${imgBase64}`;

    await sendEmail({
        to : email,
      subject : 'Ticket QR Code',
        html : `
        <p>Dear ${name}, Please use the code below to verify ticket</p>
        <img src="${imgSrc}" alt="QR Code" />
        `
      })

      // delete file 
      // unlinkSync(img)

    }

  
export default sendQRCodeMail