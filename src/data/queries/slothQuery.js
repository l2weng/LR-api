import SlothKongType from '../types/SlothKongType';
import SlothSkuType from '../types/SlothSkuType';
import SlothFridgeType from '../types/SlothFridgeType';
import SlothSku from '../models/SlothSku';
import SlothKong from '../models/SlothKong';
import SlothFridge from '../models/SlothFridge';
import { GraphQLList as List, GraphQLInt } from 'graphql'

const slothKongQueryWhere = {
  name: 'slothKongQueryWhere',
  description: 'Finding slothkong by Criteria',
  type: new List(SlothKongType),
  resolve (_, {type}) {
    let criteria = {type:type}
    return SlothKong.findAll({
      where: criteria,
    }).then(slothKongs => slothKongs)
  },
  args: {
    type: {type: GraphQLInt},
  },
}

const slothSkuQueryWhere = {
  name: 'slothSkuQueryWhere',
  description: 'Finding slothsku by Criteria',
  type: new List(SlothSkuType),
  resolve (_, {type,isEmpty}) {
    let criteria = {}
    if(type !==undefined&&type!==''){
      criteria = {type,...criteria}
    }
    if(isEmpty!==undefined&&isEmpty!==''){
      criteria = {isEmpty:isEmpty,...criteria}
    }
    return SlothSku.findAll({
      where: criteria,
      order: [['row', 'ASC']],
    }).then(slothSkus => slothSkus)
  },
  args: {
    type: {type: GraphQLInt},
    isEmpty:  {type: GraphQLInt},
  },
}

const slothFridgeQueryWhere = {
  name: 'slothFridgeQueryWhere',
  description: 'Finding slothFridge by Criteria',
  type: SlothFridgeType,
  resolve (_, {type}) {
    let criteria = {type:type}
    return SlothFridge.findOne({
      where: criteria,
    }).then(slothFridges => slothFridges)
  },
  args: {
    type: {type: GraphQLInt},
  },
}

export { slothKongQueryWhere, slothSkuQueryWhere,slothFridgeQueryWhere };
