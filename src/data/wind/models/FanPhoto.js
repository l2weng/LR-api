import { DataTypes } from 'sequelize';
import Model from '../sequelize';

const FanPhoto = Model.define('WindFanPhoto', {
  fanPhotoId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },

  name: { type: DataTypes.STRING },
  type: { type: DataTypes.INTEGER },
  sort: { type: DataTypes.INTEGER },
  orientation: { type: DataTypes.INTEGER },
  url: {
    type: DataTypes.STRING,
    unique: true,
  },
  thumbUrl: { type: DataTypes.STRING, unique: true },
  midUrl: { type: DataTypes.STRING },
  active: { type: DataTypes.INTEGER },
  isBig: { type: DataTypes.INTEGER },
  isMask:{ type: DataTypes.INTEGER },
  originMaskUrl:{type: DataTypes.STRING},
  stitchingMaskUrl:{type: DataTypes.STRING},
  needReport:{ type: DataTypes.INTEGER },
  postFlightCVStatus:{type: DataTypes.STRING}

});

export default FanPhoto;
