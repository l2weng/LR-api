import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';
import {
  windMachineQueryWhere,
  windMachineQueryById,
  windMachineQueryAll
} from './queries/windMachineQuery';
import { windFieldQueryWhere } from './queries/windFieldQuery';
import { companyQueryAll, companyQueryWhere } from './queries/companyQuery';
import { userQueryWhere } from './queries/userQuery';
import { defectTypeQueryWhere } from './queries/defectTypeQuery';
import { windPhotoQueryWhere } from './queries/windFanPhotosQuery';
import {
  windVaneQueryWhere,
  windVaneQueryCount,
} from './queries/windVaneQuery';
import { photoDefectQueryWhere } from './queries/PhotoDefectQuery';
import {
  routingInspectQueryWhere,
  routingInspectQuery,
} from './queries/RoutingInspectQuery';
import { turbineConfigQueryWhere } from './queries/turbineConfigQuery';
import { premiseConfigQueryWhere } from './queries/premiseConfigQuery';

const windSchema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      windMachineQueryWhere,
      windFieldQueryWhere,
      companyQueryAll,
      companyQueryWhere,
      userQueryWhere,
      defectTypeQueryWhere,
      windVaneQueryWhere,
      windVaneQueryCount,
      windPhotoQueryWhere,
      photoDefectQueryWhere,
      routingInspectQueryWhere,
      routingInspectQuery,
      turbineConfigQueryWhere,
      premiseConfigQueryWhere,
      windMachineQueryById,
      windMachineQueryAll
    },
  }),
});

export default windSchema;
