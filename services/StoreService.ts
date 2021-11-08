export interface Store {
    subdomain: string,
    token: string
}

const stores: Store[] = [];

export default class StoreService {

    public static getBySubDomain(subdomain: string): Store | null {
        return stores.find(s => s.subdomain === subdomain) ?? null;
    }

    public static saveStore(store: Store) : Store{
        let currStore = this.getBySubDomain(store.subdomain);
        if (currStore){
            currStore.token = store.token;
        } else {
            stores.push(store);
        }
        return store;
    }
}