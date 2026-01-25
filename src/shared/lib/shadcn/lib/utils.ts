import { type ClassValue, clsx } from 'clsx'
import { customTwMerge } from './customTwMerge'

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs))
}
