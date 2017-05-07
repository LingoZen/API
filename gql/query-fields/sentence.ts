import {GraphQLID, GraphQLList, GraphQLNonNull, GraphQLString} from "graphql";
import {injectable} from "inversify";

import {SentenceType} from "../types/sentence";
import {SentenceService} from "../../service/sentence";
import {QueryField} from "./query-field";

@injectable()
export class SentenceQueryField extends QueryField {
    constructor(private sentenceService: SentenceService) {
        super();
    }

    initializeQueryFields() {
        const self = this;
        self._queryFields = {
            sourceSentence: {
                type: SentenceType.type,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLID)
                    }
                },
                resolve(_, args) {
                    return self.sentenceService.getOne(args);
                }
            },
            sourceSentences: {
                type: new GraphQLList(SentenceType.type),
                resolve(_, args) {
                    return self.sentenceService.getMany(args);
                }
            },
            searchSourceSentences: {
                type: new GraphQLList(SentenceType.type),
                args: {
                    searchString: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    languageId: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(_, args) {
                    return self.sentenceService.search(args);
                }
            }
        };
    }
}
