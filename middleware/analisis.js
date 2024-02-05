// analyzer.js

// Fungsi untuk menganalisis konten file
function analyzeFile(content) {
  const decodedContent = Buffer.from(content, "base64").toString("utf-8");

  // Tentukan pola-pola rahasia yang ingin kita deteksi
  const secretPatterns = [
    /password=(.*)/i,
    /username=(.*)/i,
    /email=(.*)/i,
    /database=(.*)/i,
    /DB_NAME=(.*)/i,
    /DB_PASSWORD=(.*)/i,
    // Tambahkan pola-pola lainnya sesuai kebutuhan
  ];

  // Analisis konten file untuk mencari pola-pola rahasia
  const secrets = secretPatterns.reduce((acc, pattern) => {
    const matches = decodedContent.match(pattern);
    if (matches) {
      acc.push(matches[1]);
    }
    return acc;
  }, []);

  return secrets;
}

module.exports = { analyzeFile };
