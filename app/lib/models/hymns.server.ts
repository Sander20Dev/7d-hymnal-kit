import { Hymn } from '@/app/types'
import { clientDB } from '../db/db.server'
import * as HymnModel from './hymns'

export class HymnServerModel {
  static async getHymns({ offset = 0, limit = 50 } = {}): Promise<Hymn[]> {
    return HymnModel.getHymns(clientDB, { offset, limit })
  }

  static async getHymn(number: number): Promise<Hymn | null> {
    return HymnModel.getHymn(clientDB, number)
  }

  static async setHymn(hymn: Hymn): Promise<void> {
    await HymnModel.setHymn(clientDB, hymn)
  }

  static async searchHymns(
    search: string,
    { offset = 0, limit = 50 } = {}
  ): Promise<Hymn[]> {
    return HymnModel.searchHymns(clientDB, search, { offset, limit })
  }
}
