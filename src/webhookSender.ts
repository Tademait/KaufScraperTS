import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

function sendWebhook({
    title="",
    url="",
    description="",
    color=0x3498db,
    fields=[],
    thumbnail={url: ""},
    image={url: ""},
    footer={text: "", icon_url: ""}
}={}
){
const embed = {
    title: title,
    url: url,
    description: description,
    color: color, // Hex color code
    fields: fields,
    thumbnail: thumbnail,
    image: image,
    footer: footer
  }
  const webhook_url = process.env.WEBHOOK_URL
  if (!webhook_url) {
    throw "Webhook URL missing. Add it into the .env file";
  }
  return axios.post(webhook_url, { embeds: [embed] })
  .then(response => {
    console.log('Webhook sent:', response.status, response.data);
  })
  .catch(error => {
      console.error('Error sending webhook:', error);
  });
};  

export default sendWebhook;
