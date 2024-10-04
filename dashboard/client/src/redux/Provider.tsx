import store from './store';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';

const ProviderComponent = ({ children }: { children: ReactElement }) => {
    return <Provider store={store}>{children}</Provider>;
};

export default ProviderComponent;
