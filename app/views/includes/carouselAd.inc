{{=[[ ]]=}}
<section id="AdCarousel" ng-controller="carouselAdCtrl" ng-show="Look.carouselAd.isVisible"  >
    <div ng-show="AdCarousel.visibility" >
        <div carousel interval="AdCarousel.interval*1000" disable-animation="true" class="hidden-xs visible-sm visible-md visible-lg"  >
            <div slide ng-repeat="ad in AdCarousel.adList" >
                <div class="bannerContainer" >
                    <a ng-href="{{ad.link}}" analytics-on="click" analytics-event="click" analytics-ref="home-banner" analytics-url="{{ad.link}}" alt={{ad.alt}} title={{ad.alt}}>
                        <div sac-picture="{{ad.src}}" ></div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>
