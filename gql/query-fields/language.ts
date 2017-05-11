import {GraphQLID, GraphQLList, GraphQLNonNull} from "graphql";
import {inject, injectable} from "inversify";
import {LanguageService} from "../../service/language";
import {QueryField} from "./query-field";
import {LanguageType} from "../types/language";
import {iocTypes} from "../../ioc-types";

@injectable()
export class LanguageQueryField extends QueryField {
    constructor(@inject(iocTypes.LanguageService) private languageService: LanguageService) {
        super();
    }

    initializeQueryFields() {
        const self = this;
        self._queryFields = {
            language: {
                type: LanguageType.type,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLID)
                    }
                },
                resolve(_, args) {
                    return self.languageService.getOne(args);
                }
            },
            languages: {
                type: new GraphQLList(LanguageType.type),
                resolve(_, args) {
                    return self.languageService.getMany(args);
                }
            }
        };
    }
}
