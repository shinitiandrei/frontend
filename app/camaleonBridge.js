/* {{=[[ ]]=}} */
angular.module('UOLsac.CamaleonBridge', [])

            .provider('camaleonBridge', function() {

                var sharedConstants = {
                    SKIN : '[[camaleao.tabs.skin.skinUrlParam.value]]',
                    BRAND_COLOR : '[[camaleao.tabs.skin.brandColor.value]]',
                    BRAND_NAME : '[[camaleao.tabs.skin.brandName.value]]',
                    TIMEOUT : '[[camaleao.tabs.advanced.timeOut.value]]',
                    HOME_URL : '[[camaleao.tabs.skin.homeUrl.value]]',
                    RECOVERY_PASSWORD_SUCCESS_URL : '[[camaleao.tabs.redirects.recoveryPasswordSuccessURL.value]]',
                    QUITTANCE_ACCOUNTS_URL : '[[camaleao.tabs.redirects.quittanceAccountsUrl.value]]'
                };

                function _getSharedConstants(index){
                    if(index){
                        return sharedConstants[index];
                    }
                    return sharedConstants;
                }

                function _setSharedConstant(index, value){
                    sharedConstants[index] = value;
                }

                function _getAllSharedConstants(){
                    return sharedConstants;
                }

                this.$get = function () {
                    return {
                        getSharedConstant  : _getSharedConstants,
                        getSharedConstants : _getAllSharedConstants,
                        getAllSharedConstants    : _getAllSharedConstants,
                        setSharedConstant : _setSharedConstant
                    };
                };

            });
