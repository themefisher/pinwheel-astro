require('dotenv').config();
const contentful = require('contentful-management');
const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');
const { richTextFromMarkdown } = require('@contentful/rich-text-from-markdown');

// Configuration des clients Contentful
const spaceId = process.env.CONTENTFUL_SPACE_ID;
const environmentId = process.env.CONTENTFUL_ENVIRONMENT;
const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

// Fonction pour initialiser le client Contentful Management
const getClient = () => {
  return contentful.createClient({
    accessToken: managementToken,
  });
};

// Fonction principale
const convertMarkdownToRichText = async () => {
  const client = getClient();

  // Accéder à l'espace et à l'environnement
  const space = await client.getSpace(spaceId);
  const environment = await space.getEnvironment(environmentId);

  // Récupérer toutes les entrées du type "article"
  const entries = await environment.getEntries({
    content_type: 'article',
  });

  console.log(`Trouvé ${entries.items.length} articles.`);

  for (const entry of entries.items) {
    const markdownContent = entry.fields.content && entry.fields.content['en-US']; // Assurez-vous d'utiliser la bonne locale
    if (!markdownContent) {
      console.log(`Pas de contenu Markdown pour l'article ID: ${entry.sys.id}`);
      continue;
    }

    try {
      // Convertir le contenu Markdown en Rich Text
      const richTextContent = await richTextFromMarkdown(markdownContent);

      console.log(`Conversion réussie pour l'article ID: ${entry.sys.id}`);

      // Vérifier si le champ "contenu" est déjà rempli
      if (entry.fields.contenu && entry.fields.contenu['en-US']) {
        console.log(`Le champ "contenu" est déjà rempli pour l'article ID: ${entry.sys.id}`);
        continue;
      }

      // Ajouter ou mettre à jour le champ "contenu"
      entry.fields.contenu = {
        'en-US': richTextContent,
      };

      // Mettre à jour et publier l'article
      const updatedEntry = await entry.update();
      await updatedEntry.publish();

      console.log(`Rich Text mis à jour pour l'article ID: ${entry.sys.id}`);
    } catch (error) {
      console.error(`Erreur lors de la conversion pour l'article ID: ${entry.sys.id}`, error);
    }
  }

  console.log('Conversion Markdown vers Rich Text terminée.');
};

convertMarkdownToRichText().catch((err) => {
  console.error('Erreur lors de la conversion Markdown -> Rich Text :', err);
});
