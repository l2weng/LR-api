import CompanyType from '../types/CompanyType';
import Company from '../models/Company';
import { GraphQLString, GraphQLList as List, GraphQLInt } from 'graphql';
import Sequelize from 'sequelize';

const companyQuery = {
  name: 'companyQuery',
  description: 'Finding Company by ID',
  type: CompanyType,
  resolve(_, { id }) {
    return Company.findById(id).then(company => company);
  },
  args: {
    id: { type: GraphQLString },
  },
};

const companyQueryAll = {
  name: 'companyQueryAll',
  description: 'Finding All companies',
  type: new List(CompanyType),
  resolve() {
    return Company.findAll({ order: [['createdAt', 'ASC']] }).then(
      company => company,
    );
  },
};

const Op = Sequelize.Op;
const companyQueryWhere = {
  name: 'companyQueryWhere',
  description: 'Finding Company by Criteria',
  type: new List(CompanyType),
  resolve(_, { companyId, name, type, active }) {
    let criteria = {};
    if (companyId !== undefined && companyId !== '') {
      criteria = { ...criteria, companyId };
    }
    if (name !== undefined && name !== '') {
      criteria = { ...criteria, name: { [Op.like]: `%${name}%` } };
    }
    if (type !== undefined && type !== '') {
      criteria = { ...criteria, type };
    }
    if (active !== undefined && active !== '') {
      criteria = { ...criteria, active };
    }
    return Company.findAll({
      where: criteria,
    }).then(company => company);
  },
  args: {
    companyId: { type: GraphQLInt },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    active: { type: GraphQLInt },
  },
};

export { companyQuery, companyQueryAll, companyQueryWhere };
