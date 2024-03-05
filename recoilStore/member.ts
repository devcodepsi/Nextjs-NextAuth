import { atom, selector } from "recoil";

export const userAuth = atom({
    key: "userAuth",
    default: null,
});
export const userProfile = atom({
    key: "userProfile",
    default: null,
});
