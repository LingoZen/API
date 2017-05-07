import {GraphQLID, GraphQLList, GraphQLNonNull} from "graphql";
import {injectable} from "inversify";
import {LanguageService} from "../../service/language";
import {QueryField} from "./query-field";
import {LanguageType} from "../types/language";

@injectable()
export class LanguageQueryField extends QueryField {
    constructor(private languageService: LanguageService) {
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
