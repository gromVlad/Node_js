type AddressType = {
  id:number,
  value:string
}

const addresses: AddressType[] = [
  { id: 1, value: "vlad" },
  { id: 2, value: "nikita" },
];

export const addressesRepo = {
  async getAddressesId(id:number):Promise<AddressType | undefined>{
    return addresses.find((el) => el.id === id);
  }
}