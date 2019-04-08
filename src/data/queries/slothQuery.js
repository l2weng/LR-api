import SlothKongType from '../types/SlothKongType';
import SlothSkuType from '../types/SlothSkuType';
import SlothSku from '../models/SlothSku';
import SlothKong from '../models/SlothKong';
import { GraphQLList as List } from 'graphql';

const slothQueryAll = {
  name: 'slothQueryAll',
  description: 'Finding Sloth all',
  type: new List(SlothKongType),
  resolve() {
    return SlothKong.findAll({
      order: [['row', 'ASC']],
    }).then(slothKongs => slothKongs);
  },
};

const slothSkuQueryAll = {
  name: 'slothSkuQueryAll',
  description: 'Finding Sloth sku all',
  type: new List(SlothSkuType),
  resolve() {
    return SlothSku.findAll({
      order: [['row', 'ASC']],
    }).then(slothSkus => slothSkus);
  },
};

export { slothQueryAll, slothSkuQueryAll };
