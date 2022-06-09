import { BfcsNavigator } from "./BfcsNavigator";
declare const builder: () => BfcsNavigator<string | number | {
    [key: string]: string | number | any;
}>;
export default builder;
