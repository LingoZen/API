import {GraphQLID, GraphQLList, GraphQLNonNull} from "graphql";
import {inject, injectable} from "inversify";

import {QueryField} from "./query-field";
import {UserService} from "../../service/user";
import {UserType} from "../types/user";
import {iocTypes} from "../../ioc-types";

@injectable()
export class UserQueryField extends QueryField {
    constructor(@inject(iocTypes.UserService) private userService: UserService) {
        super();
    }

    initializeQueryFields() {
        const self = this;
        self._queryFields = {
            user: {
                type: UserType.type,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLID)
                    }
                },
                resolve(_, args) {
                    return self.userService.getOne(args);
                }
            },
            users: {
                type: new GraphQLList(UserType.type),
                resolve(_, args) {
                    return self.userService.getMany(args);
                }
            }
        };
    }
}
