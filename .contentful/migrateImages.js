require('dotenv').config();
const fs = require('fs');
const path = require('path');
const contentful = require('contentful-management');

// Configuration des clients Contentful
const spaceId = process.env.CONTENTFUL_SPACE_ID;
const environmentId = process.env.CONTENTFUL_ENVIRONMENT;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

const publicFolderPath = path.join(__dirname, '../public');

// Fonction pour initialiser le client Contentful Management
const getClient = () => {
  return contentful.createClient({
    accessToken: managementToken,
  });
};

// Fonction principale
const migrateImages = async () => {
  const client = getClient();

  // Accéder à l'espace et à l'environnement
  const space = await client.getSpace(spaceId);
  const environment = await space.getEnvironment(environmentId);

  // Récupérer les articles
  const entries = await environment.getEntries({
    content_type: 'article',
  });

  console.log(`Trouvé ${entries.items.length} articles.`);

  for (const entry of entries.items) {
    const imageOld = entry.fields.image_old?.['en-US'];

    if (!imageOld) {
      console.log(`Aucune image_old pour l'article: ${entry.fields.title['en-US']}`);
      continue;
    }

    const imagePath = path.join(publicFolderPath, imageOld);

    // Vérifier si le fichier existe
    if (!fs.existsSync(imagePath)) {
      console.error(`Fichier non trouvé: ${imagePath}`);
      continue;
    }

    try {
      // Uploader l'image en tant qu'asset
      const fileContent = fs.readFileSync(imagePath);
      const asset = await environment.createAssetFromFiles({
        fields: {
          title: {
            'en-US': `Image for ${entry.fields.title['en-US']}`,
          },
          file: {
            'en-US': {
              contentType: 'image/jpeg', // Modifier selon le type d'image
              fileName: path.basename(imagePath),
              file: fileContent,
            },
          },
        },
      });

      // Publier l'asset
      const processedAsset = await asset.processForAllLocales();
      const publishedAsset = await processedAsset.publish();

      // Associer l'asset au champ "image" de l'article
      entry.fields.image = {
        'en-US': {
          sys: {
            type: 'Link',
            linkType: 'Asset',
            id: publishedAsset.sys.id,
          },
        },
      };

      // Mettre à jour et publier l'article
      const updatedEntry = await entry.update();
      await updatedEntry.publish();

      console.log(`Image mise à jour pour l'article: ${entry.fields.title['en-US']}`);
    } catch (error) {
      console.error(`Erreur pour l'article: ${entry.fields.title['en-US']}`, error);
    }
  }

  console.log('Migration des images terminée.');
};

migrateImages().catch((err) => {
  console.error('Erreur lors de la migration des images:', err);
});
