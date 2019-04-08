import SlothKongType from '../types/SlothKongType';
import SlothSkuType from '../types/SlothSkuType';
import SlothSku from '../models/SlothSku';
import SlothKong from '../models/SlothKong';
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
  resolve (_, {type}) {
    let criteria = {type:type}
    return SlothSku.findAll({
      where: criteria,
      order: [['row', 'ASC']],
    }).then(slothSkus => slothSkus)
  },
  args: {
    type: {type: GraphQLInt},
  },
}

export { slothKongQueryWhere, slothSkuQueryWhere };
