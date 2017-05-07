import {GraphQLID, GraphQLList, GraphQLNonNull} from "graphql";
import {injectable} from "inversify";

import {TranslationService} from "../../service/translation";
import {QueryField} from "./query-field";
import {TranslationType} from "../types/translation";

@injectable()
export class TranslationQueryField extends QueryField {
    constructor(private translationService: TranslationService) {
        super();
    }

    initializeQueryFields() {
        const self = this;
        self._queryFields = {
            translation: {
                type: TranslationType.type,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLID)
                    }
                },
                resolve(_, args) {
                    return self.translationService.getOne(args);
                }
            },
            translations: {
                type: new GraphQLList(TranslationType.type),
                resolve(_, args) {
                    return self.translationService.getMany(args);
                }
            }
        };
    }
}
