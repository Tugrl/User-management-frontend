import {Authority} from "./authority.model";

export interface Role {
  id: string;
  name: string;
  authorities: Authority[];
}
