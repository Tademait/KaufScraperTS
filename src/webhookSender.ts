import axios, { AxiosResponse } from "axios";
import dotenv from "dotenv";
dotenv.config();

async function sendWebhook({
  title = "",
  url = "",
  description = "",
  color = 0x3498db,
  fields = [],
  thumbnail = { url: "" },
  image = { url: "" },
  footer = { text: "", icon_url: "" },
} = {}): Promise<AxiosResponse<any, any>> {
  const embed = {
    title: title,
    url: url,
    description: description,
    color: color, // Hex color code
    fields: fields,
    thumbnail: thumbnail,
    image: image,
    footer: footer,
  };
  const webhook_url = process.env.WEBHOOK_URL;
  if (!webhook_url) {
    throw "Webhook URL missing. Add it into the .env file";
  }
  try {
    const response = await axios.post(webhook_url, { embeds: [embed] });
    console.log("Webhook sent with return code:", response.status);
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export default sendWebhook;
