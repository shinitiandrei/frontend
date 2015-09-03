{{=[[ ]]=}}
<div id="top-menu" class="slide-menu" >
    <div class="navbar navbar-default navbar-white" >
        <div class="container-fluid">
            <div class="row">

                <div class="navbar-header" >

                    <div id="navbar-header-menuButton" >
                        <button class="navbar-toggle-left pull-left" ng-init="isCollapsedLeft=true; isCollapsedRight=true;" ng-click="isCollapsedLeft = !isCollapsedLeft; isCollapsedRight = true;" ng-show="isMenuVisible" >
                            <span class="sr-only">Alternar navegação</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                    </div>

                    <div id="navbar-header-homeLogo" >
                        <a title="Home" alt="Home" ng-click="isCollapsedLeft = true; isCollapsedRight = true;"  ng-href="{{homeLink}}"><img src="[[camaleao.tabs.skin.logoImg.value]]" /></a>
                    </div>
                    <div ng-show="userInfoVisibility" >
                        <div id="navbar-header-userArea" ng-class="{ 'in' : !isCollapsedRight }" ng-click="getBootstrapGridSize().bootstrapFormat != 'lg' && isLoggedIn == true ? isCollapsedRight = !isCollapsedRight : null;" >
                            <div  ng-switch on="isLoggedIn" >
                                <div ng-switch-when="true">
                                    <div id="header-logged" >
                                        <div id="header-logged-avatar" >
                                            <svg class="pull-left" version="1.1" id="_xD83D__xDC64_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="31px" height="31px" viewBox="0 0 31 31" enable-background="new 0 0 31 31" xml:space="preserve">
                                                <path fill="#F9C523" d="M25.365,23.943c1.949-2.274,3.135-5.221,3.135-8.443c0-7.168-5.832-13-13-13c-7.168,0-13,5.832-13,13
                                                    c0,7.168,5.832,13,13,13C19.445,28.5,22.979,26.727,25.365,23.943v0.008C25.365,23.949,25.365,23.945,25.365,23.943z M3.5,15.5
                                                    c0-6.617,5.383-12,12-12c6.617,0,12,5.383,12,12c0,2.842-0.998,5.453-2.655,7.511c-0.526-0.469-1.586-1.083-3.721-1.827
                                                    c-2.396-0.888-2.782-1.5-2.782-2.621c0-0.24,0.047-0.292,0.221-0.486c0.26-0.289,0.615-0.685,0.861-1.787
                                                    c0.46-0.229,0.761-0.578,0.837-1.646c0-0.475-0.147-0.781-0.302-0.972c0.062-0.342,0.158-0.934,0.183-1.415
                                                    c0.077-0.604-0.093-1.604-0.825-2.436c-0.534-0.607-1.57-1.33-3.47-1.33c-1.835,0-2.857,0.693-3.392,1.274
                                                    c-0.753,0.821-0.959,1.844-0.905,2.482c0.052,0.489,0.14,1.083,0.192,1.419c-0.157,0.194-0.31,0.512-0.309,1.013
                                                    c0.075,1.032,0.375,1.382,0.892,1.687c0.212,1.019,0.556,1.412,0.807,1.699c0.172,0.196,0.218,0.249,0.218,0.498
                                                    c0,1.133-0.386,1.748-2.773,2.618c-2.813,0.979-3.76,1.734-4.081,2.227C4.638,21.293,3.5,18.53,3.5,15.5z M7.326,23.978
                                                    c0.061-0.189,0.822-0.892,3.588-1.855c2.279-0.831,3.437-1.609,3.437-3.56c0-0.625-0.248-0.907-0.466-1.156
                                                    c-0.198-0.227-0.422-0.483-0.577-1.222c-0.086-0.539-0.417-0.703-0.595-0.791c-0.115-0.058-0.234-0.117-0.282-0.751
                                                    c0-0.256,0.068-0.33,0.054-0.336l0.348-0.151l-0.063-0.384c0,0-0.151-0.927-0.226-1.62c-0.029-0.342,0.075-1.087,0.646-1.709
                                                    c0.58-0.631,1.473-0.951,2.655-0.951c1.226,0,2.14,0.333,2.719,0.991c0.549,0.623,0.622,1.351,0.581,1.686
                                                    c-0.036,0.669-0.219,1.576-0.221,1.585L18.8,14.124l0.37,0.162c0.001,0.001,0.091,0.078,0.092,0.321
                                                    c-0.049,0.67-0.168,0.729-0.283,0.787c-0.177,0.088-0.508,0.252-0.592,0.779c-0.141,0.76-0.358,1.002-0.568,1.235
                                                    c-0.212,0.236-0.477,0.531-0.477,1.154c0,1.922,1.207,2.733,3.444,3.563c2.121,0.738,3.056,1.321,3.404,1.627
                                                    C22.002,26.055,18.92,27.5,15.5,27.5c-3.158,0-6.026-1.235-8.171-3.236L7.326,23.978z"/>
                                                <path fill="#F9C523" d="M11.409,26.466" />
                                            </svg>
                                        </div>

                                        <div id="header-logged-labels" >

                                            <div id="header-logged-labels-name" class="visible-sm visible-md visible-lg" >{{namPerson}}</div>

                                            <div id="header-logged-arrow" class="hidden-lg hidden-md" >
                                                <img src="https://imguol.com/p/sac/uol/images/53646a65.arrow-down.svg" ng-class="{ 'hidden' : !isCollapsedRight }" />
                                                <img src="https://imguol.com/p/sac/uol/images/0ffe70e0.arrow-up.svg" ng-class="{ 'hidden' : isCollapsedRight }" />
                                            </div>

                                            <div class="pipeSpliter visible-lg visible-md"> | </div>

                                            <div id="header-logged-exit-link-lg" class=" visible-lg visible-md" >
                                                <a title="Sair" alt="Sair" ng-href="{{logoutLink}}">Sair</a>
                                            </div>

                                        </div>

                                        <div class="clearfix" ></div>

                                        <div class="row visible-md visible-sm" >
                                            <div id="header-logged-exit-link-md" ng-click="logoutClick()"  ng-class="{ 'in' : !isCollapsedRight }" class="hidden-md hidden-lg" ><a title="Encerrar sessão no SAC" alt="Encerrar sessão no SAC" ng-href="{{logoutLink}}">Sair</a></div>
                                        </div>

                                    </div>
                                </div>

                                <div id="header-unlogged" ng-switch-when="false" >
                                    <a ng-href="{{loginLink}}" alt="Acesse sua conta" title="Entrar" >Entrar</a>
                                </div>

                                <div ng-switch-default>
                                    <a ng-href="{{loginLink}}" alt="Acesse sua conta" title="Entrar" >Entrar</a>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>


                <div ng-style="collapsedLeftStyle" class="collapse-lateral left hidden-md hidden-lg" >
                    <ul class="nav navbar-nav">
                        <li class="li-mobile" ng-click="isCollapsedLeft = !isCollapsedLeft; isCollapsedRight = true;" >
                             Menu
                            <span class="button mark-close">
                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
                                <polygon fill="#E9B425" points="414.4,391.8 278.6,256 414.4,120.2 391.8,97.6 256,233.4 120.2,97.6 97.6,120.2 233.4,256
                                    97.6,391.8 120.2,414.4 256,278.6 391.8,414.4 "/>
                                </svg>
                            </span>
                        </li>
                        <li ng-repeat="link in links"  ng-class="{ 'active': menuActive == link.name}" >
                            <a ng-click="click(link); $parent.isCollapsedLeft = !$parent.isCollapsedLeft; $parent.isCollapsedRight = true;" ng-bind-html="link.label" ></a>
                        </li>
                    </ul>
                </div>
                <div class="modal-shadow left collapse fadeSac hidden-md hidden-lg" ng-click="isCollapsedLeft = !isCollapsedLeft; isCollapsedRight = true;" ng-class="{ 'in':!isCollapsedLeft }" ></div>


                <div ng-style="collapsedRightStyle" class="collapse-lateral right visible-xs"  >
                    <div id="collapse-lateral-wrapper" >
                        <div id="collapse-lateral-name" >Ol&aacute;, {{namPerson}}!</div>
                        <div id="collapse-lateral-divisor" ></div>
                        <div id="collapse-lateral-exit-link" ng-click="logoutClick(); isCollapsedRight = !isCollapsedRight; " ><a title="Sair" alt="Sair" ng-href="{{logoutLink}}">Sair</a></div>
                    </div>
                </div>
                <div class="modal-shadow right collapse fadeSac hidden-md hidden-lg" ng-click="getBootstrapGridSize().bootstrapFormat != 'lg' ? isCollapsedRight = !isCollapsedRight : null;" ng-class="{ 'in':!isCollapsedRight }" ></div>


            </div>
        </div>
    </div>
</div>

<div ng-show="isMenuVisible" >
    <nav id="desktop-menu" class="visible-lg  visible-md" >
        <div class="desktop-menu-wrapper" >
            <ul class="nav navbar-nav">
                <li ng-repeat="link in links" ng-class="{ 'active': menuActive == link.name}">
                    <a ng-click="click(link)" ng-bind-html="link.label"></a>
                </li>
            </ul>
        </div>
    </nav>
</div>

<div class="clearfix" ></div>
