import { Hymn } from '@/app/types'
import { clientDB } from '../db/db.server'
import HymnModel from './hymns'

export const HymnServerModel = new HymnModel(clientDB)
