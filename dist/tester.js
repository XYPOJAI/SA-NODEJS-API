"use strict";
// const storage = require("node-persist");
// import { v4 as uuidv4 } from "uuid";
// import IProfile from "./types/IProfile";
// (async (): Promise<void> => {
//   "use strict";
//   await storage.init({ dir: "./storage/test_data" });
//   const sampleProfile: IProfile = {
//     id: "1",
//     name: "John Smith",
//     phone: "0299882211",
//     department: "1",
//     address: {
//       street: "1 Code Lane",
//       city: "Javaville",
//       state: "NSW",
//       ZIP: "0100",
//       country: "Australia",
//     },
//     created: new Date(),
//     updated: new Date(),
//   };
//   const newProfile: IProfile = {
//     id: "1",
//     name: "John Wayne Smith",
//     phone: "0299882211",
//     department: "3",
//     address: {
//       street: "1 Code Lane",
//       city: "Javaville",
//       state: "NSW",
//       ZIP: "0100",
//       country: "Australia",
//     },
//   };
//   const createProfile = async (profile: IProfile): Promise<void> => {
//     profile.id = profile.id ?? uuidv4();
//     await storage.setItem(profile.id, profile);
//   };
//   createProfile(sampleProfile);
//   const updateProfile: (
//     oldProfile: IProfile,
//     newProfile: IProfile
//   ) => void = async (oldProfile, newProfile) => {
//     let original = await storage.getItem(oldProfile.id);
//     let updated = { ...original, ...newProfile, updated: new Date() };
//     await storage.updateItem(original.id, updated);
//   };
//   updateProfile(sampleProfile, newProfile);
// })();
//# sourceMappingURL=tester.js.map