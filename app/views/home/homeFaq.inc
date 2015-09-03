{{=[[ ]]=}}
<section id="homeFAQ" ng-show="HomeFaq.isVisible" >

    <div class="row" ng-show="HomeFaq.searchInputVisibility" >
        <h4>Tire aqui sua d&uacute;vida</h4>
        <form method="get" accept-charset="ISO-8859-1" class="col-xs-24 col-sm-24 col-md-24 col-lg-24" ng-submit="HomeFaq.search()"  >
            <div class="input-group col-xs-24 col-sm-24 col-md-24 col-lg-24">
				  <span class="input-group-addon hidden-xs">
                      <svg id="searchIconNoShadow" viewBox="0 0 28 29" style="background-color:#FFFFFF"  version="1.1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" x="0px" y="0px" width="28px" height="29px" >
                          <path d="M 4.0968 20.0968 C 7.7767 23.7767 13.5646 24.0394 17.4581 20.8581 L 16.0742 19.4742 L 16.7742 18.7742 C 13.6814 21.867 8.6324 21.8324 5.4968 18.6968 C 2.3612 15.5612 2.3265 10.5122 5.4194 7.4194 C 8.5122 4.3265 13.5612 4.3612 16.6968 7.4968 C 19.8324 10.6324 19.867 15.6814 16.7742 18.7742 L 16.0742 19.4742 L 17.4581 20.8581 L 25.3 28.7 L 27.4 26.6 L 19.4516 18.6516 C 21.9892 14.7989 21.5302 9.5302 18.0968 6.0968 C 14.1773 2.1773 7.866 2.134 4 6 C 0.134 9.866 0.1773 16.1773 4.0968 20.0968 Z" fill="#CCC"/>
                      </svg>
				  </span>
                <input type="text" class="form-control" name="query" ng-model="query" placeholder="Como podemos ajud&aacute;-lo?">
				  <span class="input-group-btn">
                    <button class="btn btn-primary" type="submit">
                        <svg id="searchIcon" class="visible-xs" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                             x="0px" y="0px" width="30px" height="30px" viewBox="10 10 30 30" enable-background="new 10 10 30 30" xml:space="preserve">
                            <g id="Search__x2F__Icon">
                                <g>
                                    <path d="M36.5,34.9l-7.3-7.3l0,0c1.3-1.6,2.1-3.7,2.1-6c0-5.3-4.3-9.6-9.6-9.6c-5.3,0-9.7,4.3-9.7,9.6s4.3,9.6,9.6,9.6
                                        c2.3,0,4.3-0.8,6-2.1l0,0l7.3,7.3l0.5,0.5l1.6-1.6L36.5,34.9z M13.6,21.6c0-4.5,3.6-8.1,8.1-8.1s8.1,3.6,8.1,8.1
                                        c0,4.5-3.6,8.1-8.1,8.1S13.6,26.1,13.6,21.6z" fill="#FFF" />
                                </g>
                            </g>
                        </svg>
                        <span class="hidden-xs" >buscar</span>
                    </button>
                  </span>
            </div>
        </form>
    </div>

    <div class="row">

        <h4>
            Perguntas frequentes
            <small class="pull-right" ng-show="HomeFaq.showAllButtonVisibility" >
                <svg version="1.1" class="arrowBrown pull-left hidden-xs hidden-sm" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="8px" height="16px" viewBox="0 0 11 21" enable-background="new 0 0 11 21" xml:space="preserve" >
                    <polyline fill="none" stroke="#B75F4E" stroke-miterlimit="10" points="0.8,0.9 9.5,9.9 0.6,18.8 "/>
                </svg>
                <a analytics-on="click" analytics-event="click" analytics-ref="home-faq-ver-todas" analytics-url="https://sac.uol.com.br/info/ajuda/faq/index.jhtm" href="https://sac.uol.com.br/#/wrapper?url=https%3A%2F%2Fsac.uol.com.br%2Finfo%2Fajuda%2Ffaq%2Findex.jhtm" class="hidden-xs hidden-sm" > &nbsp; ver todas</a>
            </small>
        </h4>

        <div class="homeFAQin col-xs-24 col-sm-12 col-md-12 col-lg-12" ng-class="{ 'hidden-xs' : HomeFaq.questions.indexOf(question) >= 3 }" ng-repeat="question in HomeFaq.questions" >
            <div class="first-border" >
                <div class="second-border" ng-click="HomeFaq.click(this)"  >
                    <svg version="1.1" class="arrowBrown pull-left" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="11px" height="21px" viewBox="0 0 11 21" enable-background="new 0 0 11 21" xml:space="preserve" >
                        <polyline fill="none" stroke="#B75F4E" stroke-miterlimit="10" points="0.8,0.9 9.5,9.9 0.6,18.8 "/>
                    </svg>
                    <div class="faqLabel">{{question.question}}</div>
                </div>
            </div>
        </div>

        <div class="row text-center visible-xs visible-sm" >
            <div class="btn btn-default openAll-btn" ng-show="HomeFaq.showAllButtonVisibility" ng-click="HomeFaq.openAll()" >Ver todas</div>
        </div>

    </div>

</section>
