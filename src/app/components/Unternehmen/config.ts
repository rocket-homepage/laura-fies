import {
  EXPERIMENTAL_TableFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Field } from 'payload'

export const Unternehmen: Field = {
  name: 'unternehmen',
  type: 'group',
  label: {
    en: '',
    de: '',
  },
  fields: [
    {
      name: 'link_title',
      label: { en: 'link-title', de: '' },
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'group',
          label: { en: 'title', de: '' },
          fields: [
            {
              name: 'label',
              type: 'text',
              label: { en: 'Main Title', de: '' },
              localized: true,
            },
          ],
        },
        {
          name: 'sub_title',
          label: { en: 'Submenus', de: 'Untermenu' },
          type: 'array',
          fields: [
            {
              name: 'links',
              label: { en: 'Submenu Links', de: 'Untermenu Links' },
              type: 'array',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  label: { en: 'sub Title', de: '' },
                  localized: true,
                },
                {
                  name: 'sliderHeading',
                  type: 'text',
                  label: {
                    en: 'slider & CTA Heading',
                    de: '',
                  },
                },
                {
                  name: 'slider',
                  label: { en: 'slider & CTA', de: '' },
                  type: 'array',
                  fields: [
                    {
                      name: 'Slider Item',
                      label: { en: 'slider', de: '' },
                      type: 'array',
                      fields: [
                        {
                          name: 'sliderImage',
                          type: 'upload',
                          label: {
                            en: 'Slider Image',
                            de: 'Slider Bild',
                          },
                          relationTo: 'media',
                          required: false,
                        },
                        {
                          name: 'Heading',
                          type: 'text',
                          label: {
                            en: 'Heading',
                            de: 'Überschrift',
                          },
                        },
                        {
                          name: 'richText',
                          type: 'richText',
                          label: {
                            en: 'Rich Text',
                            de: 'Rich Text',
                          },
                          editor: lexicalEditor({
                            features: ({ defaultFeatures }) => [
                              ...defaultFeatures,
                              HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                              FixedToolbarFeature(),
                              InlineToolbarFeature(),
                              EXPERIMENTAL_TableFeature(),
                            ],
                          }),
                        },
                      ],
                    },
                    {
                      name: 'CTA Item',
                      label: { en: 'CTA', de: '' },
                      type: 'array',
                      fields: [
                        {
                          name: 'CTAHeading',
                          type: 'text',
                          label: {
                            en: 'CTA Heading',
                            de: '',
                          },
                        },
                        {
                          name: 'richText',
                          type: 'richText',
                          label: {
                            en: 'Rich Text',
                            de: 'Rich Text',
                          },
                          editor: lexicalEditor({
                            features: ({ defaultFeatures }) => [
                              ...defaultFeatures,
                              HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                              FixedToolbarFeature(),
                              InlineToolbarFeature(),
                              EXPERIMENTAL_TableFeature(),
                            ],
                          }),
                        },
                        {
                          name: 'CTA_link',
                          type: 'group',
                          label: {
                            en: 'CTA Link',
                            de: '',
                          },
                          fields: [
                            {
                              name: 'label',
                              type: 'text',
                              label: {
                                en: 'CTA Label',
                                de: '',
                              },
                            },
                            {
                              name: 'url',
                              type: 'text',
                              label: {
                                en: 'URL',
                                de: 'URL',
                              },
                            },
                            {
                              name: 'target',
                              type: 'select',
                              label: {
                                en: 'Target',
                                de: 'Ziel',
                              },
                              options: [
                                { label: { en: 'Same Tab', de: 'Gleiches Tab' }, value: '_self' },
                                { label: { en: 'New Tab', de: 'Neues Tab' }, value: '_blank' },
                              ],
                              defaultValue: '_self',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Sub_link_title',
      label: {
        en: 'title',
        de: '',
      },
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: {
            en: 'Link Label',
            de: 'Linktext',
          },
        },
      ],
    },
  ],
}

export default Unternehmen
