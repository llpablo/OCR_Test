const express = require('express');
const multer = require('multer');
const cors = require('cors');
const pdf2img = require('pdf-poppler');

const app = express();
app.use(cors());

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), async (req, res) => {
  let path = req.file.path;
  let opts = {
      format: 'jpeg',
      out_dir: 'uploads/images',
      out_prefix: 'page',
      page: null  // convert all pages
  };

  try {
      await pdf2img.convert(path, opts);
      res.send({ message: 'PDF converted to images successfully.' });
  } catch (error) {
      res.status(500).send(error);
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
