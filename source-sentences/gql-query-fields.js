import {
    GraphQLID,
    GraphQLNonNull,
    GraphQLList
} from 'graphql';

import {Type as SourceSentence} from './gql-type';
import {Service as SourceSentenceService} from './service';

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
    }
};
