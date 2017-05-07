import {GraphQLID, GraphQLList, GraphQLNonNull} from "graphql";
import {injectable} from "inversify";

import {QueryField} from "./query-field";
import {UserService} from "../../service/user";
import {UserType} from "../types/user";

@injectable()
export class UserQueryField extends QueryField {
    constructor(private userService: UserService) {
        super();
    }

    initializeQueryFields() {
        this._queryFields = {
            user: {
                type: UserType.type,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLID)
                    }
                },
                resolve(_, args) {
                    return this.userService.getOne(args);
                }
            },
            users: {
                type: new GraphQLList(UserType.type),
                resolve(_, args) {
                    return this.userService.getMany(args);
                }
            }
        };
    }
}
