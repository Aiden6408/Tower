import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { towerEventSchema } from '../models/TowerEvent'
import { ReservationSchema } from '../models/Reservations'
import { CommentSchema } from '../models/Comments'

class DbContext {

  Comments = mongoose.model('Comments', CommentSchema)
  Reservations = mongoose.model('reservation', ReservationSchema)
  TowerEvents = mongoose.model('towerEvent', towerEventSchema);
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
}

export const dbContext = new DbContext()
