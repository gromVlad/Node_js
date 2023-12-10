const addresses = [
  { id: 1, value: "vlad" },
  { id: 2, value: "nikita" },
];

export const addressesRepo = {
  getAddressesId(id:number){
    return addresses.find((el) => el.id === id);
  }
}