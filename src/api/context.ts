import { createContext } from 'react';
import Store from "./store/store";


interface State {
    store: Store;
}

const store = new Store();
export const Context = createContext<State>({ store });

export { store };
