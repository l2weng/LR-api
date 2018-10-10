import WindFieldType from '../types/WindFieldType';
import Sku from '../models/WindField';
import { GraphQLList as List, GraphQLInt, GraphQLString } from 'graphql';
import Invitation from '../models/WindMachine';
import Sequelize from 'sequelize';

const Op = Sequelize.Op;
const windFieldQueryWhere = {
  name: 'windFieldQueryWhere',
  description: 'Finding WindField by Criteria',
  type: new List(WindFieldType),
  resolve(_, { windFieldId, name, serialNumber, province, companyId }) {
    let criteria = {};

    if (windFieldId !== undefined && windFieldId !== '') {
      criteria = { ...criteria, windFieldId };
    }
    if (name !== undefined && name !== '') {
      criteria = { ...criteria, name: { [Op.like]: `%${name}%` } };
    }
    if (serialNumber !== undefined && serialNumber !== '') {
      criteria = { ...criteria, serialNumber };
    }
    if (province !== undefined && province !== '') {
      criteria = { ...criteria, province: { [Op.like]: `%${province}%` } };
    }
    if (companyId !== undefined && companyId !== '' && companyId !== null) {
      criteria = { ...criteria, companyId };
    }
    return Sku.findAll({
      include: [
        {
          model: Invitation,
          as: 'fieldMachines',
        },
      ],
      order: [['createdAt', 'DESC']],
      where: criteria,
    }).then(windFields => windFields);
  },
  args: {
    windFieldId: { type: GraphQLInt },
    name: { type: GraphQLString },
    serialNumber: { type: GraphQLString },
    province: { type: GraphQLString },
    companyId: { type: GraphQLInt },
  },
};

export { windFieldQueryWhere };
