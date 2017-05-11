import "reflect-metadata";

import {Container} from "inversify";

import {CommentService} from "../service/comment";
import {LanguageService} from "../service/language";
import {ReactionService} from "../service/reaction";
import {SentenceService} from "../service/sentence";
import {TranslationService} from "../service/translation";
import {UserService} from "../service/user";
import {CommentDbSchema} from "../db/schemas/comment";
import {LanguageDbSchema} from "../db/schemas/language";
import {ReactionDbSchema} from "../db/schemas/reaction";
import {SentenceDbSchema} from "../db/schemas/sentence";
import {TranslationDbSchema} from "../db/schemas/translation";
import {UserDbSchema} from "../db/schemas/user";
import {AppEncrypt} from "../app-encrypt";
import {CommentQueryField} from "../gql/query-fields/comment";
import {LanguageQueryField} from "../gql/query-fields/language";
import {UserMutationField} from "../gql/mutation-fields/user";
import {TranslationMutationField} from "../gql/mutation-fields/translation";
import {ReactionQueryField} from "../gql/query-fields/reaction";
import {SentenceMutationField} from "../gql/mutation-fields/sentence";
import {ReactionMutationField} from "../gql/mutation-fields/reaction";
import {SentenceQueryField} from "../gql/query-fields/sentence";
import {LanguageMutationField} from "../gql/mutation-fields/language";
import {CommentMutationField} from "../gql/mutation-fields/comment";
import {TranslationQueryField} from "../gql/query-fields/translation";
import {UserQueryField} from "../gql/query-fields/user";
import {GqlRegistry} from "../gql/registry";
import {GqlRootSchema} from "../gql/root-schema";
import {iocTypes} from "../ioc-types";

export const iocContainer = new Container();
export function doBinding() {
    // services
    iocContainer.bind<CommentService>(iocTypes.CommentService).to(CommentService)
    iocContainer.bind<LanguageService>(iocTypes.LanguageService).to(LanguageService)
    iocContainer.bind<ReactionService>(iocTypes.ReactionService).to(ReactionService)
    iocContainer.bind<SentenceService>(iocTypes.SentenceService).to(SentenceService)
    iocContainer.bind<TranslationService>(iocTypes.TranslationService).to(TranslationService)
    iocContainer.bind<UserService>(iocTypes.UserService).to(UserService)

// db schemas
    iocContainer.bind<CommentDbSchema>(iocTypes.CommentDbSchema).to(CommentDbSchema)
    iocContainer.bind<LanguageDbSchema>(iocTypes.LanguageDbSchema).to(LanguageDbSchema)
    iocContainer.bind<ReactionDbSchema>(iocTypes.ReactionDbSchema).to(ReactionDbSchema)
    iocContainer.bind<SentenceDbSchema>(iocTypes.SentenceDbSchema).to(SentenceDbSchema)
    iocContainer.bind<TranslationDbSchema>(iocTypes.TranslationDbSchema).to(TranslationDbSchema)
    iocContainer.bind<UserDbSchema>(iocTypes.UserDbSchema).to(UserDbSchema)

// gql mutation fields
    iocContainer.bind<CommentMutationField>(iocTypes.CommentMutationField).to(CommentMutationField)
    iocContainer.bind<LanguageMutationField>(iocTypes.LanguageMutationField).to(LanguageMutationField)
    iocContainer.bind<ReactionMutationField>(iocTypes.ReactionMutationField).to(ReactionMutationField)
    iocContainer.bind<SentenceMutationField>(iocTypes.SentenceMutationField).to(SentenceMutationField)
    iocContainer.bind<TranslationMutationField>(iocTypes.TranslationMutationField).to(TranslationMutationField)
    iocContainer.bind<UserMutationField>(iocTypes.UserMutationField).to(UserMutationField)

// gql query fields
    iocContainer.bind<CommentQueryField>(iocTypes.CommentQueryField).to(CommentQueryField)
    iocContainer.bind<LanguageQueryField>(iocTypes.LanguageQueryField).to(LanguageQueryField)
    iocContainer.bind<ReactionQueryField>(iocTypes.ReactionQueryField).to(ReactionQueryField)
    iocContainer.bind<SentenceQueryField>(iocTypes.SentenceQueryField).to(SentenceQueryField)
    iocContainer.bind<TranslationQueryField>(iocTypes.TranslationQueryField).to(TranslationQueryField)
    iocContainer.bind<UserQueryField>(iocTypes.UserQueryField).to(UserQueryField)

// gql classes
    iocContainer.bind<GqlRegistry>(iocTypes.GqlRegistry).to(GqlRegistry)
    iocContainer.bind<GqlRootSchema>(iocTypes.GqlRootSchema).to(GqlRootSchema)

// app classes
    iocContainer.bind<AppEncrypt>(iocTypes.AppEncrypt).to(AppEncrypt)
}
