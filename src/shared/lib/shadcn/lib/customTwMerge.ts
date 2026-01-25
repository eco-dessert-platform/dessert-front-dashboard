import { extendTailwindMerge } from 'tailwind-merge'

export const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            // Heading 24
            'heading-24-m',
            'heading-24-sb',
            // Heading 20
            'heading-20-m',
            'heading-20-sb',
            // Heading 18
            'heading-18-m',
            'heading-18-sb',
            'heading-18-b',
            // Title 16
            'title-16-r',
            'title-16-m',
            'title-16-sb',
            'title-16-b',
            // Title 14
            'title-14-r',
            'title-14-m',
            'title-14-sb',
            'title-14-b',
            // Body 12
            'body-12-r',
            'body-12-m',
            'body-12-sb',
            'body-12-b',
            'body-12-r-underline',
            // Body 10
            'body-10-r',
            'body-10-sb',
          ],
        },
      ],
    },
  },
})
