{{=[[ ]]=}}
<div class="container" >
    <hr class="greyHrFooterLinks col-xs-24 col-sm-24 col-md-24 col-lg-24 hidden-xs" ng-show="menuFooter.isVisible" />
    <div id="footerDisclaimer" class="col-xs-24 col-sm-24 col-md-24 col-lg-24" ng-show="disclaimerFooter.isVisible"  ng-bind-html="disclaimerHtml.join('\r\n')" ></div>
    <hr  class="greyHrFooterDisclaimer col-xs-24 col-sm-24 col-md-24 col-lg-24" ng-show="disclaimerFooter.isVisible" />
    <div id="fullCopyright" ng-show="copyrightFooter.isVisible" class="col-xs-24 col-sm-24 col-md-24 col-lg-24" ></div>
</div>
