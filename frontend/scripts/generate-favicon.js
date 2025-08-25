const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicon() {
  try {
    // Lire le fichier SVG
    const svgPath = path.join(__dirname, '../public/icons/jd-icon.svg');
    const svgBuffer = fs.readFileSync(svgPath);
    
    // Générer favicon.ico (32x32)
    await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toFile(path.join(__dirname, '../public/favicon.ico'));
    
    console.log('✅ Favicon généré avec succès !');
  } catch (error) {
    console.error('❌ Erreur lors de la génération du favicon:', error);
  }
}

generateFavicon();
