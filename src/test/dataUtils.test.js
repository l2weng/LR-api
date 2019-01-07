import { resBuild } from '../data/dataUtils';
import User from '../data/models/User'

test('see result', () => {
  let user = new User();
  user.name = 'king';
  console.log(resBuild(user))
})
