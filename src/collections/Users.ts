//import TestComponent from '@/components/TestComponent'
import type { CollectionConfig } from 'payload/types'
import { isAdmin } from '../access/isAdmin'
import { isAdminOrSelf } from '../access/isAdminOrSelf'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access:{
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      type: 'row',
      fields: [
        {
          label: 'First Name',
          name:'firstName',
          required: true,
          type: "text",
          minLength: 2,
          maxLength: 50,
        },
        {
          label: 'Last Name',
          name:'lastName',
          required: true,
          type: "text",
          minLength: 2,
          maxLength: 50,
        },
      ]
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue:'author',
      options: [
        {
          label: 'Admin',
          value: 'admin'
        },
        {
          label: 'Developer',
          value: 'developer'
        },
        {
          label: 'Author',
          value: 'author'
        },
      ]
    },
    /*{
      name: 'test',
      type: 'ui',
      admin: {
        components: {
          Field: TestComponent,
        }
      }
    }*/
  ],
}
