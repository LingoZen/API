import {expect} from "chai";

import {iocContainer, doBinding} from "./inversify.mock.config";
import {App} from "../app";
import {GqlRegistry} from "../gql/registry";
import {iocTypes} from "../ioc-types";

const aaaa = `
 {
          user(name: "Alice", email: "alice@domain.com") {
            name
            email
            greeting
          }
        }
`

describe('Hello function', () => {
    let request = null;

    before(() => {
        doBinding();
    })

    beforeEach(async () => {
        //get dependencies
        const gqlRegistry = iocContainer.get<GqlRegistry>(iocTypes.GqlRegistry);

        //create instance of app
        const app = new App(gqlRegistry);
        await app.initializeServer();

        request = require('supertest')(app.server.listener);
    });

    it('should return hello world', async () => {
        let response = await new Promise<any>((resolve, reject) => {
            request.post('/graphql')
                .field('query', aaaa)
                .end((err, res) => {
                    if (err) {
                        return reject(err);
                    }

                    resolve(res);
                });
        });

        console.log(response.body)
        expect(response).to.be.ok
    });
});
