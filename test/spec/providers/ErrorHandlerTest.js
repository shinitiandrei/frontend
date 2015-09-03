'use strict';

describe('Provider: ErrorHandler', function () {

    // load the service's module
    beforeEach(module('uolsacApp'));

    // instantiate service
    var errorHandler;
    var notify;


    beforeEach(inject(function (_Notify_, _ErrorHandler_) {
        errorHandler = _ErrorHandler_;
        notify = _Notify_;
    }));

    it('should have Notifies if response is correct', function () {
        var response = {
            data: {
                errors: {
                    messages: [
                        {
                            title: 'MAMA',
                            code: 100
                        }
                    ]
                }
            }
        };
        errorHandler.add(response, {});
        expect(notify.getAllNotifies().length === 1).toBe(true);
        expect(notify.getAllNotifies()[0].title).toBe('MAMA');
        expect(notify.getAllNotifies()[0].code).toBe(100);
        expect(notify.getAllNotifies()[0].type).toBe('warning');
    });

    it('should NOT have Notifies if response doesnt have messages', function () {
        var response = {
            data: {
                errors: {
                    messages: []
                }
            }
        };

        errorHandler.add(response, {});
        expect(notify.getAllNotifies().length === 0).toBe(true);
    });

    it('should NOT have Notifies if response HAS field', function () {
        var response = {
            data: {
                errors: {
                    messages: [{
                        code: 100,
                        field: 'FIELD'
                    }]
                }
            }
        };

        errorHandler.add(response, {});
        expect(notify.getAllNotifies().length === 0).toBe(true);
    });
});
