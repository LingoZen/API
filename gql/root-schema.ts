import {GraphQLObjectType, GraphQLSchema} from "graphql";
import {injectable} from "inversify";

import {LanguageMutationField} from "./mutation-fields/language";
import {UserMutationField} from "./mutation-fields/user";
import {CommentMutationField} from "./mutation-fields/comment";
import {ReactionMutationField} from "./mutation-fields/reaction";
import {TranslationMutationField} from "./mutation-fields/translation";
import {SentenceMutationField} from "./mutation-fields/sentence";
import {LanguageQueryField} from "./query-fields/language";
import {UserQueryField} from "./query-fields/user";
import {CommentQueryField} from "./query-fields/comment";
import {ReactionQueryField} from "./query-fields/reaction";
import {TranslationQueryField} from "./query-fields/translation";
import {SentenceQueryField} from "./query-fields/sentence";

@injectable()
export class GqlRootSchema {
    schema;
    private queryFields;
    private mutationFields;

    constructor(private languageMutationField: LanguageMutationField,
                private userMutationField: UserMutationField,
                private commentMutationField: CommentMutationField,
                private reactionMutationField: ReactionMutationField,
                private translationMutationField: TranslationMutationField,
                private sentenceMutationField: SentenceMutationField,
                private languageQueryField: LanguageQueryField,
                private userQueryField: UserQueryField,
                private commentQueryField: CommentQueryField,
                private reactionQueryField: ReactionQueryField,
                private translationQueryField: TranslationQueryField,
                private sentenceQueryField: SentenceQueryField) {
        this.initializeSchema();
    }

    private initializeSchema() {
        this.initializeQueryFields();
        this.initializeMutationFields();

        this.schema = new GraphQLSchema({
            query: new GraphQLObjectType({
                name: `Query`,
                fields: this.queryFields
            }),
            mutation: new GraphQLObjectType({
                name: `Mutation`,
                fields: this.mutationFields
            })
        });
    }

    private initializeQueryFields() {
        this.queryFields = Object.assign(
            {},
            this.languageQueryField.fields,
            this.userQueryField.fields,
            this.commentQueryField.fields,
            this.reactionQueryField.fields,
            this.translationQueryField.fields,
            this.sentenceQueryField.fields
        );
    }

    private initializeMutationFields() {
        this.mutationFields = Object.assign(
            {},
            this.languageMutationField.fields,
            this.userMutationField.fields,
            this.commentMutationField.fields,
            this.reactionMutationField.fields,
            this.translationMutationField.fields,
            this.sentenceMutationField.fields
        );
    }
}
