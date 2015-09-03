{{=[[ ]]=}}
<div id="footerLinks" class="fadeSac container no-padding" ng-show="Look.footer.menu.isVisible" ng-controller="menuFooterCtrl" >

    <div class="footerTwiceSplitter col-xs-24 col-sm-12 col-md-12 col-lg-12 hidden-xs" >
        <div class="footerLinksColumn col-xs-24 col-sm-12 col-md-12 col-lg-12" ng-repeat="collumn in fixtures.FooterMenu.column1" >
            <h4 ng-bind-html="collumn.title" ></h4>
            <a ng-repeat="link in collumn.items" ng-click="click(link)"  alt="{{link.alt}}" title="{{link.alt}}" target="{{link.target}}" ng-bind-html="link.label" analytics-on="click" analytics-event="click" analytics-ref="footer-menu_{{link.label}}" analytics-url="{{link.href}}" ></a><br>
        </div>
    </div>
    <div class="footerTwiceSplitter col-xs-24 col-sm-12 col-md-12 col-lg-12 hidden-xs" >
        <div class="footerLinksColumn col-xs-24 col-sm-12 col-md-12 col-lg-12" ng-repeat="collumn in fixtures.FooterMenu.column2" >
            <h4 ng-bind-html="collumn.title" ></h4>
            <a ng-repeat="link in collumn.items" ng-click="click(link)"  alt="{{link.alt}}" title="{{link.alt}}" target="{{link.target}}" ng-bind-html="link.label" analytics-on="click" analytics-event="click" analytics-ref="footer-menu_{{link.label}}" analytics-url="{{link.href}}" ></a><br>
        </div>
    </div>


    <div accordion close-others="oneAtATime" ng-show="Look.footer.menu.isVisible" class="visible-xs" ng-repeat="collumn in fixtures.FooterMenu.column1" >
        <div accordion-group class="footerTwiceSplitter col-xs-24 col-sm-24 col-md-24 col-lg-24" is-open="status.open" >
            <div accordion-heading ><span ng-class="{'down': status.open, 'right': !status.open}" >{{collumn.title}}</span> <i class="pull-right" ng-class="{'uolglyph-chevron-down': status.open, 'uolglyph-chevron-right': !status.open}"></i> </div>
            <div ng-repeat="link in collumn.items"  class="menuLink" >
                <a ng-click="click(link)"  alt="{{link.alt}}" title="{{link.alt}}" target="{{link.target}}" ng-bind-html="link.label" analytics-on="click" analytics-event="click" analytics-ref="footer-menu_{{link.label}}" analytics-url="{{link.href}}" ></a>
            </div>
        </div>
    </div>
    <div accordion close-others="oneAtATime" ng-show="Look.footer.menu.isVisible" class="visible-xs" ng-repeat="collumn in fixtures.FooterMenu.column2" >
        <div accordion-group class="footerTwiceSplitter col-xs-24 col-sm-24 col-md-24 col-lg-24" is-open="status.open" >
            <div accordion-heading ><span ng-class="{'down': status.open, 'right': !status.open}" >{{collumn.title}}</span> <i class="pull-right" ng-class="{'uolglyph-chevron-down': status.open, 'uolglyph-chevron-right': !status.open}"></i></div>
            <div ng-repeat="link in collumn.items" class="menuLink" >
                <a ng-click="click(link)"  alt="{{link.alt}}" title="{{link.alt}}" target="{{link.target}}" ng-bind-html="link.label" analytics-on="click" analytics-event="click" analytics-ref="footer-menu_{{link.label}}" analytics-url="{{link.href}}" ></a>
            </div>
        </div>
    </div>

    <div style="clear:both;" ></div>

</div>
