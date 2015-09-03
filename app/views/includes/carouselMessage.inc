{{=[[ ]]=}}
<section id="MessagesCarousel" ng-controller="carouselMessageCtrl" ng-show="Look.carouselMessage.isVisible" ng-class="{'hidden': MessagesCarousel.messageList.length == 0}" >

        <div ng-show="MessagesCarousel.visibility" >

            <div ng-if="MessagesCarousel.useCarousel" >
                <div carousel interval="MessagesCarousel.interval*1000" disable-animation="true">
                    <div slide ng-repeat="alert in MessagesCarousel.messageList" >
                        <div alert class="notify alert{{MessagesCarousel.size}} bg-alert" type="{{alert.type}}">
                            <strong>{{alert.title}}</strong>
                            <p compile="alert.message"></p>
                        </div>
                    </div>
                </div>
            </div>

            <div ng-if="!MessagesCarousel.useCarousel" >
                <div ng-repeat="alert in MessagesCarousel.messageList" >
                    <div alert class="notify alert{{MessagesCarousel.size}} bg-alert" type="{{alert.type}}">
                        <strong>{{alert.title}}</strong>
                        <p compile="alert.message"></p>
                    </div>
                </div>
            </div>

        </div>

</section>
