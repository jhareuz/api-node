'use strict';

import UsersService from '../../../src/app/services/users_service';

describe('UsersService', () => {
    describe('#create', () => {
        it('should return new User', done => {
            let data = {
                "email": "fernando@test.com",
                "lada": "52",
                "phoneNumber": "5565625110",
                "password": "Fercho1$",
                "country": "Mexico",
                "status": "active",
                "firstName": "Erick",
                "lastName": "Cervantes",
                "roles": {
                    "name": "Admin",
                    "status": "active"
                }
            }
            const promise = UsersService.create(data);
            promise.should.be.a.Promise();
            promise.should.be.a.fulfilled();
            promise.then(value => {
                console.log(JSON.stringify(value, null, 2));
                done();
            }).catch(done);
        });
    });


});