import { createBoard } from '@wixc3/react-board';
import ConnectAccount from '../../../components/dialog/ConnectAccount';

export default createBoard({
    name: 'ConnectAccount',
    Board: () => <ConnectAccount />
});
