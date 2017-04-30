import {GraphQLID, GraphQLList, GraphQLNonNull, GraphQLString} from "graphql";

import {Type as SourceSentence} from "./gql-type";
import {Service as SourceSentenceService} from "./service";
import {Language} from "../languages/db-schema";

export const queryFields = {
    sourceSentence: {
        type: SourceSentence,
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(_, args) {
            return SourceSentenceService.getSourceSentence(args);
        }
    },
    sourceSentences: {
        type: new GraphQLList(SourceSentence),
        resolve(_, args) {
            return SourceSentenceService.getSourceSentences(args);
        }
    },
    searchSourceSentences: {
        type: new GraphQLList(SourceSentence),
        args: {
            searchString: {
                type: new GraphQLNonNull(GraphQLString)
            },
            languageId: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve(_, args) {
            return SourceSentenceService.searchSourceSentences(args);
        }
    }
};
