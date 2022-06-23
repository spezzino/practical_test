const save = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
}

const load = (key: string) => {
    const value = localStorage.getItem(key);
    try {
        if (value) {
            return JSON.parse(value);
        }
        return {};
    } catch (e) {
        console.error('something went wrong :(', e);
        return {};
    }
}

const localStorageService = {
    save,
    load
}

export const KEY = 'CART';
export default localStorageService;
