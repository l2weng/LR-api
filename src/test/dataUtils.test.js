import { resBuild, criteriaBuild } from '../data/dataUtils'
import User from '../data/models/User'
import _ from 'underscore'

test('see result', () => {
  // let user = new User()
  // user.name = 'king'
  // console.log(resBuild(user))
  let result = _.isEmpty(undefined)
  console.log(result)
})

test('generate criteria', () => {
  let criteria = {name: 'Louis'}
  let obj = {userId: 33, phone: 18929192221,status:1,userType:2,companyId:1}
  let likeObj = {content:'me', email:'1@gmail.com'}
  criteria = criteriaBuild(criteriaBuild(criteria,obj),likeObj,1);
  console.log(criteria)
})
