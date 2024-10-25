"use client";
import store from '@/app/store/store';
import { Provider } from 'react-redux';

const ReduxStoreProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default ReduxStoreProvider