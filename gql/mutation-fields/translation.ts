import {GraphQLID, GraphQLNonNull, GraphQLString} from "graphql";
import {injectable} from "inversify";

import {MutationField} from "./mutation-field";
import {TranslationService} from "../../service/translation";
import {TranslationType} from "../types/translation";

@injectable()
export class TranslationMutationField extends MutationField {
    constructor(private translationService: TranslationService) {
        super();
    }

    initializeMutationFields() {
        this._mutationFields = {
            createTranslation: {
                type: TranslationType.type,
                args: {
                    text: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(_, args) {
                    return this.translationService.create(args);
                }
            },
            updateTranslation: {
                type: TranslationType.type,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLID)
                    },
                    text: {
                        type: GraphQLString
                    }
                },
                resolve(_, args) {
                    return this.translationService.update(args);
                }
            },
            destroyTranslation: {
                type: TranslationType.type,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLID)
                    }
                },
                resolve(_, {id}) {
                    return this.translationService.destroy(id);
                }
            }
        }
    }
}
