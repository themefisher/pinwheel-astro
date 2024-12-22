require('dotenv').config();
const contentful = require('contentful-management')
const fs = require('fs')
const matter = require('gray-matter')
const path = require('path')

// Configuration des clients Contentful
const spaceId = process.env.CONTENTFUL_SPACE_ID;
const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

// Configuration Contentful
const client = contentful.createClient({
  accessToken: managementToken
})

const SPACE_ID = spaceId
const ENVIRONMENT_ID = 'master'
const LOCALE = 'en-US' // Utilisation de en-US même pour le contenu français

async function createContentType(space, environment) {
  const contentType = await environment.createContentTypeWithId('article', {
    name: 'Article',
    fields: [
      {
        id: 'title',
        name: 'Title',
        type: 'Symbol',
        required: true
      },
      {
        id: 'image',
        name: 'Image',
        type: 'Symbol',
        required: false
      },
      {
        id: 'author',
        name: 'Author',
        type: 'Symbol',
        required: false
      },
      {
        id: 'date',
        name: 'Date',
        type: 'Date',
        required: false
      },
      {
        id: 'categories',
        name: 'Categories',
        type: 'Array',
        items: {
          type: 'Symbol'
        }
      },
      {
        id: 'featured',
        name: 'Featured',
        type: 'Boolean',
        required: false
      },
      {
        id: 'draft',
        name: 'Draft',
        type: 'Boolean',
        required: false
      },
      {
        id: 'content',
        name: 'Content',
        type: 'Text',
        required: true
      }
    ]
  })

  await contentType.publish()
  return contentType
}

async function migrateContent(environment, sourceDir) {
  const files = fs.readdirSync(sourceDir)

  for (const file of files) {
    if (file === 'index.md' || !file.endsWith('.md')) {
      console.log(`Fichier ignoré : ${file}`);
      continue;
    }

    const filePath = path.join(sourceDir, file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)

    try {
      // Préparer les champs avec en-US
      const fields = {
        title: {
          [LOCALE]: data.title || 'Sans titre'
        },
        content: {
          [LOCALE]: content || ''
        }
      }

      // Ajouter les champs optionnels
      if (data.image) fields.image = { [LOCALE]: data.image }
      if (data.author) fields.author = { [LOCALE]: data.author }
      if (data.categories) fields.categories = { [LOCALE]: data.categories }
      if (typeof data.featured !== 'undefined') fields.featured = { [LOCALE]: data.featured }
      if (typeof data.draft !== 'undefined') fields.draft = { [LOCALE]: data.draft }

      // Gestion de la date
      if (data.date && data.date instanceof Date) {
        fields.date = { [LOCALE]: data.date.toISOString() }
      } else if (data.date) {
        const parsedDate = new Date(data.date)
        if (!isNaN(parsedDate.getTime())) {
          fields.date = { [LOCALE]: parsedDate.toISOString() }
        } else {
          console.warn(`Date invalide dans ${file}, champ date ignoré`)
        }
      }

      const entry = await environment.createEntry('article', { fields })
      await entry.publish()
      console.log(`Migration réussie : ${file}`)
    } catch (error) {
      console.error(`Erreur lors de la migration de ${file}:`, error.message)
      continue
    }
  }
}

async function main() {
  try {
    const space = await client.getSpace(SPACE_ID)
    const environment = await space.getEnvironment(ENVIRONMENT_ID)

    try {
      await environment.getContentType('article')
    } catch {
      await createContentType(space, environment)
    }

    await migrateContent(environment, '../src/content/actualites')
    console.log('Migration terminée !')
  } catch (error) {
    console.error('Échec de la migration :', error.message)
  }
}

main()