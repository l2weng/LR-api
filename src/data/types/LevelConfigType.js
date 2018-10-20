import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
} from 'graphql';

const LevelConfigType = new ObjectType({
  name: 'levelConfigStory',
  fields: {
    id: { type: IntType },
    name: {
      type: StringType,
    },
    /**
     * score: user score to count the level, 1000: 青铜, 1100:青铜I....
     */
    score: { type: FloatType },
    /**
     * Lv number
     */
    level: { type: IntType },
    /**
     * Lv title
     */
    levelTitle: { type: StringType },
    /**
     * type 0: User level, 1: Team level
     */
    type: { type: IntType },
  },
});

export default LevelConfigType;
