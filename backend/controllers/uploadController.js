import https from 'https';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import axios from 'axios';

dotenv.config();

// const googleVisionApiKey = 'AIzaSyBqxEpdAiPZkcjS5Je4kDsGh51bXenJcF4';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,  
  });

const capture = async (req, res) => {
    try {
        // Ensure req.file is properly populated by multer
        if (!req.file || !req.file.buffer) {
            throw new Error('Image file is not provided or is invalid.');
        }

        // Debug log for req.file
        // console.log('Uploaded File Info:', req.file);

        // Get the binary buffer from the uploaded file
        const imageBuffer = req.file.buffer;

        // Convert binary to Base64
        const base64Image = imageBuffer.toString('base64');

        // Debug log for Base64 encoding
        // console.log('Base64 Image Preview:', base64Image.slice(0, 100)); // Log first 100 characters

        try {
          const response = await axios.post("http://127.0.0.1:5002/extract-text", {
              image_base64: base64Image
          });
  
        //   console.log("Extracted Text:", response.data.extracted_text);
        
            const completion = await openai.chat.completions.create({
              model: "gpt-4o-mini" ,
              messages: [
                { role: 'user', content: `this is general knowledge question  in Amharic language and provide the letter that contains correct answer i need the letter only and the answer must be correct : ${response.data.extracted_text}` }
              ],
            });
        
            const botResponse = completion.choices[0].message.content;
            console.log("Dawarrooooo ========= :  : ", botResponse); 
            res.json({ message: botResponse });
       
       
}catch (e) {}
} catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
}
}


export default { capture };
