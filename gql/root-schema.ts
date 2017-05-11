import {GraphQLObjectType, GraphQLSchema} from "graphql";
import {inject, injectable} from "inversify";

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
import {iocTypes} from "../ioc-types";

@injectable()
export class GqlRootSchema {
    schema;
    private queryFields;
    private mutationFields;

    constructor(@inject(iocTypes.LanguageMutationField) private languageMutationField: LanguageMutationField,
                @inject(iocTypes.UserMutationField) private userMutationField: UserMutationField,
                @inject(iocTypes.CommentMutationField) private commentMutationField: CommentMutationField,
                @inject(iocTypes.ReactionMutationField) private reactionMutationField: ReactionMutationField,
                @inject(iocTypes.TranslationMutationField) private translationMutationField: TranslationMutationField,
                @inject(iocTypes.SentenceMutationField) private sentenceMutationField: SentenceMutationField,
                @inject(iocTypes.LanguageQueryField) private languageQueryField: LanguageQueryField,
                @inject(iocTypes.UserQueryField) private userQueryField: UserQueryField,
                @inject(iocTypes.CommentQueryField) private commentQueryField: CommentQueryField,
                @inject(iocTypes.ReactionQueryField) private reactionQueryField: ReactionQueryField,
                @inject(iocTypes.TranslationQueryField) private translationQueryField: TranslationQueryField,
                @inject(iocTypes.SentenceQueryField) private sentenceQueryField: SentenceQueryField) {
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
