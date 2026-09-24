import { useEffect, useState } from 'react'

import { useLocation } from 'react-router-dom'

import { clearCreateFormSession } from './clear-create-form-persistence.utils'
import {
  CreateFormEntryMode,
  resolveCreateFormEntryMode,
} from './create-funnel-navigation.utils'

export function useCreateFunnelEntry(): CreateFormEntryMode {
  const { state: locationState } = useLocation()

  const [entryMode] = useState(() => resolveCreateFormEntryMode(locationState))

  useEffect(() => {
    if (entryMode === 'reset') {
      clearCreateFormSession()
    }
  }, [entryMode])

  return entryMode
}
