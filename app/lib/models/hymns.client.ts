import { clientDB } from '../db/db.client'
import HymnModel from './hymns'

export const HymnClientModel = new HymnModel(clientDB)
