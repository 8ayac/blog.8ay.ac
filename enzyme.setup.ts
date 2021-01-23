import { matchers } from '@emotion/jest';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(matchers);
