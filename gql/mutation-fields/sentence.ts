import {GraphQLID, GraphQLNonNull, GraphQLString} from "graphql";
import {inject, injectable} from "inversify";

import {MutationField} from "./mutation-field";
import {SentenceService} from "../../service/sentence";
import {SentenceType} from "../types/sentence";
import {iocTypes} from "../../ioc-types";

@injectable()
export class SentenceMutationField extends MutationField {
    constructor(@inject(iocTypes.SentenceService) private sentenceService: SentenceService) {
        super();
    }

    initializeMutationFields() {
        this._mutationFields = {
            createSourceSentence: {
                type: SentenceType.type,
                args: {
                    text: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(_, args) {
                    return this.sentenceService.create(args);
                }
            },
            updateSourceSentence: {
                type: SentenceType.type,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLID)
                    },
                    text: {
                        type: GraphQLString
                    }
                },
                resolve(_, args) {
                    return this.sentenceService.update(args);
                }
            },
            destroySourceSentence: {
                type: SentenceType.type,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLID)
                    }
                },
                resolve(_, {id}) {
                    return this.sentenceService.destroy(id);
                }
            }
        };
    }
}
