import React from 'react'

import * as Icons from '../index'

import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Icons/All Icons',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

type IconEntry = {
  name: string
  fileName: string
  Component: React.ComponentType<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >
}

type IconGroup = {
  category: string
  icons: IconEntry[]
}

const iconGroups: IconGroup[] = [
  {
    category: 'Lined / Arrow',
    icons: [
      {
        name: 'ChevronLeftIcon',
        fileName: 'chevron-left',
        Component: Icons.ChevronLeftIcon,
      },
      {
        name: 'ChevronRightIcon',
        fileName: 'chevron-right',
        Component: Icons.ChevronRightIcon,
      },
      {
        name: 'ChevronUpIcon',
        fileName: 'chevron-up',
        Component: Icons.ChevronUpIcon,
      },
      {
        name: 'ChevronDownIcon',
        fileName: 'chevron-down',
        Component: Icons.ChevronDownIcon,
      },
      {
        name: 'ChevronDoubleLeftIcon',
        fileName: 'chevron-double-left',
        Component: Icons.ChevronDoubleLeftIcon,
      },
      {
        name: 'ChevronDoubleRightIcon',
        fileName: 'chevron-double-right',
        Component: Icons.ChevronDoubleRightIcon,
      },
      {
        name: 'ArrowUpIcon',
        fileName: 'arrow-up',
        Component: Icons.ArrowUpIcon,
      },
    ],
  },
  {
    category: 'Lined / System',
    icons: [
      { name: 'CheckIcon', fileName: 'check', Component: Icons.CheckIcon },
      {
        name: 'EllipsisVerticalIcon',
        fileName: 'ellipsis-vertical',
        Component: Icons.EllipsisVerticalIcon,
      },
      { name: 'LogOutIcon', fileName: 'log-out', Component: Icons.LogOutIcon },
      { name: 'MinusIcon', fileName: 'minus', Component: Icons.MinusIcon },
      { name: 'PlusIcon', fileName: 'plus', Component: Icons.PlusIcon },
      {
        name: 'RotateCwIcon',
        fileName: 'rotate-cw',
        Component: Icons.RotateCwIcon,
      },
      { name: 'SearchIcon', fileName: 'search', Component: Icons.SearchIcon },
      { name: 'TrashIcon', fileName: 'trash', Component: Icons.TrashIcon },
      { name: 'XIcon', fileName: 'x', Component: Icons.XIcon },
    ],
  },
  {
    category: 'Lined / Optional',
    icons: [
      { name: 'BellIcon', fileName: 'bell', Component: Icons.BellIcon },
      { name: 'BoldIcon', fileName: 'bold', Component: Icons.BoldIcon },
      {
        name: 'CalendarIcon',
        fileName: 'calendar',
        Component: Icons.CalendarIcon,
      },
      { name: 'CameraIcon', fileName: 'camera', Component: Icons.CameraIcon },
      {
        name: 'CircleAlertIcon',
        fileName: 'circle-alert',
        Component: Icons.CircleAlertIcon,
      },
      {
        name: 'CircleCheckIcon',
        fileName: 'circle-check',
        Component: Icons.CircleCheckIcon,
      },
      {
        name: 'CircleQuestionMarkIcon',
        fileName: 'circle-question-mark',
        Component: Icons.CircleQuestionMarkIcon,
      },
      { name: 'CopyIcon', fileName: 'copy', Component: Icons.CopyIcon },
      {
        name: 'DownloadIcon',
        fileName: 'download',
        Component: Icons.DownloadIcon,
      },
      {
        name: 'FileTextIcon',
        fileName: 'file-text',
        Component: Icons.FileTextIcon,
      },
      { name: 'ImageIcon', fileName: 'image', Component: Icons.ImageIcon },
      { name: 'ItalicIcon', fileName: 'italic', Component: Icons.ItalicIcon },
      { name: 'LinkIcon', fileName: 'link', Component: Icons.LinkIcon },
      { name: 'LockIcon', fileName: 'lock', Component: Icons.LockIcon },
      {
        name: 'SettingsIcon',
        fileName: 'settings',
        Component: Icons.SettingsIcon,
      },
      { name: 'Share2Icon', fileName: 'share-2', Component: Icons.Share2Icon },
      {
        name: 'SquarePenIcon',
        fileName: 'square-pen',
        Component: Icons.SquarePenIcon,
      },
      {
        name: 'StrikethroughIcon',
        fileName: 'strikethrough',
        Component: Icons.StrikethroughIcon,
      },
      {
        name: 'TextAlignCenterIcon',
        fileName: 'text-align-center',
        Component: Icons.TextAlignCenterIcon,
      },
      {
        name: 'TextAlignEndIcon',
        fileName: 'text-align-end',
        Component: Icons.TextAlignEndIcon,
      },
      {
        name: 'TextAlignJustifyIcon',
        fileName: 'text-align-justify',
        Component: Icons.TextAlignJustifyIcon,
      },
      {
        name: 'TextAlignStartIcon',
        fileName: 'text-align-start',
        Component: Icons.TextAlignStartIcon,
      },
      {
        name: 'TextBaselineIcon',
        fileName: 'text-baseline',
        Component: Icons.TextBaselineIcon,
      },
      {
        name: 'ThumbUpIcon',
        fileName: 'thumb-up',
        Component: Icons.ThumbUpIcon,
      },
      {
        name: 'UnderlineIcon',
        fileName: 'underline',
        Component: Icons.UnderlineIcon,
      },
      { name: 'UploadIcon', fileName: 'upload', Component: Icons.UploadIcon },
    ],
  },
  {
    category: 'Filled / Meaning',
    icons: [
      {
        name: 'BellFilledIcon',
        fileName: 'bell-filled',
        Component: Icons.BellFilledIcon,
      },
      {
        name: 'BellOffIcon',
        fileName: 'bell-off',
        Component: Icons.BellOffIcon,
      },
      {
        name: 'CircleAlertFilledIcon',
        fileName: 'circle-alert-filled',
        Component: Icons.CircleAlertFilledIcon,
      },
      {
        name: 'CircleCheckFilledIcon',
        fileName: 'circle-check-filled',
        Component: Icons.CircleCheckFilledIcon,
      },
      { name: 'ExcelIcon', fileName: 'excel', Component: Icons.ExcelIcon },
      {
        name: 'HeartGrayIcon',
        fileName: 'heart-gray',
        Component: Icons.HeartGrayIcon,
      },
      {
        name: 'HeartRedIcon',
        fileName: 'heart-red',
        Component: Icons.HeartRedIcon,
      },
      {
        name: 'HeartRedShadowIcon',
        fileName: 'heart-red-shadow',
        Component: Icons.HeartRedShadowIcon,
      },
      {
        name: 'HeartWhiteShadowIcon',
        fileName: 'heart-white-shadow',
        Component: Icons.HeartWhiteShadowIcon,
      },
      { name: 'StarIcon', fileName: 'star', Component: Icons.StarIcon },
      {
        name: 'StarFilledIcon',
        fileName: 'star-filled',
        Component: Icons.StarFilledIcon,
      },
      {
        name: 'CheckboxCheckedIcon',
        fileName: 'checkbox-checked',
        Component: Icons.CheckboxCheckedIcon,
      },
      {
        name: 'CheckboxCheckedGrayIcon',
        fileName: 'checkbox-checked-gray',
        Component: Icons.CheckboxCheckedGrayIcon,
      },
      {
        name: 'CheckboxCheckedLightIcon',
        fileName: 'checkbox-checked-light',
        Component: Icons.CheckboxCheckedLightIcon,
      },
      {
        name: 'CheckboxDefaultIcon',
        fileName: 'checkbox-default',
        Component: Icons.CheckboxDefaultIcon,
      },
      {
        name: 'CheckboxDisabledIcon',
        fileName: 'checkbox-disabled',
        Component: Icons.CheckboxDisabledIcon,
      },
      {
        name: 'CheckboxIndeterminateIcon',
        fileName: 'checkbox-indeterminate',
        Component: Icons.CheckboxIndeterminateIcon,
      },
      {
        name: 'RadioCheckedIcon',
        fileName: 'radio-checked',
        Component: Icons.RadioCheckedIcon,
      },
      {
        name: 'RadioDefaultIcon',
        fileName: 'radio-default',
        Component: Icons.RadioDefaultIcon,
      },
      {
        name: 'BbanggreuiOvenLogo',
        fileName: 'bbanggreui-oven-logo',
        Component: Icons.BbanggreuiOvenLogo,
      },
    ],
  },
]

function IconCard({ name, fileName, Component }: IconEntry) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        padding: '16px 8px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        minWidth: '120px',
        backgroundColor: '#ffffff',
      }}
    >
      <Component width={24} height={24} />
      <div style={{ textAlign: 'center' }}>
        <p
          style={{
            margin: 0,
            fontSize: '11px',
            fontWeight: 600,
            color: '#111827',
            fontFamily: 'monospace',
          }}
        >
          {name}
        </p>
        <p
          style={{
            margin: '2px 0 0',
            fontSize: '10px',
            color: '#6b7280',
            fontFamily: 'monospace',
          }}
        >
          {fileName}
        </p>
      </div>
    </div>
  )
}

function AllIconsView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      {iconGroups.map(({ category, icons }) => (
        <section key={category}>
          <h2
            style={{
              margin: '0 0 16px',
              fontSize: '14px',
              fontWeight: 700,
              color: '#374151',
              borderBottom: '2px solid #e5e7eb',
              paddingBottom: '8px',
            }}
          >
            {category}
          </h2>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            {icons.map((icon) => (
              <IconCard key={icon.name} {...icon} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export const AllIcons: Story = {
  render: () => <AllIconsView />,
}
