import LabelType from '../types/LabelType'
import Label from '../models/Label'
import { criteriaBuild } from '../dataUtils'
import { GraphQLString, GraphQLList as List, GraphQLInt } from 'graphql'

const labelQueryByPhoto = {
  name: 'LabelQueryByPhoto',
  description: 'Finding Label by photoId',
  type: new List(LabelType),
  resolve (_, {photoId, skuId}) {
    let criteria = criteriaBuild({},{photoId, skuId})
    return Label.findAll({
      where: criteria,
    }).then(labels => labels)
  },
  args: {
    photoId: {type: GraphQLString},
    skuId: {type: GraphQLInt},
  },
}

export {
  labelQueryByPhoto,
}
