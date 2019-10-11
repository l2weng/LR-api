import { criteriaBuild } from '../data/dataUtils'
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

test('unionObjectArray', ()=>{
  let aryA = [{
    "taskId": "56188030-ea6a-11e9-8d07-750ab528c517",
    "key": "56188030-ea6a-11e9-8d07-750ab528c517",
    "name": "webber1009",
    "type": 0,
    "category": 1,
    "localTaskId": 2,
    "progress": 0,
    "projectId": "2e734510-ea6a-11e9-8d07-750ab528c517",
    "createdAt": "Wed Oct 09 2019 15:56:44 GMT+0800 (CST)",
    "workStatus": 0,
    "project": {
    "projectId": "2e734510-ea6a-11e9-8d07-750ab528c517",
      "name": "test20191009",
      "deadline": null
  }
  }]
  let aryB = [
    {
      "taskId": "4d22f3c0-ea6a-11e9-8d07-750ab528c517",
      "key": "4d22f3c0-ea6a-11e9-8d07-750ab528c517",
      "name": "louis1009",
      "type": 0,
      "category": 1,
      "localTaskId": 1,
      "progress": 0,
      "projectId": "2e734510-ea6a-11e9-8d07-750ab528c517",
      "createdAt": "Wed Oct 09 2019 15:56:29 GMT+0800 (CST)",
      "workStatus": 0,
      "project": {
        "projectId": "2e734510-ea6a-11e9-8d07-750ab528c517",
        "name": "test20191009",
        "deadline": null
      }
    },{
      "taskId": "56188030-ea6a-11e9-8d07-750ab528c517",
      "key": "56188030-ea6a-11e9-8d07-750ab528c517",
      "name": "webber1009",
      "type": 0,
      "category": 1,
      "localTaskId": 2,
      "progress": 0,
      "projectId": "2e734510-ea6a-11e9-8d07-750ab528c517",
      "createdAt": "Wed Oct 09 2019 15:56:44 GMT+0800 (CST)",
      "workStatus": 0,
      "project": {
        "projectId": "2e734510-ea6a-11e9-8d07-750ab528c517",
        "name": "test20191009",
        "deadline": null
      }
    }]
  console.log(merge(aryA,aryB,"taskId"))
})

function merge(a, b, prop) {
  let reduced = a.filter(aitem => !b.find(bitem => aitem[prop] === bitem[prop]))
  return reduced.concat(b);
}
