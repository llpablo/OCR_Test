import { useState } from 'react';
import Tesseract from 'tesseract.js';

function App() {
  const [text, setText] = useState('');

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const images = await response.json(); // Supone que el servidor envía la ruta de las imágenes
      images.forEach(image => {
        Tesseract.recognize(
          image,
          'eng',
          {
            logger: m => console.log(m),
          }
        ).then(({ data: { text } }) => {
          setText(prevText => prevText + text + '\n'); // Concatena texto de cada página
        });
      });
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <p>{text}</p>
    </div>
  );
}

export default App;
