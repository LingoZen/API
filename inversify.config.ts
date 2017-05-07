import "reflect-metadata";

import {Container} from "inversify";

import {CommentService} from "./service/comment";
import {LanguageService} from "./service/language";
import {ReactionService} from "./service/reaction";
import {SentenceService} from "./service/sentence";
import {TranslationService} from "./service/translation";
import {UserService} from "./service/user";
import {DbConnector} from "./db/connector";
import {EsConnector} from "./es/connector";
import {CommentDbSchema} from "./db/schemas/comment";
import {LanguageDbSchema} from "./db/schemas/language";
import {ReactionDbSchema} from "./db/schemas/reaction";
import {SentenceDbSchema} from "./db/schemas/sentence";
import {TranslationDbSchema} from "./db/schemas/translation";
import {UserDbSchema} from "./db/schemas/user";
import {AppConfig} from "./app-config";
import {AppEncrypt} from "./app-encrypt";
import {CommentType} from "./gql/types/comment";
import {CommentQueryField} from "./gql/query-fields/comment";
import {LanguageQueryField} from "./gql/query-fields/language";
import {UserMutationField} from "./gql/mutation-fields/user";
import {TranslationMutationField} from "./gql/mutation-fields/translation";
import {ReactionQueryField} from "./gql/query-fields/reaction";
import {SentenceMutationField} from "./gql/mutation-fields/sentence";
import {ReactionMutationField} from "./gql/mutation-fields/reaction";
import {SentenceQueryField} from "./gql/query-fields/sentence";
import {LanguageMutationField} from "./gql/mutation-fields/language";
import {CommentMutationField} from "./gql/mutation-fields/comment";
import {TranslationQueryField} from "./gql/query-fields/translation";
import {UserType} from "./gql/types/user";
import {UserQueryField} from "./gql/query-fields/user";
import {SentenceType} from "./gql/types/sentence";
import {ReactionType} from "./gql/types/reaction";
import {LanguageType} from "./gql/types/language";
import {TranslationType} from "./gql/types/translation";
import {GqlRegistry} from "./gql/registry";
import {GqlRootSchema} from "./gql/root-schema";
import {Type} from "./gql/types/type";
import {MutationField} from "./gql/mutation-fields/mutation-field";
import {QueryField} from "./gql/query-fields/query-field";
import {Service} from "./service/service";
import {DbSchema} from "./db/schemas/db-schema";

export const iocContainer = new Container();

// services
iocContainer.bind<Service>(Service).toSelf();
iocContainer.bind<CommentService>(CommentService).toSelf();
iocContainer.bind<LanguageService>(LanguageService).toSelf();
iocContainer.bind<ReactionService>(ReactionService).toSelf();
iocContainer.bind<SentenceService>(SentenceService).toSelf();
iocContainer.bind<TranslationService>(TranslationService).toSelf();
iocContainer.bind<UserService>(UserService).toSelf();

// connectors
iocContainer.bind<DbConnector>(DbConnector).toSelf();
iocContainer.bind<EsConnector>(EsConnector).toSelf();

// db schemas
iocContainer.bind<DbSchema>(DbSchema).toSelf();
iocContainer.bind<CommentDbSchema>(CommentDbSchema).toSelf();
iocContainer.bind<LanguageDbSchema>(LanguageDbSchema).toSelf();
iocContainer.bind<ReactionDbSchema>(ReactionDbSchema).toSelf();
iocContainer.bind<SentenceDbSchema>(SentenceDbSchema).toSelf();
iocContainer.bind<TranslationDbSchema>(TranslationDbSchema).toSelf();
iocContainer.bind<UserDbSchema>(UserDbSchema).toSelf();

// gql mutation fields
iocContainer.bind<MutationField>(MutationField).toSelf();
iocContainer.bind<CommentMutationField>(CommentMutationField).toSelf();
iocContainer.bind<LanguageMutationField>(LanguageMutationField).toSelf();
iocContainer.bind<ReactionMutationField>(ReactionMutationField).toSelf();
iocContainer.bind<SentenceMutationField>(SentenceMutationField).toSelf();
iocContainer.bind<TranslationMutationField>(TranslationMutationField).toSelf();
iocContainer.bind<UserMutationField>(UserMutationField).toSelf();

// gql query fields
iocContainer.bind<QueryField>(QueryField).toSelf();
iocContainer.bind<CommentQueryField>(CommentQueryField).toSelf();
iocContainer.bind<LanguageQueryField>(LanguageQueryField).toSelf();
iocContainer.bind<ReactionQueryField>(ReactionQueryField).toSelf();
iocContainer.bind<SentenceQueryField>(SentenceQueryField).toSelf();
iocContainer.bind<TranslationQueryField>(TranslationQueryField).toSelf();
iocContainer.bind<UserQueryField>(UserQueryField).toSelf();

// gql classes
iocContainer.bind<GqlRegistry>(GqlRegistry).toSelf();
iocContainer.bind<GqlRootSchema>(GqlRootSchema).toSelf();

// app classes
iocContainer.bind<AppConfig>(AppConfig).toSelf();
iocContainer.bind<AppEncrypt>(AppEncrypt).toSelf();
