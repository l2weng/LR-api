import DefectTypeType from '../types/DefectTypeType';
import Photo from '../models/DefectType';
import { GraphQLString, GraphQLList as List, GraphQLInt } from 'graphql';
import Sequelize from 'sequelize';

const defectTypeQuery = {
  name: 'defectTypeQuery',
  description: 'Finding DefectType by ID',
  type: DefectTypeType,
  resolve(_, { id }) {
    return Photo.findById(id).then(defectType => defectType);
  },
  args: {
    id: { type: GraphQLString },
  },
};

const defectTypeQueryAll = {
  name: 'defectTypeQueryAll',
  description: 'Finding All defectTypes',
  type: new List(DefectTypeType),
  resolve() {
    return Photo.findAll({ order: [['createdAt', 'ASC']] }).then(
      defectType => defectType,
    );
  },
};

const Op = Sequelize.Op;
const defectTypeQueryWhere = {
  name: 'defectTypeQueryWhere',
  description: 'Finding defectType by Criteria',
  type: new List(DefectTypeType),
  resolve(_, { defectTypeId, name, description, companyId, active }) {
    let criteria = {};
    if (defectTypeId !== undefined && defectTypeId !== '') {
      criteria = { ...criteria, defectTypeId };
    }
    if (name !== undefined && name !== '') {
      criteria = { ...criteria, name: { [Op.like]: `%${name}%` } };
    }
    if (active !== undefined && active !== '') {
      criteria = Object.assign({ active }, criteria);
    }
    if (description !== undefined && description !== '') {
      criteria = { ...criteria, description };
    }
    if (companyId !== undefined && companyId !== '') {
      criteria = { ...criteria, companyId };
    }
    return Photo.findAll({
      where: criteria,
    }).then(defectType => defectType);
  },
  args: {
    defectTypeId: { type: GraphQLInt },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    active: { type: GraphQLInt },
    companyId: { type: GraphQLInt },
  },
};

export { defectTypeQuery, defectTypeQueryAll, defectTypeQueryWhere };
