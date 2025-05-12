type JSONValue = string | number | boolean | null | { [k: string | number]: JSONValue } | JSONValue[]

interface ListResponse<T> {
  total: number;
  rows: T[];
  code: number;
  msg: string;
}

interface Response<T> {
  code: number
  msg: string
  data: T
}

type Resources<T> = {
  code: number
  msg: string
  data: T[]
}
type Resource<T> = {
  code: number
  msg: string
  data: T
}

type UserInfo = {
  id: string
  userName: string
  nickName: string
  enterpriseId: number
}
