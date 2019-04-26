import { resBuild, criteriaBuild } from '../data/dataUtils'
import User from '../data/models/User'
import _ from 'underscore'

test('see result', () => {
  let refs = {}
  let refArray = Object.values(refs)
  refArray.idx = {}
  refArray.map((r,i)=>{
    refArray.idx[r.id] = i
  })
  console.log(refArray)
})

test('generate criteria', () => {
  let criteria = {name: 'Louis'}
  let obj = {userId: 33, phone: 18929192221,status:1,userType:2,companyId:1}
  let likeObj = {content:'me', email:'1@gmail.com'}
  criteria = criteriaBuild(criteriaBuild(criteria,obj),likeObj,1);
  console.log(criteria)
})
