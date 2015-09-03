{{=[[ ]]=}}
<section id="homeThumbs" >
    <div class="row" >
        <h4>{{HomeThumbs.title}}</h4>
        <div id="{{thumb.id}}" class="homeThumb col-xs-24 col-sm-12 col-md-6 col-lg-6" ng-repeat="thumb in HomeThumbs.homeThumbList" >
            <div class="homeThumbFakeBorder" >

                <div class="thumbnail small visible-xs" ng-click="HomeThumbs.click(this)" title="{{thumb.title}}" >
                    <div class="homeThumbImage col-xs-6 col-sm-6 col-md-6 col-lg-6 no-padding-right" >
                        <img ng-src="{{thumb.imgUrl}}" />
                    </div>
                    <div class="homeThumbTextContainer col-xs-18 col-sm-18 col-md-18 col-lg-18" >
                        <div class="homeThumbTitle" ng-bind-html="thumb.title"></div>
                        <div class="homeThumbInfo"  ng-bind-html="thumb.info"></div>
                    </div>
                </div>


                <div class="thumbnail medium visible-sm" ng-click="HomeThumbs.click(this)"  title="{{thumb.title}}" >
                    <div class="homeThumbImage col-xs-9 col-sm-9 col-md-9 col-lg-9" >
                        <img ng-src="{{thumb.imgUrl}}" />
                    </div>
                    <div class="homeThumbTextContainer col-xs-15 col-sm-15 col-md-15 col-lg-15" >
                        <div class="homeThumbTitle" ng-bind-html="thumb.title"></div>
                        <div class="homeThumbInfo" ng-bind-html="thumb.info"></div>
                    </div>
                </div>


                <div class="thumbnail large visible-lg visible-md" ng-click="HomeThumbs.click(this)" title="{{thumb.title}}" >
                    <div class="homeThumbTextContainer" >
                        <div class="homeThumbTitle" ng-bind-html="thumb.title"></div>
                        <div class="homeThumbImage" ><img ng-src="{{thumb.imgUrl}}" /></div>
                        <div class="homeThumbInfo"  ng-bind-html="thumb.info" ></div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</section>
