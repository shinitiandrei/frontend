{{=[[ ]]=}}
<div id="notify" class="notify" ng-class="{ 'hidden' : alerts.length == 0, 'messagesCarouselOnDisplay' : !isMessagesCarouselOnDisplay }" ng-controller="notifyCtrl">
    <div alert ng-repeat="alert in alerts" type="{{alert.type}}" class="fadeSac alert bg-alert">
        <strong ng-bind-html="alert.title"></strong>
        <p ng-bind-html="alert.message"></p>
    </div>
</div>
