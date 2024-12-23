require('dotenv').config();
const contentful = require('contentful-management');
const slugify = require('slugify');

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
const updateSlugsFromTitles = async () => {
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
    const title = entry.fields.title['en-US']; // Assurez-vous d'utiliser la bonne locale
    if (!title) {
      console.log(`Titre manquant pour l'article ID: ${entry.sys.id}`);
      continue;
    }

    // Générer le slug avec slugify
    const slug = slugify(title, {
      lower: true, // Tout en minuscules
      strict: true, // Supprimer les caractères spéciaux
      trim: true, // Retirer les espaces au début/à la fin
    });

    console.log(`Article: "${title}" -> Slug: "${slug}"`);

    // Vérifier si le champ slug est déjà défini et correspond au slug généré
    if (entry.fields.slug && entry.fields.slug['en-US'] === slug) {
      console.log(`Slug déjà à jour pour l'article: "${title}"`);
      continue;
    }

    try {
      // Ajouter ou mettre à jour le champ slug
      entry.fields.slug = {
        'en-US': slug,
      };

      // Mettre à jour et publier l'article
      const updatedEntry = await entry.update();
      await updatedEntry.publish();

      console.log(`Slug mis à jour pour l'article: "${title}"`);
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du slug pour "${title}":`, error);
    }
  }

  console.log('Mise à jour des slugs terminée.');
};

updateSlugsFromTitles().catch((err) => {
  console.error('Erreur lors de la mise à jour des slugs:', err);
});
