'use strict';
angular.module('UOLsac.Notify', [])
    .provider('Notify', function() {

        var NotificationsList = [];

        function Notify() {
            this.title = '';
            this.message = '';
            this.code = 0;
            this.type = 'warning';
            this.field = 'name';
            this.exclusiveContent = false;
            this.persistent = false;
            this.response = {};
            this.visible = true;
            this.remove = function(index){
                NotificationsList.splice(index, 1);
            };
        }

        function _add(notifyObject){

            var notify = new Notify();
            notify.title = notifyObject.title;
            notify.message = notifyObject.message;
            notify.code = notifyObject.code;
            notify.type = notifyObject.type;
            notify.response = notifyObject.response;
            notify.exclusiveContent  = notifyObject.exclusiveContent;
            notify.persistent = notifyObject.persistent;

            for( var i = 0; i < NotificationsList.length; i++){ // Verifica se já não há uma mensagem igual a que será inserida
                if( NotificationsList[i].message === notify.message && NotificationsList[i].title === notify.title ){
                    return null;
                }
            }

            if( notify.exclusiveContent ){
                angular.element( '#containerView section' ).remove();
            }

            NotificationsList.push(notify);

            angular.element('html,body').animate({
                scrollTop: 0
            }, 1000);


        }

        function _setNewNotifyObject(){
            return new Notify();
        }

        function _removeNotify(index) {
            NotificationsList.splice(index, 1);
        }

        function _getAllNotifies() {
            return NotificationsList;
        }

        function _removeTypeNotifies(type){
            for(var i = 0; i < NotificationsList.length; i++){
                if(NotificationsList[i].type === type){
                    NotificationsList.pop();
                    i--;
                }
            }
        }

        function _removeAllNotifies(force){
            for(var i = 0; i < NotificationsList.length; i++){
                if(!NotificationsList[i].persistent && !force ){
                    NotificationsList.pop();
                    i--;
                }else if(force){
                    NotificationsList.pop();
                    i--;
                }
            }
        }

        function _removeOnlyPersistentNotifies(){
            for(var i = 0; i < NotificationsList.length; i++){
                if(NotificationsList[i].persistent) {
                    NotificationsList.pop();
                    i--;
                }
            }
        }


        function _getTotalNumberOfMessagesOnDisplay(){

            var messagesLength = 0;

            try{
                if( UOL.SAC.fixtures.homeMessagesCarousel.visibility && UOL.SAC.fixtures.homeMessagesCarousel.messageList.length > 0 ){
                    messagesLength += UOL.SAC.fixtures.homeMessagesCarousel.messageList.length;
                }
                messagesLength += NotificationsList.length;
            }catch(e){
                console.info(e);
            }

            return messagesLength;

        }



        this.$get = function(){
            return {
                add : _add,
                removeNotify : _removeNotify,
                getTotalNumberOfMessagesOnDisplay : _getTotalNumberOfMessagesOnDisplay,
                getAllNotifies : _getAllNotifies,
                setNewNotifyObject : _setNewNotifyObject,
                removeAllNotifies : _removeAllNotifies,
                removeTypeNotifies : _removeTypeNotifies,
                removeOnlyPersistentNotifies : _removeOnlyPersistentNotifies
            };
        };




    });
