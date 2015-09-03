@echo off
color 0F
set generator="route"


TITLE Yo %generator%
type UOLSAC.dat


cd ../../
echo Digite o nome da nova %generator% Angular e pressione ENTER:
set /p name=

yo angular:%generator% %name%