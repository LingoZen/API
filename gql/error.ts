import {createError} from "apollo-errors";

export const GqlError = createError('LingoZen API GraphQL Error', {
    message: 'Something pretty bad happened'
});
