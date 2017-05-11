import {GraphQLID, GraphQLNonNull, GraphQLString} from "graphql";
import {inject, injectable} from "inversify";

import {MutationField} from "./mutation-field";
import {UserService} from "../../service/user";
import {GqlError} from "../error";
import {UserType} from "../types/user";
import {iocTypes} from "../../ioc-types";

@injectable()
export class UserMutationField extends MutationField {
    constructor(@inject(iocTypes.UserService) private userService: UserService) {
        super();
    }

    initializeMutationFields() {
        this._mutationFields = {
            createUser: {
                type: UserType.type,
                args: {
                    name: {
                        type: GraphQLString
                    },
                    email: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    username: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    password: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(_, args) {
                    return this.userService.create(args);
                }
            },
            updateUser: {
                type: UserType.type,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLID)
                    },
                    name: {
                        type: GraphQLString
                    },
                    email: {
                        type: GraphQLString
                    },
                    username: {
                        type: GraphQLString
                    },
                    password: {
                        type: GraphQLString
                    }
                },
                resolve(_, args) {
                    return this.userService.update(args);
                }
            },
            destroyUser: {
                type: UserType.type,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLID)
                    }
                },
                resolve(_, {id}) {
                    return this.userService.destroy(id);
                }
            },
            login: {
                type: UserType.type,
                args: {
                    username: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    password: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                async resolve (_, {username, password}) {
                    try {
                        await this.userService.login(username, password)
                    } catch (e) {
                        console.error(e);

                        switch (e.code) {
                            case 'INCORRECT_PASSWORD':
                            case 'USERNAME_NOT_FOUND':
                                throw new GqlError({data: {code: 'INCORRECT_USERNAME_OR_PASSWORD'}});
                            default:
                                throw new GqlError({data: {code: null}});
                        }

                    }
                }
            },
            register: {
                type: UserType.type,
                args: {
                    email: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    password: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    name: {
                        type: GraphQLString
                    },
                    username: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                async resolve(_, args) {
                    try {

                        return this.userService.register(args);
                    } catch (error) {
                        console.error(error);

                        switch (error.code) {
                            case 'EMAIL_NOT_UNIQUE':
                            case 'USERNAME_NOT_UNIQUE':
                            case 'PASSWORD_NOT_SECURE':
                            case 'BAD_EMAIL_FORMAT':
                                throw new GqlError({data: {code: error.code}});
                            default:
                                throw new GqlError({data: {code: null}});
                        }

                    }
                }
            }
        };
    }
}
