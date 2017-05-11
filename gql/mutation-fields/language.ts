import {GraphQLID, GraphQLNonNull, GraphQLString} from "graphql";
import {inject, injectable} from "inversify";

import {MutationField} from "./mutation-field";
import {LanguageService} from "../../service/language";
import {LanguageType} from "../types/language";
import {iocTypes} from "../../ioc-types";

@injectable()
export class LanguageMutationField extends MutationField {
    constructor(@inject(iocTypes.LanguageService) private languageService: LanguageService) {
        super();
    }

    initializeMutationFields() {
        this._mutationFields = {
            createLanguage: {
                type: LanguageType.type,
                args: {
                    name: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    englishName: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(_, args) {
                    return this.languageService.create(args);
                }
            },
            updateLanguage: {
                type: LanguageType.type,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLID)
                    },
                    name: {
                        type: GraphQLString
                    },
                    englishName: {
                        type: GraphQLString
                    }
                },
                resolve(_, args) {
                    return this.languageService.update(args);
                }
            },
            destroyLanguage: {
                type: LanguageType.type,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLID)
                    }
                },
                resolve(_, {id}) {
                    return this.languageService.destroy(id);
                }
            }
        };
    }
}

