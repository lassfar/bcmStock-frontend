import TCustomer from "@/app/ts/types/Customer"

type TProject = {
  id_project: String,
  designation: String,
  _id_societe: String,
  Customer?: TCustomer,
}

export default TProject