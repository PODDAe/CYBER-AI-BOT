import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = formidable({ uploadDir: './public/uploads', keepExtensions: true });

  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Upload failed' });
    res.status(200).json({ message: 'Files uploaded', files });
  });
}