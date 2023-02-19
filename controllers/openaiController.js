const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
  const { prompt, size } = req.body;

  const imageSize =
    size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';

  try {
    const response = await openai.createImage({
      prompt:
        'Style character Disney, detailed objects, Ultra High definition, blurred background, super detailed character, 3D Render, 8k, Hyper realistic , perfect composition, beautiful, detailed, octane render, cinematic perfect light, ' +
        prompt,

      n: 1,
      size: '1024x1024',
    });

    console.log(req.body);
    const imageUrl = response.data.data[0].url;

    return res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (error) {
    console.log('error', error);
  }

  return res.status(400).json({
    success: false,
    error: 'The Image Could Not Be Generated',
  });
};

module.exports = { generateImage };
