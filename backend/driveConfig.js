const { google } = require("googleapis");
const { Readable } = require("stream");

const authenticateGoogle = () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: `${__dirname}/club-community-key.json`,
    scopes: "https://www.googleapis.com/auth/drive",
  });
  return auth;
};

const uploadToGoogleDrive = async (file, auth, key) => {
  const fileMetadata = {
    name: file.originalname,
    parents: [key],
  };

  const stream = new Readable();
  stream.push(file.buffer);
  stream.push(null);

  const media = {
    mimeType: file.mimetype,
    body: stream,
  };

  const driveService = google.drive({ version: "v3", auth });
  const response = await driveService.files.create({
    requestBody: fileMetadata,
    media: media,
    fields: "id",
  });
  return response;
};

module.exports = { authenticateGoogle, uploadToGoogleDrive };
