import { CollectionConfig } from 'payload/types'
import { isAdmin } from '../access/isAdmin'
import slug from '../fields/slug'
import createdBy from '../fields/createdBy'

import { Hero } from '../blocks/Hero'

export const Pages: CollectionConfig = {
    slug: 'pages',
    access: {
        create: isAdmin,
        read: () => true,
        update: isAdmin,
        delete: isAdmin,
    },
    hooks: {
        beforeChange: [
            ({ req, operation, data }) => {
              if (operation === 'create') {
                if (req.user) {
                  data.createdBy = req.user.id;
                  return data;
                }
              }
            },
          ],
    },
    versions: {
        drafts: true,
      },
    admin:{
        useAsTitle: 'title',
        description: 'Create and manage individual pages for your website. (If you intend to make a page your homepage, set the slug as "index".)',
    },
    fields: [
        {
            name: 'title',
            label: 'Page Title',
            admin: {
                description: 'This sets title of the page (If you intend to make a page your homepage, set the slug as "index".)',
            },
            type: 'text',
            unique: true,
            required: true,
            minLength: 2,
            maxLength: 80,
        },
        {
            name: 'layout',
            label: 'Page Layout',
            type: 'blocks',
            admin: {
                description: 'Customize your page layout using our pre-built page blocks.'
            },
            blocks: [
                Hero,
            ],
        },
        slug,
        createdBy,
    ],
}