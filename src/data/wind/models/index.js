import sequelize from '../sequelize';
import WindUser from './User';
import WindField from './WindField';
import WindMachine from './WindMachine';
import WindVane from './WindVane';
import RoutingInspect from './RoutingInspect';
import FanPhoto from './FanPhoto';
import WindCompany from './Company';
import WindPremiseConfig from './PremiseConfig';
import DefectType from "./DefectType";
import WindPhotoDefect from './WindPhotoDefect';
import TurbineConfig from "./TurbineConfig";

WindCompany.hasMany(WindUser, {
  foreignKey: 'companyId',
  as: 'companyUsers',
  onUpdate: 'cascade',
});
WindUser.belongsTo(WindCompany, { foreignKey: 'companyId', as: 'company' });

WindCompany.hasMany(WindPremiseConfig, {
  foreignKey: 'companyId',
  as: 'companyPremiseConfig',
  onUpdate: 'cascade',
});
WindPremiseConfig.belongsTo(WindCompany, { foreignKey: 'companyId', as: 'company' });

WindCompany.hasMany(DefectType, {
  foreignKey: 'companyId',
  as: 'companyDefectTypes',
  onUpdate: 'cascade',
});
DefectType.belongsTo(WindCompany, { foreignKey: 'companyId', as: 'company' });

WindCompany.hasMany(WindField, {
  foreignKey: 'companyId',
  as: 'companyFields',
  onUpdate: 'cascade',
});
WindField.belongsTo(WindCompany, { foreignKey: 'companyId', as: 'company' });

WindField.hasMany(WindMachine, {
  foreignKey: 'windFieldId',
  as: 'fieldMachines',
  onUpdate: 'cascade',
});
WindMachine.belongsTo(WindField, { foreignKey: 'windFieldId', as: 'field' });

TurbineConfig.hasMany(WindMachine, {
  foreignKey: 'turbineConfigId',
  as: 'turbineConfigTurbine',
  onUpdate: 'cascade',
});
WindMachine.belongsTo(TurbineConfig, { foreignKey: 'turbineConfigId', as: 'turbineConfig' });

WindMachine.hasMany(WindVane, {
  foreignKey: 'windMachineId',
  as: 'machineVanes',
  onUpdate: 'cascade',
});
WindVane.belongsTo(WindMachine, { foreignKey: 'windMachineId', as: 'machine' });

WindVane.hasMany(FanPhoto, {
  foreignKey: 'windVaneId',
  as: 'vaneFanPhotos',
  onUpdate: 'cascade',
});
FanPhoto.belongsTo(WindVane, { foreignKey: 'windVaneId', as: 'vane' });

WindMachine.hasMany(RoutingInspect, {
  foreignKey: 'windMachineId',
  as: 'machineRoutingInspects',
  onUpdate: 'cascade',
});
RoutingInspect.belongsTo(WindMachine, {
  foreignKey: 'windMachineId',
  as: 'machine',
});

RoutingInspect.hasMany(FanPhoto, {
  foreignKey: 'routingInspectId',
  as: 'routingInspectsPhotos',
  onUpdate: 'cascade',
});
FanPhoto.belongsTo(RoutingInspect, {
  foreignKey: 'routingInspectId',
  as: 'routingInspect',
});

FanPhoto.belongsToMany(DefectType, {
  through: {
    model: WindPhotoDefect,
    unique: false,
  },
  foreignKey: 'fanPhotoId',
  constraints: false,
});
DefectType.belongsToMany(FanPhoto, {
  through: {
    model: WindPhotoDefect,
    unique: false,
  },
  foreignKey: 'defectTypeId',
  constraints: false,
});

function sync(...args) {
  return sequelize.sync(...args);
}

export default { sync };
export { WindUser };
