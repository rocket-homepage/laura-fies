import { Field } from 'payload'

export const Contact: Field = {
  name: 'kontakt',
  type: 'group',
  label: {
    en: 'Hero Section',
    de: 'Hero Bereich',
  },
  fields: [
    {
      name: 'Heading',
      type: 'text',
      label: {
        en: 'Heading',
        de: 'Überschrift',
      },
    },
    {
      name: 'SubHeading',
      type: 'text',
      label: {
        en: 'Sub Heading',
        de: 'Unterüberschrift',
      },
    },
    {
      name: 'FormHeading',
      type: 'text',
      label: {
        en: 'Form Heading',
        de: '',
      },
    },
  ],
}
